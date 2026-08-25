# Added GraphRAG Content

**Date:** 2026-04-08
**Author:** Claude Opus 4.6

## Summary

Added a comprehensive GraphRAG section to Chapter 8 and updated supporting files. Also replaced all ASCII art diagrams across four chapters with Mermaid diagrams (preserving originals in HTML comments) and created a new Embedding Space Explorer MicroSim.

## Changes Made

### Chapter 8: Retrieval-Augmented Generation and GraphRAG

**File:** `docs/chapters/08-retrieval-augmented-generation/index.md`

- Renamed title from "Retrieval-Augmented Generation" to "Retrieval-Augmented Generation and GraphRAG"
- Updated frontmatter description to include GraphRAG and knowledge graphs
- Added new **GraphRAG section** (~200 lines) before "Common Pitfalls" containing:
    - Motivation: why vector search struggles with relationship-based questions
    - Definition of GraphRAG and knowledge graphs
    - Comparison table: Traditional RAG vs. GraphRAG (data structure, search method, strengths, weaknesses)
    - Two-phase GraphRAG pipeline explanation (Graph Construction + Query)
    - Mermaid flowchart of the GraphRAG pipeline
    - Decision guide: when to use Traditional RAG, GraphRAG, or both
    - Polly mascot admonition ("Graphs Are Everywhere")
    - Practical clinical example (warfarin + liver disease drug interactions)
    - Getting-started guide: "Building Your First Knowledge Graph for GraphRAG"
    - Example GraphRAG prompt showing graph triples as context
- Updated celebration message to mention GraphRAG
- Added 2 new key takeaways about GraphRAG
- Added 5 new concepts: GraphRAG, Knowledge Graph, Entity Extraction, Relationship Extraction, Graph Traversal (items 16-20)

### Course Description

**File:** `docs/course-description.md`

- Updated overview paragraph to mention GraphRAG and knowledge graphs
- Updated topics list: "Retrieval-augmented generation (RAG), GraphRAG, and grounding prompts in data using knowledge graphs"
- Added 2 new learning outcomes under Understand:
    - Explain RAG and GraphRAG and why grounding matters
    - Describe how GraphRAG uses knowledge graphs for relationship-based questions

### Navigation

**File:** `mkdocs.yml`

- Updated Chapter 8 nav entry title to "8. Retrieval-Augmented Generation and GraphRAG"
- Added "Embedding Space Explorer" to MicroSims nav section

### ASCII Art to Mermaid Conversions

Replaced 7 ASCII art diagrams with Mermaid diagrams across 4 chapter files. All original ASCII art preserved in HTML comments.

| File | Diagram | Mermaid Type |
|---|---|---|
| `chapters/07-context-memory-management/index.md` | Context window conveyor belt | `flowchart LR` with subgraph |
| `chapters/07-context-memory-management/index.md` | Memory architecture | `flowchart LR` with database shape |
| `chapters/08-retrieval-augmented-generation/index.md` | Knowledge gap timeline | `flowchart LR` with colored nodes |
| `chapters/08-retrieval-augmented-generation/index.md` | RAG pipeline with vector database | `flowchart TD` with two subgraphs |
| `chapters/09-multimodal-prompting/index.md` | Traditional vs. multimodal AI | `flowchart LR` with two subgraphs |
| `chapters/14-usage-limits-token-economics/index.md` | Five-hour rolling token window | `gantt` chart |
| `chapters/14-usage-limits-token-economics/index.md` | Cost vs. quality trade-offs | `quadrantChart` with table |

### New MicroSim: Embedding Space Explorer

**Directory:** `docs/sims/embedding-space/`

- `main.html` — Interactive p5.js visualization of a 2D embedding space with 22 phrases across 5 color-coded categories (AI/ML, Cooking, Space, Music, Medicine)
- `index.md` — Documentation page with fullscreen link and embedded iframe

**Features:**
- Hover to see phrase text and category
- Search box to place a query point and highlight 3 nearest neighbors with distance labels
- Pulsing diamond marker for query points
- Color-coded legend
- Grid and axis labels

**Embedded in:** Chapter 8 (replacing the Embedding Space ASCII art), with `<details>` block containing `#### Diagram` specification.

### MicroSim TODO Files

Ran `create-microsim-todo-json-files.py` which generated 5 TODO JSON files in `docs/sims/TODO/`:

- `ai-concepts-hierarchy.json`
- `foundation-model-pipeline.json`
- `prompt-iteration-cycle.json`
- `prompt-quality-evaluator.json`
- `temperature-explorer.json`
