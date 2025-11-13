

#TODO list





**“VisualSuite Modular Template System”**

**Goal:**
You are building a **modular web-based visualization system** called **VisualSuite**, where each interactive template (like graphs, notes, quizzes, AI tools, etc.) is designed as an **independent, reusable visual component**.
These components can be dynamically loaded into your main website’s **“visualizing area”** using JavaScript (e.g., via `innerHTML` or similar methods).

---

### 🧠 **Core Structure & Logic**

Each template (e.g., `graph.html`, `quiz.html`, `pages.html`, `mindvoice.html`, `notepad.html`, etc.) is being **converted into a single self-contained `<div>` component** following a strict pattern.

**Example base structure:**

```html
<div id="VisualContainer-[type]" class="visual-template">
    ...template content (HTML, CSS, JS)...
    <script>
        let ExampleJson = { ... }; // unified JSON naming
        // other internal logic
    </script>
</div>
```

---

### ⚙️ **Conversion Rules (Standardization)**

1. **Single Div Wrapper:**

   * Each file is wrapped in a main div named:
     `<div id="VisualContainer-[type]" class="visual-template"></div>`

2. **Consistent JSON Naming:**

   * Any JSON variable (e.g., `graphData`, `quizData`, `contentJson`) is renamed to:
     `let ExampleJson = {};`
   * This allows easy automated JSON replacement from AI responses later.

3. **CSS Isolation:**

   * All classes and IDs inside a template are **prefixed with the template type** to avoid style conflicts.
     e.g. `.container` → `.graph-container`, `#title` → `#graph-title`.

4. **Script Preservation:**

   * Internal JavaScript and CSS remain **unchanged functionally** — only the naming and wrapper are standardized.

5. **Dynamic Injection Ready:**

   * Each component can run independently when injected into another webpage dynamically.

6. **TTS Integration (Universal):**

   * Every template ends with the same `EnhancedTTSManager` class, which provides **text-to-speech (TTS)** functionality with:

     * Voice selection modal
     * Speed control slider
     * Event handling for speech states

---

### 💡 **Automation Context**

* You are preparing these templates so that your main VisualSuite system can **auto-extract JSON data** (from AI outputs or files) and **replace `ExampleJson`** dynamically to visualize content.
* The system is designed to be **plug-and-play**, meaning every new visualization or AI-generated module can instantly become part of the website.

---

### 🧰 **Main Purpose**

This system allows:

* Seamless AI-to-frontend visualization.
* Reusable, isolated, dynamic modules for different data types.
* Easy TTS and UI interaction integration.
* JSON-driven rendering for dynamic data visualization.

---

### 🧩 **You are Currently Doing:**

* Creating **conversion prompts** that automatically transform HTML templates into the standardized VisualSuite format.
* Finalizing **naming conventions** (e.g., `ExampleJson`, `VisualContainer-[type]`).
* Ensuring all templates are **ready for live injection and dynamic rendering**.
* Preparing to clean up the main site structure to **insert or switch templates dynamically**.




***

# **Guide: Upgrading Not Pi Vision 3.1 to Feature Parity with 3.0**

## **Preamble for AI**

Your task is to modify the provided `Not Pi Vision 3.1` HTML file. You must follow the instructions below precisely. Do not change any existing styling, element IDs, or class names unless explicitly instructed to do so. The goal is to **add** the functionality from Version 3.0 without disrupting the existing structure of 3.1.

***

## **PART 1: HTML Body Modifications**

### **Instruction 1.1: ADD All Missing Modals**
**Location:** Immediately before the closing `</body>` tag.

**Action:** **ADD** the following 8 HTML blocks.

```html
<!-- ================================================================= -->
<!-- ========= START: MODALS TO BE ADDED (DO NOT MODIFY) ========= -->
<!-- ================================================================= -->

<!-- 1. RENAME MODAL -->
<div class="modal fade" id="renameModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="renameModalTitle">Rename Item</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <form id="renameForm">
                <div class="modal-body">
                    <label for="renameInput" class="form-label">New Name</label>
                    <input type="text" id="renameInput" class="form-control" required>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn btn-primary">Save Changes</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- 2. ADD TOPIC MODAL -->
<div class="modal fade" id="addTopicModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Add New Topic</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <form id="addTopicForm">
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="newTopicTitle" class="form-label">Topic Title</label>
                        <input type="text" id="newTopicTitle" class="form-control" required>
                    </div>
                    <div class="mb-2">
                        <label for="topicUnitSelect" class="form-label">Unit</label>
                        <select id="topicUnitSelect" class="form-select">
                            <option value="new">+ Create New Unit</option>
                        </select>
                    </div>
                    <div id="topicNewUnitGroup" class="mb-3 d-none">
                        <input type="text" id="newUnitName" class="form-control" placeholder="New Unit Name">
                    </div>
                    <div class="mb-2">
                        <label for="topicChapterSelect" class="form-label">Chapter</label>
                        <select id="topicChapterSelect" class="form-select">
                            <option value="new">+ Create New Chapter</option>
                        </select>
                    </div>
                    <div id="topicNewChapterGroup" class="d-none">
                        <input type="text" id="newChapterName" class="form-control" placeholder="New Chapter Name">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn btn-primary">Add Topic</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- 3. IMPORT MODULES MODAL -->
<div class="modal fade" id="importModulesModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Import Modules</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <form id="importModulesForm">
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="moduleFileUpload" class="form-label">Module Files (.txt)</label>
                        <input type="file" id="moduleFileUpload" class="form-control" accept=".txt" required multiple>
                        <div class="form-text">Select one or more .txt files to import.</div>
                    </div>
                    <div class="mb-2">
                        <label for="importUnitSelect" class="form-label">Target Unit</label>
                        <select id="importUnitSelect" class="form-select"></select>
                    </div>
                    <div class="mb-2">
                        <label for="importChapterSelect" class="form-label">Target Chapter</label>
                        <select id="importChapterSelect" class="form-select"></select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn btn-primary">Import</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- 4. GENERATION RESULT MODAL -->
<div class="modal fade" id="generationResultModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">AI Response</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <p class="text-muted small mb-0">Review, edit, or paste content before saving.</p>
                    <div class="btn-group">
                        <button type="button" id="pasteResponseBtn" class="btn btn-sm btn-outline-secondary">
                            <i class="bi bi-clipboard"></i> Paste
                        </button>
                        <button type="button" id="copyResponseBtn" class="btn btn-sm btn-outline-secondary">
                            <i class="bi bi-files"></i> Copy
                        </button>
                    </div>
                </div>
                <textarea id="generationResultTextarea" class="form-control" rows="15"></textarea>
            </div>
            <div class="modal-footer">
                <button type="button" id="retryGenerationBtn" class="btn btn-secondary">
                    <i class="bi bi-arrow-clockwise"></i> Retry
                </button>
                <button type="button" id="fixResponseBtn" class="btn btn-warning">
                    <i class="bi bi-wrench"></i> Fix
                </button>
                <button type="button" id="saveModuleBtn" class="btn btn-success">
                    <i class="bi bi-check-circle"></i> Save
                </button>
                <button type="button" id="visualizePreviewBtn" class="btn btn-primary">
                    <i class="bi bi-eye"></i> Visualize
                </button>
            </div>
        </div>
    </div>
</div>


<!-- 5. SETTINGS MODAL -->
<div class="modal fade" id="settingsModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Settings</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <h6 class="mb-3">Data Management</h6>
                <button id="resetAllDataBtn" class="btn btn-danger w-100">
                    <i class="bi bi-trash3"></i> Reset All Data
                </button>
                <p class="text-muted small mt-2">This will delete all workspaces and settings. This action cannot be undone.</p>
                <hr class="my-4">
                <h6 class="mb-3">Export/Import</h6>
                <button id="exportAllBtn" class="btn btn-outline-primary w-100 mb-2" onclick="downloadAllWorkspaces()">
                    <i class="bi bi-download"></i> Export All Workspaces
                </button>
                <button id="importAllBtn" class="btn btn-outline-primary w-100" onclick="document.getElementById('importAllInput').click()">
                    <i class="bi bi-upload"></i> Import Workspaces
                </button>
                <input type="file" id="importAllInput" accept=".zip" class="d-none">
            </div>
        </div>
    </div>
</div>

<!-- 6. VISUALIZE PREVIEW MODAL -->
<div class="modal" id="visualizePreviewModal">
    <div class="modal-header">
        <div class="modal-title-wrapper">
            <div class="modal-title" id="visualModalTitle">Live Preview</div>
            <div id="visualModalTabs" class="modal-tabs"></div>
        </div>
        <div class="modal-actions">
            <button id="visualCopyLinkBtn" class="modal-btn">
                <i class="bi bi-clipboard"></i> Copy Link
            </button>
            <button id="visualOpenTabBtn" class="modal-btn">
                <i class="bi bi-box-arrow-up-right"></i> Open in Tab
            </button>
            <button id="visualCloseBtn" class="modal-btn">
                <i class="bi bi-x-lg"></i> Close
            </button>
        </div>
    </div>
    <div class="modal-content" id="visualContentContainer"></div>
</div>

<!-- =============================================================== -->
<!-- ========= END: MODALS TO BE ADDED (DO NOT MODIFY) ========= -->
<!-- =============================================================== -->
```

