let prompt = `
First, briefly explain "${topic}" in a detailed scientific description of at least 100 words.
Then, generate a *single HTML file* using HTML, CSS, and p5.js to create a visually appealing,
ultra-high-fidelity ${diagramType} animated scientific visualization of that topic.
The animation should clearly depict each key stage or component of the process, with smooth transitions, 
dynamic molecular or structural elements, and scientifically accurate details.
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

2. Podcast (starts both narration and resets the visual from beginning):
<button id="podcast" class="control-button" title="Podcast">🔊</button>

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
  box-shadow: 0 0 20px var(--glow-color);
  transform: translateY(-3px);
}
#replay { right: 80px; }
#podcast { right: 20px; }

Use the browser's built-in speechSynthesis API to narrate a predefined array of scientific statements with alternating male/female voices, varying pitch and rate. Structure the podcast narration as an interactive-style conversation.
Do not display the spoken text; instead, highlight relevant visual elements during narration steps with synchronized styling.
The Podcast button should only trigger narration and reset visuals.
The Replay button should only reset and replay the visuals without triggering narration.

Diagram type: "${diagramType}"
Style: "${style}"
Concept complexity: ${complexity} out of 10
Frame rate must be fixed at 30 FPS.

Structure the response in this exact format:
1. A <description>...</description> block with the full scientific explanation.
2. The full HTML+CSS+p5.js code. No headings, intros, or extra explanations before or after.
`;
