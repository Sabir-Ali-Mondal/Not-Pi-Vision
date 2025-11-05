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
