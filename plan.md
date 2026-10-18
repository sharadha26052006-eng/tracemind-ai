# TraceMind AI — Implementation Plan

## Product direction
TraceMind AI is an evidence-first investigation workspace for teams that need to understand, verify, and communicate AI-generated findings. The first release is a polished single-page dashboard that demonstrates the core loop: orient in a workspace, inspect a trace map, review source evidence, and close open questions.

## Scope
- Build a responsive dashboard-style web app with Overview, Evidence graph, Sources, Review queue, and Settings navigation states.
- Present trace health metrics, a visual evidence map, selected-source detail, recent activity, source signals, and a review queue.
- Include functional interactions: view switching, graph mode tabs, global filtering, theme toggle, responsive sidebar, new-investigation modal, import affordance, and review completion actions.
- Keep the first release self-contained and dependency-free; data is representative UI state, not persisted server data.
- Serve a static route manifest at `/manus-routes.json` and run on the configured Preview port 3000.

## Project structure
- `index.html` — semantic application shell and dashboard markup.
- `styles.css` — responsive visual system, dark mode, dashboard components, graph treatment, and motion.
- `app.js` — small client-side interaction layer for navigation, filtering, modal, review actions, and theme state.
- `server.js` — dependency-free Node static server bound to `0.0.0.0:3000`.
- `public/manus-routes.json` — page route manifest required by Webdev.
- `logo.svg` — TraceMind mark used by the app and project metadata.

## Design direction

### Style options considered
- **Signal-workbench editorial** (0.07): dark rail, warm signal color, evidence cards, and precise editorial hierarchy.
- **Clinical glass analytics** (0.05): bright surfaces, cool translucent layers, and high-density metrics.
- **Soft research notebook** (0.03): cream canvas, handwritten cues, and tactile source annotations.

### Chosen style: Signal-workbench editorial

**Design Movement:** Editorial data-workbench inspired by Linear, Arc, and modern intelligence-analysis tools, with a warm signal accent rather than a generic blue SaaS palette.

**Core Principles:** Make evidence legible; create visual hierarchy through contrast and rhythm; keep AI suggestions provisional but useful; make every action feel reversible and calm.

**Color Philosophy:** A near-black ink rail grounds the experience, pale fog surfaces keep the workspace quiet, and Signal Coral (`#ff745e`) marks attention, provenance, and the next useful action. Mint is reserved for verified evidence so confidence is visible without feeling celebratory.

**Layout Paradigm:** A left command rail anchors a wide asymmetric canvas. The main area uses a broad trace map beside a narrow activity stack, then drops into two editorial evidence columns instead of a centered marketing grid.

**Signature Elements:** The coral TraceMind mark; evidence lines with circular nodes; soft status pills that distinguish verified, pending, and AI-suggested states.

**Interaction Philosophy:** Hover reveals context, active tabs sharpen the evidence lens, and actions update in place with brief toast feedback. No action should feel destructive or mysterious.

**Animation:** Use 160–220ms ease-out transitions for panels and buttons; graph nodes gently pulse only on the active trace; modal and sidebar enter with short upward/fade transitions. Avoid continuous motion that competes with reading.

**Typography System:** Use a system sans stack for dependable rendering, with compact uppercase labels at 11px, dashboard headings at 30–42px with tight tracking, and readable 14–15px body copy. Numeric metrics use tabular lining figures.

**Brand Essence:** TraceMind turns AI output into an inspectable chain of evidence for research and product teams. Personality: lucid, rigorous, quietly confident.

**Brand Voice:** Headlines are direct and observant; CTAs describe the next step. Example lines: “See what your answer is standing on.” and “Open the next uncertain link.”

**Wordmark & Logo:** A coral square containing three linked trace nodes, paired with a compact wordmark that reads as a tool name rather than a slogan.

**Signature Brand Color:** Signal Coral `#ff745e`.

## Serving approach
The Node server serves the committed static files and the route manifest. It honors `PORT` when supplied and defaults to 3000. No database, authentication, third-party API, or secret is required for this demo workspace.
