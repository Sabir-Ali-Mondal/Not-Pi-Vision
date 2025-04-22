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
    if (settings.searchEngine === 'mistral') {
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

    let prompt = `First, briefly explain "${topic}" detailed description atleast 300 words. Then, generate a *single HTML file* using HTML, CSS, and p5.js to visualize "${topic}" in a simple and intuitive way. The visualization should be visually appealing and natural—just like how we perceive it during learning—while maintaining accuracy. Style the visualization as "${style}", with a concept complexity of ${complexity} /10. The diagram type should be "${diagramType}".If HTML works in such a way(if not needed no need) , add this replay button:
    <button style="position:fixed;bottom:20px;right:20px;background:#07f;color:#fff;font-size:20px;border-radius:50%;width:30px;height:30px" name="replay" title="Replay">⟳</button>
    Response should follow this pattern: <description>...</description> followed by the complete HTML code only. Do not include any headings, introductions, or explanations before or after the code.`;

    if (customPrompt) {
        prompt += ` Incorporate this custom instruction: ${customPrompt}.`;
    }

    const searchEngine = document.querySelector('input[name="searchEngine"]:checked').value;
    let searchUrl;
    if (searchEngine === 'mistral') {
        searchUrl = `https://chat.mistral.ai/chat?q=${encodeURIComponent(prompt)}`;
    } else if (searchEngine === 'chatGPT') {
        searchUrl = `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`;
    } else if (searchEngine === 'gemini') {
        // Send prompt to backend
        document.getElementById("generate").disabled = true;
        document.getElementById("generate").innerHTML = 'Generating... <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
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
                viewContent(); // Call viewContent to visualize the generated content
                showNotification("Automatic visualization generated successfully!"); // Show success notification
            })
            .catch(error => {
                console.error('Error:', error);
                showNotification("Error generating content.");
            })
            .finally(() => {
                document.getElementById("generate").disabled = false;
                document.getElementById("generate").innerHTML = 'Generate <i class="bi bi-lightning-charge"></i>';
            });
        return;
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
        topic: topic.substring(0, 120) + " ...",
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
                <div class="d-flex flex-wrap align-items-center gap-2">
                    <button class="btn btn-sm btn-outline-primary border-primary" onclick="exportVisualization(${index}, 'full')">
                        <i class="bi bi-file-earmark-arrow-down"></i> Full File
                    </button>
                    <button class="btn btn-sm btn-outline-primary border-primary" onclick="exportVisualization(${index}, 'html')">
                        <i class="bi bi-file-earmark-arrow-down"></i> HTML
                    </button>
                    <button class="btn btn-sm btn-outline-secondary border-secondary" onclick="editVisualization(${index})" data-bs-toggle="modal" data-bs-target="#editModal">
                        <i class="bi bi-pencil"></i> Name
                    </button>
                    <button class="btn btn-sm btn-outline-success border-success" onclick="viewSavedVisualization(${index})">
                        <i class="bi bi-eye"></i> View
                    </button>
                    <button class="btn btn-sm btn-outline-danger border-danger" onclick="deleteVisualization(${index})">
                        <i class="bi bi-trash"></i> Delete
                    </button>
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




//-------------////--------------////--------------////--------------////--------------//

//Syllabus Splitter Code starts 
let currentListId = null;

function updateLabels() {
    const mode = document.getElementById("unique_modeSelect").value;
    document.getElementById("unique_nameLabel").innerText = mode === "splitter" ? "Enter Subject Name:" :
        "Enter Topic Name:";
    document.getElementById("unique_descLabel").innerText = mode === "splitter" ? "Enter Syllabus:" :
        "Enter Big Topic Description:";
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
        alert('Failed to paste from clipboard.  Check console.'); // User feedback
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

    let searchUrl = "";
    if (engine === 'perplexity') {
        searchUrl = `https://www.perplexity.ai/?q=${encodeURIComponent(prompt)}`;
    } else {
        searchUrl = `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`;
    }
    window.open(searchUrl, '_blank', 'width=800,height=600');
}

function processAndSave() {
    const name = document.getElementById("unique_nameInput").value;
    const description = document.getElementById("unique_descInput").value;
    const aiResponse = document.getElementById("unique_aiResponse").value;

    if (!name || !aiResponse) {
        showNotification("Please fill in name fields before processing.");
        return;
    }

    const topics = processAIResponse(aiResponse);

    // Create a unique ID for this syllabus list
    const listId = generateId();

    const syllabusData = {
        id: listId,
        name: name,
        description: description,
        aiResponse: aiResponse,
        topics: topics,
        pickedTopics: {} // Start with empty picked topics
    };

    // Save to local storage
    saveSyllabusList(syllabusData);

    // Clear input fields after saving
    document.getElementById("unique_nameInput").value = "";
    document.getElementById("unique_descInput").value = "";
    document.getElementById("unique_aiResponse").value = "";

    // Refresh the displayed lists
    displaySavedSyllabi();
}

