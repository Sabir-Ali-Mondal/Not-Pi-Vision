let speech;
let currentWordIndex = 0;
let textContent = "";

let savedVisualizations = JSON.parse(localStorage.getItem('savedVisualizations')) || [];
let selectedVisualizationIndices = JSON.parse(localStorage.getItem('selectedVisualizationIndices')) || [];

let syllabusLists = JSON.parse(localStorage.getItem('syllabusLists')) || [];
let currentSyllabusContextId = null;

let settings = JSON.parse(localStorage.getItem('settings')) || {};
let currentEditIndex = null;
let editContext = 'global';

let slideshowItems = [];
let currentSlideIndex = 0;

function showNotification(message) {
    const notificationArea = document.getElementById('notification-area');
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notificationArea.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

function saveSettings() {
    localStorage.setItem('settings', JSON.stringify(settings));
}

function loadSettings() {
    const {
        topic,
        style,
        complexity,
        customPrompt,
        diagramType,
        searchEngine
    } = settings;
    if (topic) document.getElementById("topic").value = topic;
    if (style) document.getElementById("style").value = style;
    if (complexity) document.getElementById("complexity").value = complexity;
    if (customPrompt) document.getElementById("custom-prompt").value = customPrompt;
    if (diagramType) document.getElementById("diagram-type").value = diagramType;
    if (searchEngine) {
        const radio = document.querySelector(`input[name="searchEngine"][value="${searchEngine}"]`);
        if (radio) radio.checked = true;
    }
}

function trackSettingChange(element, settingName) {
    element.addEventListener('change', () => {
        settings[settingName] = element.value;
        saveSettings();
    });
}

function attachSettingTrackers() {
    trackSettingChange(document.getElementById("topic"), 'topic');
    trackSettingChange(document.getElementById("style"), 'style');
    trackSettingChange(document.getElementById("complexity"), 'complexity');
    trackSettingChange(document.getElementById("custom-prompt"), 'customPrompt');
    trackSettingChange(document.getElementById("diagram-type"), 'diagramType');
    document.querySelectorAll('input[name="searchEngine"]').forEach(radio => {
        radio.addEventListener('change', (event) => {
            if (event.target.checked) {
                settings.searchEngine = event.target.value;
                saveSettings();
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
    attachSettingTrackers();
    updateSavedVisualizationsDisplay();
    displaySavedSyllabi();
    document.getElementById('upload-visualization').addEventListener('click', () => document.getElementById('file-input').click());
    document.getElementById('file-input').addEventListener('change', handleFileUpload);
    initResizer();
});

function showSection(sectionId) {
    if (currentSyllabusContextId && sectionId !== 'vision-maker' && sectionId !== 'syllabus-workspace') {
        currentSyllabusContextId = null;
        document.getElementById('vision-maker-header').innerHTML = `
             <h2 style="position: relative; right: -40px;" class="style-heading mb-0 text-center flex-grow-1">Vision Maker</h2>
            <button style="position: relative; top: 10px; right: -7%;" class="btn btn-warning btn-md rounded ms-1 border-info" type="button" data-bs-toggle="tooltip" data-bs-placement="top" title="Split Syllabus Into Topics" onclick="showSection('list-maker')">
                <i class="bi bi-scissors me-1"></i> Syllabus
            </button>`;
    }
    document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));
    const activeSection = document.getElementById(sectionId);
    activeSection.classList.add('active', 'animate__fadeIn');
    if (sectionId === 'saved-collection') {
        updateSavedVisualizationsDisplay();
    }
}

document.getElementById("clearPaste").addEventListener("click", () => {
    const output = document.getElementById("generatedContent");
    if (output.value.trim()) {
        output.value = "";
    } else {
        navigator.clipboard.readText().then(text => {
            output.value = text;
        });
    }
});

document.getElementById("toggle-enhanced").addEventListener("click", () => {
    document.getElementById("enhanced-features").style.display = document.getElementById("enhanced-features").style.display === "none" ? "block" : "none";
});

function generatePrompt() {
    const topic = document.getElementById("topic").value.trim();
    if (!topic) {
        showNotification("Please enter a topic.");
        return;
    }
    const style = document.getElementById("style").value;
    const complexity = document.getElementById("complexity").value;
    const customPrompt = document.getElementById("custom-prompt").value.trim();
    const diagramType = document.getElementById("diagram-type").value;
    let prompt = `First, briefly explain "${topic}" detailed description atleast 300 words. Then, generate a *single HTML file* using HTML, CSS, and p5.js to visualize "${topic}" in a simple and intuitive way. The visualization should be visually appealing and natural—just like how we perceive it during learning—while maintaining accuracy. Style the visualization as "${style}", with a concept complexity of ${complexity} /10. The diagram type should be "${diagramType}".If HTML works in such a way(if not needed no need) , add this replay button:
    <button style="position:fixed;bottom:20px;right:20px;background:#07f;color:#fff;font-size:20px;border-radius:50%;width:30px;height:30px" name="replay" title="Replay">⟳</button>
    Response should follow this pattern: <description>...</description> followed by the complete HTML code only. Do not include any headings, introductions, or explanations before or after the code.`;
    if (customPrompt) {
        prompt += ` Incorporate this custom instruction: ${customPrompt}.`;
    }
    const searchEngine = document.querySelector('input[name="searchEngine"]:checked').value;
    if (searchEngine === 'gemini') {
        const btn = document.getElementById('generate');
        const originalText = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = 'Generating... <span class="spinner-border spinner-border-sm"></span>';
        fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt: prompt
                })
            })
            .then(response => response.json())
            .then(data => {
                document.getElementById("generatedContent").value = data.content;
                viewContent();
                showNotification("Automatic visualization generated successfully!");
            })
            .catch(error => {
                console.error('Error:', error);
                showNotification("Error generating content.");
            })
            .finally(() => {
                btn.disabled = false;
                btn.innerHTML = originalText;
            });
    } else {
        const searchUrl = searchEngine === 'mistral' ?
            `https://chat.mistral.ai/chat?q=${encodeURIComponent(prompt)}` :
            `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`;
        window.open(searchUrl, '_blank', 'width=800,height=600');
    }
}

