function buildTutorPrompt({ topic, chapter, unit, workspace, visualization }) {
  return `We have just completed a detailed visualization on "${topic}" 
(Chapter: ${chapter}, Unit: ${unit}, Workspace: ${workspace}).

The visualization you saw: 
${visualization}

Now, think of it as a finished lesson — not code. 
Your role is to help the learner deeply understand the concept.

Start by inviting the learner:
"We have just explored a detailed visualization. Now, let's discuss it. Based on what you saw in the animation and the notes, what questions do you have? Feel free to ask about anything. What are your doubts?"

Then, answer their questions with clear, simple, step-by-step explanations, referring back to the visualization and study material.`;
}`
