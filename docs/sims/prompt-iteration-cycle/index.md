---
title: "Prompt Iteration Cycle"
description: "A five-step refinement loop - write, send, evaluate, diagnose, refine - with a quality gauge in the centre that climbs as the learner works around the cycle."
image: /sims/prompt-iteration-cycle/prompt-iteration-cycle.png
og:image: /sims/prompt-iteration-cycle/prompt-iteration-cycle.png
twitter:image: /sims/prompt-iteration-cycle/prompt-iteration-cycle.png
social:
   cards: false
quality_score: 85
---

# Prompt Iteration Cycle

<iframe src="main.html" height="567px" width="100%" scrolling="no"></iframe>

[Run the Prompt Iteration Cycle MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

Beginners tend to treat a disappointing AI response as a verdict. Experienced prompt engineers
treat it as data. This MicroSim makes that difference visible by drawing prompt refinement as a
loop rather than a line, with a quality gauge in the middle that only moves when you keep going.

The five steps are deliberately ordinary: write, send, evaluate, diagnose, refine. The one most
people skip is *diagnose*, and skipping it is why so many second attempts are no better than the
first.

## How to Use

1. **Press "Next Step"** to move around the cycle. The quality gauge in the centre climbs a
   little with every step you take.
2. **Click any step** to read its worked example without advancing the cycle.
3. **Watch the gauge.** It starts at 15%, which is roughly what a first draft earns. Getting it
   into the green takes several full laps — that is the point.
4. **Press "Reset"** to start over from a blank first draft.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/prompt-class/sims/prompt-iteration-cycle/main.html"
        height="567px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

Students will be able to explain the iterative process of prompt refinement and how each step
contributes to improving response quality.

**Bloom's Level:** Understand (L2) — explain, summarize

### Grade Level

High school through adult learners.

### Duration

10-15 minutes

### Prerequisites

Students should have written at least one prompt and been mildly disappointed by the result.
That experience is the hook.

### Activities

1. **Walk the loop (4 min):** Students press *Next Step* through two complete cycles, reading
   each worked example as it appears.
2. **Name the skipped step (4 min):** Ask the class which of the five steps they usually skip
   in real life. Most will admit to jumping from *Evaluate* straight to *Refine*. Discuss what
   goes wrong when you fix something without diagnosing it.
3. **Run it for real (7 min):** Students take a genuinely weak prompt of their own and work it
   through all five steps once, writing down their diagnosis in words before they touch the
   prompt.

### Discussion Questions

- Why does the gauge start at 15% rather than 0%?
- Two of the five steps are coloured differently. What do *Evaluate Response* and *Diagnose
  Issues* have in common that the other three do not?
- What would it mean for the gauge to stop climbing? Is there a point where more iteration stops
  paying off?

### Assessment

- Can the student name all five steps in order?
- Can the student state a diagnosis in the form "the response was X because the prompt lacked Y"?
- Can the student explain why iteration is a normal part of the process rather than evidence of
  a mistake?

## References

1. [Prompt Engineering — Wikipedia](https://en.wikipedia.org/wiki/Prompt_engineering)
2. [Iterative Design — Wikipedia](https://en.wikipedia.org/wiki/Iterative_design)
3. [Chapter 2: Prompt Fundamentals](../../chapters/02-prompt-fundamentals/index.md)