### **Instruction 1.2: UPDATE the Dashboard Header**
**Location:** Inside the `<div id="dashboardScreen">` element.

**Action:** Find the `<h2>` containing "Your Workspaces" and **ADD** the following button group immediately after it.

```html
<!-- =================================================================== -->
<!-- ========= START: BUTTON GROUP TO BE ADDED (DO NOT MODIFY) ========= -->
<!-- =================================================================== -->

<div class="d-flex justify-content-center gap-2 mb-4">
    <button class="btn btn-outline-primary" onclick="document.getElementById('importAllInput').click()">
        <i class="bi bi-upload"></i> Import Workspace(s)
    </button>
    <button class="btn btn-outline-secondary" onclick="showSettingsModal()">
        <i class="bi bi-gear"></i> Settings
    </button>
</div>

<!-- ================================================================= -->
<!-- ========= END: BUTTON GROUP TO BE ADDED (DO NOT MODIFY) ========= -->
<!-- ================================================================= -->
```

### **Instruction 1.3: REMOVE and REPLACE the Content Viewer**
**Location:** Inside the `<div id="workspaceScreen">`.

**Action:** Find and **DELETE** the entire `<div class="content-viewer-panel">` and its contents. **REPLACE** it with the following code.

```html
<!-- ============================================================================== -->
<!-- ========= START: CONTENT VIEWER TO BE REPLACED WITH (DO NOT MODIFY) ========= -->
<!-- ============================================================================== -->

<div class="content-viewer-panel">
    <div class="viewer-header">
        <h4 id="currentTopicTitle" class="topic-title">Select a Topic</h4>
        <button id="openVisualizationBtn" class="btn btn-primary" disabled>
            <i class="bi bi-diagram-3"></i> Open Visualization
        </button>
    </div>
    <div class="topic-preview-area" id="topicPreviewArea">
        <div class="placeholder-wrapper">
            <div class="pulse-icon">
                <i class="bi bi-book"></i>
            </div>
            <h5 class="placeholder-title">Select a topic to begin</h5>
            <p class="placeholder-hint">Click a topic from the sidebar or use the <i class="bi bi-magic"></i> icon to generate content.</p>
        </div>
    </div>
</div>

<!-- ============================================================================ -->
<!-- ========= END: CONTENT VIEWER TO BE REPLACED WITH (DO NOT MODIFY) ========= -->
<!-- ============================================================================ -->
```

***

## **PART 2: CSS Style Modifications**

### **Instruction 2.1: ADD New CSS Styles**
**Location:** Inside the main `<style>` tag in the `<head>`.

**Action:** **ADD** the following CSS rules.

```css
/* ================================================================= */
/* ========= START: CSS STYLES TO BE ADDED (DO NOT MODIFY) ========= */
/* ================================================================= */

/* Modal Styles */
.modal { display: none; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0, 0, 0, 0.9); z-index: 10000; animation: fadeIn 0.3s ease; }
.modal.show { display: flex; flex-direction: column; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
.modal-header { background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; }
.modal-title-wrapper { display: flex; align-items: center; gap: 1.5rem; }
.modal-title { font-size: 1.2rem; font-weight: 600; }
.modal-tabs { display: flex; gap: 0.25rem; }
.modal-tab { background: rgba(255, 255, 255, 0.15); border: 1px solid rgba(255, 255, 255, 0.3); color: white; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; transition: all 0.2s; }
.modal-tab:hover { background: rgba(255, 255, 255, 0.25); }
.modal-tab.active { background: white; color: #667eea; font-weight: 600; }
.modal-actions { display: flex; gap: 0.75rem; }
.modal-btn { background: rgba(255, 255, 255, 0.2); border: none; color: white; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 0.5rem; }
.modal-btn:hover { background: rgba(255, 255, 255, 0.3); }
.modal-content { flex: 1; width: 100%; height: 100%; overflow: auto; background: #fff; }
.modal-iframe { width: 100%; height: 100%; border: none; }

/* Pages Viewer Styles */
.pages-viewer-container { --primary-color: #3b82f6; --secondary-color: #10b981; --bg-main: #fef3e2; --card-bg: #ffffff; --text-primary: #1f2937; --border-light: #fde68a; --shadow-medium: 0 4px 16px rgba(251, 191, 36, 0.2); --highlight-bg: #fef3c7; background: linear-gradient(135deg, #fef3e2 0%, #fde68a 100%); color: var(--text-primary); font-family: 'Segoe UI', sans-serif; line-height: 1.8; padding: 2rem 1rem; }
.pages-viewer-container .viewer-wrapper { max-width: 900px; margin: 0 auto; }
.pages-viewer-container .content-area { background: var(--card-bg); border-radius: 16px; padding: 3rem 2.5rem; box-shadow: var(--shadow-medium); min-height: 500px; border: 2px solid var(--border-light); }
.pages-viewer-container .page-card { display: none; animation: slideIn 0.4s ease; }
.pages-viewer-container .page-card.active { display: block; }
@keyframes slideIn { from { opacity: 0; transform: translateX(-15px); } to { opacity: 1; transform: translateX(0); } }
.pages-viewer-container p { margin: 1.3rem 0; font-size: 1.1rem; }
.pages-viewer-container strong { font-weight: 700; font-size: 1.5rem; display: block; margin: 2rem 0 1.2rem 0; padding-bottom: 0.6rem; border-bottom: 3px solid; border-image: linear-gradient(90deg, currentColor, transparent) 1; }
.pages-viewer-container table { width: 100%; border-collapse: separate; border-spacing: 0; margin: 2rem 0; border-radius: 12px; overflow: hidden; border: 2px solid var(--border-light); }
.pages-viewer-container th { color: red; padding: 1.1rem; text-align: left; }
.pages-viewer-container td { padding: 1.1rem; border-bottom: 1px solid var(--border-light); }
.pages-viewer-container tr:hover td { background: var(--highlight-bg); }
.pages-viewer-container .pagination { display: flex; justify-content: space-between; align-items: center; margin-top: 3rem; padding-top: 2rem; border-top: 2px solid var(--border-light); }
.pages-viewer-container .pagination button { padding: 0.7rem 1.5rem; background: linear-gradient(135deg, var(--primary-color), #2563eb); color: white; border: none; border-radius: 10px; cursor: pointer; transition: all 0.2s; }
.pages-viewer-container .pagination button:hover:not(:disabled) { transform: translateY(-2px); }
.pages-viewer-container .pagination button:disabled { opacity: 0.4; cursor: not-allowed; }
.pages-viewer-container .progress-dots { display: flex; justify-content: center; gap: 0.5rem; margin-top: 2rem; }
.pages-viewer-container .progress-dot { width: 12px; height: 12px; border-radius: 50%; background: var(--border-light); cursor: pointer; transition: all 0.3s; }
.pages-viewer-container .progress-dot:hover { background: #fbbf24; }
.pages-viewer-container .progress-dot.active { background: var(--primary-color); width: 30px; border-radius: 6px; }

/* Read Aloud Styles */
.read-highlight { background-color: #FFDAB9; padding: 2px 4px; border-radius: 3px; transition: background-color 0.2s; }
.btn-gradient-orange { background: linear-gradient(90deg, #ff6b35, #f7931e); color: white; border: none; }

/* New Content Viewer Styles */
.content-viewer-panel { display: flex; flex-direction: column; height: 100%; }
.viewer-header { display: flex; justify-content: space-between; align-items: center; padding: 1rem; border-bottom: 2px solid var(--border-light); background: linear-gradient(135deg, #fef3e2 0%, #fde68a 100%); }
.topic-title { margin: 0; font-size: 1.25rem; font-weight: 600; color: var(--text-primary); }
.topic-preview-area { flex: 1; padding: 2rem; overflow-y: auto; }
.topic-info-card { background: white; border-radius: 12px; padding: 2rem; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1); }
.status-badge { display: inline-block; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 600; text-transform: uppercase; }
.status-ready { background: #d1fae5; color: #065f46; }
.status-pending { background: #fef3c7; color: #92400e; }
.status-loading { background: #dbeafe; color: #1e40af; }

/* Topic Actions */
.topic-item { position: relative; }
.topic-actions { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); display: none; gap: 5px; background: rgba(255,255,255,0.8); backdrop-filter: blur(5px); padding: 5px; border-radius: 8px; }
.topic-item:hover .topic-actions { display: flex; }
.topic-actions button { background: none; border: none; cursor: pointer; color: #333; padding: 5px; }
.topic-actions button:hover { color: var(--primary-color); }

/* =============================================================== */
/* ========= END: CSS STYLES TO BE ADDED (DO NOT MODIFY) ========= */
/* =============================================================== */
```

