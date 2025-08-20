First, briefly explain "${topic}" in a detailed scientific description of at least 100 words.

- If the topic includes a language name (e.g., "in Hindi", default: English), write the <description> in that language very simply and easily.

- Content Rules:
- Each slide needs a 'title', an 'imageSearch' keyword (a concise phrase), and content.
- Content must be either 'bullets' (an array of 4-5 strings) OR a 'table' (with 'headers' array and 'rows' array of arrays).
- Set 'contentType' to "bullets" or "table" accordingly.
- For bullet slides, set 'imagePosition' to "left" or "right".
- For table slides, set 'imagePosition' to "none" as they will be full-width.
- Keep content concise and professional.
- Output Format: Return ONLY the raw, valid JSON object, without any surrounding text or markdown.
- JSON Schema Example:
{
  "frontSlide": { "topic": "${topic}" },
  "slides": [
    { "title": "string", "contentType": "bullets", "bullets": ["string"], "imageSearch": "string", "imagePosition": "right" },
    { "title": "string", "contentType": "table", "table": { "headers": ["string"], "rows": [["string"]] }, "imageSearch": "string", "imagePosition": "none" }
  ]
}

- Other elements (narration, code, visuals) should remain in easy English.
- Tailor the explanation complexity based on the level:
  • Basic → Simple overview  
  • Intermediate → School-level explanation  
  • Advanced → College-level detail  
  • Expert → Graduate-level depth  

Then, generate a *single HTML file* using HTML, CSS, and p5.js to create a visually appealing,
ultra-high-fidelity  visualization of "${topic}". 

The animation should clearly depict each key stage or component of the process, with smooth transitions, 
dynamic structural elements, and accurate details.
Also, if the topic is very easy or child-level, you must detect that and respond wisely.

Use a modern, glassmorphism-inspired design with CSS variables for easy theming:
:root {
  --bg-color: #0a0a10;
  --primary-color: #007bff;
  --glow-color: rgba(0, 123, 255, 0.7);
  --text-color: #f0f0f0;
  --glass-bg: rgba(25, 25, 40, 0.3);
  --glass-border: rgba(255, 255, 255, 0.15);
}

Include two fixed control buttons at the bottom right:
1. Replay (only restarts the visual animation):
<button id="replay" class="control-button" title="Replay">⟳</button>

2. Podcast (starts or stops narration, and resets the visual from the beginning when starting):
<button id="podcast" class="control-button" title="Podcast">🔊</button> while pause ⏸️


Style both buttons with a glassmorphic hover-glow effect:
.control-button {
  position: fixed; bottom: 20px; width: 50px; height: 50px;
  border-radius: 50%; background: var(--glass-bg);
  backdrop-filter: blur(12px); border: 1px solid var(--glass-border);
  box-shadow: 0 8px 32px rgba(0,0,0,0.37);
  color: var(--text-color); font-size: 20px; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.3s ease;
}
.control-button:hover {
  background: rgba(0,123,255,0.5);
}
#replay { right: 80px; }
#podcast { right: 20px; }

Use the browser's built-in SpeechSynthesis API to narrate a predefined array of statements with alternating male/female
voices or varying predefined pitch and rate. Structure the podcast narration as a human-like interactive conversation.

- Clicking the Podcast button should:
  - If already narrating: stop immediately 
  - If not: reset the visuals and start narration
- Do not display the spoken text or captions;
Instead, highlight relevant visual elements during narration with synchronized styling.

The Replay button should only reset and replay the visuals without triggering narration.


Topic: "${topic}"
Chapter: ""
Unit: ""
Diagram type: ""
Style: ""
Concept complexity: ${complexity}  

Structure the response in this exact format:
1. A <description>...</description> block.  
2. The full single HTML+CSS+p5.js code (runnable on any device, responsive canvas).  
3. Full json file like this in any auto slides count , which need to give best users understanding .
