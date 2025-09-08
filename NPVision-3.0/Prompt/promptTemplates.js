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



const promptTemplates = {
  General: `
BULLETPROOF IMPLEMENTATION REQUIREMENTS:
- Wrap ALL functions in try-catch blocks with console.error logging and fallbacks
- Initialize ALL variables with validated default values (clamp, typeof, isFinite checks)
- Validate ALL parameters with bounds checking and input sanitisation
- Add browser-feature checks (e.g., 'speechSynthesis' in window) with graceful fallbacks
- Guard every property access against null/undefined
- Provide cleanup (cancelAnimationFrame, clearInterval, speechSynthesis.cancel)
- Implement graceful degradation: if a complex feature fails → auto-switch to a simpler one
- Finish with self-review: "Check code for bugs, edge cases, missing error handling"

WORLD-CLASS VISUALIZATION STANDARDS (MIT/Stanford/Cambridge Style):
- Follow Universal Design for Learning (UDL) principles used in top universities
- Implement accessibility standards (WCAG 2.1 AA) as used in developed countries
- Use progressive disclosure: start simple, reveal complexity on demand
- Include multiple representation modes: visual, auditory, kinesthetic
- Add real-time feedback loops and interactive exploration capabilities
- Implement spaced repetition and retrieval practice through visualization
- Use evidence-based color psychology and cognitive load theory
- Include cultural inclusivity and international perspectives in examples

PEDAGOGICAL APPROACH (Nordic/Finnish Education Model):
- Student-centered exploration with guided discovery
- Problem-based learning with authentic contexts
- Collaborative elements and peer learning opportunities
- Metacognitive reflection prompts throughout visualization
- Connection to real-world applications and career relevance
`,

  biology: `
BULLETPROOF IMPLEMENTATION + BIO SAFEGUARDS:
[Include all bulletproof requirements from General]

EXTRA BIOLOGICAL SAFEGUARDS:
- pH clamped 0–14, temperature −273–200 °C, concentration ≥ 0
- Enzyme activity curves validate temperature windows
- Molecular counts limited to MAX_MOLECULE_COUNT
- DNA/RNA sequences verified for valid bases (A T G C N)

WORLD-CLASS BIOLOGY VISUALIZATION (Harvard Medical/NIH Standards):
- Multi-scale integration: molecule → cell → tissue → organ → organism → ecosystem
- Use cutting-edge molecular visualization techniques (PyMOL/ChimeraX style rendering)
- Implement virtual laboratory protocols with authentic equipment and procedures
- Include time-scale manipulation: femtoseconds to evolutionary time
- Add interactive microscopy simulation (light, electron, fluorescence, confocal)
- Use authentic scientific data visualization (genomics, proteomics, metabolomics)
- Implement 3D protein folding dynamics with thermodynamic accuracy
- Include clinical correlation and medical application context
- Add biodiversity and conservation perspectives from global research
- Use real experimental protocols from Nature/Science publications

RESEARCH-GRADE TECHNIQUES:
- Cryo-EM structure visualization with atomic resolution detail
- Live-cell imaging simulation with fluorescent markers
- CRISPR-Cas9 mechanism with guide RNA precision
- Metabolic pathway flux analysis with kinetic parameters
- Phylogenetic tree construction with molecular clock data
`,

  chemistry: `
BULLETPROOF IMPLEMENTATION + CHEM SAFEGUARDS:
[Include all bulletproof requirements from General]

EXTRA CHEMISTRY SAFEGUARDS:
- Atomic numbers clamped 1–118, bond lengths > 0, energies finite
- Stoichiometry checks keep atoms balanced
- isFinite/!isNaN guards around ΔG, ΔH, pK_a, rate constants

WORLD-CLASS CHEMISTRY VISUALIZATION (Caltech/ETH Zurich Standards):
- Quantum mechanical accuracy in orbital representations and electron density
- Use industry-standard molecular modeling (Gaussian/Spartan quality renderings)
- Implement virtual NMR/IR/MS spectroscopy with authentic spectra interpretation
- Include reaction mechanism animation with curved arrow formalism
- Add computational chemistry integration (DFT calculations, molecular dynamics)
- Use authentic laboratory safety protocols and green chemistry principles
- Implement materials science applications (semiconductors, polymers, catalysts)
- Include pharmaceutical drug design and medicinal chemistry context
- Add environmental chemistry and sustainability perspectives
- Use real industrial process simulation (petrochemicals, fine chemicals)

RESEARCH-GRADE TECHNIQUES:
- X-ray crystallography structure determination with electron density maps
- Transition state theory visualization with activation energy landscapes
- Catalytic cycle animation with detailed mechanistic steps
- Supramolecular assembly with non-covalent interaction visualization
- Electrochemistry with electrode potential diagrams and Nernst equation
`,

  physics: `
BULLETPROOF IMPLEMENTATION + PHYSICS SAFEGUARDS:
[Include all bulletproof requirements from General]

EXTRA PHYSICS SAFEGUARDS:
- Velocity limited to 0.99 c, energies ≥ 0
- Conservation-law checks (ΣE, Σp) each frame
- Dimensional analysis before rendering vectors/fields

WORLD-CLASS PHYSICS VISUALIZATION (CERN/Fermilab/LIGO Standards):
- Use authentic experimental data from major physics laboratories
- Implement real-time simulation with numerical integration (Runge-Kutta methods)
- Include uncertainty quantification and error propagation visualization
- Add multi-dimensional phase space representation and state evolution
- Use professional scientific plotting standards (matplotlib/ROOT quality)
- Implement interactive parameter exploration with immediate feedback
- Include engineering applications and technology transfer examples
- Add historical context with Nobel Prize discoveries and breakthroughs
- Use authentic measurement techniques and instrumentation simulation
- Include climate science and energy applications for global relevance

RESEARCH-GRADE TECHNIQUES:
- Particle accelerator beam dynamics with magnetic field visualization
- Gravitational wave interferometry with strain sensitivity analysis
- Quantum field theory Feynman diagram interactions
- Condensed matter band structure with electronic properties
- Cosmological simulation with dark matter and dark energy effects
`,

  coding: `
BULLETPROOF IMPLEMENTATION + CODING SAFEGUARDS:
[Include all bulletproof requirements from General]

EXTRA CODING SAFEGUARDS:
- Array bounds checks, recursion-depth limits, iteration caps
- Memory-leak prevention via clearTimeout/clearInterval
- Performance timers to abort long-running algorithms

WORLD-CLASS CODING VISUALIZATION (Google/Microsoft/Apple Dev Standards):
- Use professional IDE-like interface with syntax highlighting and autocomplete
- Implement real-time code execution with step-through debugging visualization
- Include industry-standard version control workflow (Git branching visualization)
- Add performance profiling with time/space complexity analysis
- Use authentic software development lifecycle and agile methodologies
- Implement collaborative coding with pair programming simulation
- Include cybersecurity awareness and secure coding practices
- Add accessibility standards (a11y) and inclusive design principles
- Use real-world project examples from open-source repositories
- Include DevOps pipeline visualization with CI/CD integration

RESEARCH-GRADE TECHNIQUES:
- Abstract syntax tree (AST) manipulation and code transformation
- Compiler optimization visualization with intermediate representations
- Concurrent programming with thread synchronization and deadlock detection
- Machine learning algorithm implementation with gradient visualization
- Distributed systems architecture with microservices communication patterns
`,

  mathematics: `
BULLETPROOF IMPLEMENTATION + MATH SAFEGUARDS:
[Include all bulletproof requirements from General]

EXTRA MATH SAFEGUARDS:
- Domain checks before evaluation
- Convergence/iteration limits for series, integrals, solvers
- Fallback to approximations when result is non-finite

WORLD-CLASS MATHEMATICS VISUALIZATION (Fields Institute/Clay Institute Standards):
- Use rigorous mathematical notation with LaTeX-quality rendering
- Implement interactive theorem proving with step-by-step logical deduction
- Include historical mathematical development and cultural contributions
- Add real-world applications from finance, engineering, and natural sciences
- Use dynamic geometry software capabilities (GeoGebra/Mathematica quality)
- Implement numerical methods with convergence analysis and error estimation
- Include probability visualization with Monte Carlo simulation
- Add graph theory with network analysis and optimization algorithms
- Use statistical modeling with authentic datasets and hypothesis testing
- Include mathematical modeling of real phenomena (epidemiology, climate, economics)

RESEARCH-GRADE TECHNIQUES:
- Topology visualization with manifold structure and differential forms
- Complex analysis with conformal mapping and Riemann surface representation
- Partial differential equation solving with finite element method visualization
- Abstract algebra with group theory symmetries and representation theory
- Number theory with cryptographic applications and prime number visualization
`,

  engineering: `
BULLETPROOF IMPLEMENTATION + ENGINEERING SAFEGUARDS:
[Include all bulletproof requirements from General]

EXTRA ENGINEERING SAFEGUARDS:
- Loads ≤ 0.8 × maxLoad, stresses ≤ 0.6 × yieldStrength
- Safety factor ≥ 1.5, temperature within material spec
- Failure-mode warnings trigger simplified render

WORLD-CLASS ENGINEERING VISUALIZATION (MIT/Stanford/TU Delft Standards):
- Use professional CAD-quality precision with parametric design capabilities
- Implement finite element analysis (FEA) with mesh visualization and convergence studies
- Include industry-standard safety codes and international regulations (ISO, ASME, IEEE)
- Add life-cycle assessment and sustainability metrics throughout design process
- Use authentic manufacturing processes with tolerance analysis and quality control
- Implement systems engineering approach with interdisciplinary integration
- Include failure analysis with root cause investigation and prevention strategies
- Add project management integration with timeline, cost, and resource optimization
- Use real engineering case studies from infrastructure and technology projects
- Include global engineering challenges (climate change, urbanization, digitalization)

RESEARCH-GRADE TECHNIQUES:
- Computational fluid dynamics (CFD) with turbulence modeling and heat transfer
- Control systems design with feedback analysis and stability margins
- Materials engineering with microstructure-property relationships
- Robotics and automation with kinematics, dynamics, and path planning
- Renewable energy systems with grid integration and energy storage optimization
`
};