### **Instruction 2.2: REMOVE Old Content Viewer CSS**
**Location:** Inside the main `<style>` tag in the `<head>`.

**Action:** Find and **DELETE** the following CSS rules.

```css
/* ========================================================================= */
/* ========= START: CSS STYLES TO BE DELETED (FIND AND REMOVE) ========= */
/* ========================================================================= */

.content-tabs { ... }
.content-tab { ... }
.content-tab.active { ... }
.content-tab i { ... }
.content-display { ... }
.content-display.active { ... }
.visualization-container { ... }
.pages-content-wrapper { ... }

/* ======================================================================= */
/* ========= END: CSS STYLES TO BE DELETED (FIND AND REMOVE) ========= */
/* ======================================================================= */
```

***

## **PART 3: HEAD Modifications**

### **Instruction 3.1: UPDATE the Dependencies**
**Location:** Inside the `<head>` section.

**Action:** Find the `script` tag with `type="importmap"`. **UPDATE** it to include JSZip.

```html
<!-- Find this: -->
<script type="importmap">
    { "imports": {} }
</script>

<!-- And replace it with this: -->
<script type="importmap">
    { "imports": { "jszip": "https://esm.sh/jszip@3.10.1" } }
</script>
```

***

## **PART 4: JAVASCRIPT Modifications**

### **Instruction 4.1: REMOVE the Old Tab Switching Function**
**Location:** Inside the main `<script>` tag.

**Action:** Find and **DELETE** the entire `switchContentTab` function.

```javascript
// ========================================================================
// ========= START: FUNCTION TO BE DELETED (FIND AND REMOVE) =========
// ========================================================================

function switchContentTab(event, tabName) {
    // ... function content
}

// ======================================================================
// ========= END: FUNCTION TO BE DELETED (FIND AND REMOVE) =========
// ======================================================================
```

### **Instruction 4.2: UPDATE the `renderDashboard` Function**
**Location:** Inside the `renderDashboard` function.

**Action:** Find the `html` string for workspace cards. **REPLACE** the `.workspace-actions` div.

```javascript
// Find this line:
<div class="workspace-actions"><button ...>Open</button><button ...>Delete</button></div>

// Replace it with this line:
<div class="workspace-actions"><button onclick="openWorkspace(${index})"><i class="bi bi-box-arrow-in-right"></i> Open</button><button onclick="renameWorkspace(${index})"><i class="bi bi-pencil"></i> Rename</button><button onclick="downloadWorkspace(${index})"><i class="bi bi-download"></i> Export</button><button onclick="deleteWorkspace(${index})"><i class="bi bi-trash3"></i> Delete</button></div>
```

### **Instruction 4.3: UPDATE the `renderWorkspaceSidebar` Function**
**Location:** Inside the `renderWorkspaceSidebar` function.

**Action 1:** **REPLACE** the `.sidebar-header` div.

```javascript
// Find this line:
<div class="sidebar-header"><h3>${currentWorkspace.title}</h3></div>

// Replace it with this line:
<div class="sidebar-header"><h3>${currentWorkspace.title}</h3><div class="d-flex gap-2"><button class="btn btn-sm btn-primary" onclick="showAddTopicModal()"><i class="bi bi-plus"></i> Add Topic</button><button class="btn btn-sm btn-outline-primary" onclick="showImportModulesModal()"><i class="bi bi-file-arrow-up"></i> Import</button></div></div>
```

**Action 2:** **REPLACE** the topic item rendering logic.

```javascript
// Find this line:
topicHtml += `<div class="topic-item ${isActive}" onclick="selectTopic(topic)">...</div>`;

// Replace it with this block:
topicHtml += `
    <div class="topic-item ${isActive}">
        <span onclick="selectTopic(topic)">${topic.name}</span>
        <div class="topic-actions">
            <button onclick="showGenerateModal(topic)" title="Generate"><i class="bi bi-magic"></i></button>
            <button onclick="exportTopicModule(topic)" title="Export"><i class="bi bi-download"></i></button>
            <button onclick="renameTopic(topic)" title="Rename"><i class="bi bi-pencil"></i></button>
            <button onclick="deleteTopic(topic)" title="Delete"><i class="bi bi-trash3"></i></button>
        </div>
    </div>`;
```

### **Instruction 4.4: UPDATE the `selectTopic` Function**
**Location:** Inside the `<script>` tag.

**Action:** Find the existing `selectTopic` function and **REPLACE** its entire body with the following code.

```javascript
// ========================================================================
// ========= START: FUNCTION TO BE REPLACED (FIND AND REPLACE) =========
// ========================================================================

function selectTopic(topic) {
    currentTopic = topic;
    renderWorkspaceSidebar();
    
    // Update header
    document.getElementById('currentTopicTitle').textContent = topic.name;
    
    // Enable/disable visualization button
    const openBtn = document.getElementById('openVisualizationBtn');
    const hasContent = topic.content?.html || topic.content?.description || (topic.content?.slides && topic.content.slides.length > 0);
    
    openBtn.disabled = !hasContent;
    if (hasContent) {
        openBtn.onclick = () => {
            const contentString = buildContentString(topic.content);
            visualizationPreviewer.visualizeContent(contentString);
        };
    } else {
        openBtn.onclick = null;
    }
    
    // Update preview area with topic info
    const previewArea = document.getElementById('topicPreviewArea');
    previewArea.innerHTML = `
        <div class="topic-info-card">
            <h3>${topic.name}</h3>
            <p class="text-muted">${topic.learningObjective || 'No description available.'}</p>
            <div class="status-badge status-${topic.status}">${topic.status.toUpperCase()}</div>
            ${hasContent ? 
                `<button class="btn btn-primary mt-3" onclick="document.getElementById('openVisualizationBtn').click()">View Visualization</button>` : 
                `<button class="btn btn-warning mt-3" onclick="showGenerateModal()">Generate Content</button>`}
        </div>`;
}

// ======================================================================
// ========= END: FUNCTION TO BE REPLACED (FIND AND REPLACE) =========
// ======================================================================
```

