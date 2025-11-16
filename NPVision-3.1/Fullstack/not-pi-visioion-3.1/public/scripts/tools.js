// =====================================================
// NOTEPAD TEMPLATE LOADER (NEW)
// =====================================================

const NOTEPAD_TEMPLATE_PATH = "/templates-divs/tools-div/notepad.html";

async function loadNotepadTemplate() {
    try {
        const res = await fetch(NOTEPAD_TEMPLATE_PATH);
        return await res.text();
    } catch (err) {
        console.error("❌ Failed to load notepad template:", err);
        return `<p style="color:red;">Failed to load notepad tool.</p>`;
    }
}

function executeNotepadScripts(container) {
    const scripts = container.querySelectorAll("script");

    scripts.forEach(oldScript => {
        const newScript = document.createElement("script");
        for (let attr of oldScript.attributes) {
            newScript.setAttribute(attr.name, attr.value);
        }
        newScript.textContent = oldScript.textContent;
        oldScript.replaceWith(newScript);
    });
}

async function openNotepad() {
    const container = document.getElementById("toolsContent");

    const html = await loadNotepadTemplate();
    container.innerHTML = html;

    // Run embedded scripts inside notepad.html
    executeNotepadScripts(container);
}



// ===================================================================
// EXISTING CODE (unchanged below this line)
// ===================================================================


// ========== TOAST NOTIFICATIONS (Utility) ==========
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `custom-toast ${type}`;
    toast.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="bi bi-${type === 'success' ? 'check-circle' :
                type === 'error' ? 'x-circle' : 'exclamation-triangle'} me-2"></i>
            <span>${message}</span>
        </div>
    `;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// ========== UI/FORM UTILITIES ==========
function toggleAdvanced() {
    const container = document.getElementById('advancedContainer');
    const icon = document.querySelector('#advancedToggle i');
    if (container.style.maxHeight === '0px' || !container.style.maxHeight) {
        container.style.maxHeight = '500px';
        icon.classList.replace('bi-chevron-down', 'bi-chevron-up');
    } else {
        container.style.maxHeight = '0';
        icon.classList.replace('bi-chevron-up', 'bi-chevron-down');
    }
}

function showFixModal() {
    new bootstrap.Modal(document.getElementById('fixModal')).show();
}

async function pasteResponse() {
    try {
        const text = await navigator.clipboard.readText();
        document.getElementById('aiResponse').value = text;
        showToast('Content pasted successfully', 'success');
    } catch (error) {
        showToast('Failed to paste from clipboard', 'error');
    }
}

async function copyResponse() {
    try {
        const text = document.getElementById('aiResponse').value;
        await navigator.clipboard.writeText(text);
        showToast('Content copied to clipboard', 'success');
    } catch (error) {
        showToast('Failed to copy to clipboard', 'error');
    }
}

function retryContent() {
    document.getElementById('aiResponse').value = '';
    document.getElementById('console').textContent = 'Console: Cleared. Regenerate.';
    showToast('Response cleared. Click Generate again.', 'warning');
}

function switchPreviewTab(event, tabName) {
    document.querySelectorAll('#previewModal .content-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('#previewModal .content-display').forEach(d => d.classList.remove('active'));
    event.target.closest('.content-tab').classList.add('active');
    document.getElementById(tabName).classList.add('active');
}

function switchContentTab(event, tabName) {
    document.querySelectorAll('#workspaceScreen .content-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('#workspaceScreen .content-display').forEach(d => d.classList.remove('active'));
    event.target.closest('.content-tab').classList.add('active');
    document.getElementById(tabName).classList.add('active');
}

// ========== SIDEBAR & NAVIGATION UTILITIES ==========
function toggleMobileSidebar() {
    document.getElementById('sidebar-panel').classList.toggle('open');
    document.querySelector('.sidebar-overlay').classList.toggle('active');
}

// ========== NOTES (Tool) ==========

function toggleNotesSidebar() {
    const sidebar = document.getElementById('notesSidebar');
    const container = document.getElementById('notesContainer');
    const btn = document.querySelector('.notes-toggle-btn');

    sidebar.classList.toggle('collapsed');
    container.classList.toggle('collapsed');

    btn.innerHTML = sidebar.classList.contains('collapsed')
        ? '<i class="bi bi-chevron-right"></i>'
        : '<i class="bi bi-chevron-left"></i>';
}

// ========== AI TUTOR ==========
function showAITutorModal() {
    new bootstrap.Modal(document.getElementById('aiTutorModal')).show();
}

function sendMessage() {
    const input = document.getElementById('tutorInput');
    const msg = input.value.trim();
    if (!msg) return;

    const chat = document.getElementById('chatMessages');
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-message message-user';
    userMsg.innerHTML = `<div class="message-bubble">${msg}</div>`;
    chat.appendChild(userMsg);

    input.value = '';
    chat.scrollTop = chat.scrollHeight;

    setTimeout(() => {
        const tutorMsg = document.createElement('div');
        tutorMsg.className = 'chat-message message-tutor';
        tutorMsg.innerHTML = `<div class="message-bubble">About "${msg}": Let me help.</div>`;
        chat.appendChild(tutorMsg);
        chat.scrollTop = chat.scrollHeight;
    }, 1000);
}

// ========== CONFIRMATION MODAL (Utility) ==========
function showConfirm(title, message, onConfirm) {
    document.getElementById('confirmTitle').textContent = title;
    document.getElementById('confirmMessage').textContent = message;

    const confirmBtn = document.getElementById('confirmBtn');
    const newBtn = confirmBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(newBtn, confirmBtn);

    newBtn.onclick = () => {
        onConfirm();
        bootstrap.Modal.getInstance(document.getElementById('confirmModal')).hide();
    };

    new bootstrap.Modal(document.getElementById('confirmModal')).show();
}
