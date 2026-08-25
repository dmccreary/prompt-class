---
title: Temperature Explorer
description: An interactive bar chart of candidate next tokens showing how the temperature parameter reshapes the probability distribution, with live sampling that builds a sentence one token at a time.
image: /sims/temperature-explorer/temperature-explorer.png
og:image: /sims/temperature-explorer/temperature-explorer.png
twitter:image: /sims/temperature-explorer/temperature-explorer.png
social:
   cards: false
quality_score: 85
---

# Temperature Explorer

<iframe src="main.html" height="567px" width="100%" scrolling="no"></iframe>

[Run the Temperature Explorer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

"Temperature controls creativity" is the explanation everyone gives, and it is not wrong, but it
is not an explanation. This MicroSim shows what temperature actually does: it rescales the
probability distribution over candidate next tokens before one is sampled.

Slide temperature to 0 and the tallest bar swallows everything — the same word wins every time.
Slide it to 2 and the bars flatten until *bureaucratic* is nearly as likely as *young*. Between
those extremes is where useful text lives.

Each bar shows two numbers: the raw probability the model assigned, and the temperature-adjusted
probability actually used for sampling. Watching the second number move while the first stays put
is the whole lesson.

## How to Use

1. **Pick a prompt stem** from the dropdown. Each one has its own hand-built token distributions.
2. **Move the temperature slider** and watch the bars redistribute. Nothing is sampled yet — this
   is purely the shape of the distribution.
3. **Press "Generate Next Token"** to sample one token. The chosen bar is outlined in red and the
   word is appended to the sentence below.
4. **Press "Generate 10 Tokens"** to run the rest of the sequence at the current temperature.
5. **Press "Reset"**, change the temperature, and generate again. Run the same stem at 0.0, at
   0.7, and at 1.8, and compare the three sentences.

!!! note "About the model"
    The probability distributions here are hand-authored to be illustrative, not scraped from a
    live model. The softmax-with-temperature maths is exactly what a real model uses; the numbers
    it operates on are teaching data.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/prompt-class/sims/temperature-explorer/main.html"
        height="567px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

Students will be able to demonstrate how the temperature parameter changes the probability
distribution of token selection, and predict the effect on output creativity.

**Bloom's Level:** Apply (L3) — demonstrate, practice

### Grade Level

High school through adult learners. No mathematics beyond reading a percentage is required.

### Duration

15 minutes

### Prerequisites

Students should know what a token is and that models generate one token at a time (Chapter 1).

### Activities

1. **Predict before you sample (5 min):** With temperature at 0, students predict which word
   will be chosen, then press *Generate Next Token* to check. Repeat three times and confirm the
   result never changes.
2. **Find the breaking point (5 min):** Students raise the temperature in steps of 0.2, running
   the full sequence at each setting, until the sentence stops making sense. They record the
   temperature where that happened. Compare answers across the class — they will differ, which
   is itself worth discussing.
3. **Match the task (5 min):** Give students three tasks — extracting dates from an invoice,
   brainstorming product names, drafting a customer email — and have them argue for a temperature
   setting for each.

### Discussion Questions

- At temperature 0, the raw and adjusted numbers look very different, but the winner is always
  the same. Why bother rescaling at all?
- Why is temperature 0 usually the right choice for data extraction and usually the wrong choice
  for creative writing?
- The word *purple* is in several of these distributions with a low raw probability. At what
  temperature does it start winning, and what does that tell you about high-temperature output?
- If a model gives you a different answer each time you ask, is that a bug?

### Assessment

- Can the student predict the output at temperature 0 before running it?
- Can the student explain, using the two numbers on a bar, what temperature changed?
- Can the student recommend a temperature for an unfamiliar task and justify it?

## References

1. [Softmax Function — Wikipedia](https://en.wikipedia.org/wiki/Softmax_function)
2. [Large Language Model — Wikipedia](https://en.wikipedia.org/wiki/Large_language_model)
3. [Chapter 3: Prompt Types and Model Parameters](../../chapters/03-prompt-types-parameters/index.md)
