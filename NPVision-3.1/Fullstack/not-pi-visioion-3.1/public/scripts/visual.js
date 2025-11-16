// ===============================
// TEMPLATE PATHS (LOCAL)
// ===============================
const TEMPLATE_PATHS = {
    graph: "/templates-divs/visual-divs/graph.html",
    chemistry: "/templates-divs/visual-divs/chem.html",
    mindvoice: "/templates-divs/visual-divs/mindvoice.html",
    presentation: "/templates-divs/visual-divs/presentation.html",
    quiz: "/templates-divs/visual-divs/quiz.html"
};

// ===============================
// FETCH LOCAL TEMPLATE
// ===============================
async function loadTemplate(type) {
    const path = TEMPLATE_PATHS[type];

    if (!path) {
        console.error("❌ Template not found:", type);
        return null;
    }

    try {
        const res = await fetch(path);
        return await res.text();
    } catch (err) {
        console.error("❌ Failed to load template:", path, err);
        return null;
    }
}

// ===============================
// REPLACE: let ExampleJson = {...};
// ===============================
function insertExampleJson(html, jsonObject) {
    const jsonString = JSON.stringify(jsonObject, null, 2);

    // Multi-line safe, non-greedy, robust
    const pattern = /let\s+ExampleJson\s*=\s*\{[\s\S]*?\}\s*;?/;

    const replaced = html.replace(pattern, `let ExampleJson = ${jsonString};`);

    return replaced;
}

// ===============================
// RE-EXECUTE SCRIPT TAGS
// ===============================
function executeScripts(container) {
    const scripts = container.querySelectorAll("script");

    scripts.forEach(oldScript => {
        const newScript = document.createElement("script");

        // copy all attributes
        for (let attr of oldScript.attributes) {
            newScript.setAttribute(attr.name, attr.value);
        }

        // copy content
        newScript.textContent = oldScript.textContent;

        oldScript.replaceWith(newScript);
    });
}

// ===============================
// MAIN RENDER ENGINE
// ===============================
async function renderVisual(blocks, containerId = "vizContainer") {
    const container = document.getElementById(containerId);
    if (!container) return console.error("❌ Missing container:", containerId);

    container.innerHTML = ""; // clear old content

    // Case 1: Full HTML comes directly from API
    if (blocks.visualType === "html") {
        container.innerHTML = blocks.visual;
        executeScripts(container);
        return;
    }

    // Case 2: Load template and inject JSON
    const template = await loadTemplate(blocks.visualType);
    if (!template) {
        container.innerHTML = "<p style='color:red;'>Failed to load template.</p>";
        return;
    }

    // Replace ExampleJson in the template
    const finalHTML = insertExampleJson(template, blocks.visual);

    container.innerHTML = finalHTML;

    // Re-run all <script> blocks for p5.js etc.
    executeScripts(container);
}
