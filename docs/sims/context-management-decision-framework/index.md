---
title: Context Management Decision Framework
description: An interactive decision tree for choosing a context management strategy, from prompt compression through chunking to conversation history management, with hover details for every step.
image: /sims/context-management-decision-framework/context-management-decision-framework.png
og:image: /sims/context-management-decision-framework/context-management-decision-framework.png
twitter:image: /sims/context-management-decision-framework/context-management-decision-framework.png
social:
   cards: false
quality_score: 85
---

# Context Management Decision Framework

<iframe src="main.html" height="882px" width="100%" scrolling="no"></iframe>

[Run the Context Management Decision Framework Diagram Fullscreen](./main.html){ .md-button .md-button--primary }

## About This Diagram

Chapter 7 introduces half a dozen context management techniques, and it is easy to come away
with a list rather than a method. This diagram turns the list into a decision tree: given a task,
follow the branches and you arrive at the technique that fits.

The tree has two halves. The top half decides what goes into the prompt. The bottom half — the
part most people forget — decides what to do when a conversation runs long enough that the
history itself becomes the problem.

## How to Use

1. **Start at "New Prompt Task"** and follow the arrows down.
2. **Hover over any node** for a detailed explanation in the right-hand panel, including the
   symptoms that tell you which branch you are on.
3. **Notice the convergence at "Submit Prompt."** Four different technique paths meet there,
   which is a useful reminder that these techniques are alternatives, not a checklist.
4. **Follow the multi-turn loop.** A single conversation can pass through the history-management
   cycle several times.

## Embed This Diagram

Place the following line in your website to include this diagram:

```html
<iframe src="https://dmccreary.github.io/prompt-class/sims/context-management-decision-framework/main.html"
        height="882px"
        width="100%"
        scrolling="no"></iframe>
```

## Workflow Steps

| Step | What happens |
|------|--------------|
| New Prompt Task | Clarify what you are asking and what the model needs to know |
| How much context needed? | Minimal, moderate, or extensive — the first fork |
| Prompt Compression | Say more with fewer tokens |
| Relevance Filtering + Context Injection | Remove what does not help, add what does |
| Does it fit in context window? | Count tokens including instructions and response |
| Background Info + Domain Priming | It fits, so supply background and domain vocabulary |
| Document Summarization + Chunking | It does not fit, so reduce it first |
| Process in Stages | Chunked material needs multiple passes |
| Submit Prompt | All technique paths converge here |
| Multi-turn conversation? | One-shot tasks end; conversations continue |
| Manage Conversation History | The model is stateless — history management is your job |
| History getting long? | Watch for forgetting, slowdown, and rising cost |
| Summarize + Reset Context | Summarize, start fresh, paste the summary in |

## Lesson Plan

### Learning Objective

Students will be able to select and justify an appropriate context management strategy for a
given prompting task, including deciding when to reset a long conversation.

**Bloom's Level:** Apply (L3) — select, apply

### Grade Level

High school through adult learners.

### Duration

15 minutes

### Prerequisites

Students should have read Chapter 7's coverage of prompt compression, relevance filtering,
context injection, and conversation history.

### Activities

1. **Hover tour (5 min):** Students read every node's detail, paying particular attention to the
   decision diamonds, which carry the diagnostic criteria.
2. **Route the scenarios (7 min):** Students route four tasks through the tree — a one-line
   rewrite request, a question about a 40-page requirements document, a 30-turn debugging
   session, and a task that needs three internal acronyms defined.
3. **Recognise the reset (3 min):** Ask students to describe, from experience, what a
   conversation feels like right before it needs a reset. Map their symptoms onto the "History
   getting long?" node.

### Discussion Questions

- The diagram treats prompt compression as the answer when minimal context is needed. Why is
  compression still worth doing when you have plenty of window to spare?
- Four paths converge at "Submit Prompt." What does that convergence tell you about how these
  techniques relate to each other?
- Resetting a conversation feels like losing progress. What does the "Summarize + Reset Context"
  step preserve, and what does it genuinely lose?
- Where in this tree would a retrieval-augmented generation system sit?

### Assessment

- Can the student route an unfamiliar task to a leaf and name the technique?
- Can the student state the symptom that triggers a context reset?
- Can the student explain why the model being stateless makes history management the user's
  responsibility?

## References

1. [Prompt Engineering — Wikipedia](https://en.wikipedia.org/wiki/Prompt_engineering)
2. [Large Language Model — Wikipedia](https://en.wikipedia.org/wiki/Large_language_model)
3. [Chapter 7: Context, Memory, and Information Management](../../chapters/07-context-memory-management/index.md)
