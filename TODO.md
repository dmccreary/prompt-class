# TODO — Post-Retitle Cleanup

Tracking work remaining after the course was renamed from *Prompt Engineering*
to **Agent Orchestration: From Prompt Engineering to Managing AI Agent Teams**
(2026-08-25).

Items are ordered by impact. The cover image is the current focus.

---

## Priority 1 — Cover Image ✅ DONE

- [x] Generated the new cover from `docs/img/cover-image-prompt.md` via ChatGPT
      (Parrish style retained; orchestrator + agent fleet + light filaments;
      painted macaw). Source render was 1731x909 (1.904 ratio).
- [x] Installed as `docs/img/cover.png` at 1200x630 - fixes the broken
      `![](./img/cover.png)` reference on the home page.
- [x] Repointed `image:` / `og:image:` in `docs/index.md` from the 3:2
      `cover-landscape.png` to the new 1.91:1 `cover.png`.
- [ ] Retire or archive the old `cover-*` variants (`cover-landscape`,
      `cover-portrait`, `cover-small`, `cover-v2`, `cover-v3`, `cover-nb*.jpg`)
      - they still carry the old "Prompt Engineering" title.
- [ ] Optional: regenerate the mascot on the cover with her headset mic; the
      current macaw reads blue-and-gold rather than Polly's blue-and-orange.

## Priority 2 — Content that still describes the old course

- [ ] **Course description body.** [docs/course-description.md](docs/course-description.md)
      has the new title, but the Course Overview, Main Topics, and all six
      Bloom's-level outcome lists still describe a prompt-engineering course.
      Nothing mentions running dozens of agents, desktop agent platforms, or
      orchestration patterns.
- [ ] **Chapter structure.** 17 chapters, exactly one of which (Ch. 12) is
      agentic. There is no chapter on multi-agent orchestration, agent fleet
      management, or the desktop platforms students are asking about
      (Claude Desktop, ChatGPT Desktop, Google Antigravity).
- [ ] **Learning graph.** 306 concepts, none specific to agent orchestration —
      no *Agent Fleet*, *Agent Handoff*, *Orchestration Pattern*, *Subagent*,
      *Agent Supervision*, or *Parallel Agent Execution*. Regenerate or extend
      after the chapter structure settles.
- [ ] **FAQ.** 86 entries in [docs/faq.md](docs/faq.md) framed around prompt
      engineering. Only the "What is this course about?" answer was retitled.
- [ ] **Glossary.** 333 terms, none covering orchestration vocabulary.

## Priority 3 — Stale generated reports

- [ ] **`docs/learning-graph/book-metrics.json` is empty/wrong.** Reports
      `concepts: 0, chapters: 0, microsims: 0, glossaryTerms: 23`. Actual counts:
      306 concepts, 17 chapters, 15 MicroSims, 333 glossary terms.
- [ ] **`docs/learning-graph/chapter-metrics.md` says "No chapters found."**
      The metrics run is pointed at the wrong path or ran before content existed.
      Re-run `bk-generate-book-metrics`.
- [ ] Both reports are dated June 3 2026 — well before recent content work.

## Priority 4 — Build warnings and nav gaps

- [ ] **Broken link:** `docs/labs/index.md` → `./05-boucing-ball.md`
      (typo — should be `05-bouncing-ball.md`).
- [ ] **Broken link:** `docs/labs/10-github-repo-analyzer.md` → `./contact.md`
      (target does not exist).
- [ ] **Pages not in nav:** `labs/18-cover.md`, `labs/19-meta-skill-lecture.md`,
      `learning-graph/book-metrics.md`, `learning-graph/chapter-metrics.md`,
      `img/mascot/image-prompts.md`, `sims/TODO.md`,
      `sims/bouncing-ball/TODO.md`.
- [ ] Missing per-chapter `quiz.md` (0 of 17) and `references.md` (0 of 17).

## Priority 5 — Housekeeping

- [ ] **Commit the retitle.** 28 files changed and still uncommitted.
- [ ] Home-page `<title>` renders as "Agent Orchestration - Agent Orchestration"
      (page title == site name). Cosmetic; set a distinct `title:` in
      [docs/index.md](docs/index.md) frontmatter if it bothers you.
- [ ] `logs/*.md` still record the old title. **Intentional** — these are
      historical generation records. No action.

---

## Done

- [x] Renamed course across 28 files: mkdocs.yml, README, book-status.json,
      course description, index, FAQ, chapters index, about (citation + BibTeX),
      slides, sims index, learning-graph metadata (`metadata.json`,
      `learning-graph.json`, `faq-chatbot-training.json`), graph-viewer HTML,
      and 10 MicroSim `metadata.json` publisher fields. (2026-08-25)
- [x] Removed the stale git worktree `.claude/worktrees/zen-vaughan-c2741e/`
      and its merged branch — 48 MB reclaimed. (2026-08-25)
- [x] Wrote `docs/img/cover-image-prompt.md` and generated + installed
      `docs/img/cover.png` from it. (2026-08-25)
