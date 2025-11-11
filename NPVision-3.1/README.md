

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