function processAIResponse(rawResponse) {
    const lines = rawResponse.split('\n');
    const topics = [];
    let currentHeading = null;
    let topicCounter = 1;
    let subtopicCounter = 1;

    lines.forEach(line => {
        line = line.trim();
        if (!line) return;

        const headingMatch = line.match(/^~\s+(.*)$/); // Matches "~ Heading"
        const subtopicMatch = line.match(/^~~\s+(.*)$/); // Matches "~~ Subtopic"

        if (headingMatch) {
            const title = headingMatch[1];
            if (currentHeading) {
                currentHeading.content = currentHeading.content.trim();
                subtopicCounter = 1; // Reset subtopic counter for new heading
            }
            currentHeading = {
                id: topicCounter.toString() + " :&nbsp;&nbsp;&nbsp;", // Simple numerical ID for heading
                title: title,
                isSubtopic: false,
                content: ''
            };
            topics.push(currentHeading);
            topicCounter++;
        } else if (subtopicMatch) {
            const title = subtopicMatch[1];
            if (currentHeading) {
                currentHeading.content = currentHeading.content.trim();
            }
            const subtopic = {
                id: "&nbsp;&nbsp;&nbsp;&nbsp;(" + (topicCounter - 1).toString() + "." + subtopicCounter.toString() + ") :", // currentHeading.id +
                title: title,
                isSubtopic: true,
                content: ''
            };
            topics.push(subtopic);
            currentHeading = subtopic; // Set current heading to subtopic
            subtopicCounter++;
        } else if (currentHeading) {
            currentHeading.content += line + '\n';
        } else {
            console.warn("Orphaned line (no active heading):", line);
        }
    });
    if (currentHeading) {
        currentHeading.content = currentHeading.content.trim();
    }

    return topics;
}

function generateId() {
    return 'list_' + Math.random().toString(36).substring(2, 15); // Simple ID generator
}

function saveSyllabusList(syllabusData) {
    let savedLists = JSON.parse(localStorage.getItem('syllabusLists') || '[]');
    savedLists.push(syllabusData);
    localStorage.setItem('syllabusLists', JSON.stringify(savedLists));
}

function displaySavedSyllabi() {
    const savedLists = JSON.parse(localStorage.getItem('syllabusLists') || '[]');
    const container = document.getElementById("unique_savedListsContainer");
    container.innerHTML = ""; // Clear existing cards

    savedLists.forEach(list => {
        const cardDiv = document.createElement("div");
        cardDiv.className = "col-md-4 mb-2"; // Bootstrap column and margin
        cardDiv.innerHTML = `
                    <div class="list-card saved-card">
                        <h5>${list.name}</h5>
                        <p>${list.description.substring(0, 20)}....</p>
                        <button class="btn btn-sm  btn-outline-success border-success" onclick="viewList('${list.id}')" data-bs-toggle="modal" data-bs-target="#unique_viewListModal"><i class="bi bi-eye"></i> View</button>
                        <button class="btn btn-sm btn-outline-warning border-warning" onclick="downloadList('${list.id}')"><i class="bi bi-file-earmark-arrow-down"></i> Download</button>
                        <button class="btn btn-sm btn-outline-danger border-danger" onclick="deleteList('${list.id}')"><i class="bi bi-trash"></i> Delete</button>
                    </div>
                `;
        container.appendChild(cardDiv);
    });
}

function viewList(listId) {
    currentListId = listId; // store it globally
    const savedLists = JSON.parse(localStorage.getItem('syllabusLists') || '[]');
    const list = savedLists.find(list => list.id === listId);

    if (!list) {
        alert("List not found.");
        return;
    }

    const modalTitle = document.getElementById("unique_viewListModalLabel");
    const modalBody = document.getElementById("unique_viewListModalBody");

    modalTitle.innerText = list.name;
    modalBody.innerHTML = ""; // Clear previous content


    // Create uncheck all and delete all button
    const buttonsDiv = document.createElement("div");
    buttonsDiv.className = "mb-3";

    const uncheckAllButton = document.createElement("button");
    uncheckAllButton.className = "btn btn-outline-success border-success me-2";
    uncheckAllButton.innerText = "Uncheck All";
    uncheckAllButton.onclick = () => uncheckAll(listId); // Pass listId
    buttonsDiv.appendChild(uncheckAllButton);

    const deleteAllButton = document.createElement("button");
    deleteAllButton.className = "btn btn-outline-danger border-danger";
    deleteAllButton.innerText = "Delete All Picked";
    deleteAllButton.onclick = () => deleteAllPicked(listId); // Pass listId
    buttonsDiv.appendChild(deleteAllButton);

    modalBody.appendChild(buttonsDiv);

    list.topics.forEach(topic => {
        const div = document.createElement("div");
        div.className = "subtopic-card card-modern"; /* Added card-modern class */

        // Check if this topic is picked
        const isPicked = list.pickedTopics && list.pickedTopics[topic.id];
        if (isPicked) {
            div.classList.add("picked");
        }

        let content = `<strong>${topic.id}</strong> ${topic.title}`;
        if (topic.content) {
            content += `<br><small>${topic.content.substring(0,50)}...</small>`; //Show content if available
        }
        div.innerHTML = content;

        if (topic.isSubtopic) {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'form-check-input pick-checkbox';
            checkbox.id = `checkbox-${listId}-${topic.id}`;
            checkbox.checked = isPicked;
            checkbox.onchange = () => pickSubtopic(listId, topic.id, topic.title, checkbox.checked);

            const label = document.createElement('label');
            label.className = 'form-check-label';
            label.htmlFor = `checkbox-${listId}-${topic.id}`;
            // label.textContent = 'Pick';

            const pickButton = document.createElement('div');
            pickButton.className = 'pick-button';
            pickButton.appendChild(checkbox);
            pickButton.appendChild(label);

            div.appendChild(pickButton);
        }

        modalBody.appendChild(div);
    });
}

