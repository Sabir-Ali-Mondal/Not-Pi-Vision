// ========== GLOBAL CONFIG & STATE ==========
const DB_NAME = 'NPVisionDB';
const DB_VERSION = 1;
const STORE_NAME = 'workspaces';

let db, currentWorkspace = null,
    currentTopic = null,
    workspaces = [],
    showOnlyGenerated = false;

// Configuration state
let selectedEngine = 'gemini',
    selectedTemplate = 'surprise-me',
    selectedVisType = '2d-animation';

// Prompt/Response state
let generatedPrompt = '',
    lastResponse = '';
let renameTargetTopic = null;

// Instance of PromptGenerator (Class defined in prompt.js)
const promptGen = new PromptGenerator(); 


// ========== DATABASE FUNCTIONS (Local Persistence) ==========
async function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
            db = request.result;
            resolve(db);
        };
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, {
                    keyPath: 'id'
                });
            }
        };
    });
}

async function loadWorkspaces() {
    return new Promise((resolve, reject) => {
        const tx = db.transaction([STORE_NAME], 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(request.error);
    });
}

async function saveWorkspace(ws) {
    return new Promise((resolve, reject) => {
        const tx = db.transaction([STORE_NAME], 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const request = store.put(ws);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

async function saveAll() {
    for (const ws of workspaces) {
        await saveWorkspace(ws);
    }
}


// ========== UI SELECTION & CONFIGURATION ==========
function selectAIEngine(engine) {
    selectedEngine = engine;
    document.querySelectorAll('[data-engine]').forEach(el => el.classList.remove('selected'));
    document.querySelector(`[data-engine="${engine}"]`).classList.add('selected');
}

function selectTemplate(template) {
    selectedTemplate = template;
    document.querySelectorAll('[data-template]').forEach(el => el.classList.remove('selected'));
    document.querySelector(`[data-template="${template}"]`).classList.add('selected');
    document.getElementById('visTypeSection').style.display = template === 'surprise-me' ? 'block' : 'none';
}

function selectVisType(type) {
    selectedVisType = type;
    document.querySelectorAll('[data-vistype]').forEach(el => el.classList.remove('selected'));
    document.querySelector(`[data-vistype="${type}"]`).classList.add('selected');
}

function getComplexityText() {
    const val = document.getElementById('complexitySlider').value;
    return ['Basic', 'Intermediate', 'Advanced', 'Expert'][val - 1];
}


// ========== CORE GENERATION LOGIC (ORCHESTRATION) ==========
async function autoContext() {
    if (!currentTopic) return;
    const btn = document.getElementById('autoContextBtn');
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Generating...';

    const ctxPrompt = promptGen.generateAutoContext(
        currentTopic.name,
        getParentChapter(currentTopic),
        getParentUnit(currentTopic),
        currentWorkspace.title,
        selectedTemplate,
        selectedVisType,
        getComplexityText(),
        document.getElementById('contentLang').value,
        document.getElementById('narrationLang').value,
        currentTopic.objective || 'Master concept'
    );

    if (selectedEngine === 'gemini') {
        const result = await executePrompt(ctxPrompt, selectedEngine); // executePrompt from api.js
        if (result.success && result.content) {
            document.getElementById('customContext').value = result.content;
            showToast('Context generated successfully!', 'success'); // showToast from tools.js
        } else {
            showToast('Failed to generate context', 'error'); // showToast from tools.js
        }
    } else {
        document.getElementById('customContext').value = ctxPrompt;
    }

    btn.disabled = false;
    btn.innerHTML = '<i class="bi bi-magic"></i> <span>Auto Generate 5-Line Context</span>';
}

async function generateContent() {
    if (!currentTopic) {
        showToast('No topic selected', 'error'); // showToast from tools.js
        return;
    }

    const complexity = getComplexityText();
    const contentLang = document.getElementById('contentLang').value;
    const narrationLang = document.getElementById('narrationLang').value;
    const customCtx = document.getElementById('customContext').value.trim();
    const context = customCtx || `Topic: "${currentTopic.name}"`;

    generatedPrompt = promptGen.generateContentPrompt(
        currentTopic.name,
        getParentChapter(currentTopic),
        getParentUnit(currentTopic),
        currentWorkspace.title,
        complexity,
        contentLang,
        narrationLang,
        currentTopic.objective || 'Master concept',
        context
    );

    const result = await executePrompt(generatedPrompt, selectedEngine, document.getElementById('generateBtn')); // executePrompt from api.js

    if (result.manual) {
        bootstrap.Modal.getInstance(document.getElementById('generateModal')).hide();
        new bootstrap.Modal(document.getElementById('responseModal')).show();
    } else if (result.success) {
        document.getElementById('aiResponse').value = result.content;
        bootstrap.Modal.getInstance(document.getElementById('generateModal')).hide();
        new bootstrap.Modal(document.getElementById('responseModal')).show();
    } else {
        showToast(result.error || 'Generation failed', 'error'); // showToast from tools.js
    }
}

async function submitFix() {
    const comment = document.getElementById('fixInput').value.trim();
    if (!comment) {
        showToast('Please describe the issue', 'warning'); // showToast from tools.js
        return;
    }

    bootstrap.Modal.getInstance(document.getElementById('fixModal')).hide();

    const fixPrompt = promptGen.generateFixPrompt(
        selectedTemplate,
        lastResponse,
        comment,
        '',
        currentTopic.name,
        getParentChapter(currentTopic),
        getParentUnit(currentTopic),
        currentWorkspace.title,
        getComplexityText(),
        document.getElementById('contentLang').value,
        document.getElementById('narrationLang').value,
        currentTopic.objective || 'Master concept',
        document.getElementById('customContext').value.trim()
    );

    const result = await executePrompt(fixPrompt, selectedEngine); // executePrompt from api.js

    if (result.manual) {
        showToast('Fix prompt opened in ChatGPT', 'warning'); // showToast from tools.js
    } else if (result.success) {
        document.getElementById('aiResponse').value = result.content;
        showToast('Fix applied successfully', 'success'); // showToast from tools.js
    }

    document.getElementById('fixInput').value = '';
}


// ========== CONTENT PROCESSING HANDLERS ==========
function extractBlocks(output) {
    const blocks = {
        visual: null,
        visualType: null,
        description: null
    };

    const htmlMatch = output.match(/<!DOCTYPE html>[\s\S]*<\/html>/i);
    if (htmlMatch) {
        blocks.visual = htmlMatch[0];
        blocks.visualType = 'html';
    } else {
        const vjMatch = output.match(/<visualjson\s+type="([^"]+)">([\s\S]*?)<\/visualjson>/i);
        if (vjMatch) {
            blocks.visualType = vjMatch[1].trim();
            try {
                blocks.visual = JSON.parse(vjMatch[2].trim());
            } catch (e) {
                console.error('Parse error:', e);
            }
        }
    }

    const descMatch = output.match(/<description>([\s\S]*?)<\/description>/i);
    if (descMatch && descMatch[1]) {
        blocks.description = descMatch[1].trim();
    }

    return blocks;
}

async function previewContent() {
    const output = document.getElementById('aiResponse').value.trim();
    if (!output) {
        showToast('No content to preview', 'warning'); // showToast from tools.js
        return;
    }

    try {
        lastResponse = output;
        const blocks = extractBlocks(output);
        await renderVisual(blocks, 'previewViz'); // renderVisual from visual.js
        if (blocks.description) await renderPages(blocks.description, 'previewPages'); // renderPages from pages.js
        new bootstrap.Modal(document.getElementById('previewModal')).show();
        document.getElementById('console').textContent = 'Console: Preview loaded';
    } catch (e) {
        document.getElementById('console').textContent = 'Console Error: ' + e.message;
        showToast('Preview failed: ' + e.message, 'error'); // showToast from tools.js
    }
}

async function saveContent() {
    const output = document.getElementById('aiResponse').value.trim();
    if (!output || !currentTopic) {
        showToast('No content to save', 'warning'); // showToast from tools.js
        return;
    }

    try {
        lastResponse = output;
        const blocks = extractBlocks(output);
        currentTopic.content = {
            visualHTML: blocks.visual,
            visualType: blocks.visualType,
            description: blocks.description
        };
        currentTopic.status = 'ready';
        await saveAll();
        renderSidebar();
        await renderTopic(currentTopic);
        bootstrap.Modal.getInstance(document.getElementById('responseModal')).hide();
        document.getElementById('aiResponse').value = '';
        showToast('Content saved successfully!', 'success'); // showToast from tools.js
    } catch (e) {
        document.getElementById('console').textContent = 'Console Error: ' + e.message;
        showToast('Save failed: ' + e.message, 'error'); // showToast from tools.js
    }
}

// ========== QUIZ ORCHESTRATION ==========
async function generateQuiz() {
    if (!currentTopic || !currentTopic.content) {
        showToast('Generate content first', 'warning'); // showToast from tools.js
        return;
    }

    showToast('Generating quiz...', 'warning'); // showToast from tools.js

    const quizPrompt = promptGen.generateQuizPrompt(
        currentTopic.name,
        getParentChapter(currentTopic),
        getParentUnit(currentTopic),
        currentWorkspace.title,
        document.getElementById('contentLang').value,
        currentTopic.objective || 'Master concept',
        currentTopic.content.description || '',
        currentTopic.content.visualHTML,
        5
    );

    const result = await executePrompt(quizPrompt, 'gemini'); // executePrompt from api.js

    if (result.success) {
        try {
            const quizMatch = result.content.match(/<quiz>([\s\S]*?)<\/quiz>/i);
            if (quizMatch) {
                const quizData = JSON.parse(quizMatch[1].trim());
                currentTopic.quiz = quizData;
                await saveAll();
                renderQuiz(quizData); // renderQuiz from visual.js
                document.getElementById('quizTab').style.display = 'block';
                showToast('Quiz generated successfully!', 'success'); // showToast from tools.js
            }
        } catch (e) {
            showToast('Failed to parse quiz data', 'error'); // showToast from tools.js
        }
    } else {
        showToast('Quiz generation failed', 'error'); // showToast from tools.js
    }
}

async function generateQuizForTopic(topicId) {
    const topic = findTopic(currentWorkspace.topics, topicId);
    if (!topic) return;

    currentTopic = topic;
    await generateQuiz();
}

// ========== TOPIC HIERARCHY HELPERS ==========
function getParentChapter(topic) {
    function find(topics, target, parent = null) {
        for (const t of topics) {
            if (t === target) return parent ? parent.name : 'No Chapter';
            if (t.subtopics) {
                const found = find(t.subtopics, target, t);
                if (found) return found;
            }
        }
        return null;
    }
    return find(currentWorkspace.topics, topic) || 'No Chapter';
}

function getParentUnit(topic) {
    function find(topics, target, parent = null) {
        for (const t of topics) {
            if (t === target) return parent ? parent.name : 'No Unit';
            if (t.subtopics) {
                const found = find(t.subtopics, target, !parent ? t : parent);
                if (found) return found;
            }
        }
        return null;
    }
    return find(currentWorkspace.topics, topic) || 'No Unit';
}

function getAllTopics(topics) {
    let result = [];
    topics.forEach(t => {
        result.push(t);
        if (t.subtopics && t.subtopics.length > 0) {
            result = result.concat(getAllTopics(t.subtopics));
        }
    });
    return result;
}

function findTopic(topics, id) {
    for (const t of topics) {
        if (t.id === id) return t;
        if (t.subtopics) {
            const found = findTopic(t.subtopics, id);
            if (found) return found;
        }
    }
    return null;
}

function selectTopic(id) {
    const topic = findTopic(currentWorkspace.topics, id);
    if (topic) renderTopic(topic);
}

function showGenModal(id) {
    const topic = findTopic(currentWorkspace.topics, id);
    if (topic) {
        currentTopic = topic;
        document.getElementById('topicNameDisplay').textContent = topic.name;
        new bootstrap.Modal(document.getElementById('generateModal')).show();
    }
}

function updateLabel() {
    if (!currentTopic) return;
    const path = [];

    function find(topics) {
        for (let t of topics) {
            if (t === currentTopic) {
                path.unshift(t.name);
                return true;
            }
            if (t.subtopics && find(t.subtopics)) {
                path.unshift(t.name);
                return true;
            }
        }
        return false;
    }
    if (currentWorkspace?.topics) find(currentWorkspace.topics);
    document.getElementById('vizLabel').textContent = path.slice(-2).join(' / ');
}


// ========== RENDERING FUNCTIONS (State & UI) ==========
async function renderTopic(topic) {
    currentTopic = topic;
    renderSidebar();
    updateLabel();

    // Load notes (autoSaveNotes is in tools.js)
    if (currentWorkspace.notes && currentWorkspace.notes.general) {
        document.getElementById('notepadArea').value = currentWorkspace.notes.general;
    } else {
        document.getElementById('notepadArea').value = '';
    }

    if (topic.quiz) {
        document.getElementById('quizTab').style.display = 'block';
        renderQuiz(topic.quiz); // renderQuiz from visual.js
    } else {
        document.getElementById('quizTab').style.display = 'none';
    }

    const container = document.getElementById('vizContainer');

    if (topic.content?.visualHTML && topic.content?.visualType) {
        const blocks = {
            visual: topic.content.visualHTML,
            visualType: topic.content.visualType,
            description: topic.content.description
        };
        await renderVisual(blocks); // renderVisual from visual.js
        if (blocks.description) await renderPages(blocks.description); // renderPages from pages.js
    } else {
        container.innerHTML = '<div class="placeholder-wrapper"><div class="pulse-icon"><i class="bi bi-box-seam"></i></div><h5 class="placeholder-title">No Visualization</h5><p class="placeholder-hint">Click <i class="bi bi-magic"></i> to generate content</p></div>';
        document.getElementById('pagesContent').innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 2rem;">No pages available.</p>';
    }
}

function toggleFilterGenerated() {
    showOnlyGenerated = !showOnlyGenerated;
    document.getElementById('filterBtn').classList.toggle('active');
    renderSidebar();
}

function renderSidebar() {
    const sidebar = document.getElementById('topicsSidebar');
    sidebar.innerHTML = '';

    function render(topics, level = 0) {
        topics.forEach(topic => {
            if (showOnlyGenerated && topic.status !== 'ready') return;

            let item;
            if (level === 0) { // Unit
                item = document.createElement('div');
                item.textContent = topic.name;
                Object.assign(item.style, {
                    fontWeight: '800',
                    fontSize: '1rem',
                    color: 'var(--text-primary)',
                    padding: '0.75rem 1rem',
                    marginTop: '0.5rem',
                    textTransform: 'uppercase'
                });
            } else if (level === 1) { // Chapter
                item = document.createElement('div');
                item.textContent = topic.name;
                Object.assign(item.style, {
                    fontWeight: '600',
                    color: 'var(--text-secondary)',
                    padding: `0.5rem 1rem 0.5rem ${1 + level * 0.8}rem`,
                    fontSize: '0.9rem',
                    borderLeft: '3px solid var(--glass-border)',
                    marginLeft: '0.5rem',
                    marginTop: '0.5rem'
                });
            } else { // Topic
                item = document.createElement('div');
                item.className = 'topic-item-container';
                if (currentTopic && currentTopic.id === topic.id) item.classList.add('active');

                const icon = topic.status === 'ready' ? '✓' : '✨';
                item.innerHTML = `
                    <div class="topic-item-content" style="padding-left: ${1 + level * 0.8}rem;" onclick="selectTopic('${topic.id}')">
                        <span class="topic-status-icon ${topic.status === 'ready' ? 'status-ready' : 'status-pending'}">${icon}</span>
                        <span class="topic-name">${topic.name}</span>
                    </div>
                    <div class="topic-item-actions">
                        <button class="topic-action-btn" onclick="showGenModal('${topic.id}')" title="Generate content">
                            <i class="bi bi-magic"></i>
                        </button>
                        <button class="topic-action-btn" onclick="toggleTopicMenu(event, '${topic.id}')" title="More options">
                            <i class="bi bi-three-dots-vertical"></i>
                        </button>
                    </div>
                `;
            }
            sidebar.appendChild(item);
            if (topic.subtopics && topic.subtopics.length > 0) {
                render(topic.subtopics, level + 1);
            }
        });
    }
    render(currentWorkspace.topics);
}

function toggleTopicMenu(event, topicId) {
    event.stopPropagation();
    const topic = findTopic(currentWorkspace.topics, topicId);
    if (!topic) return;

    document.querySelectorAll('.topic-dropdown-menu').forEach(m => m.remove());

    const menu = document.createElement('div');
    menu.className = 'topic-dropdown-menu show';

    let menuHTML = `
        <div class="topic-dropdown-item" onclick="showRenameModal('${topicId}')">
            <i class="bi bi-pencil"></i> Rename
        </div>
    `;

    if (topic.status === 'ready') {
        menuHTML += `
            <div class="topic-dropdown-item" onclick="showGenModal('${topicId}')">
                <i class="bi bi-arrow-clockwise"></i> Regenerate
            </div>
            <div class="topic-dropdown-item" onclick="generateQuizForTopic('${topicId}')">
                <i class="bi bi-question-circle"></i> Generate Quiz
            </div>
        `;
    }

    menuHTML += `
        <div class="topic-dropdown-item" onclick="downloadTopic('${topicId}')">
            <i class="bi bi-download"></i> Download
        </div>
        <div class="topic-dropdown-item" style="color: var(--error);" onclick="deleteTopic('${topicId}')">
            <i class="bi bi-trash"></i> Delete
        </div>
    `;

    menu.innerHTML = menuHTML;
    event.target.closest('.topic-item-actions').appendChild(menu);

    setTimeout(() => {
        document.addEventListener('click', function closeMenu() {
            menu.remove();
            document.removeEventListener('click', closeMenu);
        }, 10);
    });
}

function showRenameModal(topicId) {
    const topic = findTopic(currentWorkspace.topics, topicId);
    if (!topic) return;

    renameTargetTopic = topic;
    document.getElementById('renameInput').value = topic.name;
    new bootstrap.Modal(document.getElementById('renameModal')).show();
}

async function saveRename() {
    const newName = document.getElementById('renameInput').value.trim();
    if (!newName || !renameTargetTopic) return;

    renameTargetTopic.name = newName;
    await saveAll();
    renderSidebar();
    updateLabel();
    bootstrap.Modal.getInstance(document.getElementById('renameModal')).hide();
    showToast('Topic renamed successfully', 'success'); // showToast from tools.js
}

function downloadTopic(topicId) {
    const topic = findTopic(currentWorkspace.topics, topicId);
    if (!topic) return;

    const data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(topic, null, 2));
    const a = document.createElement('a');
    a.setAttribute("href", data);
    a.setAttribute("download", topic.name.replace(/[^a-z0-9]/gi, '_').toLowerCase() + ".txt");
    document.body.appendChild(a);
    a.click();
    a.remove();
    showToast('Topic downloaded', 'success'); // showToast from tools.js
}

function deleteTopic(topicId) {
    showConfirm('Delete Topic', 'Are you sure you want to delete this topic?', async () => { // showConfirm from tools.js
        function removeFromTree(topics) {
            for (let i = 0; i < topics.length; i++) {
                if (topics[i].id === topicId) {
                    topics.splice(i, 1);
                    return true;
                }
                if (topics[i].subtopics && removeFromTree(topics[i].subtopics)) {
                    return true;
                }
            }
            return false;
        }

        removeFromTree(currentWorkspace.topics);
        await saveAll();
        renderSidebar();
        showToast('Topic deleted', 'success'); // showToast from tools.js
    });
}


// ========== WORKSPACE & DASHBOARD MANAGEMENT ==========

function renderDashboard() {
    const grid = document.getElementById('workspaceGrid');
    grid.innerHTML = '';

    const newCard = document.createElement('div');
    newCard.className = 'workspace-card new-workspace-card';
    newCard.onclick = () => new bootstrap.Modal(document.getElementById('newWorkspaceModal')).show();
    newCard.innerHTML = `<i class="bi bi-plus-circle"></i><p class="fw-semibold mb-0">New Workspace</p>`;
    grid.appendChild(newCard);

    workspaces.forEach((ws, idx) => {
        const allTopics = getAllTopics(ws.topics);
        const ready = allTopics.filter(t => t.status === 'ready').length;
        const progress = allTopics.length > 0 ? (ready / allTopics.length * 100) : 0;
        const isDefault = ws.isDefault;

        const card = document.createElement('div');
        card.className = 'workspace-card';
        card.innerHTML = `
            <div class="workspace-card-header">
                <h4 style="margin: 0; cursor: pointer;" onclick="openWorkspace(${idx})">${ws.title}</h4>
                <div class="workspace-card-dropdown dropdown">
                    <button class="dropdown-toggle" data-bs-toggle="dropdown" onclick="event.stopPropagation();">
                        <i class="bi bi-three-dots-vertical"></i>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item" href="#" onclick="event.stopPropagation(); downloadWS(${idx})"><i class="bi bi-download me-2"></i>Download</a></li>
                        ${!isDefault ? '<li><hr class="dropdown-divider"></li><li><a class="dropdown-item text-danger" href="#" onclick="event.stopPropagation(); deleteWS(' + idx + ')"><i class="bi bi-trash me-2"></i>Delete</a></li>' : ''}
                    </ul>
                </div>
            </div>
            <p style="cursor: pointer;" onclick="openWorkspace(${idx})">${allTopics.length} topics • ${new Date(ws.createdAt).toLocaleDateString()}</p>
            <div onclick="openWorkspace(${idx})">
                <div class="progress-bar-custom">
                    <div class="progress-fill" style="width: ${progress}%"></div>
                </div>
                <div class="progress-text">${Math.round(progress)}% Complete</div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function downloadWS(idx) {
    const ws = workspaces[idx];
    const data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(ws, null, 2));
    const a = document.createElement('a');
    a.setAttribute("href", data);
    a.setAttribute("download", ws.title.replace(/[^a-z0-9]/gi, '_').toLowerCase() + ".json");
    document.body.appendChild(a);
    a.click();
    a.remove();
    showToast('Workspace downloaded', 'success'); // showToast from tools.js
}

async function deleteWS(idx) {
    showConfirm('Delete Workspace', 'Are you sure you want to delete this workspace?', async () => { // showConfirm from tools.js
        const wsId = workspaces[idx].id;
        workspaces.splice(idx, 1);
        const tx = db.transaction([STORE_NAME], 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        await store.delete(wsId);
        renderDashboard();
        showToast('Workspace deleted', 'success'); // showToast from tools.js
    });
}

function openWorkspace(idx) {
    currentWorkspace = workspaces[idx];
    document.getElementById('mobileWorkspaceTitle').textContent = currentWorkspace.title;
    document.getElementById('dashboardScreen').classList.remove('active');
    document.getElementById('workspaceScreen').classList.add('active');
    renderSidebar();
    const all = getAllTopics(currentWorkspace.topics);
    if (all.length > 0) renderTopic(all[0]);
}

function goBackToDashboard() {
    document.getElementById('workspaceScreen').classList.remove('active');
    document.getElementById('dashboardScreen').classList.add('active');
    currentWorkspace = null;
    currentTopic = null;
}

// ========== WORKSPACE STRUCTURING LOGIC ==========

function showAddTopicModal() {
    populateUnitChapterSelects();
    new bootstrap.Modal(document.getElementById('addTopicModal')).show();
}

function populateUnitChapterSelects() {
    const unitSelect = document.getElementById('topicUnitSelect');
    const chapterSelect = document.getElementById('topicChapterSelect');

    unitSelect.innerHTML = '<option value="">Select Unit...</option>';
    chapterSelect.innerHTML = '<option value="">Select Chapter...</option>';

    if (!currentWorkspace) return;

    currentWorkspace.topics.forEach(unit => {
        const opt = document.createElement('option');
        opt.value = unit.id;
        opt.textContent = unit.name;
        unitSelect.appendChild(opt);
    });

    unitSelect.onchange = () => {
        chapterSelect.innerHTML = '<option value="">Select Chapter...</option>';
        const selectedUnit = currentWorkspace.topics.find(u => u.id === unitSelect.value);
        if (selectedUnit && selectedUnit.subtopics) {
            selectedUnit.subtopics.forEach(chapter => {
                const opt = document.createElement('option');
                opt.value = chapter.id;
                opt.textContent = chapter.name;
                chapterSelect.appendChild(opt);
            });
        }
    };
}

async function addNewTopic() {
    const title = document.getElementById('newTopicTitle').value.trim();
    const unitId = document.getElementById('topicUnitSelect').value;
    const chapterId = document.getElementById('topicChapterSelect').value;

    if (!title) {
        showToast('Enter topic title', 'warning'); // showToast from tools.js
        return;
    }

    const newTopic = {
        name: title,
        id: 'topic-' + Date.now(),
        status: 'pending',
        subtopics: []
    };

    if (chapterId) {
        const unit = currentWorkspace.topics.find(u => u.id === unitId);
        const chapter = unit?.subtopics.find(c => c.id === chapterId);
        if (chapter) {
            chapter.subtopics.push(newTopic);
        }
    } else if (unitId) {
        const unit = currentWorkspace.topics.find(u => u.id === unitId);
        if (unit) {
            if (!unit.subtopics) unit.subtopics = [];
            unit.subtopics.push(newTopic);
        }
    } else {
        currentWorkspace.topics.push(newTopic);
    }

    await saveAll();
    renderSidebar();
    bootstrap.Modal.getInstance(document.getElementById('addTopicModal')).hide();
    document.getElementById('newTopicTitle').value = '';
    showToast('Topic added successfully', 'success'); // showToast from tools.js
}

async function createWorkspace() {
    const title = document.getElementById('workspaceTitle').value.trim();
    if (!title) {
        showToast('Enter workspace title', 'warning'); // showToast from tools.js
        return;
    }

    const ws = {
        id: Date.now(),
        title,
        topics: [{
            name: 'Unit 1: Fundamentals',
            id: 'unit-' + Date.now(),
            status: 'pending',
            subtopics: [{
                name: 'Chapter 1: Introduction',
                id: 'chapter-' + Date.now(),
                status: 'pending',
                subtopics: [{
                    name: 'Topic 1.1',
                    id: 'topic-' + Date.now() + '-1',
                    status: 'pending',
                    subtopics: []
                }]
            }]
        }],
        notes: {},
        createdAt: new Date().toISOString()
    };

    workspaces.push(ws);
    await saveWorkspace(ws);
    renderDashboard();
    bootstrap.Modal.getInstance(document.getElementById('newWorkspaceModal')).hide();
    document.getElementById('workspaceTitle').value = '';
    showToast('Workspace created successfully', 'success'); // showToast from tools.js
}


// ========== INITIALIZATION & EVENT HANDLERS ==========
document.addEventListener('DOMContentLoaded', async () => {
    await initDB();
    workspaces = await loadWorkspaces();

    // Create default workspace if none exists
    if (workspaces.length === 0) {
        const defaultWS = {
            id: Date.now(),
            title: 'Workspace for Any Topic',
            isDefault: true,
            topics: [{
                name: 'General Topics',
                id: 'unit-default',
                status: 'pending',
                subtopics: [{
                    name: 'General Chapter',
                    id: 'chapter-default',
                    status: 'pending',
                    subtopics: [{
                            name: 'Sample Topic 1',
                            id: 'topic-1',
                            status: 'pending',
                            subtopics: []
                        },
                        {
                            name: 'Sample Topic 2',
                            id: 'topic-2',
                            status: 'pending',
                            subtopics: []
                        },
                        {
                            name: 'Sample Topic 3',
                            id: 'topic-3',
                            status: 'pending',
                            subtopics: []
                        },
                        {
                            name: 'Sample Topic 4',
                            id: 'topic-4',
                            status: 'pending',
                            subtopics: []
                        },
                        {
                            name: 'Sample Topic 5',
                            id: 'topic-5',
                            status: 'pending',
                            subtopics: []
                        }
                    ]
                }]
            }],
            notes: {},
            createdAt: new Date().toISOString()
        };
        workspaces.push(defaultWS);
        await saveWorkspace(defaultWS);
    }

    renderDashboard();

    // Event listeners referencing tools.js functions:
    document.getElementById('sidebar-toggle-btn')?.addEventListener('click', toggleMobileSidebar);
    document.getElementById('open-notes-modal-btn')?.addEventListener('click', toggleNotesSidebar);
    document.getElementById('notepadArea').addEventListener('input', autoSaveNotes);

    const tutorInput = document.getElementById('tutorInput');
    tutorInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });
    tutorInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
});