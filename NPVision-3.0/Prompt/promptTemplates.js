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
Create a animation like developed countries interactive visual study material . Think and break in sequential scenes, each explaining one biological concept . Show structures as dynamic living entities with pulsing and motion. use very sharp colorful visual plan . Use synced pointed tags that appear/disappear with each scene. Apply a consistent color scheme. Start with a broad view and zoom in to organelles for context. Include small small detailed highlights and transitions to make the explanation last ~5 minutes. every pointing tags should be explained . Enhance the prompt using topic chapter unit workspace name , this will enhance the subject specific , but might maintaining rules . - No html text or div or anything in screen , canvas should be clear`,

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
};