### **Instruction 4.5: UPDATE the `showConfirmModal` function**
**Location:** Inside the `<script>` tag.

**Action:** Find the existing `showConfirmModal` function and ensure it correctly handles the `onConfirm` callback. If it's just a placeholder, **REPLACE** it with this.

```javascript
// ========================================================================
// ========= START: FUNCTION TO BE UPDATED (FIND AND REPLACE) =========
// ========================================================================

function showConfirmModal(title, message, onConfirm) {
    const modalEl = document.getElementById('confirmModal');
    modalEl.querySelector('.modal-title').textContent = title;
    modalEl.querySelector('.modal-body').innerHTML = message;
    
    const confirmBtn = modalEl.querySelector('.btn-danger');
    // Clone and replace to remove old event listeners
    const newConfirmBtn = confirmBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);

    newConfirmBtn.onclick = () => {
        onConfirm();
        bootstrap.Modal.getInstance(modalEl).hide();
    };

    new bootstrap.Modal(modalEl).show();
}

// ======================================================================
// ========= END: FUNCTION TO BE UPDATED (FIND AND REPLACE) =========
// ======================================================================
```

### **Instruction 4.6: UPDATE the `generateContent` function**
**Location:** Inside the `generateContent` success handler (`.then(data => ...)`).

**Action:** **ADD** the following two lines after `selectTopic(currentTopic);`.

```javascript
// After successfully generating content...
selectTopic(currentTopic);

// Add these two lines:
setTimeout(() => {
    document.getElementById('openVisualizationBtn').click();
}, 500);
```

### **Instruction 4.7: ADD New Classes and Functions**
**Location:** At the end of the main `<script>` tag, just before the closing `</script>`.

**Action:** **ADD** all the following JavaScript code.

```javascript
// =============================================================================
// ========= START: JAVASCRIPT TO BE ADDED (DO NOT MODIFY) ===================
// =============================================================================

// ----------------------------------------
// --- VisualizationPreviewer Class -------
// ----------------------------------------
class VisualizationPreviewer {
    TEMPLATE_CONFIG = {
        graph: { url: 'https://graph4npv.ccbp.tech/', name: 'Graph' },
        presentation: { url: 'https://presentationnpv.ccbp.tech/', name: 'Presentation' },
        mindvoice: { url: 'https://mindvoice.ccbp.tech/', name: 'Mindvoice' },
        chemistry: { url: 'https://chem.ccbp.tech/', name: 'Chemistry' },
        creative: { url: 'https://creative.ccbp.tech/', name: 'Creative' },
        quiz: { url: 'https://quiz4npv.ccbp.tech/', name: 'Quiz' },
        pages: { url: null, name: 'Pages' },
        html: { url: null, name: 'HTML' }
    };
    constructor() {
        this.modal = document.getElementById('visualizePreviewModal');
        this.contentContainer = document.getElementById('visualContentContainer');
        this.modalTitle = document.getElementById('visualModalTitle');
        this.modalTabs = document.getElementById('visualModalTabs');
        this.currentURL = '';
        this.activeContent = null;
        this.pagesData = [];
        this.pagesCurrentPage = 0;
        this.initEventListeners();
    }
    initEventListeners() {
        document.getElementById('visualCloseBtn').addEventListener('click', () => this.closeModal());
        document.getElementById('visualCopyLinkBtn').addEventListener('click', () => this.copyCurrentLink());
        document.getElementById('visualOpenTabBtn').addEventListener('click', () => this.openInNewTab());
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('show')) this.closeModal();
            if (this.modal.classList.contains('show') && this.activeContent?.type === 'pages') {
                if (e.key === 'ArrowLeft') this.prevPage();
                if (e.key === 'ArrowRight') this.nextPage();
            }
        });
    }
    visualizeContent(contentString) {
        const contentToPreview = this.parseInput(contentString);
        if (contentToPreview.length === 0) {
            showToast('No valid visualization data found.', 'error');
            return;
        }
        this.renderPreview(contentToPreview);
    }
    parseInput(text) {
        const foundContent = [];
        const visualJsonRegex = /<visualjson\s+type="([^"]+)"\s*>([\s\S]*?)<\/visualjson>/gi;
        const descriptionRegex = /(<description>[\s\S]*?<\/description>)/i;
        const htmlRegex = /(<!DOCTYPE html[\s\S]*?<\/html>)/i;
        const quizRegex = /<quiz>([\s\S]*?)<\/quiz>/i;
        const htmlMatch = text.match(htmlRegex);
        if (htmlMatch) {
            foundContent.push({ type: 'html', data: htmlMatch[0] });
            return foundContent;
        }
        let match;
        while ((match = visualJsonRegex.exec(text)) !== null) {
            const type = match[1].toLowerCase();
            if (this.TEMPLATE_CONFIG[type]) {
                try {
                    const jsonData = JSON.parse(match[2].trim());
                    foundContent.push({ type, data: JSON.stringify(jsonData) });
                } catch (e) {
                    showToast(`Invalid JSON in <visualjson type="${type}">`, 'error');
                    return [];
                }
            }
        }
        const descriptionMatch = text.match(descriptionRegex);
        if (descriptionMatch) {
            foundContent.push({ type: 'pages', data: descriptionMatch[0] });
        }
        const quizMatch = text.match(quizRegex);
        if (quizMatch) {
            try {
                const jsonData = JSON.parse(quizMatch[1].trim());
                foundContent.push({ type: 'quiz', data: JSON.stringify(jsonData) });
            } catch (e) {
                showToast('Invalid JSON in <quiz> block.', 'error');
                return [];
            }
        }
        return foundContent;
    }
    renderPreview(contents) {
        this.modalTabs.innerHTML = '';
        if (contents.length > 1) {
            contents.forEach((content, index) => {
                const tab = document.createElement('button');
                tab.className = 'modal-tab';
                if (index === 0) tab.classList.add('active');
                tab.textContent = this.TEMPLATE_CONFIG[content.type].name;
                tab.onclick = () => this.activateContent(content, tab);
                this.modalTabs.appendChild(tab);
            });
        }
        this.activateContent(contents[0], this.modalTabs.firstChild);
        this.modal.classList.add('show');
    }
    activateContent(content, tabElement = null) {
        this.modalTabs.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
        if (tabElement) tabElement.classList.add('active');
        this.activeContent = content;
        this.modalTitle.textContent = `${this.TEMPLATE_CONFIG[content.type].name} Preview`;
        this.contentContainer.innerHTML = '';
        this.contentContainer.className = 'modal-content';
        if (content.type === 'pages') {
            this.renderNativePagesViewer(content.data);
        } else {
            this.renderIframeViewer(content);
        }
    }
    renderIframeViewer(content) {
        const iframe = document.createElement('iframe');
        iframe.className = 'modal-iframe';
        if (content.type === 'html') {
            this.currentURL = null;
            iframe.srcdoc = content.data;
            document.getElementById('visualCopyLinkBtn').style.display = 'none';
            document.getElementById('visualOpenTabBtn').style.display = 'none';
        } else {
            const baseUrl = this.TEMPLATE_CONFIG[content.type].url;
            this.currentURL = `${baseUrl}#data=${encodeURIComponent(content.data)}`;
            iframe.src = this.currentURL;
            document.getElementById('visualCopyLinkBtn').style.display = 'flex';
            document.getElementById('visualOpenTabBtn').style.display = 'flex';
        }
        this.contentContainer.appendChild(iframe);
    }
    renderNativePagesViewer(xmlString) {
        this.currentURL = null;
        document.getElementById('visualCopyLinkBtn').style.display = 'none';
        document.getElementById('visualOpenTabBtn').style.display = 'none';
        this.contentContainer.className = 'modal-content pages-viewer-container';
        this.contentContainer.innerHTML = `<div class="viewer-wrapper"><div id="nativeContentArea" class="content-area"></div><div id="nativeProgressDots" class="progress-dots"></div><div id="nativePagination" class="pagination" style="display: none;"><button id="nativePrevBtn">◀ Prev</button><span>Page <span id="nativeCurrentPage">0</span> of <span id="nativeTotalPages">0</span></span><button id="nativeNextBtn">Next ▶</button></div></div>`;
        try {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, "text/xml");
            const pages = xmlDoc.querySelectorAll('page');
            this.pagesData = Array.from(pages).map(page => page.innerHTML);
            this.pagesCurrentPage = 0;
            if (this.pagesData.length > 0) {
                document.getElementById('nativePagination').style.display = 'flex';
                this.renderSinglePage(0);
                this.renderProgressDots();
                document.getElementById('nativePrevBtn').addEventListener('click', () => this.prevPage());
                document.getElementById('nativeNextBtn').addEventListener('click', () => this.nextPage());
            } else {
                document.getElementById('nativeContentArea').innerHTML = `<p>No pages found.</p>`;
            }
        } catch (e) {
            document.getElementById('nativeContentArea').innerHTML = `<p style="color:red;">Error parsing Pages data: ${e.message}</p>`;
        }
    }
    renderSinglePage(pageIndex) {
        this.pagesCurrentPage = pageIndex;
        const contentArea = document.getElementById('nativeContentArea');
        contentArea.innerHTML = `<div class="page-card active">${this.pagesData[pageIndex]}</div>`;
        document.getElementById('nativeCurrentPage').textContent = this.pagesCurrentPage + 1;
        document.getElementById('nativeTotalPages').textContent = this.pagesData.length;
        this.updatePaginationButtons();
        this.updateProgressDots();
    }
    renderProgressDots() {
        const dotsContainer = document.getElementById('nativeProgressDots');
        dotsContainer.innerHTML = '';
        this.pagesData.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.className = 'progress-dot';
            dot.onclick = () => this.renderSinglePage(i);
            dotsContainer.appendChild(dot);
        });
        this.updateProgressDots();
    }
    updateProgressDots() {
        document.querySelectorAll('#nativeProgressDots .progress-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === this.pagesCurrentPage);
        });
    }
    updatePaginationButtons() {
        document.getElementById('nativePrevBtn').disabled = this.pagesCurrentPage === 0;
        document.getElementById('nativeNextBtn').disabled = this.pagesCurrentPage === this.pagesData.length - 1;
    }
    prevPage() { if (this.pagesCurrentPage > 0) this.renderSinglePage(this.pagesCurrentPage - 1); }
    nextPage() { if (this.pagesCurrentPage < this.pagesData.length - 1) this.renderSinglePage(this.pagesCurrentPage + 1); }
    closeModal() { this.modal.classList.remove('show'); this.contentContainer.innerHTML = ''; }
    copyCurrentLink() {
        if (!this.currentURL) { showToast('No external link available.', 'warning'); return; }
        navigator.clipboard.writeText(this.currentURL).then(() => showToast('Link copied to clipboard!', 'success'));
    }
    openInNewTab() {
        if (!this.currentURL) { showToast('No external link available.', 'warning'); return; }
        window.open(this.currentURL, '_blank');
    }
}
let visualizationPreviewer;

