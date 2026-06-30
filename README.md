# 🎓 EC1 Voice Attendance System
**Malnad College of Engineering — ECE Department — 2024–28 Batch**

AI-powered voice attendance system using **Groq Whisper** for speech-to-text and **Microsoft Neerja** for high-speed voice calling. Designed for fast, accurate, and automated classroom attendance.

---

## 🔗 Live Link
🚀 **[Launch Attendance App](https://mce-ece-attendance.vercel.app/attendance.html)**

---

## ✨ Features
- ⚡ **Super Fast Calling:** Optimized at 1.9x speed (Mangaluru style) for quick rolls.
- 🎙️ **AI Voice Recognition:** Uses `whisper-large-v3-turbo` to detect "Present", "Yes", "Haan", etc.
- 📸 **AI Headcount:** Takes a classroom photo to detect proxies by comparing student count with attendance.
- 📱 **Telegram Integration:** Automatically sends a detailed report to the teacher's Telegram.
- 📊 **Excel Export:** Download attendance records as CSV for official records.
- 🔇 **Noise Suppression:** Smart filtering to ignore background noise and computer echo.

---

## 🚀 How to Use
1. **Open the App:** Use the live link above or open `index.html` in **Microsoft Edge**.
2. **Setup:** Go to **Settings** and enter your **Groq API Key**.
3. **Configure Telegram (Optional):** Add your Bot Token and Chat ID to get instant reports.
4. **Start Attendance:** Enter teacher & subject details and click **Start**.

---

## ⚙️ Setup (First Time)
1. **Get Groq Key:** Visit [console.groq.com](https://console.groq.com/keys) (Free).
2. **Permissions:** Allow Microphone and Camera access in your browser.
3. **Browser:** **Microsoft Edge** is recommended for the best Indian accent (Neerja voice).

---

## 🧠 Technology Stack
| Feature | Technology |
|---|---|
| **Voice TTS** | Microsoft Neerja (Edge SpeechSynthesis) |
| **Speech-to-Text** | Groq Whisper AI (`whisper-large-v3-turbo`) |
| **Vision AI** | Groq Llama Vision (Classroom headcount) |
| **Reporting** | Telegram Bot API |
| **Storage** | Browser localStorage (No database needed) |

---

## 👨‍💻 Built for
**EC1 Section · ECE Dept · MCE Hassan · 2024–28**
Designed for speed, accuracy, and ease of use.

---

## 📁 Project Structure
- `login.html`: Teacher authentication.
- `settings.html`: API & Telegram configuration.
- `attendance.html`: Live attendance engine.
- `js/students.js`: Complete student list (65) with custom pronunciation fixes.
- `js/voice.js`: The AI brain for listening and speaking.
- `js/groq.js`: vision headcount and export logic.
