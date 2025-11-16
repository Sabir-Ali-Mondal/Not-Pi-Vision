// ===============================
// TEMPLATE PATH (LOCAL)
// ===============================
const PAGES_TEMPLATE = "/templates-divs/pages-div/description.html";


// ===============================
// FETCH LOCAL TEMPLATE
// ===============================
async function loadPageTemplate() {
    try {
        const res = await fetch(PAGES_TEMPLATE);
        return await res.text();
    } catch (err) {
        console.error("❌ Failed to load description template:", err);
        return null;
    }
}


// ===============================
// REPLACE: let ExampleJson = {...};
// ===============================
function insertPageJson(html, jsonObject) {
    if (!jsonObject) return html;

    const jsonString = JSON.stringify(jsonObject, null, 2);

    const pattern = /let\s+ExampleJson\s*=\s*\{[\s\S]*?\}\s*;?/;

    return html.replace(pattern, `let ExampleJson = ${jsonString};`);
}


// ===============================
// EXECUTE <script> TAGS
// ===============================
function executePageScripts(container) {
    const scripts = container.querySelectorAll("script");

    scripts.forEach(oldScript => {
        const newScript = document.createElement("script");

        // Copy attributes (type, src, etc.)
        for (let attr of oldScript.attributes) {
            newScript.setAttribute(attr.name, attr.value);
        }

        newScript.textContent = oldScript.textContent;

        oldScript.replaceWith(newScript);
    });
}


// ===============================
// MAIN DESCRIPTION RENDER ENGINE
// ===============================
async function renderPages(desc, containerId = "pagesContent") {
    const container = document.getElementById(containerId);
    if (!container) return console.error("❌ Missing pages container:", containerId);


    // CASE 1: API RESPONSE provides pure HTML directly
    // ------------------------------------------------
    if (typeof desc === "string") {
        container.innerHTML = desc;
        executePageScripts(container);
        return;
    }


    // CASE 2: API RESPONSE provides JSON to inject into template
    // ------------------------------------------------
    const template = await loadPageTemplate();

    if (!template) {
        container.innerHTML = `<p style="color:red">Failed to load description template.</p>`;
        return;
    }

    // Replace ExampleJson inside the description template
    const modifiedHTML = insertPageJson(template, desc);

    // Insert into DOM
    container.innerHTML = modifiedHTML;

    // Run scripts inside description template
    executePageScripts(container);
}