function viewContent() {
    const content = document.getElementById('generatedContent').value;
    if (!content) {
        showNotification("Please paste the content.");
        return;
    }
    const {
        descriptionText,
        htmlContent
    } = parseContent(content);
    document.getElementById('descriptionDisplay').innerHTML = descriptionText;
    if (htmlContent) {
        const iframe = document.createElement('iframe');
        iframe.srcdoc = `<html>${htmlContent}</html>`;
        iframe.width = '100%';
        iframe.height = '400px';
        document.getElementById('htmlDisplay').innerHTML = '';
        document.getElementById('htmlDisplay').appendChild(iframe);
    } else {
        document.getElementById('htmlDisplay').innerHTML = '<p>No HTML content found.</p>';
    }
    document.getElementById('contentDisplay').style.display = 'flex';
    document.getElementById('contentDisplay').scrollIntoView({
        behavior: 'smooth'
    });
}

function stopView() {
    document.getElementById('contentDisplay').style.display = 'none';
}

function parseContent(content) {
    const descriptionMatch = content.match(/<description>([\s\S]*?)<\/description>/);
    const htmlMatch = content.match(/<html.*?>([\s\S]*?)<\/html>/);
    let descriptionText = "";
    if (descriptionMatch) {
        descriptionText = `<p>${descriptionMatch[1]}</p>`;
    } else {
        const htmlStart = content.indexOf("<html");
        if (htmlStart !== -1) {
            descriptionText = `<p>${content.substring(0, htmlStart).trim()}</p>`;
        } else {
            descriptionText = `<p>${content.trim()}</p>`;
        }
    }
    let htmlContent = '';
    if (htmlMatch) {
        htmlContent = htmlMatch[0];
    }
    return {
        descriptionText,
        htmlContent
    };
}

function openViewerMode(htmlContent, text) {
    textContent = text;
    document.getElementById('viewerIframe').srcdoc = htmlContent;
    document.getElementById('viewerText').innerHTML = text;
    document.getElementById('slideshow-nav').style.display = 'none';
    document.getElementById('viewerModal').classList.add('active');
}