function downloadList(listId) {
    const savedLists = JSON.parse(localStorage.getItem('syllabusLists') || '[]');
    const list = savedLists.find(list => list.id === listId);

    if (!list) {
        alert("List not found.");
        return;
    }

    let downloadText = "";
    list.topics.forEach(topic => {
        const headingPrefix = topic.isSubtopic ? "~~ " : "~ ";
        downloadText += headingPrefix + topic.title + "\n";
        if (topic.content) {
            downloadText += topic.content + "\n";
        }
        downloadText += "\n"; // Add an extra newline for spacing between topics
    });


    const blob = new Blob([downloadText], {
        type: "text/plain"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${list.name.replace(/[^a-zA-Z0-9]/g, '_')}.txt`; // Sanitize filename
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
async function copyToClipboard(text) {
    try {
        const cleanedText = text.replace(/&nbsp;&nbsp;&nbsp;&nbsp;/g, '');
        await navigator.clipboard.writeText(cleanedText);
        showNotification("Topic copied to clipboard!");
    } catch (err) {
        console.error('Failed to copy: ', err);
        alert('Failed to copy to clipboard. Check console.');
    }
}

function deleteList(listId) {
    if (confirm("Are you sure you want to delete this syllabus list?")) {
        let savedLists = JSON.parse(localStorage.getItem('syllabusLists') || '[]');
        savedLists = savedLists.filter(list => list.id !== listId);
        localStorage.setItem('syllabusLists', JSON.stringify(savedLists));
        displaySavedSyllabi(); // Refresh display
    }
}

function pickSubtopic(listId, topicId, topicTitle, isChecked) {
    const savedLists = JSON.parse(localStorage.getItem('syllabusLists') || '[]');
    const listIndex = savedLists.findIndex(list => list.id === listId);

    if (listIndex === -1) {
        alert("List not found.");
        return;
    }

    if (!savedLists[listIndex].pickedTopics) {
        savedLists[listIndex].pickedTopics = {};
    }

    if (isChecked) {
        savedLists[listIndex].pickedTopics[topicId] = topicTitle;
        //Copy to clipboard when picked
        const topic = savedLists[listIndex].topics.find(t => t.id === topicId);
        if (topic) {
            copyToClipboard(`${topic.id} ${topic.title}\n${topic.content}`);
        }
    } else {
        delete savedLists[listIndex].pickedTopics[topicId];
    }


    // Save the updated list
    localStorage.setItem('syllabusLists', JSON.stringify(savedLists));

    // Re-render the modal content to update the UI
    viewList(listId);
}

function uncheckAll(listId) {
    const savedLists = JSON.parse(localStorage.getItem('syllabusLists') || '[]');
    const listIndex = savedLists.findIndex(list => list.id === listId);

    if (listIndex === -1) {
        alert("List not found.");
        return;
    }

    // Clear all picked topics for the current list
    savedLists[listIndex].pickedTopics = {};

    // Save the updated list
    localStorage.setItem('syllabusLists', JSON.stringify(savedLists));

    // Re-render the modal content to update the UI
    viewList(listId);
}

function deleteAllPicked(listId) {
    if (confirm("Are you sure you want to delete all picked topics?")) {
        const savedLists = JSON.parse(localStorage.getItem('syllabusLists') || '[]');
        const listIndex = savedLists.findIndex(list => list.id === listId);

        if (listIndex === -1) {
            alert("List not found.");
            return;
        }

        // Filter out all picked topics from the list
        savedLists[listIndex].topics = savedLists[listIndex].topics.filter(topic => !savedLists[listIndex]
            .pickedTopics[topic.id]);
        savedLists[listIndex].pickedTopics = {}; // Clear picked topics

        // Save the updated list
        localStorage.setItem('syllabusLists', JSON.stringify(savedLists));

        // Re-render the modal content to update the UI
        viewList(listId);
    }
}

window.onload = () => {
    displaySavedSyllabi();
}
