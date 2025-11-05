async function generateWorkspaceStructure({ syllabus, language }) {
    const model = 'gemini-2.5-pro'; // Better for complex JSON
    const prompt = `Based on the following syllabus/description, create a detailed course structure.
The subject should be a single, concise title.
The structure should be broken down into units, then chapters, then topics.
The output must be in JSON format. Do not include any markdown formatting like \`\`\`json.
Syllabus: "${syllabus}"
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

const AI_PROMPTS = {
  graph: (
    topic,
    complexity,
  ) => `Generate a comprehensive data visualization structure for "${topic}" at ${complexity} level.
  
IMPORTANT: Return ONLY the specified format below. NO markdown, NO explanations, NO extra text.

<description>
Provide a 150+ word explanation of this graph visualization, including its purpose, data structure, interpretation methods, and educational value. Discuss how this visualization helps understand ${topic}.
</description>

<json>
{
  "title": "Data Visualization: ${topic}",
  "type": "graph",
  "theme": {
    "fontFamily": "Inter, sans-serif",
    "textColor": "#e2e8f0",
    "gridColor": "rgba(255, 255, 255, 0.15)",
    "colors": ["#8b5cf6", "#3b82f6", "#10b981", "#f59e0b", "#ef4444"]
  },
  "scenes": [
    {
      "id": "intro",
      "type": "title",
      "title": "${topic}",
      "subtitle": "Data Visualization at ${complexity} Level"
    }
  ]
}
</json>

<html>
<div style="background: #0a0a0f; color: #e2e8f0; padding: 30px; border-radius: 12px; border: 1px solid rgba(34,197,94,0.2);">
  <h2 style="color: #22C55E; margin-bottom: 20px;">📊 ${topic} - Graph Visualization</h2>
  <p style="line-height: 1.6; margin-bottom: 20px;">Interactive graph visualization for ${topic}. Features custom color scheme and interactive elements.</p>
  <div style="background: rgba(34,197,94,0.1); padding: 20px; border-radius: 8px;">
    <p style="color: #4ADE80; font-weight: 600; margin-bottom: 5px;">📊 Chart Type: Interactive Data Visualization</p>
    <p style="color: #B0B0B0; margin-top: 10px;">This graph uses multi-dimensional data to showcase relationships and trends in ${topic}.</p>
  </div>
</div>
</html>`,

  presentation: (
    topic,
    complexity,
  ) => `Generate a professional presentation outline for "${topic}" at ${complexity} level.

IMPORTANT: Return ONLY the specified format below. NO markdown, NO explanations, NO extra text.

<description>
Write a 150+ word description of this presentation, including slide topics, presentation flow, key learning objectives, and how it effectively communicates ${topic}. Explain the pedagogical approach.
</description>

<json>
{
  "title": "Presentation: ${topic}",
  "type": "presentation",
  "slides": [
    {
      "id": 1,
      "title": "Introduction to ${topic}",
      "content": "Key concepts and overview",
      "speaker_notes": "Begin with an engaging introduction"
    },
    {
      "id": 2,
      "title": "Core Principles",
      "content": "Main ideas and frameworks",
      "speaker_notes": "Explain the fundamental concepts"
    }
  ]
}
</json>

<html>
<div style="background: #0a0a0f; color: #e2e8f0; padding: 30px; border-radius: 12px; border: 1px solid rgba(34,197,94,0.2);">
  <h2 style="color: #22C55E; margin-bottom: 20px;">📊 Presentation: ${topic}</h2>
  <div style="background: rgba(34,197,94,0.1); padding: 20px; border-radius: 8px;">
    <p style="color: #4ADE80; margin-bottom: 15px;"><strong>Complexity:</strong> ${complexity}</p>
    <p style="color: #B0B0B0; line-height: 1.6;">Professional presentation with multiple slides covering ${topic} in detail.</p>
  </div>
</div>
</html>`,

  mindvoice: (topic, complexity) => `Create a comprehensive mind map for "${topic}" at ${complexity} level.

IMPORTANT: Return ONLY the specified format below. NO markdown, NO explanations, NO extra text.

<description>
Write a 150+ word explanation of this mind map, including its hierarchical structure, key branches, relationships between concepts, and how it helps organize knowledge about ${topic}. Explain the learning benefits.
</description>

<json>
{
  "title": "MindVoice Map: ${topic}",
  "type": "mindvoice",
  "root": {
    "id": "root",
    "name": "${topic}",
    "description": "Central concept",
    "children": [
      {
        "id": "branch1",
        "name": "Key Concept 1",
        "description": "First major branch",
        "children": []
      },
      {
        "id": "branch2",
        "name": "Key Concept 2",
        "description": "Second major branch",
        "children": []
      }
    ]
  }
}
</json>

<html>
<div style="background: #0a0a0f; color: #e2e8f0; padding: 30px; border-radius: 12px; border: 1px solid rgba(34,197,94,0.2);">
  <h2 style="color: #22C55E; margin-bottom: 20px;">🧠 MindVoice Map: ${topic}</h2>
  <p style="line-height: 1.6; margin-bottom: 20px; color: #B0B0B0;">Hierarchical mind map showing relationships and structure of ${topic}.</p>
  <div style="background: rgba(249,115,22,0.1); padding: 20px; border-radius: 8px; border-left: 4px solid #F97316;">
    <p style="color: #FCA5A5;">Central Topic: ${topic}</p>
  </div>
</div>
</html>`,

  creative: (topic, complexity) => `Generate a creative video script for "${topic}" at ${complexity} level.

IMPORTANT: Return ONLY the specified format below. NO markdown, NO explanations, NO extra text.

<description>
Write a 150+ word description of this creative video, including its narrative structure, visual style, target audience, pacing, and how it makes ${topic} engaging and memorable. Explain the creative approach.
</description>

<json>
{
  "title": "Creative Video: ${topic}",
  "type": "creative",
  "scenes": [
    {
      "id": "scene1",
      "type": "intro",
      "text": "Welcome to ${topic}",
      "narration": "Hook the audience with an engaging introduction"
    },
    {
      "id": "scene2",
      "type": "content",
      "text": "Key Insights",
      "narration": "Explain main concepts in an entertaining way"
    }
  ]
}
</json>

<html>
<div style="background: #0a0a0f; color: #e2e8f0; padding: 30px; border-radius: 12px; border: 1px solid rgba(34,197,94,0.2);">
  <h2 style="color: #22C55E; margin-bottom: 20px;">🎬 Creative Video: ${topic}</h2>
  <p style="line-height: 1.6; margin-bottom: 20px; color: #B0B0B0;">Engaging video script designed to present ${topic} in a creative and memorable way.</p>
  <div style="background: rgba(34,197,94,0.1); padding: 20px; border-radius: 8px;">
    <p style="color: #4ADE80;"><strong>Complexity Level:</strong> ${complexity}</p>
  </div>
</div>
</html>`,

  chemistry: (topic, complexity) => `Create a chemistry visualization for "${topic}" at ${complexity} level.

IMPORTANT: Return ONLY the specified format below. NO markdown, NO explanations, NO extra text.

<description>
Write a 150+ word explanation of this chemistry visualization, including molecular structures, reaction mechanisms, or 3D models. Explain how this helps understand ${topic} at the molecular level.
</description>

<json>
{
  "title": "Chemistry: ${topic}",
  "type": "chemistry",
  "molecules": {},
  "mechanism": []
}
</json>

<html>
<div style="background: #0a0a0f; color: #e2e8f0; padding: 30px; border-radius: 12px; border: 1px solid rgba(34,197,94,0.2);">
  <h2 style="color: #F97316; margin-bottom: 20px;">⚗️ Chemistry: ${topic}</h2>
  <p style="line-height: 1.6; color: #B0B0B0;">Molecular visualization and interactive 3D models for understanding ${topic}.</p>
</div>
</html>`,

  "surprise-me": (
    topic,
    complexity,
  ) => `Generate the MOST ENGAGING and CREATIVE content for "${topic}" at ${complexity} level. 
  
Choose the best format (graph, presentation, mindmap, creative, or chemistry) based on the topic. Be creative and surprising!

IMPORTANT: Return ONLY the specified format below. NO markdown, NO explanations, NO extra text.

<description>
Write a 150+ word creative description explaining this surprising content approach to ${topic}. Include why this format was chosen and what makes it engaging.
</description>

<json>
{
  "title": "Surprise Me: ${topic}",
  "type": "surprise",
  "format_chosen": "creative",
  "content": "Surprise content structure here"
}
</json>

<html>
<div style="background: linear-gradient(135deg, rgba(34,197,94,0.2), rgba(249,115,22,0.2)); color: #e2e8f0; padding: 30px; border-radius: 12px; border: 1px solid rgba(249,115,22,0.4);">
  <h2 style="background: linear-gradient(135deg, #22C55E, #F97316); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 20px;">✨ Surprise Me: ${topic}</h2>
  <p style="line-height: 1.6; color: #B0B0B0;">A creatively chosen format designed to make learning ${topic} exciting and unexpected!</p>
</div>
</html>`,
}
       function getWorkspacePrompt(title, syllabus) {
            return `You are given the following:\n- Title: "${title}"\n- Syllabus/Topic: "${syllabus}"\n\nGenerate a structured JSON object. Rules: - JSON must have: subject, units (array), chapters (array in unit), topics (array in chapter). - Each topic must include: topicTitle and status: "pending". - Case Handling:  • If a full syllabus is given → strictly follow its hierarchy.  • If a single broad topic is given → create a logical roadmap to study it fully. - Always use meaningful names. - Ensure coverage of all important concepts. - Output ONLY the raw, valid JSON object. JSON Output Example: {  "subject": "Sample Subject",  "units": [{"unitTitle": "Unit 1: Foundations", "chapters": [{"chapterTitle": "Chapter 1.1: Introduction", "topics": [{"topicTitle": "Basic Concepts", "status": "pending"}]}]}] }`;
        }

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
