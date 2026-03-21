// ============================================
//  PlagiaScope — Secure Backend Server
//  🔒 API key is hidden here, never exposed
// ============================================

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// ─────────────────────────────────────────
// 🔒 SECURITY MIDDLEWARE
// ─────────────────────────────────────────

// Helmet adds security headers
app.use(helmet({
  contentSecurityPolicy: false // allow frontend to load fonts/scripts
}));

// CORS — only allow your frontend to talk to this server
app.use(cors({
  origin: [
    "http://localhost:5500",     // VS Code Live Server
    "http://127.0.0.1:5500",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:8080",
    "null"                       // direct file open in browser
  ],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

// Parse JSON bodies
app.use(express.json({ limit: "50kb" })); // max 50kb request size

// Request logging
app.use(morgan("dev"));

// ─────────────────────────────────────────
// 🚦 RATE LIMITING — stops abuse
// ─────────────────────────────────────────

// Global rate limit — max 100 requests per 15 minutes per IP
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: "Too many requests. Please wait 15 minutes." },
  standardHeaders: true,
  legacyHeaders: false
});
app.use(globalLimiter);

// Scan-specific limit — max 10 scans per hour per IP
const scanLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: { error: "Scan limit reached. You can do 10 scans per hour. Try again later." },
  standardHeaders: true,
  legacyHeaders: false
});

// ─────────────────────────────────────────
// ✅ ROUTES
// ─────────────────────────────────────────

// Health check — to verify server is running
app.get("/", (req, res) => {
  res.json({
    status: "🟢 PlagiaScope Server is running!",
    version: "1.0.0",
    endpoints: {
      health: "GET /",
      scan: "POST /api/scan"
    }
  });
});

// ─────────────────────────────────────────
// 🔍 MAIN SCAN ENDPOINT
// ─────────────────────────────────────────

app.post("/api/scan", scanLimiter, async (req, res) => {

  // 1. Validate request body
  const { text, options } = req.body;

  if (!text || typeof text !== "string") {
    return res.status(400).json({ error: "Text is required." });
  }

  if (text.trim().length < 30) {
    return res.status(400).json({ error: "Text must be at least 30 characters." });
  }

  if (text.length > 20000) {
    return res.status(400).json({ error: "Text too long. Max 20,000 characters." });
  }

  // 2. Get API key from .env — NEVER from the request
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("❌ ANTHROPIC_API_KEY not found in .env file!");
    return res.status(500).json({ error: "Server configuration error. Contact admin." });
  }

  // 3. Build the prompt
  const optList = options ? options.join(", ") : "deep scan, AI detection, paraphrase detection";

  const prompt = `You are an expert plagiarism detection AI. Analyze the following text and return a detailed plagiarism report as JSON ONLY — no markdown, no explanation outside JSON.

TEXT:
"""
${text}
"""

OPTIONS: ${optList}

Return ONLY valid JSON with this exact structure:
{
  "plagiarismScore": <0-100>,
  "aiGeneratedProbability": <0-100>,
  "originalityScore": <0-100>,
  "verdict": "<short verdict>",
  "verdictDescription": "<2-3 sentence explanation>",
  "sentences": [{"text":"<sentence>","status":"original"|"similar"|"plagiarized","confidence":<0-100>,"reason":"<reason if not original>"}],
  "sources": [{"title":"<title>","url":"<url>","matchPercentage":<0-100>,"excerpt":"<excerpt>"}],
  "recommendations": [{"icon":"<emoji>","title":"<title>","body":"<detail>"}],
  "summary": {"totalSentences":<n>,"flaggedSentences":<n>,"similarSentences":<n>,"originalSentences":<n>}
}

Rules: Be precise. Common phrases = similar, exact copies = plagiarized. Assess AI patterns. Give 3+ recommendations.`;

  // 4. Call Claude API — key is safe on the server!
  try {
    console.log(`📝 Scanning text (${text.length} chars) from IP: ${req.ip}`);

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,                        // 🔒 Safe — never sent to browser
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 3000,
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      console.error("❌ Claude API error:", data.error);
      return res.status(502).json({ error: "AI service error. Please try again." });
    }

    // 5. Parse Claude's response
    let raw = data.content.map(b => b.text || "").join("").replace(/```json|```/g, "").trim();
    let result;

    try {
      result = JSON.parse(raw);
    } catch (e) {
      const match = raw.match(/\{[\s\S]*\}/);
      if (match) result = JSON.parse(match[0]);
      else throw new Error("Could not parse AI response");
    }

    console.log(`✅ Scan complete — Plagiarism: ${result.plagiarismScore}%`);

    // 6. Send result back to frontend
    res.json({ success: true, result });

  } catch (err) {
    console.error("❌ Server error:", err.message);
    res.status(500).json({ error: "Analysis failed. Please try again." });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found." });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("💥 Unhandled error:", err);
  res.status(500).json({ error: "Internal server error." });
});

// ─────────────────────────────────────────
// 🚀 START SERVER
// ─────────────────────────────────────────

app.listen(PORT, () => {
  console.log("");
  console.log("🔍 ================================");
  console.log("   PlagiaScope Backend Server");
  console.log("🔍 ================================");
  console.log(`🟢 Server running at http://localhost:${PORT}`);
  console.log(`🔒 API Key: ${process.env.ANTHROPIC_API_KEY ? "✅ Loaded from .env" : "❌ NOT FOUND — add to .env"}`);
  console.log(`🚦 Rate limit: 10 scans/hour per IP`);
  console.log("🔍 ================================");
  console.log("");
});
