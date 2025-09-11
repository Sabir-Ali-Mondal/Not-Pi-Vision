Produce a single-file HTML document (start with <!doctype html>) that:

1) Embeds a hierarchical JSON `const DATA = { ... }` for the topic: <<TOPIC>>.  
   - Structure: `{ id, title, notes?, children[] }`  
   - Include 3–6 top-level branches, each with 2–5 children, and some depth 3–5.  
   - IDs must be unique.  

2) Visualize the JSON as a **one-sided tidy tree mindmap** using **p5.js only** (from CDN).  
   - Root node on the left, tree grows right.  
   - Auto-adjust distances to avoid overlapping nodes.  
   - Re-layout dynamically when branches are expanded/collapsed.  

3) Interactivity:  
   - Click node → toggle children (expand/collapse).  
   - Hover → show tooltip with `notes`.  
   - Drag → pan the view.  
   - Mouse wheel → zoom (focus on cursor).  
   - Double-click node → center & zoom on it.  
   - Smooth expand/collapse animations.  
   - Render only visible nodes for performance.  

4) Add small UI panel (top-right):  
   - Export JSON  
   - Reset View  
   - Collapse All  
   - Expand Root Level  
   - Toggle JSON viewer panel  

5) Handle window resize, devicePixelRatio, unlimited nesting.  
   Keep layout clean, modern, and readable.  

6) Output **only the full HTML file**, nothing else.  

Topic = <<TOPIC>>