function openSlideshowViewer(items) {
    if (items.length === 0) {
        showNotification("No items selected to view.");
        return;
    }
    slideshowItems = items;
    currentSlideIndex = 0;
    const nav = document.getElementById('slideshow-nav');
    if (nav) nav.style.display = 'flex';
    document.getElementById('viewerModal').classList.add('active');
    loadSlide(currentSlideIndex);
}

function loadSlide(index) {
    if (index < 0 || index >= slideshowItems.length) return;
    stopSpeech();
    const item = slideshowItems[index];
    currentSlideIndex = index;
    let html = item.htmlContent || '<html><body>No visual content.</body></html>';
    let text = item.textContent || 'No description available.';
    textContent = text;
    document.getElementById('viewerIframe').srcdoc = html;
    document.getElementById('viewerText').innerHTML = text;
    document.getElementById('slide-counter').textContent = `${index + 1} / ${slideshowItems.length}`;
    document.getElementById('prev-slide-btn').disabled = (index === 0);
    document.getElementById('next-slide-btn').disabled = (index === slideshowItems.length - 1);
}

function nextSlide() {
    if (currentSlideIndex < slideshowItems.length - 1) {
        loadSlide(currentSlideIndex + 1);
    }
}

function prevSlide() {
    if (currentSlideIndex > 0) {
        loadSlide(currentSlideIndex - 1);
    }
}

function closeViewerMode() {
    stopSpeech();
    document.getElementById('viewerModal').classList.remove('active');
    slideshowItems = [];
    currentSlideIndex = 0;
}

function openContentDisplayInViewer() {
    const iframe = document.getElementById('htmlDisplay').querySelector('iframe');
    if (!iframe) {
        showNotification("No visualization to view.");
        return;
    }
    const htmlContent = iframe.srcdoc;
    const descriptionText = document.getElementById('descriptionDisplay').innerHTML;
    openViewerMode(htmlContent, descriptionText);
}

function startSpeech() {
    if (speech && window.speechSynthesis.speaking) {
        stopSpeech();
        return;
    }
    speech = new SpeechSynthesisUtterance();
    speech.text = document.getElementById('viewerText').innerText;
    speech.onboundary = highlightWord;
    speech.onend = stopSpeech;
    speech.onerror = (e) => {
        console.error("Speech synthesis error", e);
        stopSpeech();
    };
    window.speechSynthesis.speak(speech);
}

function stopSpeech() {
    window.speechSynthesis.cancel();
    resetHighlighting();
}

function resetHighlighting() {
    document.getElementById('viewerText').innerHTML = textContent;
}

function highlightWord(event) {
    if (event.name === 'word') {
        const cleanText = document.getElementById('viewerText').innerText;
        currentWordIndex = event.charIndex;
        let beforeWord = cleanText.substring(0, currentWordIndex);
        let highlightedWord = cleanText.substring(currentWordIndex, currentWordIndex + event.charLength);
        let afterWord = cleanText.substring(currentWordIndex + event.charLength);
        const originalHTML = textContent;
        const startTag = originalHTML.startsWith('<p>') ? '<p>' : '';
        const endTag = originalHTML.endsWith('</p>') ? '</p>' : '';
        document.getElementById('viewerText').innerHTML = `${startTag}${beforeWord}<span class="highlighted">${highlightedWord}</span>${afterWord}${endTag}`;
    }
}

function saveVisualization() {
    const topic = document.getElementById("topic").value.trim();
    const content = document.getElementById('generatedContent').value;
    if (!topic || !content) {
        showNotification("Please enter a topic and paste the generated content.");
        return;
    }
    const {
        htmlContent,
        descriptionText
    } = parseContent(content);
    const visualization = {
        topic: topic,
        style: document.getElementById("style").value,
        complexity: document.getElementById("complexity").value,
        content: content,
        htmlContent: htmlContent,
        textContent: descriptionText
    };
    if (currentSyllabusContextId) {
        const listIndex = syllabusLists.findIndex(list => list.id === currentSyllabusContextId);
        if (listIndex > -1) {
            if (!syllabusLists[listIndex].visualizations) syllabusLists[listIndex].visualizations = [];
            syllabusLists[listIndex].visualizations.push(visualization);
            localStorage.setItem('syllabusLists', JSON.stringify(syllabusLists));
            showNotification(`Saved to "${syllabusLists[listIndex].name}"`);
            renderSyllabusWorkspace(currentSyllabusContextId);
        }
    } else {
        savedVisualizations.push(visualization);
        localStorage.setItem('savedVisualizations', JSON.stringify(savedVisualizations));
        showNotification("Visualization saved!");
        updateSavedVisualizationsDisplay();
    }
}

