const prompt = `
Task Objective:
Break down a syllabus into small, independent conceptual units and generate clear, visual/conceptual questions. For each question, provide a detailed explanation and a 2D animated HTML visualization using p5.js.

Instructions:

1. Syllabus Breakdown:
- Divide syllabus into small core topics.
- Format questions using:
~ Unit Name
~~ Question Title
- Cover all topics and subtopics clearly with visual/conceptual focus.

2. Execution Flow:
- Output all questions first, then wait for user input "start".
- After "start", for each question provide:
  - A detailed explanation in <description>...</description> (≥100 words).
  - A full single-file HTML (with HTML, CSS, p5.js) visualizing the concept.
  - Include a replay button:
  <button style="position:fixed;bottom:20px;right:20px;background:#07f;color:#fff;font-size:20px;border-radius:50%;width:30px;height:30px" name="replay" title="Replay">⟳</button>
- Wait for "next" to continue until all questions are answered.

3. Visualization Requirements:
- Use p5.js for all 2D animations.
- Visualizations must be intuitive, scientifically accurate, visually appealing ("Scientific" style).
- Prefer 5-step animation stages reflecting natural learning perception.

Subject: {Subject}
Syllabus: {Syllabus}
`