// ----------------------------------------
// --- Helper & Integration Functions -----
// ----------------------------------------
function buildContentString(content) {
    let output = '';
    if (content.description) output += `<description>\n${content.description}\n</description>\n\n`;
    if (content.html) output += content.html + '\n\n';
    if (content.slides && content.slides.length > 0) {
        const slideData = { title: currentTopic.name, slides: content.slides };
        output += `<visualjson type="presentation">\n${JSON.stringify(slideData, null, 2)}\n</visualjson>\n`;
    }
    return output;
}

// ----------------------------------------
// --- Modal Handlers ---------------------
// ----------------------------------------
let renameTarget = null;
function renameWorkspace(index) {
    renameTarget = { type: 'workspace', index };
    document.getElementById('renameModalTitle').textContent = 'Rename Workspace';
    document.getElementById('renameInput').value = workspaces[index].title;
    new bootstrap.Modal(document.getElementById('renameModal')).show();
}
function renameTopic(topic) {
    renameTarget = { type: 'topic', topic };
    document.getElementById('renameModalTitle').textContent = 'Rename Topic';
    document.getElementById('renameInput').value = topic.name;
    new bootstrap.Modal(document.getElementById('renameModal')).show();
}
function showAddTopicModal() {
    populateUnitChapterSelects('topicUnitSelect', 'topicChapterSelect', 'topicNewUnitGroup', 'topicNewChapterGroup');
    new bootstrap.Modal(document.getElementById('addTopicModal')).show();
}
function showImportModulesModal() {
    populateUnitChapterSelects('importUnitSelect', 'importChapterSelect');
    new bootstrap.Modal(document.getElementById('importModulesModal')).show();
}
function showGenerationResult(content) {
    document.getElementById('generationResultTextarea').value = content;
    new bootstrap.Modal(document.getElementById('generationResultModal')).show();
}
function showSettingsModal() {
    new bootstrap.Modal(document.getElementById('settingsModal')).show();
}

function populateUnitChapterSelects(unitSelectId, chapterSelectId, newUnitGroupId, newChapterGroupId) {
    const unitSelect = document.getElementById(unitSelectId);
    const chapterSelect = document.getElementById(chapterSelectId);
    unitSelect.innerHTML = '';
    if(newUnitGroupId) unitSelect.innerHTML += '<option value="new">+ Create New Unit</option>';
    
    currentWorkspace.topics.forEach((unit, i) => {
        unitSelect.innerHTML += `<option value="${i}">${unit.name}</option>`;
    });
    
    const updateChapters = () => {
        const unit = currentWorkspace.topics[unitSelect.value];
        chapterSelect.innerHTML = '';
        if(newChapterGroupId) chapterSelect.innerHTML += '<option value="new">+ Create New Chapter</option>';
        if (unit && unit.chapters) {
            unit.chapters.forEach((ch, i) => {
                chapterSelect.innerHTML += `<option value="${i}">${ch.name}</option>`;
            });
        }
    };
    unitSelect.onchange = () => {
        if(newUnitGroupId) document.getElementById(newUnitGroupId).classList.toggle('d-none', unitSelect.value !== 'new');
        updateChapters();
    };
    if(newChapterGroupId) chapterSelect.onchange = () => {
        document.getElementById(newChapterGroupId).classList.toggle('d-none', chapterSelect.value !== 'new');
    };
    updateChapters();
}