function updateSavedVisualizationsDisplay(context = 'global', containerId = 'cards-container', actionsContainerId = 'bulk-actions-container') {
    let vizArray, selectedIndicesArray;
    if (context === 'global') {
        vizArray = savedVisualizations;
        selectedIndicesArray = selectedVisualizationIndices;
    } else {
        const list = syllabusLists.find(l => l.id === context);
        if (!list) return;
        vizArray = list.visualizations || [];
        selectedIndicesArray = list.selectedIndices || [];
    }
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    vizArray.forEach((visualization, index) => {
        const cardWrapper = document.createElement("div");
        cardWrapper.className = "col-md-6 col-lg-4 mb-3";
        const card = document.createElement("div");
        card.className = "saved-card h-100";
        if (selectedIndicesArray.includes(index)) {
            card.classList.add('selected');
        }
        card.onclick = () => toggleSelection(index, card, context);
        card.innerHTML = `
            <button class="btn btn-sm btn-outline-secondary border-0 edit-card-btn" 
                    onclick="event.stopPropagation(); editVisualization(${index}, '${context}')" 
                    data-bs-toggle="modal" 
                    data-bs-target="#editModal">
                <i class="bi bi-pencil"></i>
            </button>
            <h5 class="fw-bold">${visualization.topic}</h5>
            <p class="text-muted small mb-0">Style: ${visualization.style} • Complexity: ${visualization.complexity}</p>
        `;
        cardWrapper.appendChild(card);
        container.appendChild(cardWrapper);
    });
    updateBulkActionsPanel(context, actionsContainerId);
}

function toggleSelection(index, element, context) {
    let selectedArray, storageKey;
    if (context === 'global') {
        selectedArray = selectedVisualizationIndices;
        storageKey = 'selectedVisualizationIndices';
    } else {
        const list = syllabusLists.find(l => l.id === context);
        if (!list) return;
        if (!list.selectedIndices) list.selectedIndices = [];
        selectedArray = list.selectedIndices;
    }
    const selectedIndex = selectedArray.indexOf(index);
    if (selectedIndex > -1) {
        selectedArray.splice(selectedIndex, 1);
        element.classList.remove('selected');
    } else {
        selectedArray.push(index);
        element.classList.add('selected');
    }
    if (context === 'global') {
        localStorage.setItem(storageKey, JSON.stringify(selectedArray));
    } else {
        localStorage.setItem('syllabusLists', JSON.stringify(syllabusLists));
    }
    updateBulkActionsPanel(context, context === 'global' ? 'bulk-actions-container' : 'workspace-bulk-actions-container');
}

function updateBulkActionsPanel(context, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = `
        <button class="btn btn-sm btn-primary" onclick="viewSelectedVisualizations('${context}')"><i class="bi bi-eye"></i> View Selected</button>
        <div class="btn-group">
          <button type="button" class="btn btn-sm btn-info dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="bi bi-download"></i> Export
          </button>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#" onclick="exportSelectedVisualizations('${context}', 'full')">Full File (.txt)</a></li>
            <li><a class="dropdown-item" href="#" onclick="exportSelectedVisualizations('${context}', 'html')">HTML Only</a></li>
          </ul>
        </div>
        <button class="btn btn-sm btn-danger" onclick="deleteSelectedVisualizations('${context}')"><i class="bi bi-trash"></i> Delete Selected</button>
    `;
}

