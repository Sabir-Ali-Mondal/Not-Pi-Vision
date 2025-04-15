let speech;
let words;
let currentWordIndex = 0;
let textContent = "";

let savedVisualizations = JSON.parse(localStorage.getItem('savedVisualizations')) || [];
let settings = JSON.parse(localStorage.getItem('settings')) || {};
let currentEditIndex = null;

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
    const topic = document.getElementById("topic");
    const style = document.getElementById("style");
    const complexity = document.getElementById("complexity");
    const customPrompt = document.getElementById("custom-prompt");
    const diagramType = document.getElementById("diagram-type");
    const searchEnginePerplexity = document.querySelector('input[name="searchEngine"][value="perplexity"]');
    const searchEngineChatGPT = document.querySelector('input[name="searchEngine"][value="chatGPT"]');


    if (settings.topic) topic.value = settings.topic;
    if (settings.style) style.value = settings.style;
    if (settings.complexity) complexity.value = settings.complexity;
    if (settings.customPrompt) customPrompt.value = settings.customPrompt;
    if (settings.diagramType) diagramType.value = settings.diagramType;
    if (settings.searchEngine === 'perplexity') {
        searchEnginePerplexity.checked = true;
    } else if (settings.searchEngine === 'chatGPT') {
        searchEngineChatGPT.checked = true;
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

    document.querySelector('.mb-3').addEventListener('change', (event) => {
        if (event.target.name === 'searchEngine') {
            settings.searchEngine = event.target.value;
            saveSettings();
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
    attachSettingTrackers();
    updateSavedVisualizationsDisplay();

    document.getElementById('upload-visualization').addEventListener('click', () => {
        document.getElementById('file-input').click();
    });

    document.getElementById('file-input').addEventListener('change', handleFileUpload);
});



function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    document.getElementById(sectionId).classList.add('animate__fadeIn');
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
    const featuresBox = document.getElementById("enhanced-features");
    featuresBox.style.display = featuresBox.style.display === "none" ? "block" : "none";
});

function openViewerMode(htmlContent, text) {
    const viewerIframe = document.getElementById('viewerIframe');
    viewerIframe.srcdoc = htmlContent;
    textContent = text;
    document.getElementById('viewerText').innerHTML = text;
    document.getElementById('viewerModal').classList.add('active');
}

function closeViewerMode() {
    stopSpeech();
    document.getElementById('viewerModal').classList.remove('active');
}

function startSpeech() {
    if (speech && speech.speaking) {
        stopSpeech();
        return;
    }

    speech = new SpeechSynthesisUtterance();
    speech.text = textContent;
    speech.onboundary = highlightWord;
    speech.onend = stopSpeech;
    speech.onerror = stopSpeech;
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
    if (event.name === 'sentence' || event.name === 'word') {
        currentWordIndex = event.charIndex;
        let beforeWord = textContent.substring(0, currentWordIndex);
        let highlightedWord = textContent.substring(currentWordIndex, currentWordIndex + event.charLength);
        let afterWord = textContent.substring(currentWordIndex + event.charLength);

        document.getElementById('viewerText').innerHTML = `
                ${beforeWord}<span class="highlighted">${highlightedWord}</span>${afterWord}
            `;
    }
}


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

    let prompt = `First, briefly explain what "${topic}" is. Then, generate a **single HTML file** using HTML, CSS, and p5.js to visualize "${topic}" in a simple and intuitive way. The visualization should be visually appealing and natural—just like how we perceive it during learning—while maintaining accuracy. Style the visualization as "${style}", with a concept complexity of ${complexity}. The diagram type should be "${diagramType}". 
Response should follow this pattern: <description>...</description> followed by the complete HTML code only. Do not include any headings, introductions, or explanations before or after the code.`;

    if (customPrompt) {
        prompt += ` Incorporate this custom instruction: ${customPrompt}.`;
    }

    const searchEngine = document.querySelector('input[name="searchEngine"]:checked').value;
    let searchUrl;
    if (searchEngine === 'perplexity') {
        searchUrl = `https://www.perplexity.ai/?q=${encodeURIComponent(prompt)}`;
    } else {
        searchUrl = `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`;
    }
    window.open(searchUrl, '_blank', 'width=800,height=600');
}

