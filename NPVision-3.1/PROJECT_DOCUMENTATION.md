# Not Pi Vision 3.1 - AI Learning Studio

## Project Overview

**Not Pi Vision 3.1** is an advanced AI-powered learning management system that transforms educational content into interactive visualizations. It combines generative AI (Gemini, ChatGPT) with a powerful frontend framework to create personalized learning experiences across any subject matter.

**Developed by:** S.A.M.  
**Version:** 3.1  
**Stack:** Vanilla JavaScript (Frontend) + Express.js (Backend) + IndexedDB (Local Storage)

---

## Table of Contents

1. [Features & Abilities](#features--abilities)
2. [User Interface & UX](#user-interface--ux)
3. [Architecture](#architecture)
4. [Technology Stack](#technology-stack)
5. [File Structure](#file-structure)
6. [Core Modules](#core-modules)
7. [Workflow & Usage](#workflow--usage)
8. [Design System](#design-system)

---

## Features & Abilities

### 1. Workspace Management

#### Multi-Workspace System
- Create unlimited workspaces for different subjects or courses
- Each workspace contains a hierarchical topic structure (Units → Chapters → Topics)
- Default workspace pre-populated with sample topics for quick start
- Real-time progress tracking (% completion per workspace)

#### Workspace Operations
- **Create**: Blank, AI-generated, or upload from file
- **Import**: Upload `.json` workspace exports or `.zip` archives
- **Export**: Download workspaces as both JSON (backup) and HTML (portable)
- **Delete**: Remove workspaces with confirmation dialog
- **Auto-save**: Debounced saves to IndexedDB every 1 second

### 2. Topic Generation & Content Creation

#### AI-Powered Content Generation
- **Two AI Engines**: Gemini (automatic) or ChatGPT (manual prompt redirect)
- **Six Content Templates**:
  - **Surprise Me!** - Random visualization + description
  - **Presentation** - Slide-based content with visual support
  - **MindVoice** - Mind maps and diagram-based learning
  - **Graph** - Data visualization and charting
  - **Chemistry** - Molecular structures and reactions
  - **Custom Templates** - Extensible for domain-specific content

#### Visualization Types (for Surprise Me!)
- **2D Animation** - Animated SVG/Canvas visualizations
- **2D Interactive** - User-interactive plots and simulations
- **2D Cartoon** - Engaging illustrated explanations
- **2D Blueprint** - Technical diagrams and schematics
- **3D Animation** - Animated 3D models (experimental)
- **3D Interactive** - Interactive 3D visualizations

#### Complexity Levels
Four difficulty tiers: Basic → Intermediate → Advanced → Expert  
Adjusts content depth, pacing, and technical terminology

#### Advanced Generation Options
- **Custom Context**: 5-line custom requirements per topic
- **Auto Context Generation**: AI-generated context based on topic metadata
- **Content Language**: Support for English, Hindi, Bengali, and other languages
- **Narration Language**: Separate language control for text-to-speech
- **Objective Setting**: Define learning goals per topic

### 3. Content Management & Refinement

#### Preview System
- Real-time preview of generated visualizations and pages before saving
- Toggle between visualization and pages (description) views
- Full-screen preview modal with side-by-side comparison

#### Content Editing Workflow
1. **Generate** - Create content via AI prompt
2. **Review** - Edit raw JSON/HTML response
3. **Preview** - See final rendered output
4. **Fix** - Submit specific fix requests to AI
5. **Save** - Store approved content to workspace

#### Fix & Iteration
- **Fix Modal**: Describe specific issues (e.g., "animation too fast", "fix typo")
- **Intelligent Retry**: Regenerate content with improvements
- **Manual Override**: Paste custom HTML/JSON directly

### 4. Quiz Generation & Assessment

#### Auto-Quiz Creation
- Generate multiple-choice quizzes from topic content
- Supports 5+ question formats per topic
- Questions derived from visualization and description content

#### Quiz Features
- Interactive question selection
- Real-time answer validation
- Visual feedback (correct/wrong highlighting)
- Score calculation and progress tracking
- Persistent quiz data in topic

### 5. AI Tutor (Real-Time Chat)

#### Interactive Tutoring
- **Chat Interface**: Real-time Q&A with AI context
- **Context Preservation**: Maintains last 10 messages for coherent conversations
- **Live Call Feature**: 30-second timeout to prevent stream hanging
- **Send Context Button**: Share current topic/workspace with tutor
- **Response Filtering**: JSON responses cleaned to readable text for user

#### Tutor Capabilities
- Answer questions about current topic or workspace
- Provide hints and explanations
- Suggest follow-up questions
- Adapt to complexity level set in generation

### 6. Notes & Study Tools

#### Integrated Notepad
- **Persistent Notes**: Auto-saved per workspace
- **Rich Text Support**: Markdown-compatible
- **Sidebar Toggle**: Collapsible for more screen space
- **Mobile-Optimized**: Modal notepad for small screens
- **Context Awareness**: Notes linked to current workspace

#### Note Features
- Quick access from workspace sidebar
- Auto-save with debounce (prevents data loss)
- Export notes with workspace download

### 7. File Management & Portability

#### Downloads
- **Topic Export**: Self-contained HTML with visualization, description, and quiz
- **Workspace Export**: Dual format (JSON for backup + HTML for sharing)
- **Date Tracking**: Export includes metadata (creation date, version)
- **Offline Viewing**: Downloaded files viewable without internet

#### Uploads
- **File Types Supported**: `.json`, `.zip`, `.txt`
- **Batch Import**: Upload multiple topic files at once
- **Auto-organization**: Files sorted into units/chapters automatically

---

## User Interface & UX

### Design Philosophy
- **Glassmorphism**: Semi-transparent panels with backdrop blur
- **Dark Mode**: High-contrast dark theme for reduced eye strain
- **Mobile-First**: Responsive design from 320px to 4K screens
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation
- **Performance**: CSS containment, GPU-accelerated animations

### Color Palette
```text
Primary:      #22C55E (Emerald Green) - Actions, highlights
Primary Light: #4ADE80 (Light Green) - Hover states
Secondary:    #F97316 (Orange) - Gradients, accents
Accent:       #6d28d9 (Purple) - Special elements
Text Primary: #F5F5F5 (Off-white) - Main text
Text Secondary: #B0B0B0 (Light gray) - Muted text
Background:   #0a0a0f (Deep black) - Page background
Glass BG:     rgba(20,20,30,0.7) - Panel background
```

### Layout Architecture

#### Dashboard Screen
- **Hero Section**: Title, tagline, developer credit
- **Workspace Grid**: Responsive 3-column grid with cards
- **Card Metrics**: Topic count, completion %, last updated
- **New Workspace Button**: Quick access to creation modal

#### Workspace Screen (3-Column Layout)
```
┌─────────────────────────────────────────────────────┐
│ Mobile Header (hidden on desktop)                   │
├─────────────────────────────────────────────────────┤
│ Sidebar     │ Content Viewer           │ Notes      │
│ (280px)     │ (Flex: 1)                │ (400px)    │
│             │ ┌──────────────────────┐ │            │
│ Units       │ │ Content Tabs         │ │ Notepad    │
│ Chapters    │ │ [Viz] [Pages] [Quiz] │ │ (Collapsible)│
│ Topics      │ │                      │ │            │
│ (Collapsible)│ │ [Visualization Area] │ │            │
│             │ │                      │ │            │
└─────────────────────────────────────────────────────┘
Floating FAB: AI Tutor (Fixed bottom-right)
```

#### Content Display Tabs
1. **Visualization** - Renders HTML/3D models in isolated iframe
2. **Pages** - Description/markdown content with formatting
3. **Quiz** - Interactive multiple-choice questions

### Interactive Elements

#### Topic Sidebar
- **Hierarchical Tree**: Indent-based visual hierarchy
- **Status Indicators**: ✓ (ready) vs ✨ (pending)
- **Action Buttons**: Generate, options (rename/delete/download)
- **Filter Toggle**: Show only completed topics
- **Search-Ready**: (Filterable by generated status)

#### Modals
- **Generate Modal**: 4-step wizard with preview
  - Engine selection (Gemini/ChatGPT)
  - Template selection (6 templates)
  - Visualization type (6 types)
  - Complexity slider (4 levels)
  - Advanced options (hidden by default)
  
- **Response Modal**: AI response editor
  - Raw response text area
  - Copy/Paste buttons
  - Console output for debugging
  - Preview/Fix/Save workflow buttons

- **Preview Modal**: Full-screen visualization
  - Side-by-side content tabs
  - Real-time rendering
  - Responsive scaling

- **Utility Modals**: Rename, confirm deletion, fix requests, etc.

### Mobile Responsiveness

#### Breakpoints
- **Mobile** (<768px): Single column, collapsed sidebar, modal-based notepad
- **Tablet** (768px-1024px): Two-column with hidden sidebar toggle
- **Desktop** (>1024px): Full three-column layout

#### Mobile-Specific Features
- Hamburger sidebar toggle
- Mobile header with workspace title
- Notepad modal for small screens
- Touch-optimized buttons (44px min height)
- Swipe gestures for sidebar (planned)

### Visual Feedback

#### Animations
- **Smooth Transitions**: 0.2s-0.4s easing for UI changes
- **Hover Effects**: Scale, background color, border highlights
- **Loading States**: Spinner overlays, animated placeholders
- **Toast Notifications**: Slide-in from top-right with auto-dismiss
  - Success (green), Error (red), Warning (yellow)
  - Icon + message + auto-hide after 3s

#### Placeholders
- **Empty State**: Animated gradient background with pulsing icon
- **Loading**: "Generating..." spinner states
- **Error**: Console output display for debugging

---

## Architecture

### System Flow

```
User Input
    ↓
Modal (Generate/Create/Edit)
    ↓
Prompt Generation (prompt.js)
    ↓
API Execution (api.js) → Gemini/ChatGPT
    ↓
Response Parsing → Extract blocks
    ↓
Content Blocks: {visual, description, quiz}
    ↓
Preview/Edit/Save Workflow
    ↓
Storage (IndexedDB via main.js)
    ↓
Render (visual.js, pages.js)
    ↓
Display in UI (HTML/Iframe)
```

### Data Models

#### Workspace Structure
```javascript
{
  id: timestamp,
  title: "Biology: Cell Biology",
  isDefault: boolean,
  topics: [
    {
      name: "Unit 1: Fundamentals",
      id: "unit-xxx",
      status: "pending" | "ready",
      subtopics: [
        {
          name: "Chapter 1: Introduction",
          id: "chapter-xxx",
          status: "pending" | "ready",
          subtopics: [
            {
              name: "Topic 1.1: Cell Structure",
              id: "topic-xxx",
              status: "pending" | "ready",
              content: {
                visualHTML: "<html>...</html>",
                visualType: "html" | "json",
                description: "markdown content"
              },
              quiz: [
                {
                  question: "...",
                  options: ["A", "B", "C", "D"],
                  correct: 0
                }
              ],
              objective: "Understand cell structure",
              subtopics: []
            }
          ]
        }
      ]
    }
  ],
  notes: {}, // Workspace-level notes
  createdAt: ISO timestamp
}
```

#### Content Block Structure
```javascript
{
  visual: "<html>..." | {JSON object},
  visualType: "html" | "json" | "p5.js",
  description: "markdown text with formatting",
  quiz: [{question, options, correct}]
}
```

### Storage Strategy

#### IndexedDB (Local Persistence)
- **Database**: NPVisionDB (v1)
- **Store**: workspaces (keyPath: 'id')
- **Operations**:
  - `loadWorkspaces()` - Get all workspaces
  - `saveWorkspace(ws)` - Save single workspace
  - `saveAll()` - Batch save (debounced 1s)

#### Session State (In-Memory)
```javascript
currentWorkspace  // Active workspace object
currentTopic      // Active topic object
selectedEngine    // AI engine choice
selectedTemplate  // Content template
selectedVisType   // Visualization type
showOnlyGenerated // Filter flag
```

---

## Technology Stack

### Frontend
- **HTML5**: Semantic structure with ARIA labels
- **CSS3**: Glassmorphism, animations, CSS Grid/Flexbox
- **Vanilla JavaScript**: ES6+ with async/await
- **Bootstrap 5.3**: Modal framework, utilities
- **Bootstrap Icons**: SVG icon library

### Backend
- **Express.js**: HTTP routing, CORS handling
- **node-fetch**: API calls to Gemini/ChatGPT
- **dotenv**: Environment variable management

### External APIs
- **Google Gemini API**: Primary AI engine
- **OpenAI ChatGPT**: Secondary AI engine (manual redirect)
- **Google Fonts**: Inter typography

### Storage
- **IndexedDB**: Browser-local persistent storage (5-50MB quota)
- **LocalStorage**: Session preferences (future)

### CDN Resources
- Bootstrap 5.3.3 (CSS + JS)
- Bootstrap Icons 1.11.3
- Google Fonts Inter
- JSZip 3.10.1 (for ZIP uploads)

---

## File Structure

```
project/
├── api/
│   └── server.js              # Express backend (local API proxy)
├── public/
│   ├── index.html             # Main entry point
│   ├── styles/
│   │   └── style.css          # Complete UI stylesheet (glassmorphism)
│   └── scripts/
│       ├── main.js            # Core app logic, workspace management (2000+ lines)
│       ├── api.js             # API calls, prompt execution
│       ├── prompt.js          # Prompt generation templates
│       ├── tools.js           # Chat, tutor, notifications, utilities
│       ├── visual.js          # Visualization rendering (iframe isolation)
│       └── pages.js           # Page/description rendering (markdown)
├── package.json               # Dependencies
└── README.md                  # Project readme
```

### File Sizes & Responsibilities

| File | Size | Purpose |
|------|------|---------|
| main.js | ~2000 LOC | App initialization, workspace/topic CRUD, rendering orchestration, dashboard |
| api.js | ~400 LOC | API calls to Gemini/ChatGPT, response handling, error management |
| prompt.js | ~800 LOC | Prompt templates for generation, quiz, fixes (modular prompt builder) |
| tools.js | ~1200 LOC | Chat tutor, AI context, notifications, utility functions |
| visual.js | ~600 LOC | Iframe sandboxing, HTML/JSON rendering, p5.js support |
| pages.js | ~400 LOC | Markdown parsing, description rendering, formatting |
| style.css | ~1500 LOC | Complete design system, responsive layout, animations |

---

## Core Modules

### 1. main.js - Application Core

**Responsibilities:**
- Database initialization and CRUD operations
- Workspace and topic management
- UI state management and rendering
- Content save/load workflows
- Download/upload operations

**Key Functions:**
- `initDB()` - Set up IndexedDB
- `createWorkspace()` - New workspace creation
- `renderTopic(topic)` - Display topic content
- `renderSidebar()` - Update topic tree
- `generateContent()` - Orchestrate AI generation
- `saveContent()` - Persist generated content
- `downloadWS(idx)` - Export workspace
- `downloadTopic(topicId)` - Export single topic

### 2. api.js - API Integration

**Responsibilities:**
- HTTP requests to Gemini/ChatGPT APIs
- Manual prompt redirection for ChatGPT
- Response parsing and error handling
- Timeout management

**Key Functions:**
- `executePrompt(prompt, engine, button)` - Main API call
- Automatic Gemini execution
- Manual ChatGPT window redirect

### 3. prompt.js - Prompt Engineering

**Responsibilities:**
- Structured prompt templates
- Context-aware prompt building
- Quiz/fix prompt generation
- Language and complexity customization

**Key Class:**
```javascript
class PromptGenerator {
  generateContentPrompt(...) // Main content generation
  generateQuizPrompt(...) // Quiz creation
  generateFixPrompt(...) // Iterative fixes
  generateAutoContext(...) // Smart context generation
}
```

### 4. tools.js - Utilities & Chat

**Responsibilities:**
- AI tutor chat interface
- Toast notifications
- Confirmation dialogs
- Utility helpers
- Real-time message handling

**Key Functions:**
- `sendMessage()` - Send chat message to tutor
- `showToast(msg, type)` - Display notifications
- `showConfirm(title, msg, callback)` - Confirmation modal
- `autoSaveNotes()` - Debounced note persistence

### 5. visual.js - Visualization Rendering

**Responsibilities:**
- Iframe creation for sandboxing
- HTML rendering with CSS isolation
- p5.js visualization support
- JSON visualization parsing
- Canvas/WebGL rendering

**Key Functions:**
- `renderVisual(blocks, containerId)` - Render visualization
- `createSandboxedIframe()` - Create isolated environment
- `loadP5Visualization()` - Load p5.js sketches
- Quiz rendering

### 6. pages.js - Content Rendering

**Responsibilities:**
- Markdown/HTML description parsing
- Text formatting and styling
- Image embedding
- Responsive text layout

**Key Functions:**
- `renderPages(content, containerId)` - Render description
- Markdown to HTML conversion
- Styled text wrapping

---

## Workflow & Usage

### Typical User Journey

#### 1. Dashboard (First Time)
```
User opens app
    ↓
Sees "Not Pi Vision 3.1" hero
    ↓
Sees default workspace with sample topics
    ↓
Clicks "Create New Workspace" or opens existing
```

#### 2. Content Generation Workflow
```
1. Select Topic from sidebar
   ↓
2. Click "✨ Magic" (generate button)
   ↓
3. Choose AI Engine
   - Gemini (automatic)
   - ChatGPT (manual redirect)
   ↓
4. Select Template (6 options)
   ↓
5. Choose Visualization Type (if Surprise Me!)
   ↓
6. Adjust Complexity (slider)
   ↓
7. (Optional) Add Advanced Options
   - Custom context
   - Language settings
   - Narration language
   ↓
8. Click "Generate"
   ↓
9. Wait for AI response (shows console output)
   ↓
10. Review Raw Response in Modal
    - Edit if needed
    - Copy/paste custom content
   ↓
11. Click "Preview" to see final output
   ↓
12. Click "Save" to persist
    OR "Fix" to request changes
    OR "Retry" to regenerate
```

#### 3. Quiz Generation
```
Topic must have generated content
    ↓
Click "?" (quiz button) in topic menu
    ↓
AI generates 5+ questions
    ↓
Quiz rendered in "Quiz" tab
    ↓
User selects answers
    ↓
Score calculated
```

#### 4. AI Tutor Chat
```
Click floating "💬" button
    ↓
Tutor modal opens with chat history
    ↓
Type question about current topic
    ↓
AI responds with context awareness
    ↓
Continue conversation (10-message history)
    ↓
Optional: Click "🧠" to send topic context
```

#### 5. Export & Share
```
Topic/Workspace Menu → "Download"
    ↓
Generate self-contained HTML file
    OR JSON backup file
    ↓
File ready to share or view offline
```

---

## Design System

### Typography

**Font Family:** Inter (Google Fonts)

| Element | Size | Weight | Use |
|---------|------|--------|-----|
| Hero Title | 3rem | 900 | Dashboard main heading |
| Section Heading | 1.5rem | 700 | Modal titles, page sections |
| Sub Heading | 1rem | 600 | Item titles, card headers |
| Body Text | 0.9rem | 400 | Descriptions, content |
| Caption | 0.8rem | 400 | Metadata, timestamps |
| Code | 0.85rem | 500 | Monospace for technical |

### Spacing Scale
```text
0.25rem (4px)   - Tight spacing
0.5rem (8px)    - Small gap
0.75rem (12px)  - Medium gap
1rem (16px)     - Standard gap
1.5rem (24px)   - Large gap
2rem (32px)     - Extra large gap
4rem (64px)     - Sections
```

### Border Radius
```text
4px   - Small buttons, inputs
6px   - Input fields
8px   - Buttons, cards
12px  - Modals, panels
16px  - Major containers
24px  - Hero section
50%   - Circular (FAB, avatars)
```

### Shadows
```text
Small:   0 2px 8px rgba(0,0,0,0.1)
Medium:  0 8px 20px rgba(0,0,0,0.15)
Large:   0 20px 40px rgba(0,0,0,0.2)
Glow:    0 8px 20px rgba(34,197,94,0.3)  [Primary accent]
```

### Color System

**Theme Colors:**
- Primary: #22C55E (Emerald) - Action, success
- Secondary: #F97316 (Orange) - Accent, gradients
- Error: #EF4444 (Red) - Destructive actions
- Warning: #FBBF24 (Amber) - Alerts
- Info: #0EA5E9 (Blue) - Information

**Glass Design:**
- Background: rgba(20,20,30,0.7) - Semi-transparent panels
- Border: rgba(34,197,94,0.2) - Subtle outlines
- Hover: rgba(34,197,94,0.1-0.2) - Interactive states

### Responsive Breakpoints
```text
Mobile:      320px - 767px
Tablet:      768px - 1023px
Desktop:    1024px - ∞
```

---

## Performance Optimizations

### Rendering
- CSS `contain` property on body and workspace-container
- GPU-accelerated animations (transform, opacity)
- Lazy iframe creation for visualizations
- Debounced saves (1s delay)

### Storage
- IndexedDB for persistent state (no re-fetch)
- In-memory workspace caching
- Efficient topic tree traversal

### API Calls
- Single API call per generation (no redundant requests)
- Timeout management (30s for streams)
- Response caching in variables

### Code Quality
- Modular file structure (6 independent modules)
- Reusable utility functions
- Event delegation for dynamic elements
- Error handling with user feedback

---

## Future Enhancements

1. **Real-Time Collaboration** - Multi-user editing
2. **Version Control** - Topic edit history
3. **Advanced Search** - Full-text search across topics
4. **Offline Mode** - Service workers for offline access
5. **Voice Integration** - Text-to-speech for descriptions
6. **Analytics** - Learning progress tracking
7. **Themes** - Light/Dark/Custom themes
8. **Mobile App** - React Native wrapper
9. **API Export** - Public REST API for integrations
10. **Templates Library** - Community-shared templates

---

## Support & Documentation

**Developer:** S.A.M.  
**Issues & Feedback:** Refer to console (F12) for debug info  
**API Limits:** Respects Gemini/ChatGPT rate limits  
**Storage Limit:** ~50MB per origin (IndexedDB quota)

---

**Last Updated:** 2025-11-18  
**Status:** Production Ready (v3.1)