function deleteSelectedVisualizations(context = 'global') {
    let vizArray, selectedIndicesArray;
    if (context === 'global') {
        vizArray = savedVisualizations;
        selectedIndicesArray = selectedVisualizationIndices;
    } else {
        const list = syllabusLists.find(l => l.id === context);
        if (!list) return;
        vizArray = list.visualizations;
        selectedIndicesArray = list.selectedIndices;
    }
    if (selectedIndicesArray.length === 0 || !confirm(`Are you sure you want to delete ${selectedIndicesArray.length} selected item(s)?`)) return;
    const newVizArray = vizArray.filter((_, index) => !selectedIndicesArray.includes(index));
    if (context === 'global') {
        savedVisualizations = newVizArray;
        selectedVisualizationIndices = [];
        localStorage.setItem('savedVisualizations', JSON.stringify(savedVisualizations));
        localStorage.setItem('selectedVisualizationIndices', '[]');
        updateSavedVisualizationsDisplay();
    } else {
        const listIndex = syllabusLists.findIndex(l => l.id === context);
        syllabusLists[listIndex].visualizations = newVizArray;
        syllabusLists[listIndex].selectedIndices = [];
        localStorage.setItem('syllabusLists', JSON.stringify(syllabusLists));
        renderSyllabusWorkspace(context);
    }
    showNotification("Selected items deleted.");
}

function viewSelectedVisualizations(context = 'global') {
    let vizArray, selectedIndicesArray;
    if (context === 'global') {
        vizArray = savedVisualizations;
        selectedIndicesArray = selectedVisualizationIndices;
    } else {
        const list = syllabusLists.find(l => l.id === context);
        if (!list) return;
        vizArray = list.visualizations || [];
        selectedIndicesArray = list.selectedIndices || [];
    }
    const itemsToView = selectedIndicesArray.map(index => vizArray[index]).filter(Boolean);
    openSlideshowViewer(itemsToView);
}

function exportSelectedVisualizations(context = 'global', type) {
    let vizArray, selectedIndicesArray;
    if (context === 'global') {
        vizArray = savedVisualizations;
        selectedIndicesArray = selectedVisualizationIndices;
    } else {
        const list = syllabusLists.find(l => l.id === context);
        if (!list) return;
        vizArray = list.visualizations || [];
        selectedIndicesArray = list.selectedIndices || [];
    }
    if (selectedIndicesArray.length === 0) {
        showNotification("No items selected for export.");
        return;
    }
    selectedIndicesArray.forEach((vizIndex, loopIndex) => {
        const visualization = vizArray[vizIndex];
        let content, filename, mimeType;
        if (type === 'full') {
            content = visualization.content;
            filename = `${visualization.topic.replace(/\s+/g, '_')}.txt`;
            mimeType = 'text/plain';
        } else {
            content = visualization.htmlContent;
            filename = `${visualization.topic.replace(/\s+/g, '_')}.html`;
            mimeType = 'text/html';
        }
        setTimeout(() => {
            const blob = new Blob([content], {
                type: mimeType
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.click();
            URL.revokeObjectURL(url);
        }, loopIndex * 500);
    });
    showNotification(`Exporting ${selectedIndicesArray.length} items...`);
}

function editVisualization(index, context) {
    currentEditIndex = index;
    editContext = context;
    let visualization;
    if (context === 'global') {
        visualization = savedVisualizations[index];
    } else {
        const list = syllabusLists.find(l => l.id === context);
        if (!list || !list.visualizations) return;
        visualization = list.visualizations[index];
    }
    if (visualization) {
        document.getElementById('editTopic').value = visualization.topic;
        document.getElementById('saveEdit').onclick = saveEditedVisualization;
    }
}

function saveEditedVisualization() {
    const newTopic = document.getElementById('editTopic').value;
    if (currentEditIndex === null) return;
    if (editContext === 'global') {
        savedVisualizations[currentEditIndex].topic = newTopic;
        localStorage.setItem('savedVisualizations', JSON.stringify(savedVisualizations));
        updateSavedVisualizationsDisplay();
    } else {
        const listIndex = syllabusLists.findIndex(l => l.id === editContext);
        if (listIndex > -1) {
            syllabusLists[listIndex].visualizations[currentEditIndex].topic = newTopic;
            localStorage.setItem('syllabusLists', JSON.stringify(syllabusLists));
            renderSyllabusWorkspace(editContext);
        }
    }
    const editModal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
    editModal.hide();
    showNotification("Visualization updated!");
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const {
                htmlContent,
                descriptionText
            } = parseContent(e.target.result);
            let topic = "Uploaded Visualization";
            const topicMatch = htmlContent.match(/<title>(.*?)<\/title>/i);
            if (topicMatch && topicMatch[1]) topic = topicMatch[1];
            savedVisualizations.push({
                topic,
                style: "Uploaded",
                complexity: "Unknown",
                content: e.target.result,
                htmlContent,
                textContent: descriptionText
            });
            updateSavedVisualizationsDisplay();
            localStorage.setItem('savedVisualizations', JSON.stringify(savedVisualizations));
            showNotification("Visualization uploaded and saved!");
        } catch (error) {
            showNotification("Error processing file.");
            console.error("File processing error:", error);
        }
    };
    reader.readAsText(file);
}