// ----------------------------------------
// --- Event Listeners --------------------
// ----------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    visualizationPreviewer = new VisualizationPreviewer();

    document.getElementById('renameForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const newName = document.getElementById('renameInput').value.trim();
        if (renameTarget.type === 'workspace') {
            workspaces[renameTarget.index].title = newName;
        } else if (renameTarget.type === 'topic') {
            renameTarget.topic.name = newName;
        }
        saveWorkspaces();
        if (renameTarget.type === 'workspace') renderDashboard(); else renderWorkspaceSidebar();
        bootstrap.Modal.getInstance(document.getElementById('renameModal')).hide();
        showToast('Renamed successfully!', 'success');
    });

    document.getElementById('addTopicForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const topicTitle = document.getElementById('newTopicTitle').value.trim();
        const unitSelect = document.getElementById('topicUnitSelect');
        const chapterSelect = document.getElementById('topicChapterSelect');
        let unit, chapter;
        if (unitSelect.value === 'new') {
            const newUnitName = document.getElementById('newUnitName').value.trim();
            unit = { name: newUnitName, chapters: [] };
            currentWorkspace.topics.push(unit);
        } else {
            unit = currentWorkspace.topics[unitSelect.value];
        }
        if (chapterSelect.value === 'new') {
            const newChapterName = document.getElementById('newChapterName').value.trim();
            chapter = { name: newChapterName, topics: [] };
            unit.chapters.push(chapter);
        } else {
            chapter = unit.chapters[chapterSelect.value];
        }
        chapter.topics.push({ name: topicTitle, status: 'pending', content: null, learningObjective: '' });
        saveWorkspaces();
        renderWorkspaceSidebar();
        bootstrap.Modal.getInstance(document.getElementById('addTopicModal')).hide();
        showToast('Topic added successfully!', 'success');
    });

    document.getElementById('importModulesForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const files = document.getElementById('moduleFileUpload').files;
        const unitIndex = document.getElementById('importUnitSelect').value;
        const chapterIndex = document.getElementById('importChapterSelect').value;
        const chapter = currentWorkspace.topics[unitIndex].chapters[chapterIndex];
        for (const file of files) {
            const text = await file.text();
            try {
                const moduleData = JSON.parse(text);
                chapter.topics.push({ name: moduleData.name || file.name.replace('.txt', ''), status: 'ready', content: moduleData.content, learningObjective: moduleData.learningObjective || '' });
            } catch (err) { showToast(`Failed to import ${file.name}. Invalid format.`, 'error'); }
        }
        saveWorkspaces();
        renderWorkspaceSidebar();
        bootstrap.Modal.getInstance(document.getElementById('importModulesModal')).hide();
        showToast(`Imported ${files.length} modules successfully!`, 'success');
    });
    
    document.getElementById('importAllInput').addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const JSZip = await import('jszip');
        const zip = new JSZip();
        try {
            const content = await zip.loadAsync(file);
            for (const filename in content.files) {
                if (filename.endsWith('.json')) {
                    const workspaceJson = await content.file(filename).async("string");
                    const workspace = JSON.parse(workspaceJson);
                    workspaces.push(workspace);
                }
            }
            saveWorkspaces();
            renderDashboard();
            showToast('Workspace(s) imported successfully!', 'success');
        } catch (err) { showToast('Failed to import zip file. Please check format.', 'error'); }
    });

    document.getElementById('resetAllDataBtn').addEventListener('click', () => {
        showConfirmModal(
            'Confirm Reset',
            'Are you sure you want to delete all workspaces and settings? This action cannot be undone.',
            () => {
                localStorage.clear();
                workspaces = [];
                currentWorkspace = null;
                showDashboard();
                showToast('All data has been reset.', 'success');
                bootstrap.Modal.getInstance(document.getElementById('settingsModal')).hide();
            }
        );
    });

    // Generation Result Modal Buttons
    document.getElementById('copyResponseBtn').addEventListener('click', () => { navigator.clipboard.writeText(document.getElementById('generationResultTextarea').value).then(() => showToast('Copied!', 'success')); });
    document.getElementById('pasteResponseBtn').addEventListener('click', async () => { document.getElementById('generationResultTextarea').value = await navigator.clipboard.readText(); });
    document.getElementById('saveModuleBtn').addEventListener('click', () => {
        currentTopic.content = { html: document.getElementById('generationResultTextarea').value }; // Simple save as HTML
        currentTopic.status = 'ready';
        saveWorkspaces();
        renderWorkspaceSidebar();
        selectTopic(currentTopic);
        bootstrap.Modal.getInstance(document.getElementById('generationResultModal')).hide();
        showToast('Content saved.', 'success');
    });
    document.getElementById('visualizePreviewBtn').addEventListener('click', () => {
        visualizationPreviewer.visualizeContent(document.getElementById('generationResultTextarea').value);
    });
});

// ----------------------------------------
// --- Read Aloud & Highlighting ----------
// ----------------------------------------
let currentUtterance = null;
function toggleReadAloud() {
    if (window.speechSynthesis.speaking) { stopReading(); return; }
    const contentElement = document.querySelector('.page-card.active') || document.querySelector('.modal-content');
    const text = contentElement.innerText;
    currentUtterance = new SpeechSynthesisUtterance(text);
    currentUtterance.lang = 'en-IN';
    currentUtterance.rate = 0.95;
    currentUtterance.onend = () => { stopReading(); };
    window.speechSynthesis.speak(currentUtterance);
}
function stopReading() {
    window.speechSynthesis.cancel();
}

// ----------------------------------------
// --- ZIP and Module Export --------------
// ----------------------------------------
async function downloadWorkspace(workspaceId) {
    const JSZip = await import('jszip');
    const zip = new JSZip();
    const workspace = workspaces[workspaceId];
    zip.file(`${workspace.title.replace(/[^a-z0-9]/gi, '_')}.json`, JSON.stringify(workspace, null, 2));
    const blob = await zip.generateAsync({type: "blob"});
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${workspace.title.replace(/[^a-z0-9]/gi, '_')}.zip`;
    link.click();
    showToast('Workspace exported!', 'success');
}
async function downloadAllWorkspaces() {
    const JSZip = await import('jszip');
    const zip = new JSZip();
    workspaces.forEach(ws => {
        zip.file(`${ws.title.replace(/[^a-z0-9]/gi, '_')}.json`, JSON.stringify(ws, null, 2));
    });
    const blob = await zip.generateAsync({type: "blob"});
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `NotPiVision_All_Workspaces.zip`;
    link.click();
    showToast('All workspaces exported!', 'success');
}
function exportTopicModule(topic) {
    const moduleData = { name: topic.name, status: topic.status, content: topic.content, learningObjective: topic.learningObjective };
    const blob = new Blob([JSON.stringify(moduleData, null, 2)], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${topic.name.replace(/[^a-z0-9]/gi, '_')}.txt`;
    link.click();
    showToast('Topic module exported as .txt', 'success');
}

// ===========================================================================
// ========= END: JAVASCRIPT TO BE ADDED (DO NOT MODIFY) ===================
// ===========================================================================
```

***

This comprehensive guide provides all necessary code blocks and precise instructions. An AI following this guide will be able to perform the upgrade accurately and completely.











## Essential Features to Implement in Version 3.1


| Feature | Status in 3.1 | Implementation Approach |
|---------|---------------|-------------------------|
| **Workspace Upload/Import from ZIP** | ❌ Missing | Add file upload handler with JSZip library to import entire workspace bundles. Use `<input type="file" accept=".zip">` with JSZip's `.loadAsync()` method to extract and restore workspace data[2][3] |
| **Workspace Download as ZIP** | ❌ Missing | Implement `downloadWorkspace()` function using JSZip to bundle workspace + modules. Use `.generateAsync({type: "blob"})` and create download link with `URL.createObjectURL()`[2][7] |
| **Module Import from .txt files** | ❌ Missing | Add modal with file input (`accept=".txt"`) to import individual module files. Parse text content and merge into existing workspace structure using `FileReader` API[10] |
| **Module Export as .txt** | ❌ Missing | Add download button per topic to export module data as `.txt` file. Stringify module JSON and create blob download with proper filename[10] |
| **Read Aloud with TTS** | ❌ Missing | Add responsive "Read Aloud" button with gradient styling (`background: linear-gradient(90deg, orange, yellow)`) and Web Speech API integration using `SpeechSynthesisUtterance`[10] |
| **Text Highlighting During Read** | ❌ Missing | Add `.read-highlight` class with `background-color: #FFDAB9` to highlight current spoken text. Sync highlighting with TTS word boundaries using `boundary` events[10] |
| **Settings View with Reset** | ❌ Missing | Add dedicated settings screen with "Reset All Data" button. Include confirm modal before clearing localStorage/IndexedDB[10] |
| **Confirmation Modal for All Actions** | ✅ Present (Partial) | **Use existing modal** for ALL alerts, confirmations, and inputs. Replace all `alert()`, `confirm()`, and `prompt()` browser dialogs with your custom modal system[10][11] |
| **IndexedDB with Custom DB Class** | ❌ Missing | Migrate from localStorage to IndexedDB for better performance. 3.0 uses custom wrapper class - implement similar structure to handle large workspace data[10] |
| **Module Separate Storage** | ❌ Missing | Store modules separately in IndexedDB instead of embedding in workspace object. Improves load performance and allows lazy loading of content[10] |



