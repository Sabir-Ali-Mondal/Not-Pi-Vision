Generate a single-file HTML (<!doctype html>) that:

1) Embeds a hierarchical JSON `const DATA = { ... }` for the topic <<TOPIC>>:
   - Nodes: { id, title, notes?, children[] }, unique IDs.
   - 3–6 top-level branches, 2–5 children each, depth up to 4–5.

2) Renders a horizontal tidy tree mindmap using p5.js (CDN):
   - Root left, tree grows right, children spaced vertically, no overlaps.
   - Click node → toggle children (smooth animation).
   - Hover → show notes tooltip.
   - Drag → pan, scroll → zoom (cursor-centered).
   - Double-click → center & zoom on node.
   - Render only visible nodes for performance.
   - Colorfull and designed.

3) Style nodes as circles with text; "+" for collapsed, "–" for expanded.  
   Clean, readable layout, auto-adjust distances for unlimited depth.

4) Handle window resize, devicePixelRatio.  

Output ONLY the full runnable HTML file.