function resetAllData() {
    if (confirm("Are you sure you want to reset ALL data? This includes all saved visualizations and syllabus lists. This action cannot be undone.")) {
        localStorage.clear();
        savedVisualizations = [];
        selectedVisualizationIndices = [];
        syllabusLists = [];
        settings = {};
        updateSavedVisualizationsDisplay();
        displaySavedSyllabi();
        showNotification("All data has been reset.");
    }
}

function updateLabels() {
    const mode = document.getElementById("unique_modeSelect").value;
    document.getElementById("unique_nameLabel").innerText = mode === "splitter" ? "Enter Subject Name:" : "Enter Topic Name:";
    document.getElementById("unique_descLabel").innerText = mode === "splitter" ? "Enter Syllabus:" : "Enter Big Topic Description:";
}

function pasteTo(id) {
    navigator.clipboard.readText().then(text => {
        document.getElementById(id).value = text;
    });
}

async function clearAndPasteTo(id) {
    try {
        const text = await navigator.clipboard.readText();
        document.getElementById(id).value = text;
    } catch (err) {
        console.error('Failed to read clipboard contents: ', err);
    }
}

function generatePrompt2(engine) {
    const mode = document.getElementById("unique_modeSelect").value;
    const sub = document.getElementById("unique_nameInput").value.trim();
    const syllabus = document.getElementById("unique_descInput").value.trim();
    if (!sub || !syllabus) {
        showNotification("Please enter subject/topic and syllabus/description.");
        return;
    }
    let prompt = "";
    if (mode === "splitter") {
        prompt = `Convert the following syllabus into small, well-defined conceptual parts.\nEach part should:\n\nRepresent a single, independent core concept or topic.\nBe self-explanatory and descriptive enough to guide a 100-word summary.\nBe clear and specific so it can be independently visualized as a concept in an HTML-based interface.\nBe named in a way that reflects its visual or conceptual focus, not just syllabus jargon.\n\nUse the following format for the output using ~ and ~~ to denote headings:\n~ Unit Name\n~~ Topic Title 1\n~~ Topic Title 2\n\nSubject: ${sub}\nSyllabus: ${syllabus}`;
    } else {
        prompt = `Think and make this topic into more small part so that each part can\nRepresent a single, independent core concept or topic.\nBe self-explanatory and descriptive enough to guide a 100-word summary.\nBe clear and specific so it can be independently visualized as a concept in an HTML-based interface.\nBe named in a way that reflects its visual or conceptual focus, not just syllabus jargon.\n\nUse the following format for the output using ~ and ~~ to denote headings:\n~ Topic Name\n~~ Topic part Title 1\n~~ Topic part Title 2\n\nTopic: ${sub}\nDescription: ${syllabus}`;
    }
    const searchUrl = engine === 'perplexity' ?
        `https://www.perplexity.ai/?q=${encodeURIComponent(prompt)}` :
        `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`;
    window.open(searchUrl, '_blank', 'width=800,height=600');
}