| Modal Name              | Status in 3.0 | Status in 3.1 | Implementation Required                                              |
| ----------------------- | ------------- | ------------- | -------------------------------------------------------------------- |
| Rename Modal            | ✅ Present     | ❌ Missing     | Add#rename-modalwith form for renaming workspaces/topics             |
| Add Topic Modal         | ✅ Present     | ❌ Missing     | Add#add-topic-modalwith Unit/Chapter selection dropdowns             |
| Import Modules Modal    | ✅ Present     | ❌ Missing     | Add#import-modules-modalwith file upload for .txt files              |
| Generation Result Modal | ✅ Present     | ❌ Missing     | Add#generation-result-modalwith textarea and Copy/Paste/Save buttons |
| Visualize Preview Modal | ✅ Present     | ❌ Missing     | Add#visualize-preview-modalas fullscreen preview container           |
| Save Prompt Modal       | ✅ Present     | ❌ Missing     | Add#save-prompt-modalfor saving custom prompt templates              |
| Advice Details Modal    | ✅ Present     | ❌ Missing     | Add#adviceDetailsModalfor displaying full daily advice               |



### **Implementation Code Snippets**

#### **1. Workspace ZIP Export**
```javascript
async function downloadWorkspace(workspaceId) {
    const JSZip = (await import('https://esm.sh/jszip@3.10.1')).default;
    const zip = new JSZip();
    
    const workspace = workspaces.find(ws => ws.id === workspaceId);
    zip.file("workspace.json", JSON.stringify(workspace, null, 2));
    
    const blob = await zip.generateAsync({type: "blob"});
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${workspace.title.replace(/[^a-z0-9]/gi, '_')}.zip`;
    link.click();
}
```

#### **2. Workspace ZIP Import**
```javascript
async function uploadWorkspace(file) {
    const JSZip = (await import('https://esm.sh/jszip@3.10.1')).default;
    const zip = new JSZip();
    
    const content = await zip.loadAsync(file);
    const workspaceJson = await content.file("workspace.json").async("string");
    const workspace = JSON.parse(workspaceJson);
    
    workspaces.push(workspace);
    saveWorkspaces();
    renderDashboard();
}
```

#### **3. Read Aloud with Highlighting**
```javascript
function toggleReadAloud() {
    const slideContent = document.querySelector('.slide.active');
    
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        removeHighlights();
    } else {
        const text = slideContent.textContent;
        const utterance = new SpeechSynthesisUtterance(text);
        
        utterance.onboundary = (event) => {
            highlightWord(event.charIndex, event.charLength);
        };
        
        window.speechSynthesis.speak(utterance);
    }
}

function highlightWord(start, length) {
    const slide = document.querySelector('.slide.active');
    const text = slide.textContent;
    
    slide.innerHTML = 
        text.substring(0, start) +
        `<span class="read-highlight">${text.substring(start, start + length)}</span>` +
        text.substring(start + length);
}
```

#### **4. Custom Confirmation Modal (Replace All Alerts)**
```javascript
// Replace all alert(), confirm(), prompt() with this
function showConfirmModal(title, message, onConfirm) {
    document.getElementById('confirm-modal-title').textContent = title;
    document.getElementById('confirm-modal-body').textContent = message;
    
    const modal = new bootstrap.Modal(document.getElementById('confirm-modal'));
    const confirmBtn = document.getElementById('confirm-modal-btn');
    
    confirmBtn.onclick = () => {
        onConfirm();
        modal.hide();
    };
    
    modal.show();
}

// Usage: Replace alert() everywhere
// Before: alert("Workspace deleted!");
// After: showConfirmModal("Success", "Workspace deleted!", () => {});
```

#### **5. IndexedDB Implementation**
```javascript
class WorkspaceDB {
    constructor() {
        this.dbName = 'NotPiVision';
        this.version = 1;
    }
    
    async open() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version);
            
            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains('workspaces')) {
                    db.createObjectStore('workspaces', {keyPath: 'id'});
                }
                if (!db.objectStoreNames.contains('modules')) {
                    db.createObjectStore('modules', {keyPath: 'id'});
                }
            };
        });
    }
    
    async saveWorkspace(workspace) {
        const db = await this.open();
        const tx = db.transaction('workspaces', 'readwrite');
        const store = tx.objectStore('workspaces');
        store.put(workspace);
        return tx.complete;
    }
    
    async getAllWorkspaces() {
        const db = await this.open();
        const tx = db.transaction('workspaces', 'readonly');
        const store = tx.objectStore('workspaces');
        return store.getAll();
    }
}

