const promptTemplates = {
    General: `
Visually explain the topic step-by-step as if teaching a beginner.
Use clear labels, simple animations, and highlight the most critical parts.
Ensure the explanation flows logically from start to finish.
Ultra-high-fidelity vector schematic :: anti-aliased lines + subtle gradients for depth :: professional colorblind-safe palette + legend ::
sequential narrated build with sync :: contextual zooms + scale-bars + units :: cutaways, cross-sections, exploded-views, overlays ::
pointer leader-lines + fade-in labels :: focus highlight (pulse/bright) + background dimming :: interactive timeline controls (play/pause/scrub/step) ::
multi-layer detail (summary ↔ expanded) :: accessibility-ready (contrast, readable fonts, alt-text).
`,

    biology: `
Create a detailed, hand-drawn style diagram for the topic.
Show internal structures like membranes, organelles, DNA/RNA, proteins, with pointer-style labels.
Visualization must feel like a teacher explaining on a whiteboard, breaking processes step-by-step with cellular/anatomical accuracy.
High-fidelity textbook schematic :: clean anti-aliased lines :: flat colors + light hatching :: sequential build-up with narration sync ::
focus highlight (pulse/bright) :: contextual zooms (tissue → cell → organelle → molecule) :: cutaways, overlays, exploded views ::
membranes with bilayers + embedded proteins :: protein domains + active sites :: DNA/RNA fidelity (promoters, introns, exons, supercoiling) ::
dynamic processes (signal cascades, vesicle budding, enzyme catalysis, receptor dimerization, ATP synthase rotation, flagella motion, nuclear pore transport, gradients).
`,

    chemistry: `
Visualize molecular structures and reactions with atomic clarity.
Show electron movement for mechanisms with curly arrows, label reactants/products/intermediates.
Use distinct colors for atoms and bonds; animate transitions dynamically.
High-fidelity molecular render (ball-and-stick + space-filling + electron-density) ::
orbital lobes + HOMO/LUMO :: reaction coordinate with transition states ::
energy profile diagrams + ΔG/ΔH :: solvent shell + H-bonding :: catalyst active site highlight ::
spectroscopy overlays (IR/NMR/UV-Vis/MS) :: vibrational mode animations :: stereochemistry (R/S, Newman, conformers) ::
crystal lattice/unit-cell :: dynamic simulation of MD snapshots or STM/TEM view.
`,

    physics: `
Illustrate physical principles with precise clarity.
Use vector arrows for forces, velocity, and acceleration; show energy transformations (potential ↔ kinetic).
Display formulas with animated variables updating as processes evolve.
Illustrated physical model :: free-body diagram + component vectors ::
kinematics trace (position, velocity, acceleration) :: energy landscapes + potential wells ::
wave propagation + interference patterns :: EM-field lines + Maxwell equation overlays ::
circuit simulation (voltage/current waveforms) :: fluid flow streamlines + vorticity ::
particle trajectories + Lorentz force :: relativity diagrams (spacetime cones, time dilation) ::
quantum probability density/tunneling animations :: conservation-law overlays (energy, momentum, charge).
`,

    coding: `
Visualize the data structure (array, linked list, tree, graph) and animate algorithm operations step-by-step.
Show pointers, variable values, and the call stack updating in real-time.
Highlight the active pseudocode line while execution flows.
Live codeboard schematic :: step-through execution (step-in, step-over) :: call stack + heap/memory layout ::
animate pointer/reference moves :: data-structure visualization (nodes/edges, arrays, recursion trees) ::
algorithm trace (compare, swap, partition, recursion unfold) :: time/space complexity overlays (Big-O, operation counts) ::
profiler heatmap (CPU/memory hotspots) :: concurrency map (threads, locks, race detection) ::
network I/O handshake animations :: syntax-highlighted pseudocode sync with variables + watch.
`
};