function generatePrompt2Gemini() {
    const mode = document.getElementById("unique_modeSelect").value;
    const sub = document.getElementById("unique_nameInput").value.trim();
    const syllabus = document.getElementById("unique_descInput").value.trim();
    if (!sub || !syllabus) {
        showNotification("Please enter subject/topic and syllabus/description.");
        return;
    }
    let prompt = mode === "splitter" ?
        `Convert the following syllabus into small, well-defined conceptual parts. Each part should: Represent a single, independent and important core concept or topic. Be self-explanatory and descriptive enough to guide a ~100-word summary, as if a page can be generated from the topic name alone. Be clear and specific so it can be independently visualized as a concept in an HTML-based interface. Be named in a way that reflects its visual or conceptual focus, not just syllabus jargon. Use the following format for the output, using ~ and ~~ to denote headings: ~ Unit Name\n~~ Topic 1\n~~ Topic 2\n~ Unit Name\n~~ Topic 1 Subject: ${sub}\nSyllabus: ${syllabus}` :
        `Think and make this topic into more small part so that each part can\nRepresent a single, independent core concept or topic.\nBe self-explanatory and descriptive enough to guide a 100-word summary.\nBe clear and specific so it can be independently visualized as a concept in an HTML-based interface.\nBe named in a way that reflects its visual or conceptual focus, not just syllabus jargon.\n\nUse the following format for the output using ~ and ~~ to denote headings:\n~ Topic Name\n~~ Topic part Title 1\n~~ Topic part Title 2\n\nTopic: ${sub}\nDescription: ${syllabus}`;

    const geminiButton = document.querySelector('button[onclick="generatePrompt2Gemini()"]');
    geminiButton.disabled = true;
    geminiButton.innerHTML = 'Generating... <span class="spinner-border spinner-border-sm"></span>';

    fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: prompt
            })
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById("unique_aiResponse").value = data.content;
            processAndSave();
            showNotification("Gemini(Auto) response generated and saved successfully!");
        })
        .catch(error => {
            console.error('Error:', error);
            showNotification("Error generating content with Gemini.");
        })
        .finally(() => {
            geminiButton.disabled = false;
            geminiButton.innerHTML = 'Gemini(Auto)';
        });
}

function processAndSave() {
    const name = document.getElementById("unique_nameInput").value;
    const description = document.getElementById("unique_descInput").value;
    const aiResponse = document.getElementById("unique_aiResponse").value;
    if (!name || !aiResponse) {
        showNotification("Please fill in name and AI response fields before processing.");
        return;
    }
    syllabusLists.push({
        id: 'list_' + Date.now(),
        name,
        description,
        aiResponse,
        topics: processAIResponse(aiResponse),
        visualizations: [],
        selectedIndices: []
    });
    localStorage.setItem('syllabusLists', JSON.stringify(syllabusLists));
    displaySavedSyllabi();
    document.getElementById("unique_nameInput").value = "";
    document.getElementById("unique_descInput").value = "";
    document.getElementById("unique_aiResponse").value = "";
}

function processAIResponse(rawResponse) {
    return rawResponse.split('\n').filter(line => line.trim()).map(line => ({
        title: line.replace(/~~\s*|~\s*/, '').trim(),
        isSubtopic: line.trim().startsWith('~~')
    }));
}

function displaySavedSyllabi() {
    const container = document.getElementById("unique_savedListsContainer");
    container.innerHTML = "";
    syllabusLists.forEach(list => {
        const cardDiv = document.createElement("div");
        cardDiv.className = "col-md-4 mb-3";
        cardDiv.innerHTML = `
            <div class="list-card h-100 d-flex flex-column">
                <div class="flex-grow-1">
                    <h5>${list.name}</h5>
                    <p class="small text-muted">${list.description.substring(0, 50)}...</p>
                </div>
                <div>
                    <button class="btn btn-sm btn-outline-success border-success" onclick="openSyllabusWorkspace('${list.id}')"><i class="bi bi-folder2-open"></i> Open Workspace</button>
                    <button class="btn btn-sm btn-outline-danger border-danger" onclick="deleteList('${list.id}')"><i class="bi bi-trash"></i></button>
                </div>
            </div>`;
        container.appendChild(cardDiv);
    });
}

