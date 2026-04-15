# 🔍 PlagiaScope — AI-Powered Plagiarism Detector

<div align="center">

![PlagiaScope](https://img.shields.io/badge/PlagiaScope-AI%20Powered-c8ff00?style=for-the-badge&labelColor=0a0a0f&color=c8ff00)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-Server-000000?style=for-the-badge&logo=express&logoColor=white)
![Claude AI](https://img.shields.io/badge/Claude%20AI-Anthropic-blueviolet?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Live%20%26%20Working-brightgreen?style=for-the-badge)

<br/>

> **The most accurate AI-powered plagiarism checker** — detects copied content, paraphrasing & AI-generated text in under 3 seconds. Fully secure backend with API key protection. 🔒

<br/>

[🚀 Getting Started](#-getting-started) • [✨ Features](#-features) • [📁 Project Structure](#-project-structure) • [🛠️ Tech Stack](#️-tech-stack) • [🚀 Deployment](#-deploy-online-free)

</div>

---

## 🌟 What is PlagiaScope?

**PlagiaScope** is a full-stack plagiarism detection web app powered by **Claude AI (Anthropic)**. It analyzes every sentence of your text — detecting exact plagiarism, paraphrasing, and AI-generated content — and delivers a beautiful interactive report instantly.

The backend server keeps your **API key 100% hidden** from users. No one can steal it. 🔒

---

## ✨ Features

### 🔒 Secure Backend (`server.js`)
- 🛡️ **API key hidden** in `.env` — never exposed to browser
- 🚦 **Rate limiting** — max 10 scans per hour per IP
- 🪖 **Helmet.js** — security headers on every response
- 🌐 **CORS protection** — only your frontend can talk to it
- 📏 **Input validation** — blocks bad or oversized requests
- 📋 **Request logging** — see every scan in terminal

### 🌐 Frontend (`plagiarism-checker.html`)
- 🟢 **Server status badge** — shows if backend is online
- ⚠️ **Warning banner** — tells you if server is not running
- 🧠 **Deep AI Analysis** — sentence-by-sentence breakdown
- 🔴 **Plagiarism Score** — animated circular gauge 0–100%
- 🤖 **AI Content Detection** — detects ChatGPT, Claude, Gemini
- 🟡 **Paraphrase Detection** — catches rewording
- 🌐 **Source Identification** — lists likely matching sources
- 📝 **Highlighted Text** — red = plagiarized, yellow = similar
- 💡 **Recommendations** — tells you exactly what to fix
- 🎨 **Stunning dark UI** — custom cursor, animations, lime accents

### 🏠 Landing Page (`plagiarism-website.html`)
- 🖱️ Custom magnetic cursor with glow ring
- 🌊 Animated hero with floating orbs
- 📊 Live demo preview section
- 💬 Testimonials, pricing & features
- 📱 Fully responsive

---

## 📁 Project Structure

```
plagiarism-backend/
│
├── 🟢 server.js                   # Secure Express backend server
├── 🌐 plagiarism-checker.html     # Frontend checker app (secure)
├── 📦 package.json                # Dependencies & scripts
├── 🔒 .env.example                # API key template
├── 🙈 .gitignore                  # Keeps .env off GitHub
└── 📖 README.md                   # You are here!

plagiarism-website.html            # Marketing landing page (root)
```

---

## 🚀 Getting Started

### ✅ Prerequisites
- 🟢 **Node.js** (v16 or higher) — [Download here](https://nodejs.org)
- 🔑 **Anthropic API Key** — [Get one free here](https://console.anthropic.com)

---

### 📥 Step 1 — Clone the Repo

```bash
git clone https://github.com/Debasish-Nayak-556/plagiarism-checker.git
cd plagiarism-checker/plagiarism-backend
```

---

### 📦 Step 2 — Install Dependencies

```bash
npm install
```

This installs:
- `express` — web server
- `cors` — cross-origin requests
- `dotenv` — loads .env file
- `helmet` — security headers
- `express-rate-limit` — stops abuse
- `morgan` — request logging

---

### 🔑 Step 3 — Add Your API Key

Rename `.env.example` to `.env`:

```bash
# Windows
rename .env.example .env

# Mac / Linux
mv .env.example .env
```

Open `.env` and add your key:

```env
ANTHROPIC_API_KEY=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
PORT=3000
```

> 💡 Get your free API key at [console.anthropic.com](https://console.anthropic.com) → API Keys → Create Key

---

### 🟢 Step 4 — Start the Server

```bash
npm start
```

You will see this in terminal:

```
🔍 ================================
   PlagiaScope Backend Server
🔍 ================================
🟢 Server running at http://localhost:3000
🔒 API Key: ✅ Loaded from .env
🚦 Rate limit: 10 scans/hour per IP
🔍 ================================
```

---

### 🌐 Step 5 — Open the App

Open `plagiarism-checker.html` in your browser.

The top nav will show **"Server Connected 🔒"** in green ✅

Paste any text → Click **Scan Now** → Get your full report! 🎉

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| 🟢 **Node.js** | JavaScript runtime |
| ⚡ **Express.js** | Web server framework |
| 🔒 **dotenv** | Hides API key in .env |
| 🪖 **Helmet.js** | Security HTTP headers |
| 🚦 **express-rate-limit** | Prevents API abuse |
| 📋 **Morgan** | Request logging |
| 🌐 **CORS** | Cross-origin protection |
| 🤖 **Claude AI** | Plagiarism analysis engine |
| 🎨 **HTML/CSS/JS** | Frontend UI |
| 🔤 **Clash Display** | Display font |
| 🔤 **Geist Mono** | Monospace font |

---

## 🔒 Security Features

```
User Browser
     │
     │  POST /api/scan  (just text, no key)
     ▼
┌─────────────────────────────┐
│   Express Backend Server    │
│                             │
│  ✅ Validates input         │
│  ✅ Checks rate limit       │
│  ✅ Reads key from .env     │
│  ✅ Calls Claude API        │
│  ✅ Returns only result     │
└─────────────────────────────┘
     │
     │  API Key never leaves server 🔒
     ▼
  Claude AI (Anthropic)
```

---

## 🚀 Deploy Online (Free)

### Option A — Render.com (Recommended) 🌟

1. Push your code to GitHub
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect your GitHub repo
4. Set these settings:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add environment variable:
   - Key: `ANTHROPIC_API_KEY`
   - Value: your key
6. Click **Deploy** ✅

Your server will be live at `https://your-app.onrender.com`

### Option B — Railway.app

1. Go to [railway.app](https://railway.app) → New Project
2. Deploy from GitHub repo
3. Add `ANTHROPIC_API_KEY` in Variables tab
4. Done ✅

### After deploying — update frontend

Open `plagiarism-checker.html` and change this line:

```javascript
// Before
const BACKEND_URL = "http://localhost:3000";

// After
const BACKEND_URL = "https://your-app.onrender.com";
```

---

## 🐛 Troubleshooting

| Problem | Solution |
|---|---|
| ❌ "Server Offline" badge | Run `npm start` in terminal |
| ❌ "API Key not found" | Check `.env` file has correct key |
| ❌ "Rate limit reached" | Wait 1 hour or restart server |
| ❌ `npm install` fails | Install Node.js from nodejs.org |
| ❌ Port 3000 already in use | Change `PORT=3001` in `.env` |
| ❌ CORS error in browser | Server not running on port 3000 |

---

## 💰 API Cost Estimate

| Usage | Approximate Cost |
|---|---|
| 1 scan (500 words) | ~$0.002 |
| 100 scans | ~$0.20 |
| 1,000 scans | ~$2.00 |
| 10,000 scans | ~$20.00 |

> 🎁 New Anthropic accounts get **free credits** — enough for hundreds of test scans!

---

## 🚀 Future Improvements

- [ ] 📄 PDF & DOCX upload support
- [ ] 📊 Export report as PDF
- [ ] 👤 User login & signup
- [ ] 🗂️ Scan history dashboard
- [ ] 💳 Stripe payment integration
- [ ] 🌍 Multi-language support
- [ ] 📱 Mobile app version
- [ ] 🔌 Public REST API

---

## 🤝 Contributing

1. 🍴 Fork the repo
2. 🌿 Create branch: `git checkout -b feature/amazing-feature`
3. 💾 Commit: `git commit -m 'Add amazing feature'`
4. 📤 Push: `git push origin feature/amazing-feature`
5. 🔁 Open a Pull Request

---

## 📄 License

MIT License — use it for anything you want! 🎉

---

## 👨‍💻 Author

Made with ❤️ and ☕ by **Debasish Nayak**

[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github)](https://github.com/Debasish-Nayak-556)

---

<div align="center">

### ⭐ If this helped you, please star the repo!

**PlagiaScope** — *Your words. Your originality. Proven.* 🔍

</div>
