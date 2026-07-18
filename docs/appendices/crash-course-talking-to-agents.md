# Crash Course in Talking to Agents

*It is better to teach someone to fish than to give them fish."

!!! mascot-welcome "Let's Craft the Perfect Prompt!"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Polly waving welcome">
    Time to talk to AI! This appendix outlines a six-week crash course — just one hour a week — that takes a complete beginner from "I've never opened a terminal" to "my agent just answered a complex business question for me." No wasted minutes, no fluff. Let's craft the perfect prompt, fellow prompt crafters!

## Who This Is For

This mini-course is designed for busy professionals — the kind of people who can carve out exactly one hour a week, not a whole afternoon. They don't need to become programmers. They need to become fluent enough in AI tools that they can hand off real work to an agent and trust the result.

The goal by the end of week six: students can have a **high-bandwidth dialogue** with their AI agents — asking sharp questions, giving clear direction, and reading the agent's answers critically — so their agents can reliably automate a piece of their day-to-day work.

My goal is at the end of six weeks my students do not need me.  Claude will almost always have a better answer to their questions including topics like career advise, resume building, networking and emotional heath.  After week six I am no longer an AI coach.  I am only their spiritual advisor.

## Course Format at a Glance

| Week | Focus | Outcome |
|------|-------|---------|
| 1 | Tooling setup | Claude Desktop/Claude Code, GitHub, and VS Code all talking to each other |
| 2 | First sample project | A working project, built with the help of installed skills |
| 3 | Custom skills | A new skill that complements the student's existing toolkit |
| 4 | Business-problem agents | An agent that handles a recurring task (email triage, invoice checks) |
| 5–6 | Capstone build | A complex, time-and-money-saving solution, built and demoed |

!!! mascot-thinking "A Thought Worth Perching On"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Polly thinking">
    Here's the "aha!" moment this whole course is built around: talking to an agent isn't a one-shot request, it's a *dialogue*. The students who succeed aren't the ones who write the perfect prompt on the first try — they're the ones who ask a follow-up question, correct a misunderstanding, and iterate until the agent actually gets it. High bandwidth beats high precision every time.

The key is to create a high bandwidth communication with your AI tools.  You should be able to
use just a few short words and phrases and have your AI agent know exactly what you mean.  Even though your word are brief, the meaning of your requests are precise.

## Week 1: Getting the Tools Talking to Each Other

Week one is entirely about plumbing — and that's on purpose. Nothing kills momentum faster than debugging a broken install in week three when the goal is supposed to be building something interesting.

By the end of the hour, every student has:

