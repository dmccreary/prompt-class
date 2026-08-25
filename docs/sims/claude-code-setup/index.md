---
title: "Claude Code Setup"
description: "Interactive vis-network diagram of the four Week 1 tools — Claude Desktop, GitHub, VS Code, and the Unix shell — and the labeled relationships that connect them."
image: /sims/claude-code-setup/claude-code-setup.png
og:image: /sims/claude-code-setup/claude-code-setup.png
twitter:image: /sims/claude-code-setup/claude-code-setup.png
social:
   cards: false
quality_score: 0
---

# Claude Code Setup

<iframe src="main.html" height="642px" width="100%" scrolling="no"></iframe>

[Run the Claude Code Setup MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This diagram maps the four tools every student wires together in [Week 1 of the crash course](../../appendices/crash-course-talking-to-agents.md#week-1-getting-the-tools-talking-to-each-other): **Claude Desktop**, **GitHub**, **VS Code**, and the **Unix shell**. Each circle is a tool; each labeled arrow is a real, specific way one tool controls or talks to another — like Claude Desktop "Controls using gh" to reach GitHub.

GitHub gets special billing here for a reason: it's a **required** node, not an optional one. Claude is naturally reluctant to take actions it can't undo, and a per-project GitHub repository is what gives it that undo button. Click the GitHub circle to see why that one habit matters more than any other in Week 1.

## How to Use

- **Hover** over any circle or arrow for a one-sentence reminder of what it does.
- **Click** a circle to open a full explanation of that tool in the panel below the diagram.
- **Click** an arrow to open a full explanation of that specific relationship — for example, what "Runs git & gh against" actually means when VS Code's terminal talks to GitHub.
- Work your way around all four tools and all six relationships to see the complete Week 1 setup.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/prompt-class/sims/claude-code-setup/main.html"
        height="642px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
Adult / professional learners — the Week 1 session of the six-week crash course for busy professionals learning to work with AI agents.

### Duration
10-15 minutes

### Prerequisites
None — this diagram is designed to be a student's first exposure to how the Week 1 toolchain fits together, before any hands-on installation begins.

### Activities

1. **Exploration** (5 min): Click through all four tools first, then all six relationships, reading each infobox.
2. **Guided Practice** (5 min): Ask students to trace the path a single code change takes — from Claude Desktop, through the shell, to GitHub, and back into VS Code — using only the arrows in the diagram.
3. **Assessment** (3-5 min): Ask students to explain, in their own words, why GitHub is a *required* stop in that path rather than a nice-to-have.

### Assessment
Students should be able to name all four tools, describe at least one relationship between each pair, and explain why a per-project GitHub repository gives Claude the ability to undo its own mistakes.

## References

1. [Crash Course in Talking to Agents — Week 1](../../appendices/crash-course-talking-to-agents.md#week-1-getting-the-tools-talking-to-each-other) — the appendix this diagram illustrates.
2. [GitHub CLI (`gh`) Manual](https://cli.github.com/manual/) — the command-line tool Claude uses to control GitHub.
3. [Visual Studio Code Docs: Using Git source control](https://code.visualstudio.com/docs/sourcecontrol/overview) — how VS Code's Source Control panel commits and syncs with GitHub.
