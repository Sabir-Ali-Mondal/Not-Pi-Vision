async function generateWorkspaceStructure({ syllabus, language }) {
    const prompt = `Based on the following syllabus/description, create a detailed course structure.
The subject should be a single, concise title.
The structure should be broken down into units, then chapters, then topics.
If a full syllabus is given → strictly follow its hierarchy.
If a single broad topic is given → create a logical roadmap to study it fully according Description-by-user .
Always use meaningful names/important-questions-as-names.
Ensure coverage of all important concepts.
The output must be in JSON format. Do not include any markdown formatting like \`\`\`json.
Syllabus/Description-by-user: "${syllabus}"
Language for titles: ${language}

JSON format should be:
{
  "subject": "Subject Title",
  "units": [
    {
      "title": "Unit 1 Title",
      "chapters": [
        {
          "title": "Chapter 1.1 Title",
          "topics": [
            { "title": "Topic 1.1.1 Title", "learningObjective": "Objective..." },
            { "title": "Topic 1.1.2 Title", "learningObjective": "Objective..." }
          ]
        }
      ]
    }
  ]
}
`;

    const AUTO_CONTEXT_PROMPT = (
  topicTitle,
  chapterTitle,
  unitTitle,
  workspaceSubject,
  options,
  complexityText,
  objective
) => `
Topic: "${topicTitle}"  
Chapter: "${chapterTitle}"  
Unit: "${unitTitle}"  
Workspace: "${workspaceSubject}"  
Diagram type: "${options.diagramType}"  
Style: "${options.style}"  
Concept complexity: ${complexityText}  
Slides and Description Language: "${options.slidesLang}"  
Podcast Language: "${options.podcastLang}"  
Learning Objective: "${objective}"  

Generate a 5-line professional response explaining:  
1️⃣ The best way to showcase this topic using pro-level, code-based visualization with podcast integration.  
2️⃣ The core and most important concepts or elements that must be highlighted for this topic.  
3️⃣ The reasoning behind why this visualization style fits the topic.  
4️⃣ How interactivity and podcast narration can enhance understanding.  
5️⃣ A closing line that connects the visual and conceptual learning seamlessly.  
`;

const BASE_PROMPT = `
You are a universal topics teacher who teaches through visualization.

\${context}

Tailor explanation complexity based on \${complexityText}:
Basic → Simple overview  
Intermediate → School-level explanation  
Advanced → College-level detail  
Expert → Graduate-level depth  

First, briefly explain "\${topicTitle}" in a detailed scientific description of at least 100 words.

If the topic includes a language name (e.g., "in Hindi", default: English), write the <description> in that language simply and clearly.

---

### 🔹 Output Format (Always Follow Exactly)

1️⃣ **<description> Section**
<description>
<!-- Supports text + inline SVG + MathML equations -->
<p><strong>[TOPIC]</strong>: [Write a short paragraph summary — concise and clear scientific explanation, 1–3 sentences].</p>

<!-- Minimal, abstract SVG visualization -->
<svg width="280" height="80" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 80">
  <!-- [SVG drawing relevant to the topic; simple, gradient-based, elegant] -->
</svg>

<!-- Optional MathML Equation -->
<math xmlns="http://www.w3.org/1998/Math/MathML" display="inline">
  <mrow>
    <!-- [Simple equation or symbolic relation relevant to topic] -->
  </mrow>
</math>

<p style="margin-top:.4em;color:#d0d8ff;font-size:13px">
Language: Indian English. Podcast narration: Hindi.
</p>
</description>

---

2️⃣ **<json> Data Structure**
<json>{
  "frontSlide": {
    "topic": "\${topicTitle}",
    "chapter": "\${chapterTitle}",
    "unit": "\${unitTitle}",
    "workspace": "\${workspaceSubject}",
    "diagramType": "\${options.diagramType}",
    "style": "\${options.style}",
    "conceptComplexity": "\${complexityText}",
    "slidesLang": "\${options.slidesLang}",
    "podcastLang": "\${options.podcastLang}",
    "learningObjective": "\${objective}"
  },
  "slides": [
    {
      "title": "[Slide 1 Title]",
      "contentType": "bullets",
      "bullets": [
        "[Point 1]",
        "[Point 2]",
        "[Point 3]",
        "[Point 4]"
      ],
      "imageSearch": "[optional image keyword]"
    },
    {
      "title": "[Slide 2 Title]",
      "contentType": "table",
      "table": {
        "headers": ["Feature","Note"],
        "rows": [
          ["[Header1]","[Value1]"],
          ["[Header2]","[Value2]"],
          ["[Header3]","[Value3]"]
        ]
      },
      "imageSearch": "[optional image keyword]"
    }
  ]
}</json>

---

Topic: "\${topicTitle}"  
Chapter: "\${chapterTitle}"  
Unit: "\${unitTitle}"  
Workspace: "\${workspaceSubject}"  
Diagram type: "\${options.diagramType}"  
Style: "\${options.style}"  
Concept complexity: \${complexityText}  
Slides and Description Language: "\${options.slidesLang}"  
Podcast Language: "\${options.podcastLang}"  
Learning Objective: "\${objective}"  
Context: "\${context}"
`;

const AI_PROMPTS = {
  graph: (
    topicTitle,
    chapterTitle,
    unitTitle,
    workspaceSubject,
    options,
    complexityText,
    context,
    objective
  ) => `
${BASE_PROMPT}
Here's JSON example: \${visualjson_graph.json}
`,

  presentation: (
    topicTitle,
    chapterTitle,
    unitTitle,
    workspaceSubject,
    options,
    complexityText,
    context,
    objective
  ) => `
${BASE_PROMPT}
Here's JSON example: \${visualjson_presentation.json}
`,

  mindvoice: (
    topicTitle,
    chapterTitle,
    unitTitle,
    workspaceSubject,
    options,
    complexityText,
    context,
    objective
  ) => `
${BASE_PROMPT}
Here's JSON example: \${visualjson_mindvoice.json}
`,

  creative: (
    topicTitle,
    chapterTitle,
    unitTitle,
    workspaceSubject,
    options,
    complexityText,
    context,
    objective
  ) => `
${BASE_PROMPT}
Here's JSON example: \${visualjson_creative.json}
`,

  chemistry: (
    topicTitle,
    chapterTitle,
    unitTitle,
    workspaceSubject,
    options,
    complexityText,
    context,
    objective
  ) => `
${BASE_PROMPT}
Here's JSON example: \${visualjson_chemistry.json}
`,

  "surprise-me": (
    topicTitle,
    chapterTitle,
    unitTitle,
    workspaceSubject,
    options,
    complexityText,
    context,
    objective
  ) => `
${BASE_PROMPT}

2️⃣ **<html> Visualization (p5.js + CSS)**  
Generate a single HTML file using HTML, CSS, and p5.js for an ultra-high-fidelity visualization of "\${topicTitle}".  
It should show all major parts/stages dynamically and responsively.

🧠 **Theme (Glassmorphism)**:
:root {
  --bg-color: #0a0a10;
  --primary-color: #007bff;
  --glow-color: rgba(0, 123, 255, 0.7);
  --text-color: #f0f0f0;
  --glass-bg: rgba(25, 25, 40, 0.3);
  --glass-border: rgba(255, 255, 255, 0.15);
}

🎛️ **Controls** — bottom-right fixed buttons:
- Replay → restarts only visuals.  
- Podcast → starts/stops narration (uses SpeechSynthesis API).

Both buttons are circular, glass-styled, and responsive.  
Replay: ⟳  
Podcast: 🔊 → ⏸️ while playing  

Narration (SpeechSynthesis API):
- Narration uses alternating male/female voices or pitch variation.  
- Podcast button logic:
  - If narrating → stop immediately  
  - If not → reset visuals + start narration  
- Replay button resets only visuals.  
- Highlight visual elements in sync with narration, no blocking text boxes.  

function windowResized() { resizeCanvas(windowWidth, windowHeight); }
`,
};










    
---




        function getVisualizationPrompt(topicTitle, chapterTitle, unitTitle, workspaceSubject, options) {
            const complexityLevels = ["Basic", "Intermediate", "Advanced", "Expert"];
            const complexityText = complexityLevels[options.complexity - 1];
            const customInstructions = options.customPrompt ? `\n\nCustom instructions for this topic-related visuals:\n${options.customPrompt}` : "";

            return `You are a universal topics teacher who is teaching through visualization .

Tailor explanation complexity based on ${complexityText}:
Basic → Simple overview
Intermediate → School-level explanation
Advanced → College-level detail
Expert → Graduate-level depth

First, briefly explain "${topicTitle}" in a detailed scientific description of at least 100 words.

If the topic includes a language name (e.g., "in Hindi", default: English), write the <description> in that language very simply and easily.

Rules JSON HTML:
Then, generate a single HTML file using HTML, CSS, and p5.js to create a visually appealing, ultra-high-fidelity visualization of "${topicTitle}".
The animation should clearly depict each key stage or component of the process, with smooth transitions, dynamic structures, and accurate details.
If the topic is very easy (child-level), simplify visuals and narration appropriately.
${customInstructions}

Theme (Glassmorphism):
:root {
  --bg-color: #0a0a10;
  --primary-color: #007bff;
  --glow-color: rgba(0, 123, 255, 0.7);
  --text-color: #f0f0f0;
  --glass-bg: rgba(25, 25, 40, 0.3);
  --glass-border: rgba(255, 255, 255, 0.15);
}

Controls:
Fixed buttons at bottom-right:

1. Replay → restarts only the animation without sound.
<button id="replay" class="control-button" title="Replay">⟳</button>

2. Podcast → starts/stops narration, resets visuals when starting.
<button id="podcast" class="control-button" title="Podcast">🔊</button>
(while playing → changes to ⏸️)

.control-button {
  position: fixed; bottom: 20px; width: 50px; height: 50px;
  border-radius: 50%; background: var(--glass-bg);
  backdrop-filter: blur(12px); border: 1px solid var(--glass-border);
  box-shadow: 0 8px 32px rgba(0,0,0,0.37);
  color: var(--text-color); font-size: 20px; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.3s ease;
}
.control-button:hover { background: rgba(0,123,255,0.5); }
#replay { right: 80px; }
#podcast { 
    right: 20px; 
    background: linear-gradient(45deg, #FFD54F, #FF8C00); /* Hard gradient yellow/orange */
    box-shadow: 0 4px 15px rgba(249, 115, 22, 0.4);
    color: #fff;
}
#podcast:hover { 
    background: linear-gradient(45deg, #fde06a, #e86203); 
    transform: scale(1.05);
}

Narration (SpeechSynthesis API):
- Narration uses predefined and mapped ( alternating male/female voices OR pitch/rate variation) as like podcast.
- Podcast button logic:
  - If narrating → stop immediately
  - If not → reset visuals + start narration
- Narration structured like interactive conversation.
- No captions or text boxes that block visuals.
- Instead highlight visual elements or indicating texts which are needed, in sync.
- Replay button only resets visuals without narration.

function windowResized() { resizeCanvas(windowWidth, windowHeight); }

Rules JSON slides:
- Each slide needs a 'title', an 'imageSearch' keyword (a concise phrase), and content.
- Content must be either 'bullets' (array of 4-5 strings) OR a 'table' (with 'headers' array and 'rows' array of arrays).
- Set 'contentType' to "bullets" or "table".
- Always set "imagePosition": "none".
- Keep content concise and professional.
- Output Format: Return ONLY the raw, valid JSON object without extra text.
{
  "frontSlide": {
    "topic": ""
  },
  "slides": [
    {
      "title": "",
      "contentType": "bullets",
      "bullets": [""],
      "imageSearch": "",
      "imagePosition": "none"
    },
    {
      "title": "",
      "contentType": "table",
      "table": {
        "headers": [""],
        "rows": [[""]]
      },
      "imageSearch": "",
      "imagePosition": "none"
    }
  ]
}
Topic: "${topicTitle}"
Chapter: "${chapterTitle}" 
Unit: "${unitTitle}" 
Workspace: "${workspaceSubject}"
Diagram type: "${options.diagramType}" 
Style: "${options.style}" 
Concept complexity: ${complexityText}
Slides and Description Language : "${options.slidesLang}"
Podcast Language : "${options.podcastLang}"

Output Format:
The response must always be structured as:
1. <description>...</description>
2. Full HTML+CSS+p5.js code (responsive canvas, 30 FPS, runnable in any device).
3. Full JSON object (auto slide count, professional, concise).
`;
        }

        function getFixerPrompt(previousResponse, userFeedback) {
            return `You are an expert AI assistant tasked with fixing errors in a previous response.

Here is the original response that contains one or more issues:
--- ORIGINAL RESPONSE START ---
${previousResponse}
--- ORIGINAL RESPONSE END ---

The user has provided the following feedback to identify the problem(s):
--- USER FEEDBACK START ---
${userFeedback}
--- USER FEEDBACK END ---

Output Format:
The response must always be structured as:
1. <description>...</description>
2. Full HTML+CSS+p5.js code (responsive canvas, 30 FPS, runnable in any device).
3. Full JSON object (auto slide count, professional, concise).
{
  "frontSlide": {
    "topic": ""
  },
  "slides": [
    {
      "title": "",
      "contentType": "bullets",
      "bullets": [""],
      "imageSearch": "",
      "imagePosition": "none"
    },
    {
      "title": "",
      "contentType": "table",
      "table": {
        "headers": [""],
        "rows": [[""]]
      },
      "imageSearch": "",
      "imagePosition": "none"
    }
  ]
}
Your task is to carefully analyze the user's feedback and regenerate the *entire* original response, but with the requested fixes applied.
- Critically, you must maintain the exact same output format as the original (description, HTML, JSON).
- Only change the parts of the response that are relevant to the user's feedback.
- Do not add any extra text, explanations, or apologies.
- Output ONLY the corrected, raw response.`;
        }


        function buildTutorPrompt({
            topic,
            chapter,
            unit,
            workspace,
            moduleData
        }) {
            return `You are a personalized AI tutor. A learner has just finished studying a detailed, AI-generated module on the following topic. Your role is to help them understand the concept deeply.

**LESSON CONTEXT:**
- **Workspace:** ${workspace}
- **Unit:** ${unit}
- **Chapter:** ${chapter}
- **Topic:** ${topic}

**FULL MODULE CONTENT FOR YOUR REFERENCE:**

--- 1. SCIENTIFIC DESCRIPTION ---
${moduleData.description || "No description was provided."}

--- 2. INTERACTIVE VISUALIZATION CODE (HTML/CSS/JS) ---
{moduleData.html || "No visualization code was provided."}

--- 3. SLIDES & NOTES DATA (JSON) ---
{JSON.stringify(moduleData.json, null, 2) || "No slides data was provided."}

**YOUR TASK:**
Now, engage the learner. Do not just summarize the content. Your goal is to facilitate a discussion and clear up any confusion they might have.

Start by inviting the learner with this exact message:
"We have just explored a detailed visualization for '${topic}'. Now, let's discuss it. Based on what you saw in the animation and the notes, what questions do you have? Feel free to ask about anything. What are your doubts?"

Then, wait for their question and answer it with clear, simple, step-by-step explanations, referring back to the specific content (description, visualization, or slides) from the module provided above. Act as a patient and encouraging teacher.`;
        }








"surprise-me": (
  topicTitle,
  chapterTitle,
  unitTitle,
  workspaceSubject,
  options,
  complexityText,
  context,
  objective
) => `
You are a universal topics teacher who teaches through visualization.

${context}

Tailor explanation complexity based on ${complexityText}:
Basic → Simple overview  
Intermediate → School-level explanation  
Advanced → College-level detail  
Expert → Graduate-level depth  

First, briefly explain "${topicTitle}" in a detailed scientific description of at least 100 words.

If the topic includes a language name (e.g., "in Hindi", default: English), write the <description> in that language simply and clearly.

---

### 🔹 Output Format (Always Follow Exactly)

1️⃣ **<description> Section**
<description>
<!-- Supports text + inline SVG + MathML equations -->
<p><strong>[TOPIC]</strong>: [Write a short paragraph summary — concise and clear scientific explanation, 1–3 sentences].</p>

<!-- Minimal, abstract SVG visualization -->
<svg width="280" height="80" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 80">
  <!-- [SVG drawing relevant to the topic; simple, gradient-based, elegant] -->
</svg>

<!-- Optional MathML Equation -->
<math xmlns="http://www.w3.org/1998/Math/MathML" display="inline">
  <mrow>
    <!-- [Simple equation or symbolic relation relevant to topic] -->
  </mrow>
</math>

<p style="margin-top:.4em;color:#d0d8ff;font-size:13px">
Language: Indian English. Podcast narration: Hindi.
</p>
</description>

---

2️⃣ **<html> Visualization (p5.js + CSS)**  
Generate a single HTML file using HTML, CSS, and p5.js for an ultra-high-fidelity visualization of "${topicTitle}".  
It should show all major parts/stages dynamically and responsively.

🧠 **Theme (Glassmorphism)**:
:root {
  --bg-color: #0a0a10;
  --primary-color: #007bff;
  --glow-color: rgba(0, 123, 255, 0.7);
  --text-color: #f0f0f0;
  --glass-bg: rgba(25, 25, 40, 0.3);
  --glass-border: rgba(255, 255, 255, 0.15);
}

🎛️ **Controls** — bottom-right fixed buttons:
- Replay → restarts only visuals.  
- Podcast → starts/stops narration (uses SpeechSynthesis API).

Both buttons are circular, glass-styled, and responsive.  
Replay: ⟳  
Podcast: 🔊 → ⏸️ while playing  

Narration (SpeechSynthesis API):
- Narration uses alternating male/female voices or pitch variation.  
- Podcast button logic:
  - If narrating → stop immediately  
  - If not → reset visuals + start narration  
- Replay button resets only visuals.  
- Highlight visual elements in sync with narration, no blocking text boxes.  

function windowResized() { resizeCanvas(windowWidth, windowHeight); }

---

3️⃣ **<json> Data Structure**
<json>{
  "frontSlide": {
    "topic": "${topicTitle}",
    "chapter": "${chapterTitle}",
    "unit": "${unitTitle}",
    "workspace": "${workspaceSubject}",
    "diagramType": "${options.diagramType}",
    "style": "${options.style}",
    "conceptComplexity": "${complexityText}",
    "slidesLang": "${options.slidesLang}",
    "podcastLang": "${options.podcastLang}",
    "learningObjective": "${objective}"
  },
  "slides": [
    {
      "title": "[Slide 1 Title]",
      "contentType": "bullets",
      "bullets": [
        "[Point 1]",
        "[Point 2]",
        "[Point 3]",
        "[Point 4]"
      ],
      "imageSearch": "[optional image keyword]"
    },
    {
      "title": "[Slide 2 Title]",
      "contentType": "table",
      "table": {
        "headers": ["Feature","Note"],
        "rows": [
          ["[Header1]","[Value1]"],
          ["[Header2]","[Value2]"],
          ["[Header3]","[Value3]"]
        ]
      },
      "imageSearch": "[optional image keyword]"
    }
  ]
}</json>

---

Topic: "${topicTitle}"  
Chapter: "${chapterTitle}"  
Unit: "${unitTitle}"  
Workspace: "${workspaceSubject}"  
Diagram type: "${options.diagramType}"  
Style: "${options.style}"  
Concept complexity: ${complexityText}  
Slides and Description Language: "${options.slidesLang}"  
Podcast Language: "${options.podcastLang}"  
Learning Objective: "${objective}"  
Context: "${context}"
`,