```





Based on the last three chats about implementing features from Version 3.0 into Version 3.1, here's a comprehensive **Action Table**:[1][2]

## 📊 Complete Implementation Action Table

| Component | Current State in 3.1 | Action Required | What to Do | Location | Priority |
|-----------|---------------------|-----------------|------------|----------|----------|
| **MODALS** |
| Rename Modal | ❌ Missing | **ADD NEW** | Copy entire modal HTML from 3.0 | Before `</body>` | HIGH |
| Add Topic Modal | ❌ Missing | **ADD NEW** | Copy entire modal HTML with Unit/Chapter selects | Before `</body>` | HIGH |
| Import Modules Modal | ❌ Missing | **ADD NEW** | Copy modal HTML with file input (`.txt`) | Before `</body>` | HIGH |
| Generation Result Modal | ❌ Missing | **ADD NEW** | Copy modal HTML with textarea + Copy/Paste/Save buttons | Before `</body>` | HIGH |
| Visualize Preview Modal | ❌ Missing | **ADD NEW** | Add fullscreen modal + VisualizationPreviewer class | Before `</body>` + `<script>` | HIGH |
| Save Prompt Modal | ❌ Missing | **ADD NEW** | Copy modal HTML with prompt name input | Before `</body>` | MEDIUM |
| Advice Details Modal | ❌ Missing | **ADD NEW** | Copy modal HTML for daily advice display | Before `</body>` | LOW |
| Settings Modal | ❌ Missing | **ADD NEW** | Add modal with Reset/Export/Import options | Before `</body>` | MEDIUM |
| **DASHBOARD SECTION** |
| Workspace Cards | ✅ Present | **UPDATE** | Add Rename + Export buttons to action menu | Line ~150 (dashboard render) | HIGH |
| Import Workspace Button | ❌ Missing | **ADD NEW** | Add button next to "Create Workspace" | Line ~100 (dashboard header) | HIGH |
| Settings Button | ❌ Missing | **ADD NEW** | Add settings button in dashboard header | Line ~100 (dashboard header) | MEDIUM |
| **WORKSPACE SIDEBAR** |
| Topic Actions Menu | ⚠️ Partial | **UPDATE** | Add dropdown with Generate/Export/Rename/Delete | Line ~300 (topic item render) | HIGH |
| Add Topic Button | ❌ Missing | **ADD NEW** | Add "+" button in sidebar header | Sidebar header section | HIGH |
| Import Modules Button | ❌ Missing | **ADD NEW** | Add import button in sidebar header | Sidebar header section | HIGH |
| **CONTENT VIEWER** |
| Inline Tabs (Visualization/Pages) | ✅ Present | **REMOVE** | Delete tab switching HTML and CSS | Line ~200-250 | HIGH |
| Tab Switch Function | ✅ Present | **REMOVE** | Delete `switchContentTab()` function | Line ~2500 (script) | HIGH |
| Visualization Button | ❌ Missing | **ADD NEW** | Add "Open Visualization" button | Content viewer header | HIGH |
| Topic Preview Area | ⚠️ Partial | **REPLACE** | Replace tab content with topic info card | Content viewer body | HIGH |
| Read Aloud Button | ❌ Missing | **ADD NEW** | Add TTS button in modal/viewer controls | Visualization modal | MEDIUM |
| Text Highlighting | ❌ Missing | **ADD NEW** | Add `.read-highlight` class + highlighting logic | CSS + JS | MEDIUM |
| **JAVASCRIPT FUNCTIONS** |
| `renameWorkspace()` | ❌ Missing | **ADD NEW** | Function to show rename modal for workspaces | Script section | HIGH |
| `renameTopic()` | ❌ Missing | **ADD NEW** | Function to show rename modal for topics | Script section | HIGH |
| `showAddTopicModal()` | ❌ Missing | **ADD NEW** | Function to show add topic modal with Unit/Chapter logic | Script section | HIGH |
| `showImportModulesModal()` | ❌ Missing | **ADD NEW** | Function to import `.txt` module files | Script section | HIGH |
| `exportTopicModule()` | ❌ Missing | **ADD NEW** | Function to export topic as `.txt` file | Script section | HIGH |
| `downloadWorkspace()` | ❌ Missing | **ADD NEW** | Function to export workspace as `.zip` (JSZip) | Script section | HIGH |
| `uploadWorkspace()` | ❌ Missing | **ADD NEW** | Function to import workspace from `.zip` | Script section | HIGH |
| `toggleReadAloud()` | ❌ Missing | **ADD NEW** | Function for TTS with Web Speech API | Script section | MEDIUM |
| `highlightWord()` | ❌ Missing | **ADD NEW** | Function to highlight currently spoken word | Script section | MEDIUM |
| `showGenerationResult()` | ❌ Missing | **ADD NEW** | Function to display generation result modal | Script section | HIGH |
| `showSettingsModal()` | ❌ Missing | **ADD NEW** | Function to show settings modal | Script section | MEDIUM |
| `showConfirmModal()` | ⚠️ Partial | **UPDATE** | Ensure used for ALL alerts/confirms (replace `alert()`) | Throughout script | HIGH |
| `selectTopic()` | ✅ Present | **UPDATE** | Replace tab logic with button enable/disable | Line ~2800 | HIGH |
| `buildContentString()` | ❌ Missing | **ADD NEW** | Helper to build visualjson/description string | Script section | HIGH |
| **VISUALIZATION SYSTEM** |
| VisualizationPreviewer Class | ❌ Missing | **ADD NEW** | Copy entire class with template config | Script section | HIGH |
| Modal Tabs Logic | ❌ Missing | **ADD NEW** | Tab switching for multiple visualizations | Inside class | HIGH |
| Pages Viewer | ❌ Missing | **ADD NEW** | Native pages viewer with pagination | Inside class | HIGH |
| iframe Loader | ❌ Missing | **ADD NEW** | External template loaders (graph/presentation/etc) | Inside class | HIGH |
| **CSS STYLES** |
| Modal Styles | ❌ Missing | **ADD NEW** | Fullscreen modal, tabs, actions styles | `<style>` section | HIGH |
| Pages Viewer Styles | ❌ Missing | **ADD NEW** | Scoped styles for native pages viewer | `<style>` section | HIGH |
| Read Highlight Class | ❌ Missing | **ADD NEW** | `.read-highlight { background: #FFDAB9; }` | `<style>` section | MEDIUM |
| Gradient Button | ❌ Missing | **ADD NEW** | `.btn-gradient-orange` for Read Aloud button | `<style>` section | MEDIUM |
| Topic Actions Dropdown | ❌ Missing | **ADD NEW** | Styles for topic action buttons | `<style>` section | HIGH |
| Viewer Header Styles | ❌ Missing | **ADD NEW** | Styles for new content viewer layout | `<style>` section | HIGH |
| Remove Tab Styles | ✅ Present | **REMOVE** | Delete `.content-tab` and `.content-display` styles | `<style>` section | HIGH |
| **DATA MANAGEMENT (OPTIONAL)** |
| localStorage | ✅ Present | **KEEP** | Continue using localStorage for now | Throughout | LOW |
| WorkspaceDB Class | ❌ Missing | **ADD LATER** | IndexedDB wrapper class (future optimization) | Script section | LOW |
| Module Separation | ❌ Missing | **ADD LATER** | Store modules separately (future optimization) | Script section | LOW |
| **DEPENDENCIES** |
| JSZip Library | ⚠️ Partial | **UPDATE** | Ensure import via `importmap` or direct ES module | `<head>` section | HIGH |
| Bootstrap Icons | ✅ Present | **KEEP** | Already included | No change | ✅ |
| Web Speech API | ❌ Missing | **ADD NEW** | Native browser API (no import needed) | Use in JS | MEDIUM |

***

## 🎯 Quick Implementation Order

| Step | What to Do | Estimated Lines | Priority |
|------|-----------|-----------------|----------|
| **1** | Add all 7-8 modal HTML structures | ~300 lines | 🔴 HIGH |
| **2** | Add Visualize Preview Modal + VisualizationPreviewer class | ~400 lines | 🔴 HIGH |
| **3** | Remove old tab system (HTML + CSS + JS) | -50 lines | 🔴 HIGH |
| **4** | Add modal CSS styles (fullscreen, tabs, pages viewer) | ~200 lines | 🔴 HIGH |
| **5** | Add all modal handler functions (rename, add, import, export) | ~300 lines | 🔴 HIGH |
| **6** | Update dashboard workspace cards with new buttons | ~10 lines | 🔴 HIGH |
| **7** | Update sidebar topic items with action menu | ~20 lines | 🔴 HIGH |
| **8** | Update `selectTopic()` to work with modal system | ~30 lines | 🔴 HIGH |
| **9** | Add ZIP import/export functions | ~80 lines | 🔴 HIGH |
| **10** | Add Read Aloud + highlighting | ~100 lines | 🟡 MEDIUM |
| **11** | Add settings modal + reset functionality | ~50 lines | 🟡 MEDIUM |
| **12** | Replace all `alert()` with `showConfirmModal()` | ~20 replacements | 🟡 MEDIUM |
| **13** | (Optional) Migrate to IndexedDB | ~150 lines | 🟢 LOW |

***

## 📝 Summary Statistics

- **Total New Additions**: ~1,500 lines of code
- **Total Deletions**: ~50 lines (old tab system)
- **Total Updates**: ~80 lines (existing functions)
- **Net Change**: +1,450 lines
- **Estimated Time**: 3-4 hours for full implementation

This table serves as your **complete implementation roadmap** for upgrading Version 3.1 with all missing features from Version 3.0.[2][1]

[1](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/8744051/be7f71bd-a08b-416b-9467-81dd38ddfee5/paste-2.txt)
[2](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/8744051/258b130c-a388-4d6d-9a16-99f95c03fc67/paste.txt)
