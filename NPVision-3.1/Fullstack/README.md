# NPVision 3.1 - AI-Powered Interactive Learning Platform

![NPVision 3.1](https://res.cloudinary.com/dmttn34te/image/upload/v1744583444/Screenshot_2025-04-14_040029_ybfrtb.png)

**NPVision 3.1** is a revolutionary AI-powered learning platform that transforms educational content into interactive visualizations, mind maps, quizzes, and dynamic presentations. Built with cutting-edge AI integration (Google Gemini), it enables educators and learners to create rich, engaging educational experiences without coding.

---

## What Makes NPVision 3.1 Unique?

### 1. **AI-Powered Content Generation**
- Automatically generates visualizations, pages, quizzes, and interactive content using Google Gemini AI
- Supports multiple AI engines (Gemini, ChatGPT)
- Context-aware content tailored to your learning objectives

### 2. **Multiple Visualization Types**
- **2D Animations**: Frame-by-frame educational animations
- **2D Interactive**: User-controlled simulations and experiments
- **3D Models**: Interactive molecular structures, mechanical simulations
- **Mind Maps**: Visual concept relationships and knowledge graphs
- **Data Visualizations**: Charts, graphs, and statistical representations
- **Chemistry Mechanisms**: Step-by-step reaction mechanisms with molecular details

### 3. **Isolated Template Rendering**
- External templates load in sandboxed iframes
- Prevents style pollution and maintains design integrity
- Seamless integration of GitHub-hosted templates

### 4. **Live Voice Chat Tutor**
- Real-time voice interaction with AI tutor using Gemini API
- Send visualization context with one click
- Beautiful TTS voice selector with automatic language detection
- Green (start) and red (end) call buttons

### 5. **Comprehensive Notepad Integration**
- Rich text editor loaded from GitHub templates
- Automatically save notes alongside visualizations
- Full markdown and formatting support

### 6. **Beautiful, Modern UI**
- Glass-morphism design with smooth animations
- Fully responsive (desktop, tablet, mobile)
- Dark mode optimized with green accent colors
- Accessibility-first design patterns

### 7. **Multi-Language Support**
- Content generation in 10+ languages
- Voice narration in multiple voices and accents
- Automatic language detection for TTS

---

## Quick Start

### Prerequisites
- Node.js 18.x or higher
- Google Gemini API key ([Get it here](https://aistudio.google.com/app/apikeys))

### Local Development

1. **Clone or download the project**
   \`\`\`bash
   git clone <repository-url>
   cd npvision-3.1
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Create .env file**
   \`\`\`bash
   # .env
   GEMINI_API_KEY=your_api_key_here
   NODE_ENV=development
   PORT=3000
   \`\`\`

4. **Start development server**
   \`\`\`bash
   npm start
   # Server runs on http://localhost:3000
   \`\`\`

### Vercel Deployment

1. **Push to GitHub**
   \`\`\`bash
   git push origin main
   \`\`\`

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variable: `GEMINI_API_KEY`
   - Deploy

3. **Access your app**
   - Your app will be live at `https://your-project.vercel.app`

---

## UI/UX Structure

### Main Dashboard
- **Hero Section**: Welcome banner with project branding
- **Workspace Grid**: Browse and create learning workspaces
- **Quick Actions**: Create new workspace or import content

### Workspace Interface
\`\`\`
┌─────────────────────────────────────────┐
│ Sidebar        │    Content Viewer      │  Notepad
│ ┌──────────────┤ ┌──────────────────┐  │ ┌────────┐
│ │ Topics Tree  │ │   Visualization  │  │ │ Notes  │
│ │ • Unit 1     │ │   (Interactive)  │  │ │ Editor │
│ │   • Ch 1     │ │                  │  │ │        │
│ │   • Ch 2     │ │ [Controls]       │  │ │        │
│ │ • Unit 2     │ │                  │  │ │        │
│ └──────────────┤ └──────────────────┘  │ └────────┘
│                │ [Pages] [Quiz] Tabs   │
└─────────────────────────────────────────┘
\`\`\`

### Content Tabs
1. **Visualization Tab** (Default)
   - Interactive iframe-based visualization
   - Control buttons: Fullscreen, Stop, Replay
   - Placeholder when paused
   - Isolated rendering prevents style pollution

2. **Pages Tab**
   - Formatted educational content
   - Supports rich text, images, embeds
   - Auto-generated from AI

3. **Quiz Tab** (if applicable)
   - Interactive multiple-choice questions
   - Instant feedback and scoring
   - Difficulty levels (Basic → Expert)

### AI Tutor Modal
- **Chat Window**: Real-time conversation with Gemini AI
- **Send Context**: Click to send all visualization data to tutor
- **Voice Controls**:
  - Green button: Start live voice chat
  - Red button: End call
- **Voice Selector**: Choose from 50+ system voices with language filter
- **Message History**: Scroll through past interactions

### Generation Modal (Content Creation)
\`\`\`
Step 1: Select AI Engine (Gemini/ChatGPT)
Step 2: Choose Template (6 types)
Step 3: Pick Visualization Type (6 styles)
Step 4: Set Complexity (Basic → Expert)
Advanced: Custom context, JSON examples, voice selection
\`\`\`

---

## Project Structure

\`\`\`
npvision-3.1/
├── public/
│   ├── index.html              # Main app shell
│   ├── app.js                  # Client-side logic (1500+ lines)
│   ├── styles.css              # Theme & styling
│   └── (generated content stored in localStorage)
├── server.js                   # Express server
├── package.json                # Dependencies
├── .env                        # Environment variables
├── .gitignore                  # Git ignores
└── README.md                   # This file
\`\`\`

### Key Files Explained

#### `server.js` (Node.js Express Server)
- **GET /api/health** - Health check for Vercel
- **POST /api/generate** - Gemini API wrapper
  - Supports Gemini 2.0 Flash (fast) and Live (voice)
- **GET /api/template/:type** - Load GitHub templates (description, notepad)
- **GET /api/config** - Frontend configuration
- **Middleware**: Error handling, CORS, body parsing (50MB limit)

#### `public/app.js` (Client Logic)
- **Workspace Management**: Create, load, delete workspaces
- **Topic Hierarchy**: Units, Chapters, Topics with tree structure
- **Content Generation**: Multi-step modal with 6+ generation templates
- **Visualization Engine**: Render HTML/JS in isolated iframes
- **Voice Controls**: TTS voice selector, live chat, playback
- **Notepad Integration**: Load from GitHub, auto-sync
- **localStorage**: Persist workspaces and topics locally

#### `public/index.html` (UI Templates)
- Dashboard (hero + workspace grid)
- Workspace viewer (sidebar + content + notepad)
- 10+ modal dialogs (create, generate, chat, preview, etc.)
- Responsive design with mobile sidebar toggle

#### `public/styles.css` (Design System)
- CSS Variables for theming (green #22C55E, dark background)
- Glass-morphism effects (backdrop-filter, border-radius)
- Smooth animations (transitions, keyframes)
- Responsive breakpoints (mobile-first)
- Accessible typography and spacing

---

## Key Features Deep Dive

### 1. Content Generation Pipeline
\`\`\`
User Input → Gemini Prompt → AI Response → HTML/JS Generation → Iframe Render
\`\`\`

**Supported Templates:**
- **Surprise Me!**: Random visualization (2D/3D animation, interactive, cartoon, blueprint)
- **Presentation**: Slide-based learning
- **MindVoice**: Voice-guided mind maps with visual connections
- **Graph**: Data visualization with interactive charts
- **Creative**: Animated storytelling and concept art
- **Chemistry**: Molecular structures and reaction mechanisms

### 2. Voice TTS Integration
- **System Voice Detection**: Auto-load all available voices
- **Language Grouping**: Organize by language code
- **Voice Pagination**: Browse non-default voices
- **Selection Display**: Show chosen voices in textarea
- **Live Playback**: Test voices before selection

### 3. AI Tutor System
- **Context-Aware**: Send visualization + topic data to tutor
- **Gemini Live API**: Real-time voice conversation
- **Message History**: Store and retrieve past interactions
- **Beautiful UI**: Gradient buttons, smooth animations, responsive chat

### 4. Visualization Controls
- **Fullscreen**: Expand visualization to full screen
- **Stop**: Pause rendering, show placeholder
- **Replay**: Resume visualization from last state
- **Isolation**: All rendered in iframes to prevent CSS conflicts

### 5. Multi-Workspace Organization
- Create multiple workspaces (subjects, courses, projects)
- Structure with Units → Chapters → Topics
- Import topics from .txt files
- Metadata: creation date, modification date, content type

---

## API Reference

### Generate Content
\`\`\`javascript
POST /api/generate
Content-Type: application/json

{
  "prompt": "Generate a 2D animation showing photosynthesis process",
  "useFlash": false  // true for flash, false for live
}

Response:
{
  "success": true,
  "content": "<html>...</html>"
}
\`\`\`

### Load Template
\`\`\`
GET /api/template/notepad
GET /api/template/description

Response: HTML content from GitHub
\`\`\`

### Health Check
\`\`\`
GET /api/health

Response:
{
  "status": "ok",
  "timestamp": "2025-04-14T10:30:00Z"
}
\`\`\`

---

## Environment Variables

\`\`\`env
# Required
GEMINI_API_KEY=sk_live_abc123...    # Get from https://aistudio.google.com/app/apikeys

# Optional
NODE_ENV=development                 # development or production
PORT=3000                            # Server port (auto-detect in Vercel)
\`\`\`

---

## Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome  | 90+     | ✅ Full Support |
| Firefox | 88+     | ✅ Full Support |
| Safari  | 14+     | ✅ Full Support |
| Edge    | 90+     | ✅ Full Support |
| Mobile  | iOS 14+ | ✅ Responsive |

---

## Performance & Optimization

- **Lazy Loading**: Topics load on-demand
- **localStorage Caching**: Fast workspace access
- **Iframe Isolation**: Prevents memory leaks
- **Code Splitting**: Modular JS functions
- **Image Optimization**: Placeholder system for faster load
- **API Caching**: GitHub templates cached for 1 hour

---

## Troubleshooting

### Issue: Gemini API error
**Solution**: Check `.env` file has correct `GEMINI_API_KEY`
\`\`\`bash
# Verify:
echo $GEMINI_API_KEY
\`\`\`

### Issue: Voices not loading
**Solution**: Refresh page, check browser console
- Chrome/Edge: Settings → Advanced → Accessibility → Manage Speech settings
- Firefox: Check about:config for speech API

### Issue: Visualization not rendering
**Solution**: Check iframe sandbox permissions in index.html
\`\`\`html
<iframe sandbox="allow-same-origin allow-scripts allow-popups allow-forms"></iframe>
\`\`\`

### Issue: Vercel 500 error
**Solution**: Check Vercel logs
\`\`\`bash
vercel logs --tail
\`\`\`

---

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## License

MIT License - see LICENSE file for details

---

## Support & Contact

- **Issues**: Open GitHub issue with detailed description
- **Questions**: Check Discussions tab
- **Email**: support@npvision.dev
- **Docs**: https://docs.npvision.dev

---

## Roadmap

- [ ] Offline mode with service workers
- [ ] Collaborative workspaces (real-time sync)
- [ ] Advanced analytics (learning progress, engagement)
- [ ] Mobile native apps (iOS/Android)
- [ ] Video recording of visualizations
- [ ] Custom template builder
- [ ] Plugin marketplace

---

## Credits

**Developed by**: S. A. M. (Sabir Ali Mondal)

**Technologies**:
- [Google Gemini API](https://ai.google.dev)
- [Express.js](https://expressjs.com)
- [Bootstrap 5](https://getbootstrap.com)
- [Bootstrap Icons](https://icons.getbootstrap.com)

---

## Acknowledgments

Special thanks to the open-source community and all contributors who made NPVision 3.1 possible.

---

**Last Updated**: April 14, 2025  
**Version**: 3.1.0  
**Status**: Production Ready ✅