function deleteList(listId) {
    if (confirm("Are you sure you want to delete this entire syllabus list and all its saved visualizations?")) {
        syllabusLists = syllabusLists.filter(list => list.id !== listId);
        localStorage.setItem('syllabusLists', JSON.stringify(syllabusLists));
        displaySavedSyllabi();
        showNotification("Syllabus list deleted.");
    }
}

function openSyllabusWorkspace(listId) {
    const list = syllabusLists.find(l => l.id === listId);
    if (!list) {
        showNotification("Syllabus list not found.");
        return;
    }
    currentSyllabusContextId = listId;
    renderSyllabusWorkspace(listId);
    showSection('syllabus-workspace');
}

function generateForSyllabusTopic(topicTitle, listId) {
    currentSyllabusContextId = listId;
    showSection('vision-maker');
    document.getElementById('topic').value = topicTitle;
    const header = document.getElementById('vision-maker-header');
    header.innerHTML = `
        <button class="btn btn-outline-secondary" onclick="openSyllabusWorkspace('${listId}')">
            <i class="bi bi-arrow-left"></i> Back to Workspace
        </button>
        <h2 class="style-heading mb-0 text-center flex-grow-1">${topicTitle}</h2>
    `;
    showNotification(`Now, generate the visualization for "${topicTitle}". The result will be saved to your workspace.`);
    document.getElementById('generate').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
}

function renderSyllabusWorkspace(listId) {
    const list = syllabusLists.find(l => l.id === listId);
    if (!list) return;
    document.getElementById('workspace-title').textContent = list.name;
    const topicsContainer = document.getElementById('workspace-topics-container');
    topicsContainer.innerHTML = "";
    list.topics.forEach(topic => {
        const topicEl = document.createElement('a');
        topicEl.href = '#';
        if (topic.isSubtopic) {
            topicEl.className = 'list-group-item list-group-item-action';
            topicEl.innerHTML = `   ${topic.title}`;
            topicEl.onclick = (e) => {
                e.preventDefault();
                generateForSyllabusTopic(topic.title, listId);
            };
        } else {
            topicEl.className = 'list-group-item list-group-item-action list-group-item-dark';
            topicEl.textContent = topic.title;
            topicEl.style.cursor = 'default';
        }
        topicsContainer.appendChild(topicEl);
    });
    updateSavedVisualizationsDisplay(listId, 'workspace-visualizations-container', 'workspace-bulk-actions-container');
}

function initResizer() {
    const resizer = document.getElementById('viewer-resizer');
    const visualPanel = document.getElementById('viewer-visual');
    const textPanel = document.getElementById('viewer-text-container');
    const body = document.getElementById('viewer-body');

    let isResizing = false;

    resizer.addEventListener('mousedown', startResizing);
    resizer.addEventListener('dragstart', (e) => e.preventDefault()); // prevent ghost drag

    function startResizing(e) {
        e.preventDefault();
        isResizing = true;
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', stopResizing);
    }

    function handleMouseMove(e) {
        if (!isResizing) return;

        const isColumn = getComputedStyle(body).flexDirection === 'column';
        const containerRect = body.getBoundingClientRect();

        if (isColumn) {
            const newHeight = e.clientY - containerRect.top;
            const totalHeight = containerRect.height;
            const resizerHeight = resizer.offsetHeight;

            const visualHeight = newHeight - resizerHeight / 2;
            const textHeight = totalHeight - newHeight - resizerHeight / 2;

            visualPanel.style.flexBasis = `${visualHeight}px`;
            textPanel.style.flexBasis = `${textHeight}px`;
        } else {
            const newWidth = e.clientX - containerRect.left;
            const totalWidth = containerRect.width;
            const resizerWidth = resizer.offsetWidth;

            const visualWidth = newWidth - resizerWidth / 2;
            const textWidth = totalWidth - newWidth - resizerWidth / 2;

            visualPanel.style.flexBasis = `${visualWidth}px`;
            textPanel.style.flexBasis = `${textWidth}px`;
        }
    }

    function stopResizing() {
        if (!isResizing) return;
        isResizing = false;

        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', stopResizing);

        const iframe = document.getElementById('viewerIframe');
        if (iframe?.contentWindow) {
            iframe.contentWindow.dispatchEvent(new Event('resize'));
        }
    }
}
