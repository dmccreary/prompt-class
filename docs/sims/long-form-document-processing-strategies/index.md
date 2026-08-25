---
title: Long-Form Document Processing Strategies
description: An interactive decision flowchart for processing documents that do not fit in the context window, branching on document size and task type, with hover details for every step.
image: /sims/long-form-document-processing-strategies/long-form-document-processing-strategies.png
og:image: /sims/long-form-document-processing-strategies/long-form-document-processing-strategies.png
twitter:image: /sims/long-form-document-processing-strategies/long-form-document-processing-strategies.png
social:
   cards: false
quality_score: 85
---

# Long-Form Document Processing Strategies

<iframe src="main.html" height="532px" width="100%" scrolling="no"></iframe>

[Run the Long-Form Document Processing Strategies Diagram Fullscreen](./main.html){ .md-button .md-button--primary }

## About This Diagram

Sooner or later you will hand an AI something too big for it to read in one go. What you do next
depends on two questions, in this order: does it fit, and what are you actually trying to get
out of it?

Those two questions are the only forks in this flowchart. Everything downstream follows from
them. Summarizing a long report, answering a specific question about it, and analysing its
structure are three genuinely different jobs, and using the summarization approach for a
question-answering task is one of the most common ways to waste tokens and get a worse answer.

## How to Use

1. **Start at the top** with your document and follow the arrows.
2. **Hover over any node** to see a detailed explanation in the panel on the right, including
   the practical gotchas for that step.
3. **Trace all four paths** to the Final Output box. Notice that "Process directly" is a
   one-hop path and the others are not — fitting in the window is worth a lot.

## Embed This Diagram

Place the following line in your website to include this diagram:

```html
<iframe src="https://dmccreary.github.io/prompt-class/sims/long-form-document-processing-strategies/main.html"
        height="532px"
        width="100%"
        scrolling="no"></iframe>
```

## Workflow Steps

| Step | What happens |
|------|--------------|
| Long Document | Estimate the size in tokens before anything else |
| Fits in context window? | Compare against the window, leaving room for instructions and the response |
| Process directly | Send the whole thing with a clear instruction |
| Task type? | Summarization, question answering, and analysis diverge here |
| Chunk and summarize | Split, summarize each piece, then summarize the summaries |
| Extract relevant sections | Send only the sections that bear on the question |
| Hierarchical outline | Outline first, decide what matters, then drill down |
| Final Output | All paths converge; verify the result against the source |

## Lesson Plan

### Learning Objective

Students will be able to select an appropriate long-document processing strategy given a
document size and a task type, and justify the choice.

**Bloom's Level:** Apply (L3) — select, apply

### Grade Level

High school through adult learners.

### Duration

10-15 minutes

### Prerequisites

Students should understand what a context window is and be able to roughly estimate token count
from word count (Chapter 7).

### Activities

1. **Trace the paths (4 min):** Students hover every node and identify which of the four routes
   to Final Output is shortest and why.
2. **Route real scenarios (7 min):** Give the class four scenarios — a 200-page contract with
   one question about a liability clause, a 12-page memo to summarize, a 60-page research paper
   to critique, a 3-page email thread. Students route each through the diagram and defend their
   answer.
3. **Find the failure mode (4 min):** Ask what goes wrong if you use chunk-and-summarize for a
   question-answering task. Students should reach the answer themselves: the chunk containing
   the answer gets summarized into oblivion before the question is ever asked.

### Discussion Questions

- The diagram treats "fits in the context window" as a yes or no question. In practice it is a
  spectrum. At what point should you treat a document that technically fits as though it does
  not?
- Chunking loses information that spans a chunk boundary. What can you do about that?
- Why does the analysis branch ask for an outline first instead of just chunking?

### Assessment

- Can the student route an unfamiliar scenario to the correct branch?
- Can the student name a specific risk of the branch they chose?
- Can the student explain why all four paths end at the same verification step?

## References

1. [Automatic Summarization — Wikipedia](https://en.wikipedia.org/wiki/Automatic_summarization)
2. [Large Language Model — Wikipedia](https://en.wikipedia.org/wiki/Large_language_model)
3. [Chapter 7: Context, Memory, and Information Management](../../chapters/07-context-memory-management/index.md)
