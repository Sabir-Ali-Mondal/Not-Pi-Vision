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
            { "title": "Topic 1.1.1 Title", "objective": "learningObjective..." },
            { "title": "Topic 1.1.2 Title", "objective": "learningObjective..." }
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
1️. The best way to showcase this topic using pro-level, code-based visualization with podcast integration.  
2️. The core and most important concepts or elements that must be highlighted for this topic.  
3️. The reasoning behind why this visualization style fits the topic.  
4️. How interactivity and podcast narration can enhance understanding.  
5️. A closing line that connects the visual and conceptual learning seamlessly.  
`;

const BASE_PROMPT = `
You are a universal topics teacher and and a pro frontend coder who teaches through video like visualization with narration .

${context}

Topic: "${topicTitle}"  
Chapter: "${chapterTitle}"  
Unit: "${unitTitle}"  
Workspace: "${workspaceSubject}"  
Concept complexity: ${complexityText}  
Slides and Description Language: "${options.slidesLang}"  
Podcast Language: "${options.podcastLang}"  
Learning Objective: "${objective}"  
Additional: [ ( Ignore these all time. Use only for generating a HTML visual. No HTML no use .)
Diagram type: "${options.diagramType}"  Style: "${options.style}"  ]

Tailor explanation complexity based on complexityText = ${complexityText} ( Auto detect concept depth level by undergiven parameter )
[ Basic → Simple overview  | Intermediate → School-level explanation | Advanced → College-level detail | Expert → Graduate-level depth ]
If the topic includes a language name (e.g., "in Hindi", default: English), write the <description> in that/those language simply and clearly.

### 🔹 Output Format ( Always Follow Exactly. Add tags perfectly in start and end as like "<description>...</description>" and ...):

1. Description Section:
<!-- DESCRIPTION SECTION
Supports text, inline SVG, and MathML.
Use any combination — zero, one, or many — in any order or position.
<br> and <hr> allowed for clarity. 
Fill inline CSS placeholders as needed (keep it simple).
Describe clearly and illustrate meaningfully using text, visuals, or equations as needed — minimum 200 words or equivalent visual detail.
-->
<description style="">
  <p style="">
    <strong style="">[TOPIC]</strong>: [Write a clear, detailed scientific summary of the topic.]
  </p>

  <svg width="" height="" style="">
    <!-- [Include any number of SVG diagrams or animations relevant to the topic] -->
  </svg>

  <math xmlns="http://www.w3.org/1998/Math/MathML" display="inline" style="">
    <mrow>
      <!-- [Include any number of equations or symbolic relations relevant to the topic] -->
    </mrow>
  </math>
</description>


