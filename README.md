# EC1 Voice Attendance System
**Malnad College of Engineering — ECE Department — 2024–28 Batch**

AI-powered voice attendance using Groq Whisper + Microsoft Neerja voice (Edge browser).

---

## 🚀 How to Use

### Option 1 — Local (No internet needed for app itself)
1. Download/clone this repo
2. Open `index.html` in **Microsoft Edge**
3. Done!

### Option 2 — GitHub Pages (Share link with teachers)
1. Push this repo to GitHub
2. Go to repo **Settings → Pages → Source → main branch**
3. Share the link: `https://yourusername.github.io/attendance-app/`

---

## ⚙️ Setup (First Time)

1. **Login** — Enter your name and subject
2. **Settings** — Paste your Groq API key
3. **Click Start** — Attendance begins automatically!

---

## 🔑 Get Free Groq API Key
1. Go to [console.groq.com/keys](https://console.groq.com/keys)
2. Sign up free (no credit card)
3. Click **Create API Key**
4. Copy and paste into Settings

---

## 📱 Telegram Reports (Optional)
To get attendance reports on Telegram:
1. Create a bot via [@BotFather](https://t.me/botfather) on Telegram
2. Get your Chat ID from [@userinfobot](https://t.me/userinfobot)
3. Enter both in Settings

---

## 🧠 How it Works

| Feature | Technology |
|---|---|
| Voice calling | Microsoft Neerja (Edge SpeechSynthesis) |
| Voice detection | Groq Whisper (`whisper-large-v3-turbo`) |
| Classroom headcount | Groq Vision (`llama-4-scout`) |
| Proxy detection | Camera count vs present count |
| Data storage | Browser localStorage |
| Export | CSV download |

---

## ⚠️ Requirements
- **Microsoft Edge** browser (for Neerja voice)
- Groq API key (free)
- Microphone permission
- Camera permission (optional, for headcount)

---

## 📁 File Structure
```
attendance-app/
├── index.html          # Redirects to login
├── login.html          # Teacher login
├── settings.html       # API keys + config
├── attendance.html     # Live attendance page
├── css/
│   └── style.css       # All styles
└── js/
    ├── students.js     # 65 student list + pronunciation
    ├── voice.js        # Neerja TTS + Groq Whisper
    ├── sounds.js       # Audio feedback (Web Audio API)
    └── groq.js         # Vision API + Telegram + CSV
```

---

## 👨‍💻 Built for
EC1 batch · ECE Dept · MCE Hassan · 2024–28