function viewContent() {
    const content = document.getElementById('generatedContent').value;

    if (!content) {
        showNotification("Please paste the content.");
        return;
    }

    const descriptionMatch = content.match(/<description>(.*?)<\/description>/);
    const htmlMatch = content.match(/<html.*?>([\s\S]*?)<\/html>/);

    let descriptionText = "";
    if (descriptionMatch) {
        descriptionText = `<p>${descriptionMatch[1]}</p>`;
    } else {
        const htmlStart = content.indexOf("<html");
        descriptionText = `<p>${content.substring(0, htmlStart).trim()}</p>`;
    }

    document.getElementById('descriptionDisplay').innerHTML = descriptionText;

    let htmlContent = '';
    if (htmlMatch) {
        htmlContent = htmlMatch[1];
        const iframe = document.createElement('iframe');
        iframe.srcdoc = htmlContent;
        iframe.width = '100%';
        iframe.height = '400px';
        document.getElementById('htmlDisplay').innerHTML = '';
        document.getElementById('htmlDisplay').appendChild(iframe);
    } else {
        document.getElementById('htmlDisplay').innerHTML = '<p>No HTML content found.</p>';
    }

    document.getElementById('contentDisplay').style.display = 'flex';

    // Scroll to the contentDisplay section
    document.getElementById('contentDisplay').scrollIntoView({
        behavior: 'smooth'
    });
}

function stopView() {
    document.getElementById('contentDisplay').style.display = 'none';
}

function openContentDisplayInViewer() {
    const htmlContent = document.getElementById('htmlDisplay').querySelector('iframe').srcdoc;
    const descriptionText = document.getElementById('descriptionDisplay').innerHTML;

    openViewerMode(htmlContent, descriptionText);
}


function saveVisualization() {
    const topic = document.getElementById("topic").value.trim();
    const style = document.getElementById("style").value;
    const complexity = document.getElementById("complexity").value;
    const content = document.getElementById('generatedContent').value;

    if (!topic || !content) {
        showNotification("Please enter a topic and paste the generated content.");
        return;
    }

    const htmlMatch = content.match(/<html.*?>([\s\S]*?)<\/html>/);
    let extractedHtmlContent = null;
    if (htmlMatch) {
        extractedHtmlContent = htmlMatch[1];
    }

    const descriptionMatch = content.match(/<description>(.*?)<\/description>/);
    let extractedTextContent = "No description available.";

    if (descriptionMatch) {
        extractedTextContent = descriptionMatch[1];
    } else {
        const htmlStart = content.indexOf("<html");
        extractedTextContent = content.substring(0, htmlStart).trim();
    }


    const visualization = {
        topic: topic,
        style: style,
        complexity: complexity,
        content: content,
        htmlContent: extractedHtmlContent,
        textContent: extractedTextContent
    };

    savedVisualizations.push(visualization);
    updateSavedVisualizationsDisplay();
    localStorage.setItem('savedVisualizations', JSON.stringify(savedVisualizations));
    showNotification("Visualization saved!");
}