2. JSON Data Structure (auto slide count, professional, concise):
<json>{
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

3.Visual JSON graph (auto slide count, professional, concise).
Here's JSON output example :
(There is no context with these json data its only for example to understant power and perfection of json structure)
<visualjson> ${visualjson_graph.json} </visualjson>
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

3.Visual JSON presentation (auto slide count, professional, concise).
Here's JSON output example :
(There is no context with these json data its only for example to understant power and perfection of json structure)
<visualjson> ${visualjson_presentation.json} </visualjson>
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

3.Visual JSON mindvoice/mindmap (auto slide count, professional, concise).
Here's JSON output example :
(There is no context with these json data its only for example to understant power and perfection of the json structure)
<visualjson> ${visualjson_mindvoice.json} </visualjson>
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

3.Visual JSON creative video (auto slide count, professional, concise).
Here's JSON output example :
(There is no context with these json data its only for example to understant power and perfection of the json structure)
<visualjson> ${visualjson_creative.json} </visualjson>
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

3.Visual JSON chemistry mechanism (auto slide count, professional, concise).
Here's JSON output example :
(There is no context with these json data its only for example to understant power and perfection of the json structure)
<visualjson> ${visualjson_chemistry.json} </visualjson> 
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

3.HTML Visualization (p5.js + CSS): 
Generate a single HTML file using HTML, CSS, and p5.js for an ultra-high-fidelity visualization of "${topicTitle}".  
It should show all major parts/stages dynamically and responsively.
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
<button id="podcast" class="control-button" title="Podcast">🎙️</button>
(while playing → changes to ❚❚ )

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
    background: linear-gradient(45deg, #FFD54F, #FF8C00);
    box-shadow: 0 4px 15px rgba(249, 115, 22, 0.4);
    color: #fff;
}
#podcast:hover { 
    background: linear-gradient(45deg, #fde06a, #e86203); 
    transform: scale(1.05);
}

Narration :
- Narration uses SpeechSynthesis API
- Predefined and mapped narration script ( alternating male/female voices OR pitch/rate variation) as like podcast.
- Podcast button logic:
  - If narrating → stop immediately
  - If not → reset visuals + start narration
- Replay button only resets visuals without narration.
- Narration structured like interactive conversation.
- Highlight visual elements or indicating texts/pointing which are needed, in sync.

Do *not* explain or mention the code or technologies used.  
Avoid intros or endings like “Hello, we will learn…” — go straight into the concept.  
No captions or overlays that block visuals.  
Do not show labels like “Chapter”, “Unit”, or “Topic”.  

The scene should feel like a clean, cinematic, concept-driven video — smooth, uninterrupted.
Optimize the code for smooth performance — use fewer calculations per second ( example: if it interactive /  3d / complex ), 
keep the frame rate below 30 FPS, and ensure a lightweight feel even if the HTML code is long.
Now, create a continuous 5-minute visual explanation of the topic.

Final response/output style:
( Do not include any type of heading, title, or summary — only these sections should appear. ) 
1. <description>...</description>
2. <json>...</json>
3. <!DOCTYPE html>
   <html lang="en">
        Output as a single full HTML code (HTML + CSS + p5.js).
   </html>

Think very long, carefully, and respond perfectly. 

`,
};






const AI_FIX_PROMPTS_NEXT = (
  mode,
  brokenResponse,
  userComment = "",
  consoleDetails = "",
  topicTitle,
  chapterTitle,
  unitTitle,
  workspaceSubject,
  options,
  complexityText,
  context,
  objective
) => {
  if (mode === "surprise-me") {
    const BASE_CALL = AI_PROMPTS["surprise-me"](
      topicTitle,
      chapterTitle,
      unitTitle,
      workspaceSubject,
      options,
      complexityText,
      context,
      objective
    );

    return `
You are a P5.js HTML Visual Debugger, Modifier, Enhancer, and Repair Specialist — a true Teacher of "${topicTitle}",
deeply understanding the subject and capable of analyzing code-based visualizations, identifying visual or runtime issues,
enhancing animations, and refining UI behavior while ensuring the concept is taught clearly and accurately through the visualization.
and a JSON Master — capable of explaining this topic with clarity.

Use the previous prompt and response to fix or update the output as per the **user's comment.**
Maintain the same structure and formatting of responce as the base prompt.
Resolve all console errors (if any) . Output only the corrected version with exact format of previous prompt showing.

User Comment:
"${userComment || "None"}"

Console Details:
${consoleDetails || "None"}

Previous Prompt:
${BASE_CALL}

Previous Response:
${brokenResponse}
`;
  } else {
    const BASE_CALL = AI_PROMPTS[mode](
      topicTitle,
      chapterTitle,
      unitTitle,
      workspaceSubject,
      options,
      complexityText,
      context,
      objective
    );

    return `
You are a Knowledge Teacher of "${topicTitle}" and a JSON Structuring Master — capable of explaining this topic with clarity,
generating precise JSON-based visual data structures for learning, and when needed, sometimes applying expert-level P5.js coding
to illustrate advanced concepts dynamically.

User Comment:
"${userComment || "None"}"

Use the previous prompt to fix or update the output as per the user's comment.
Maintain the same structure and formatting as the base prompt.
Output only the corrected version with exact format of previous prompt showing.

Previous Prompt:
${BASE_CALL}

Previous Response:
${brokenResponse}
`;
  }
};


    




function buildTutorPrompt({
  topic,
  chapter,
  unit,
  workspace,
  moduleData = {}
}) {
  return `You are a personalized AI tutor for  ${topic} . 
  A learner has just finished studying a detailed, AI-generated module on the following topic.
  Your role is to help them understand the concept deeply.

**LESSON CONTEXT:**
- **Workspace:** ${workspace}
- **Unit:** ${unit}
- **Chapter:** ${chapter}
- **Topic:** ${topic}

**FULL MODULE CONTENT FOR YOUR REFERENCE:**

--- 1. SCIENTIFIC DESCRIPTION ---
${moduleData.description || "No description was provided."}

--- 2. INTERACTIVE VISUALIZATION CODE (HTML/CSS/JS) ---
${moduleData.html || "No visualization code was provided."}

--- 3. SLIDES & NOTES DATA (JSON) ---
${moduleData.json ? (typeof moduleData.json === "string" ? moduleData.json : JSON.stringify(moduleData.json, null, 2)) : "No slides data was provided."}

**IMPORTANT NOTE:**
You may discuss programming or technical ideas only if the topic itself is about coding or computer science.  
However, do *not* discuss or explain the technologies (HTML, CSS, JS, or JSON) used to visualize the content.  
Treat all visuals and structures as part of an immersive learning experience — as if you have visually explored or demonstrated the concept yourself.

**YOUR TASK:**
Now, engage the learner. Do not just summarize the content. Your goal is to facilitate a discussion and clear up any confusion they might have.

Start by inviting the learner with this type of message:
"We have just explored a detailed visualization for '${topic}'. Now, let's discuss it. Based on what you saw in the animation and the notes, what questions do you have? Feel free to ask about anything. What are your doubts?"

Then, wait for their question and answer it with clear, simple, step-by-step explanations, referring back to the specific content (description, visualization, or slides) from the module provided above. Act as a patient and encouraging teacher.`;
}



    

