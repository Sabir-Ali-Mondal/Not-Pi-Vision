# Not Pi Vision App UI/UX Plan

## Technology Stack
- **HTML5** semantic structure (`<section id="vision-maker">`, `#saved-collection`, `#about-us`)
- **Bootstrap 5.3** for grid, forms, buttons, and icons via `bootstrap-icons`
- **Animate.css** for entrance animations (`animate__fadeIn`)
- **Custom CSS** for theme (calm‑bright palette, `.card-modern`, `.output-section`, `.bottom-bar`, `.viewer-modal`)
- **Vanilla JavaScript** for interactivity:
  - Section switching (`showSection`)
  - Clipboard clear/paste (`clearPaste`)
  - Placeholder generate action (`generate`)
  - Toggle enhanced features (`toggle-enhanced`)
  - Viewer modal open/close (`openViewerMode` / `closeViewerMode`)
  - Text‑to‑speech (`speakText`)

## Layout & Structure

### Main Sections
- **Vision Maker** (`#vision-maker`):  
  - Visible by default via `.section.active.animate__fadeIn`
- **Saved Visualizations** (`#saved-collection`):  
  - Hidden initially; shown when user clicks the “collection” icon
- **About Us** (`#about-us`):  
  - Hidden initially; shown when user clicks the logo

### Bottom Navigation Bar
- `<nav class="bottom-bar">` fixed to bottom  
- Contains:
  - ⚡ Generate icon → Vision Maker
  - Logo (clickable) → About Us
  - 🗂️ Collection icon → Saved Visualizations  
- Icons have `title` attributes for tooltips

### Viewer Modal
- `<div class="viewer-modal" id="viewerModal">` hidden by default  
- `.active` class toggles visibility and flex centering  
- Contains `.viewer-content` with `.viewer-visual` and `.viewer-text`  
- Close button (`×`) in top‑right  

## UI Components

### Cards
- **`.card-modern`**:  
  - White background, 1.5 rem border‑radius, subtle box‑shadow  
  - `transition: transform 0.3s ease-in-out`; lifts on hover  
- **`.saved-card`**:  
  - White background, left border highlight (`#28a745`), 1 rem radius, light shadow  

### Forms & Controls
- `.form-control`, `.form-select`, `.btn`:  
  - White background, 1 px `#ced4da` border, 1 rem radius  
- Focus states:  
  - `border-color: #80bdff`, box‑shadow highlight  

### Buttons & Icons
- Primary actions use `.btn-primary` with hover darkening  
- Outline buttons for secondary actions (`.btn-outline-secondary`, `.btn-outline-dark`)  
- Icons via `<i class="bi bi-..."></i>`  
- Text‑to‑speech: `.tts-button` styled green  

### Typography & Colors
- `body`: `background-color: #f8f9fa`, text `#343a40`, font `'Poppins', sans-serif`  
- `.output-section`: light blue background `#f0f8ff`  

## Responsiveness
- **Mobile (<768 px)**:
  - `<header>` (logo area) hidden
  - Sections stack vertically
  - Viewer modal content stacks (`display: block`)
- **Tablet/Desktop (≥768 px)**:
  - Logo visible
  - Viewer modal uses `display: flex` for side‑by‑side layout

## Interactivity & Feedback
- **Section Switching**: smooth fadeIn via Animate.css
- **Clipboard Button**: toggles clear vs. paste
- **Generate Button**: instant placeholder output
- **Enhanced Features**: slide down/up toggle
- **Modal**: fade overlay, scrollable if content overflows
- **Text‑to‑Speech**: uses Web Speech API

## Animations & Transitions
- Entrance: `.animate__fadeIn` (0.75 s)
- Card hover lift: `transform: translateY(-5px)`
- Icon hover color transitions (`0.3s ease-in-out`)

## Accessibility
- Tooltips via `title` attributes on icons
- Text‑to‑speech for content read‑aloud
- Semantic HTML (`<section>`, headings, `<button>`)
- **Suggestions**:
  - Add ARIA labels for modal dialog
  - Ensure focus trap inside modal
  - Provide visible focus outlines for keyboard users

## Performance & Polish
- Lazy‑load heavy images in preview
- Debounce slider/input events if hooked to real API
- Minify CSS/JS for production
- Use `clip-path` consistently for card cut‑corners

