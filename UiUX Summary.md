
# Not Pi Vision App - UI/UX Summary

## Technology Stack
- **HTML5**: Semantic structure with clear sectioning
- **Bootstrap 5.3**: Layout, responsive grid, forms, buttons, icons
- **Animate.css**: Smooth fade-in transitions
- **Custom CSS**: Bright-calm palette, modern cards, cut-corner visuals
- **Vanilla JavaScript**:
  - Section switching (`showSection`)
  - Clipboard handling (`clearPaste`)
  - Generator trigger (`generate`)
  - Toggle extras (`toggle-enhanced`)
  - Modal view (`openViewerMode` / `closeViewerMode`)
  - Text-to-speech (`speakText`)

## 📋 Main Points

### 1. Sections
- **Vision Maker**: Default visible section
- **Saved Visualizations**: Collection viewer, toggle-based
- **About Us**: Hidden, toggled by clicking logo
- **Syllabus to List**: Toggled by clicking syllabus button

### 2. Bottom Navigation Bar
- Fixed bottom placement
- 3 icons: Generate, Logo (About), Collection
- Tooltips on hover

### 3. Viewer Modal
- Hidden fullscreen modal for viewing saved visuals
- Text + visual layout
- Responsive:
  - Stacked on mobile
  - Side-by-side on desktop
- Text-to-speech & close options

### 4. Cards & Layout
- `.card-modern`: Clean layout with soft shadows and transitions
- `.saved-card`: Highlighted border, structured for saved items

### 5. Form & Controls
- Styled with Bootstrap: `.form-control`, `.form-select`, `.btn`
- Smooth input highlights and radius-based designs

### 6. Responsiveness
- **Mobile (<768px)**: Hidden header, stacked layout
- **Desktop (≥768px)**: Side-by-side modal, visible logo

### 7. Interactions
- Animate.css for section transitions
- Enhanced features slide-toggle
- Clipboard clear/paste toggle
- Viewer modal supports text-to-speech

### 8. Accessibility
- Semantic HTML and tooltips
- Web Speech API for voice output
- Suggested: ARIA labels, modal focus trap

### 9. Performance
- Lazy-load visuals
- Debounce real API connections
- Minify JS/CSS
- Consistent visual polish using `clip-path`

---

## 🎨 UI Effects & Polish
- Loader spinner on Generate/View
- Animations using animate.css (`fadeIn`, etc.)
- `clip-path` used for creative card corners
- Clean font: **Poppins**
- Interactive hover animations
- Bootstrap Icons (e.g., `bi bi-trash3`)

---

## 📱 Not Pi Vision – App Interface

### 1. Theme & Feel
- Bright + Calm color scheme (via CSS root vars)
- Soft shadows, card style with cut-corner design
- Clean layout: Page-based, no long scrolls
- Responsive for all screens

---

### 2. Main Navigation (Bottom Bar)
- Fixed at the bottom
- 3 icons with tooltips:
  - ✨ **Logo** → Opens "About Us"
  - ⚡ **Vision Maker** → Main workspace
  - 🗂️ **Saved** → Opens saved visuals

---

### 3. Vision Maker Section
#### Basic Inputs:
- **Topic Name** (text input)
- **Visualization Style** (dropdown)
- **Complexity Level** (slider)
- **Generate Visual** button (🎞️ with tooltip)

#### Advanced Features (Toggle Unlock):
- **Custom Prompt** (textarea)
- **Choose AI Model** (dropdown)
- **Style Options**: Classic | Scientific | Techy | Imaginary
- **Main Input Area** (large textarea)

#### Action Buttons:
- 🧹 Clear
- 📋 Paste
- 🎞️ Make Visual

---

### 4. Saved Visualizations Section
- Card layout for each saved visual
- Mini preview styled like video frame
- Responsive summary text (side or below)

#### Action Buttons:
- 🗑️ Delete
- ✏️ Edit Name / Save Name
- ⬇️ Download
- 👁️ View

---

### 5. Viewer Mode
- Fullscreen modal
- **Large screen**: Visual (left), Text (right)
- **Mobile**: Visual (top), Text (bottom)
- 🔊 Text-to-Speech beside the text

---

### 6. About Us Section
- Card-style section
- Includes:
  - Team info
  - Project goal
  - Motto

---

### 7. Syllabus to List Section
- **Topic Name**: (Text input)
- **Syllabus Description**: (Text input)
- **AI Process**: (Buttons to trigger AI operations)
- **Generate List Modal**: (With mark and copy options)