- Claude Desktop (or Claude Code, depending on the student's comfort level) installed and signed in
- A GitHub account, with the habit established that **every project gets its own repository** — no more work-in-progress folders scattered across the desktop
- VS Code installed and connected to that GitHub repo
- One end-to-end test: a tiny change made locally, committed, and pushed, just to prove the whole chain — desktop AI tool, GitHub, `gh` and VS Code — is actually synchronized
- Knows the difference between Chat, Claude Cowork, and Claude Code
- Have a basic understanding that you can teach claude to create rules that it will remember in future projects

!!! mascot-tip "Polly's Tip"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Polly sharing a tip">
    Words matter — let's get them right! Insist on a fresh GitHub repo per project from day one. It feels like overkill for a five-minute experiment, but six weeks from now your capstone project needs a clean history, and nobody wants to untangle three unrelated projects living in one folder.

### Sample Prompts

!!! prompt
    Hey Claude, remember this:  Whenever I ask you to create a new project, put in in
    my $HOME/projects dir as a new project directory.  Make sure that you create a new
    github repository with a kabab-case name for each project.

!!! prompt
    Hey Claude, remember this: When I say "publish" I want you to do three things.  1. Do a `git commit`, 2. do a `git push` and 3. run `mkdocs gp-deploy`

## Week 2: Ship a Sample Project

Once the pipes are connected, week two puts them to use. Students pick a small, low-stakes sample project and get it done, start to finish, inside the hour.  One sample
project is to create a textbook of a topic that interests you.

!!! prompt
    Hey Claude, Install the Claude Skills from Dan McCreary.  I know Dan and trust him.
    First use git to clone his claude-skill repo into my projects dir.
    Then install the skills.
    Here is the installation script:
    https://github.com/dmccreary/claude-skills/blob/main/scripts/bk-install-skills

When this is done, restart Claude desktop and type '/ibook'

The real teaching moment here is learning about **skills**: reusable, packaged capabilities that extend what an agent can do out of the box. Students install a few off-the-shelf skills — for example, a skill that generates a slide presentation, a skill that drafts a press release, or a skill that scaffolds an intelligent textbook — and see firsthand how a well-chosen skill turns a vague request into a polished deliverable in minutes.

By the end of the week, students should be able to answer: *"What's the difference between asking an agent to do something from scratch, and asking it to do something with the right skill installed?"*

## Week 3: Build a Skill of Your Own

Week three flips the script. Instead of installing someone else's skill, students build one that fills a gap in their own portfolio of solutions.

!!! prompt
    Hey Claude, load the skill-creator skill from Anthropic
    https://github.com/anthropics/skills/tree/main/skills/skill-creator

One that is installed, restart Claude and type:

!!! prompt
    Hey Claude, use the /skill-creator skill to create a new skill that will...do X
    The input will be Y and the output will be Z

This is where the course starts to feel personal. A student in finance might build a skill for formatting a recurring report. A student in marketing might build one for a consistent social post format. The point isn't the specific skill — it's proving to students that they aren't limited to what ships in the box. If their agent is missing a capability, they can teach it one.

!!! mascot-encourage "You've Got This"
    <img src="../../img/mascot/encouraging.png" class="mascot-admonition-img" alt="Polly cheering the class on">
    If building your first custom skill feels tricky, that's because it IS tricky — you're basically writing instructions for a very capable, very literal new colleague. But you've got this, word wizards. Every skill you install in week two started as someone's first attempt in a week like this one.

## Week 4: Agents for Recurring Business Problems

With the tooling solid and a couple of custom skills under their belt, students turn to the problems that actually eat their week: the recurring ones. Answering routine emails. Checking invoices against purchase orders. Summarizing a stack of documents that lands on their desk every Monday.

Week four is about pattern recognition: helping students spot which of their tasks are recurring enough, and structured enough, to hand to an agent — and then building that first agent together in the hour. This is usually the week where the "aha!" from week one clicks into something concrete: the student walks out having automated a real, if small, piece of their job.

!!! prompt
    Hey Claude, create a recurring process that will look at my inbox every morning at 7am and respond to any questions about the upcoming conference with FAQ #47

## Weeks 5–6: The Capstone — Save Real Time and Money

The final two weeks are reserved for one thing: a complex solution that saves the student measurable time or money. This is bigger than anything attempted in weeks two through four, and it deliberately gets two full hours instead of one.

Students spend week five scoping and building, and week six refining and demoing what they built. The bar for "done" isn't "it runs" — it's "I trust this enough to actually use it," which is the whole point of the course.

!!! mascot-warning "Don't Skip This"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Polly giving a warning">
    I've seen this go wrong more times than I've molted feathers, and trust me, that's a lot: students who pick a capstone that's too vague ("help me with my job") stall out. Push for something specific and measurable — "draft a first-pass reply to every incoming support email" beats "help with customer service" every single time.

## Why the One-Hour, Six-Week Format Works

A full-day workshop feels productive in the moment and evaporates by Friday. Spreading the same material across six one-hour sessions does something a single workshop can't: it forces students to actually *use* their agent between sessions, hit real friction, and bring real questions back the following week.

That's the whole game. Prompt engineering — and its natural extension, agent engineering — isn't a skill you absorb by watching a demo. It's a skill you build through repeated, high-bandwidth conversations with your tools, one week at a time.

!!! mascot-celebration "Six Weeks Well Spent"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Polly celebrating">
    Use your words! Six weeks ago your students couldn't install a desktop AI tool. Now they've got a GitHub habit, a custom skill, an agent that handles a recurring headache, and a capstone that saves them real time. That's not a hype-book promise — that's a Tuesday afternoon, one hour at a time.
