---
title: "Prompt Quality Evaluator"
description: "A calibration exercise where students rate five prompt and response pairs on relevance, accuracy, completeness, and conciseness, then compare their ratings against expert scores."
image: /sims/prompt-quality-evaluator/prompt-quality-evaluator.png
og:image: /sims/prompt-quality-evaluator/prompt-quality-evaluator.png
twitter:image: /sims/prompt-quality-evaluator/prompt-quality-evaluator.png
social:
   cards: false
quality_score: 85
---

# Prompt Quality Evaluator

<iframe src="main.html" height="617px" width="100%" scrolling="no"></iframe>

[Run the Prompt Quality Evaluator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

You cannot improve a response you cannot judge. This MicroSim trains judgement directly: five
prompt and response pairs, four quality dimensions, and an expert rating waiting behind a button.

Each example is rigged to fail in exactly one way. One response wanders off topic. One is fluent
and completely wrong. One stops halfway through the task. One says a correct thing at
catastrophic length. The fifth is genuinely good, which is harder to spot than you would think.

The scoring is not the point. The gap between your number and the expert's number is the point.

## How to Use

1. **Read the prompt and response** at the top of the drawing area.
2. **Set all four sliders** from 1 to 10. Commit to a number before you check — guessing after
   the fact teaches nothing.
3. **Press "Check My Ratings"** to reveal the expert scores. Your rating shows as a blue circle,
   the expert's as a black triangle, and the bar between them is green if you were within 2
   points, amber within 4, red beyond that.
4. **Read the one-line lesson** under the score bars, then press **"Next Prompt"** for the next
   example.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/prompt-class/sims/prompt-quality-evaluator/main.html"
        height="617px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

Students will be able to assess the quality of AI prompts and responses using the four
evaluation dimensions of relevance, accuracy, completeness, and conciseness.

**Bloom's Level:** Evaluate (L5) — assess, judge

### Grade Level

High school through adult learners.

### Duration

15-20 minutes

### Prerequisites

Students should know the four quality dimensions by name from Chapter 2.

### Activities

1. **Cold calibration (8 min):** Students work through all five examples alone, committing to
   ratings before revealing expert scores. They record their match percentage for each.
2. **Compare the misses (7 min):** In pairs, students find the example where they were furthest
   from the expert and argue for their own number. Sometimes the student is right — the goal is
   a defensible rating, not agreement.
3. **Apply to their own work (5 min):** Students rate a response they received earlier in the
   week on all four dimensions and identify which single dimension to fix first.

### Discussion Questions

- Example 2 is fluent, well-structured, and factually wrong. Which dimension catches that, and
  why is it the hardest one for a reader to check?
- Can a response score 10 on accuracy and 2 on completeness at the same time? What would that
  look like?
- Conciseness is not the same as brevity. What is the difference?
- Why might two expert raters disagree by 2 points and both be right?

### Assessment

- Can the student rate a new prompt and response pair within 2 points of an expert on at least
  three of four dimensions?
- Can the student name which dimension a given failure belongs to?
- Can the student explain why "the response was bad" is not a usable diagnosis?

## References

1. [Evaluation of Machine Translation — Wikipedia](https://en.wikipedia.org/wiki/Evaluation_of_machine_translation)
2. [Inter-rater Reliability — Wikipedia](https://en.wikipedia.org/wiki/Inter-rater_reliability)
3. [Chapter 2: Prompt Fundamentals](../../chapters/02-prompt-fundamentals/index.md)
