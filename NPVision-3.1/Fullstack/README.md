# **NPVision 3.1 – From Syllabus to Simulation**

![Not Pi Vision Banner](https://res.cloudinary.com/dmttn34te/image/upload/v1744580322/NOT_Pi_Vision_Brand_logo_qrakmx.gif)

**NPVision 3.1** is a next-generation AI-powered learning system that transforms educational content into dynamic visualizations, interactive simulations, mind maps, quizzes, and presentations — all without writing code.
Powered by **Google Gemini** (with optional ChatGPT integration), it enables educators, students, and self-learners to generate rich, engaging learning content instantly.

---

# 🌟 **Key Features**

## **1. AI-Powered Content Generation**

* Auto-generate visualizations, pages, quizzes, animations
* Works with **Gemini** or **ChatGPT**
* Context-aware and learning-objective–aligned content

## **2. Multiple Visualization Types**

* **2D Animation** (frame-by-frame or smooth)
* **2D Interactive** (user-controlled simulations)
* **3D Models** (molecules, mechanisms, structures)
* **Mind Maps / Concept Graphs**
* **Graphs & Data Visualizations**
* **Chemistry Mechanisms** (stepwise reactions)

## **3. Isolated Template Rendering**

* Visualizations run in **sandboxed iframes**
* Prevents CSS/JS conflict with main UI
* Load templates from GitHub seamlessly

## **4. Live Voice Tutor (Gemini Live API)**

* Real-time **voice conversation**
* Auto-send visualization context
* Multi-voice TTS selector with language detection
* Start (green) & end (red) call buttons

## **5. Integrated Notepad**

* GitHub-hosted templates
* Rich text editor with formatting & markdown
* Autosaves with workspace data

## **6. Modern, Beautiful UI**

* Glassmorphism theme
* Responsive on all devices
* Smooth animations, shadows, gradients
* Dark-mode optimized with green accents (#22C55E)

## **7. Multi-Language Support**

* Generate content in **10+ languages**
* Automatic language detection for TTS
* 50+ voice options

---

# 🚀 **Quick Start Guide**

## **Prerequisites**

* Node.js **18+**
* Gemini API key → [https://aistudio.google.com/app/apikeys](https://aistudio.google.com/app/apikeys)

## **Local Development**

1. **Clone project**

```bash
git clone <repository-url>
cd npvision-3.1
```

2. **Install dependencies**

```bash
npm install
```

3. **Create `.env`**

```bash
GEMINI_API_KEY=your_api_key_here
NODE_ENV=development
PORT=3000
```

4. **Start server**

```bash
npm start
# Visit http://localhost:3000
```

---

# ☁️ **Deploy on Vercel**

1. Push repository to GitHub:

```bash
git push origin main
```

2. Go to Vercel → Import repo
3. Add environment variable: `GEMINI_API_KEY`
4. Deploy automatically

Your site appears at:

```
https://your-project.vercel.app
```

---

# 🖥️ **UI/UX Overview**

```
┌─────────────────────────────────────────┐
│ Sidebar        │    Content Viewer      │  Notepad
│ Topics Tree    │  Visualization Iframe  │  Rich Editor
│ Units/Chapters │  Pages / Quiz Tabs     │  Autosave
└─────────────────────────────────────────┘
```

### **Tabs**

1. **Visualization** – iframe animation / simulation
2. **Pages** – AI-generated formatted lessons
3. **Quiz** – MCQ with instant feedback

### **AI Tutor Modal**

* Real-time chat
* Voice call
* Context sending
* 50+ voice selector

### **Generation Modal**

* Choose AI engine
* Select template (6 types)
* Choose visualization type (6 modes)
* Set complexity
* Advanced options

---

# 📁 **Project Structure**

```
npvision-3.1/
├── public/
│   ├── index.html
│   ├── app.js
│   ├── styles.css
│   └── (localStorage workspace data)
├── server.js
├── package.json
└── README.md
```

## **server.js**

* Express backend
* `/api/generate` – Gemini wrapper
* `/api/template/:type` – load GitHub templates
* `/api/config` – load frontend config
* CORS + error handling

## **public/app.js**

* Workspace system
* Topics tree
* Visualization engine (iframe sandbox)
* Voice APIs
* Notepad sync
* Generation modal
* LocalStorage persistence

## **public/index.html**

* Dashboard
* Workspace viewer
* All modal UIs
* Mobile responsive layout

## **styles.css**

* Glassmorphism
* Variables + theming
* Animations
* Mobile layout

---

# 🧠 **Content Generation Pipeline**

```
User Prompt → Gemini Model → AI Output 
        → HTML/JS Template → Sandboxed Iframe Render
```

### Templates include:

* Surprise Me (random)
* Presentation
* MindVoice (Mindmap Narration)
* Graph
* Creative Animation
* Chemistry Mechanisms

---

# 🔊 **Voice System**

* Auto-detect browser voices
* Group by languages
* Pagination for voice list
* Instant playback
* Gemini Live real-time calls

---

# 📊 **API Reference**


### Load Template

```
GET /api/template/notepad
GET /api/template/description
```


# ⚙️ **Environment Variables**

```env
GEMINI_API_KEY=your_key_here
NODE_ENV=development
PORT=3000
```


# 👨‍💻 Credits

Developed by **S. A. M. (Sabir Ali Mondal)**

Technologies:

* Google Gemini
* Express.js
* Bootstrap 5
* Bootstrap Icons

---

### **Last Updated:** April 14, 2025

### **Version:** 3.1.0

### **Status:** ✅ Production-Ready
