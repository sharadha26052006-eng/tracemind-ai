# TraceMind AI

> An evidence-first investigation workspace for turning AI-generated findings into inspectable chains of evidence.

TraceMind AI is a polished, responsive dashboard prototype for research and product teams who need to understand where an answer came from, which sources support it, and what still needs a human decision. It combines a trace map, source-health signals, recent activity, and a review queue in one calm, evidence-oriented workspace.

## Why TraceMind

AI output is only as useful as the reasoning and sources behind it. TraceMind makes that chain visible:

- **Trace the reasoning** from an originating question to signals, sources, and recommendations.
- **Separate confidence states** with clear visual language for verified evidence, open review, AI suggestions, and drafts.
- **Keep humans in the loop** with a review queue designed around the next uncertain link.
- **Reduce context switching** by putting workspace health, activity, source quality, and follow-up actions together.

## Features

### Evidence workspace

- Responsive dashboard shell with a dark command rail and asymmetric editorial layout.
- Overview, Evidence graph, Sources, Review queue, and Settings navigation states.
- Workspace context, trace capacity indicator, profile area, and operational status footer.

### Trace map

- Visual relationship map connecting a question to market signals, competitor research, a margin model, and a recommendation.
- Overview, Sources, and Confidence lens tabs with active-state feedback.
- Evidence legend distinguishing verified, needs-review, and AI-suggested states.

### Review and discovery

- Global search across recent activity and review items.
- Empty states when no activity or review item matches a search.
- Review items can be marked complete and reopened in place.
- New investigation modal adds an item to the review queue without a page reload.
- Import-sources affordance opens the browser file picker and reports selected files.

### Workspace controls

- Light and dark theme toggle with local browser persistence.
- Responsive mobile sidebar with compact navigation at smaller breakpoints.
- Keyboard shortcut: `⌘ K` on macOS or `Ctrl K` on Windows/Linux focuses global search.
- Toast feedback for navigation, actions, filters, modal submission, and theme changes.

## Product status

This repository contains a **front-end prototype with representative UI state**. It is intentionally self-contained and does not yet persist investigations, connect to external source providers, or call a production AI model.

| Capability | Current behavior |
| --- | --- |
| Investigations | Added to the in-memory review queue for the current page session |
| Source import | Opens the local file picker and reports the selected file count |
| Search | Filters activity and review content in the browser |
| Review actions | Toggle reviewed/open state in the browser |
| Theme | Light/dark mode persisted to `localStorage` |
| Data and authentication | Not included in this prototype |
| AI generation | Represented by interface states; no provider call is made |

## Tech stack

- **HTML5** for the semantic application shell
- **CSS3** for the responsive visual system, design tokens, charts, graph treatment, dark mode, and motion
- **Vanilla JavaScript** for client-side interactions
- **Node.js 18+** with a small dependency-free static HTTP server
- **Docker** for production-style container execution
- **Google Fonts** for Manrope and DM Mono typography when network access is available

No frontend framework, bundler, database, or runtime package dependency is required.

## Run locally

### Prerequisites

- Node.js 18 or newer
- npm (ships with Node.js)

### Start the app

```bash
git clone https://github.com/sharadha26052006-eng/tracemind-ai.git
cd tracemind-ai
npm start
```

The server listens on `http://localhost:3000` by default. To use another port:

```bash
PORT=4000 npm start
```

The server binds to `0.0.0.0` and serves the application from `index.html`. The required route manifest is available at [`/manus-routes.json`](http://localhost:3000/manus-routes.json).

## Project structure

```text
.
├── app.js                 # Browser interactions and UI state
├── app.config.ts          # Project metadata and logo configuration
├── index.html             # Semantic dashboard markup
├── logo.svg               # TraceMind brand mark and favicon
├── package.json           # Minimal Node scripts and project metadata
├── public/
│   └── manus-routes.json  # Webdev route manifest
├── server.js              # Dependency-free static HTTP server
├── styles.css             # Responsive design system and component styles
├── Dockerfile             # Production container definition
├── plan.md                # Product and design direction
└── TODO.md                # Delivered outcomes and acceptance criteria
```

## Design system

TraceMind uses a **signal-workbench editorial** direction inspired by modern research and intelligence tools:

- **Signal Coral** `#ff745e` marks attention, provenance, and the next useful action.
- **Mint** communicates verified evidence and healthy system signals.
- **Near-black ink** anchors navigation and gives the evidence canvas room to breathe.
- **Fog surfaces** keep dense information legible without making the workspace feel clinical.
- **Manrope + DM Mono** pair a readable interface voice with precise, data-oriented labels.

The layout favors a command rail, broad trace canvas, and editorial evidence panels rather than a generic centered SaaS grid.

## Docker

Build and run the production container:

```bash
docker build -t tracemind-ai .
docker run --rm -p 3000:3000 tracemind-ai
```

The container exposes port `3000` and honors the `PORT` environment variable at runtime.

## Validation

The project is designed to run without an install step beyond Node.js. Useful checks include:

```bash
node --check app.js
node --check server.js
npm start
```

In a second terminal, verify the application and route manifest:

```bash
curl -I http://localhost:3000/
curl http://localhost:3000/manus-routes.json
```

## Roadmap

Potential next steps for turning the prototype into a production workspace:

1. Persist investigations, traces, sources, and review decisions.
2. Add authenticated workspaces with role-aware access controls.
3. Connect source ingestion and citation extraction pipelines.
4. Add an AI trace service that records prompts, claims, evidence links, and confidence updates.
5. Replace representative metrics with live workspace analytics.
6. Add exportable investigation briefs and audit-ready evidence reports.

## Contributing

Keep changes focused, readable, and dependency-light. When adding a user-facing interaction, update the relevant documentation and preserve the route manifest at `public/manus-routes.json`.

## License

No license has been declared yet. Add a license file before distributing the project outside its intended repository.

---

Built with a quiet interface for loud questions.