function updateSavedVisualizationsDisplay() {
    const container = document.getElementById("cards-container");
    container.innerHTML = "";

    savedVisualizations.forEach((visualization, index) => {
        const card = document.createElement("div");
        card.className = "col-md-6 col-lg-4";
        card.innerHTML = `
            <div class="saved-card mb-3">
                <h5 class="fw-bold">${visualization.topic}</h5>
                <p class="text-muted small">Style: ${visualization.style} • Complexity: ${visualization.complexity}</p>
                <div class="d-flex flex-wrap gap-2">
                    <button class="btn btn-sm btn-outline-primary" onclick="exportVisualization(${index}, 'full')">📤 Export (Full)</button>
                    <button class="btn btn-sm btn-outline-primary" onclick="exportVisualization(${index}, 'html')">📤 Export (HTML)</button>
                    <button class="btn btn-sm btn-outline-secondary" onclick="editVisualization(${index})" data-bs-toggle="modal" data-bs-target="#editModal">🖊️ Edit</button>
                    <button class="btn btn-sm btn-outline-success" onclick="viewSavedVisualization(${index})">👁️ View</button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteVisualization(${index})">🗑️ Delete</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function viewSavedVisualization(index) {
    const visualization = savedVisualizations[index];

    if (visualization.htmlContent && visualization.textContent) {
        openViewerMode(visualization.htmlContent, visualization.textContent);
    } else {
        const content = visualization.content;
        const descriptionMatch = content.match(/<description>(.*?)<\/description>/);
        const htmlMatch = content.match(/<html.*?>([\s\S]*?)<\/html>/);

        let extractedDescription = "No description available.";
        if (descriptionMatch) {
            extractedDescription = descriptionMatch[1];
        } else {
            const htmlStart = content.indexOf("<html");
            extractedDescription = content.substring(0, htmlStart).trim();
        }

        let extractedHtml = "";
        if (htmlMatch) {
            extractedHtml = htmlMatch[1];
        }

        visualization.textContent = extractedDescription;
        visualization.htmlContent = extractedHtml;
        savedVisualizations[index] = visualization;
        localStorage.setItem('savedVisualizations', JSON.stringify(savedVisualizations));

        openViewerMode(extractedHtml, extractedDescription);
    }
}

function deleteVisualization(index) {
    if (confirm("Are you sure you want to delete this visualization?")) {
        savedVisualizations.splice(index, 1);
        updateSavedVisualizationsDisplay();
        localStorage.setItem('savedVisualizations', JSON.stringify(savedVisualizations));
        showNotification("Visualization deleted!");
    }
}

function editVisualization(index) {
    currentEditIndex = index;
    const visualization = savedVisualizations[index];
    document.getElementById('editTopic').value = visualization.topic;

    document.getElementById('saveEdit').onclick = function() {
        saveEditedVisualization(index);
    };

}

function saveEditedVisualization(index) {
    const newTopic = document.getElementById('editTopic').value;
    savedVisualizations[index].topic = newTopic;

    updateSavedVisualizationsDisplay();
    localStorage.setItem('savedVisualizations', JSON.stringify(savedVisualizations));

    const editModal = new bootstrap.Modal(document.getElementById('editModal'));
    editModal.hide();

    showNotification("Visualization updated!");
}

function exportVisualization(index, type) {
    const visualization = savedVisualizations[index];
    let content;
    let filename;

    if (type === 'full') {
        content = visualization.content;
        filename = `${visualization.topic.replace(/\s+/g, '_')}.txt`;
    } else {
        content = visualization.htmlContent;
        filename = `${visualization.topic.replace(/\s+/g, '_')}.html`;
    }

    const blob = new Blob([content], {
        type: 'text/plain'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showNotification("Visualization exported!");
}

function handleFileUpload(event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            try {
                const fileContent = e.target.result;
                let topic = "Uploaded Visualization";
                const topicMatch = fileContent.match(/<title>(.*?)<\/title>/i);
                if (topicMatch && topicMatch[1]) {
                    topic = topicMatch[1];
                }

                const newVisualization = {
                    topic: topic,
                    style: "Uploaded",
                    complexity: "Unknown",
                    content: fileContent,
                    htmlContent: null,
                    textContent: "Uploaded content."
                };

                savedVisualizations.push(newVisualization);
                updateSavedVisualizationsDisplay();
                localStorage.setItem('savedVisualizations', JSON.stringify(savedVisualizations));
                showNotification("Visualization uploaded and saved!");

            } catch (error) {
                showNotification("Error processing the file.");
                console.error("File processing error:", error);
            }
        };

        reader.readAsText(file);
    }
}

function resetAllData() {
    if (confirm("Are you sure you want to reset ALL data? This action cannot be undone.")) {
        localStorage.clear();
        savedVisualizations = [];
        settings = {};
        updateSavedVisualizationsDisplay();
        showNotification("All data has been reset.");
    }
}

function stopViewer() {
    closeViewerMode();
}
