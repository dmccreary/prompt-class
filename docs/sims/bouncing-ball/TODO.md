# MicroSim Coverage: Chapter Diagrams

**Repository:** prompt-class
**Last updated:** 2026-08-25
**Source:** `microsim-utils` / `microsim-generator` skills

## Status

All 7 diagram specifications extracted from `docs/chapters/*/index.md` have been
implemented, validated, and embedded in their chapters.

| Chapter | Sim ID | Library | Bloom | Score |
|---------|--------|---------|-------|-------|
| 1 | [ai-concepts-hierarchy](../ai-concepts-hierarchy/index.md) | p5.js | Understand (L2) | 100 |
| 1 | [foundation-model-pipeline](../foundation-model-pipeline/index.md) | p5.js | Understand (L2) | 100 |
| 2 | [prompt-iteration-cycle](../prompt-iteration-cycle/index.md) | p5.js | Understand (L2) | 100 |
| 2 | [prompt-quality-evaluator](../prompt-quality-evaluator/index.md) | p5.js | Evaluate (L5) | 100 |
| 3 | [temperature-explorer](../temperature-explorer/index.md) | p5.js | Apply (L3) | 100 |
| 7 | [long-form-document-processing-strategies](../long-form-document-processing-strategies/index.md) | Mermaid | Apply (L3) | 98 |
| 7 | [context-management-decision-framework](../context-management-decision-framework/index.md) | Mermaid | Apply (L3) | 98 |

Individual JSON specs remain in [`docs/sims/TODO/`](../TODO/) for reference.

## Remaining Work

### Other chapter diagrams (specified, not yet scaffolded)

26 further `#### Diagram:` headers exist across chapters 4-6 and 8-16, but they carry
no `sim-id`, `Library`, or Bloom metadata in their `<details>` blocks, so the extractor
cannot produce a spec for them. To pick these up:

1. Add `**sim-id:**`, `**Library:**`, and a Bloom level to each chapter's `<details>` block.
2. Re-run the extractor and scaffolder:

```bash
python3 ~/.claude/skills/microsim-utils/scripts/create-microsim-todo-json-files.py --project-dir /Users/dan/Documents/ws/prompt-class
```

### Pre-existing sims below quality threshold

- `embedding-space` (19) — `main.html` references a missing `embedding-space.js`
- `graph-viewer` (17) — no metadata.json, no screenshot
- `bouncing-ball` (5) — stub only; this directory has no `main.html`

## Regenerating

```bash
python3 ~/Documents/ws/ibook-skills/src/microsim-utils/validate-sims.py --project-dir /Users/dan/Documents/ws/prompt-class --format table
```

```bash
python3 ~/Documents/ws/ibook-skills/src/microsim-utils/sync-iframe-heights.py --project-dir /Users/dan/Documents/ws/prompt-class --verbose
```
