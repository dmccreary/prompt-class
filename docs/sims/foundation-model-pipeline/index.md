---
title: Foundation Model Training Pipeline
description: A three-stage walkthrough of how raw text becomes a useful AI assistant - pre-training, fine-tuning, and inference - with a toggle that swaps plain-language explanations for concrete sample data.
image: /sims/foundation-model-pipeline/foundation-model-pipeline.png
og:image: /sims/foundation-model-pipeline/foundation-model-pipeline.png
twitter:image: /sims/foundation-model-pipeline/foundation-model-pipeline.png
social:
   cards: false
quality_score: 85
---

# Foundation Model Training Pipeline

<iframe src="main.html" height="527px" width="100%" scrolling="no"></iframe>

[Run the Foundation Model Training Pipeline MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

Most people meet a language model at the very end of its life story — the chat box. This
MicroSim shows the two stages that happened before that, and why each one matters to you as a
prompt engineer.

Pre-training is where the model learns language by predicting the next token trillions of times.
Fine-tuning is where it learns to behave like an assistant. Inference is the only stage you
actually participate in, and your prompt is the only lever you get. That framing explains a lot
about why prompt engineering works the way it does.

## How to Use

1. **Step through the stages** with the *Prev Stage* and *Next Stage* buttons, or click any
   stage box directly.
2. **Read the detail panel** at the bottom for a plain-language explanation of what happens in
   that stage.
3. **Tick "Show Example Data"** to replace the explanation with concrete sample data — the
   actual kind of text used in pre-training, an actual fine-tuning instruction, an actual prompt
   and response.
4. Notice the arrow labels between stages. *Transfer Learning* and *API / Chat Interface* are
   the mechanisms that connect one stage to the next.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/prompt-class/sims/foundation-model-pipeline/main.html"
        height="527px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

Students will be able to explain how pre-training, fine-tuning, and transfer learning work
together to create a useful language model.

**Bloom's Level:** Understand (L2) — explain, summarize

### Grade Level

High school through adult learners.

### Duration

10-15 minutes

### Prerequisites

Familiarity with the terms *token*, *training data*, and *inference* from Chapter 1.

### Activities

1. **Narrate the pipeline (5 min):** Students step through all three stages with the example
   toggle off, then close the MicroSim and describe the pipeline out loud to a partner without
   looking.
2. **Ground it in data (5 min):** Students step through again with "Show Example Data" ticked.
   Ask them what surprised them about how simple the pre-training example is.
3. **Find the lever (5 min):** Ask the class which stage they can influence. The answer is only
   the third one — and that realisation is the whole justification for the rest of the course.

### Discussion Questions

- Pre-training costs millions of dollars and happens once. Fine-tuning is comparatively cheap
  and happens often. Why does that economic asymmetry exist?
- The model's weights never change during inference. If that is true, why does a better prompt
  produce a better answer?
- Where in this pipeline does a model's tone and willingness to refuse harmful requests come
  from?

### Assessment

- Can the student name the three stages in order and say what each one produces?
- Can the student explain the difference between pre-training and fine-tuning in one sentence?
- Can the student identify which stage a prompt engineer operates in, and why that matters?

## References

1. [Foundation Model — Wikipedia](https://en.wikipedia.org/wiki/Foundation_model)
2. [Fine-tuning (deep learning) — Wikipedia](https://en.wikipedia.org/wiki/Fine-tuning_(deep_learning))
3. [Transfer Learning — Wikipedia](https://en.wikipedia.org/wiki/Transfer_learning)
4. [Chapter 1: AI and Machine Learning Foundations](../../chapters/01-ai-ml-foundations/index.md)
