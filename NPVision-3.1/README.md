

#TODO list



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
