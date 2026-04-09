# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **MkDocs-based educational website** for a comprehensive prompt engineering course that has been taught since March 2020. The course teaches students how to write effective prompts for large language models through hands-on labs and practical exercises.

**Live Site**: https://dmccreary.github.io/prompt-class

## Development Commands

```bash
# Serve locally with live reload (primary development command)
mkdocs serve

# Build static site to /site/ directory
mkdocs build  

# Deploy to GitHub Pages
mkdocs gh-deploy

# Set up development environment
conda create -n mkdocs python=3
conda activate mkdocs
pip install mkdocs mkdocs-material
```

## Architecture and Structure

### Content Organization
- **`/docs/`** - All source content in Markdown
  - `/docs/labs/` - 17+ laboratory exercises (main educational content)
  - `/docs/sims/` - Interactive JavaScript simulations and P5.js code
  - `/docs/img/` - Images, diagrams, and visual assets
  - Root files: index.md, about.md, glossary.md, references.md, etc.

- **`/site/`** - Generated static site (build output, don't edit directly)
- **`/data/`** - CSV datasets for visualization exercises
- **`/src/`** - Python scripts for data analysis labs
- **`/slides/`** - PowerPoint presentations for classroom use

### Lab Content Pattern
Each lab follows a consistent educational format:
1. **Prompt section** - Exact prompt for students to use with AI
2. **Response section** - Expected AI response examples  
3. **Code examples** - Often P5.js, Python, or data analysis code
4. **Links** - References to live examples on p5js.org editor

### Navigation Structure
Navigation is defined in `mkdocs.yml` with explicit ordering:
- Labs are numbered sequentially (01-lists.md through 17-meta-prompts.md)
- Progression from basic skills to advanced techniques
- Interactive examples heavily use P5.js for visualizations

## Technology Stack

- **MkDocs** with Material theme for static site generation
- **P5.js** extensively used for interactive visualizations and animations
- **Python + matplotlib/plotly** for data science exercises
- **Mermaid** for flowcharts and diagrams
- **Creative Commons license** (CC BY-NC-SA 4.0) - educational, non-commercial use

## Configuration Details

### MkDocs Configuration (`mkdocs.yml`)
- **Theme**: Material with blue/orange color scheme
- **Features**: Navigation expansion, code copying, search
- **Analytics**: Google Analytics enabled (G-NVZ3NEY8KG)
- **Plugins**: Search enabled, social preview commented out

### Content Conventions
- All content authored in Markdown
- Internal cross-references between labs and reference materials
- Consistent frontmatter and formatting across files
- Assets organized by type (images in /img/, code in /sims/)

## Development Context

This is an **educational resource** focused on:
- Classroom instruction with instructor notes
- Hands-on learning requiring AI tool interaction
- Version-controlled content with continuous updates
- Open source educational materials for sharing and adaptation

The codebase is mature and well-structured with established patterns for content creation, consistent lab formatting, and a solid technical foundation using modern documentation tools.

## Learning Mascot: Polly the Parrot

### Character Overview

- **Name**: Polly
- **Species**: Parrot
- **Personality**: Friendly, curious, encouraging, witty, great sense of humor
- **Catchphrases**: "Let's craft the perfect prompt!", "Time to talk to AI!", "Words matter - let's get them right!", "Use your words!"
- **Visual**: Bright blue parrot with vivid orange accent feathers, wearing a small headset microphone, modern flat vector cartoon style

### Voice Characteristics

- Uses simple, encouraging language with a humorous twist
- Occasionally uses wordplay and prompt-related puns
- Refers to students as "fellow prompt crafters" or "word wizards"
- Signature phrases: "Let's craft the perfect prompt!", "Use your words!", "Time to talk to AI!", "Words matter - let's get them right!"

### Mascot Admonition Format

Always place mascot images in the admonition body, never in the title bar:

    !!! mascot-welcome "Title Here"
        <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Polly waving welcome">
        Admonition text goes here after the img tag.

### Placement Rules

| Context | Admonition Type | Frequency |
|---------|----------------|-----------|
| General note / sidebar | mascot-neutral | As needed |
| Chapter opening | mascot-welcome | Every chapter |
| Key concept | mascot-thinking | 2-3 per chapter |
| Helpful tip | mascot-tip | As needed |
| Common mistake | mascot-warning | As needed |
| Section completion | mascot-celebration | End of major sections |
| Difficult content | mascot-encourage | Where students may struggle |

### Do's and Don'ts

**Do:**

- Use Polly to introduce new topics warmly
- Alternate catchphrases in welcome admonitions
- Keep dialogue brief (1-3 sentences)
- Match the pose/image to the content type

**Don't:**

- Use Polly more than 5-6 times per chapter
- Put mascot admonitions back-to-back
- Use the mascot for purely decorative purposes
- Change Polly's personality or speech patterns

## Content Generation Style Guide

This style guide applies to **all generated content**: chapter text, FAQs, lesson plans, MicroSim descriptions, glossary entries, and any other prose in this textbook.

### Overall Tone

- **Fun, upbeat, and positive.** The underlying message is: *"Great prompt engineering can be your superpower!"*
- **Professional but never stuffy.** Write like an enthusiastic mentor who genuinely loves this stuff, not like a committee that reviewed the text three times.
- **Encouraging over intimidating.** Assume readers are smart, curious people who just haven't learned this yet. Meet them where they are.

### Humor Guidelines

- **Jokes are welcome.** A well-placed one-liner, analogy, or aside makes the content memorable. Aim for at least one laugh-worthy moment per chapter.
- **Poke gentle fun at hype culture.** The prompt-engineering book market is flooded with titles like *"10 Secret Prompts That Will Make You a Millionaire!"* and *"ChatGPT Hacks the Gurus Don't Want You to Know."* We can lovingly roast that genre. Example: *"Despite what a certain bestseller claims, typing 'make me rich' into ChatGPT does not, in fact, make you rich."*
- **Celebrate the quiet wins.** Millions of people are quietly looking a lot smarter at work because they've learned to prompt well. Their meeting minutes are suddenly crisp. Their emails are suddenly eloquent. Their boss is impressed. They haven't mentioned the AI part yet. Wink at this reality.
- **Use Polly for comic relief.** Polly can deliver the punchlines, quips, and playful warnings. Let her be the class clown (with a heart of gold).
- **Stay professional.** Humor should punch up (at hype, at complexity, at jargon) never down (at readers, at beginners, at any group of people).

### Key Themes to Weave In

1. **Prompt engineering is a superpower.** Frame it as a genuine career advantage and creative skill, not a gimmick.
2. **The field is always evolving.** New models, new capabilities, new techniques appear constantly. What doesn't change: the art of bringing out the best in your AI agents. Good communication skills transfer across every model generation.
3. **Everyone is figuring this out.** Even experts are still experimenting. There's no shame in trial and error — that's literally the process.
4. **Show, don't just tell.** Whenever possible, include a before/after prompt example that demonstrates the concept. A mediocre prompt next to a great prompt teaches more than three paragraphs of theory.
5. **Real-world grounding.** Tie concepts to situations readers actually face: drafting emails, summarizing documents, generating code, preparing presentations, analyzing data.

### Writing Mechanics

- **Lead with the interesting part.** Don't bury the insight under three paragraphs of history.
- **Use analogies.** Compare prompting to giving directions, ordering at a restaurant, briefing a new colleague — whatever makes the concept click.
- **Keep paragraphs short.** 2-4 sentences max. Walls of text are the enemy of learning.
- **Use concrete examples liberally.** Abstract advice like "be specific" means nothing without a prompt that shows what "specific" looks like.
- **Vary sentence length.** Mix short punchy sentences with longer explanatory ones. Rhythm matters.

### Things to Avoid

- **Dry, textbook voice.** No: *"In this chapter, we will examine the theoretical underpinnings of..."* Yes: *"Let's figure out why some prompts get brilliant answers and others get... well, not that."*
- **Hype without substance.** We mock the hype books, so we can't become one. Every claim should be backed by an example or explanation.
- **Dated references.** The field moves fast. Avoid statements like "GPT-4 is the latest model" that will age poorly. Use relative framing: "current frontier models" or "as of this writing."
- **Gatekeeping.** Never imply that prompt engineering is only for developers, only for technical people, or only for a certain audience. This course is for everyone with a high school education and curiosity.

### Polly's Role in Content

Polly isn't just decoration — she's a teaching partner:

- **Chapter openers**: Polly welcomes readers with energy and sets expectations with a light touch
- **Key insights**: Polly highlights the "aha!" moment in her own words
- **Tips**: Polly shares practical shortcuts like a friend who's been there
- **Warnings**: Polly flags common mistakes with humor — *"I've seen this go wrong more times than I've molted feathers, and trust me, that's a lot."*
- **Celebrations**: Polly genuinely cheers the reader on at milestones
- **Encouragement**: When content gets hard, Polly normalizes the struggle — *"If this feels tricky, that's because it IS tricky. But you've got this, word wizard."*

### Sample Voice (for calibration)

Here's the kind of energy we're going for:

> You know what's funny? The people writing the best emails in your office right now
> might not be the best writers. They might just be the best prompt engineers. They've
> figured out that if you tell the AI "write a professional but warm follow-up email
> to a client who missed a deadline, keeping the tone constructive," you get something
> way better than "write an email about the deadline." That's not cheating. That's
> communicating clearly. And honestly, isn't clear communication what we've always
> wanted from professionals?

And Polly might add:

> !!! mascot-tip "Polly's Tip"
>     Words matter - let's get them right! Think of prompting like ordering coffee.
>     "Give me coffee" gets you... coffee. "Give me a large oat milk latte, extra hot,
>     light foam" gets you exactly what you want. Same energy, fellow prompt crafters!