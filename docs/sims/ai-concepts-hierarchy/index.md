---
title: "AI Concepts Hierarchy"
description: "A nested infographic of the twenty foundational AI concepts, from Artificial Intelligence at the outside down to Human-AI Interaction at the centre, with hover definitions and click-to-highlight dependencies."
image: /sims/ai-concepts-hierarchy/ai-concepts-hierarchy.png
og:image: /sims/ai-concepts-hierarchy/ai-concepts-hierarchy.png
twitter:image: /sims/ai-concepts-hierarchy/ai-concepts-hierarchy.png
social:
   cards: false
quality_score: 85
---

# AI Concepts Hierarchy

<iframe src="main.html" height="607px" width="100%" scrolling="no"></iframe>

[Run the AI Concepts Hierarchy MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

Chapter 1 introduces twenty foundational concepts in a row, which is a lot of vocabulary to
absorb as a flat list. This MicroSim rearranges them as nested containers so the relationships
become visible: Machine Learning and Natural Language Processing both sit inside Artificial
Intelligence, Large Language Models sit inside NLP, and Tokens, Context Windows, and Inference
all sit inside Large Language Models.

The nesting is the lesson. When a student sees that Transformer Architecture lives inside Neural
Network Basics, which lives inside Machine Learning, the dependency is no longer something to
memorise — it is something to look at.

## How to Use

1. **Hover any concept** to read a one-sentence definition in the panel at the bottom.
2. **Click a concept** to pin it. Every concept that depends on it is outlined in orange, so you
   can see how far a single idea reaches. Try clicking *Token / Tokenization* and notice that
   Context Window, Inference, and Generative AI all light up.
3. **Click a container** (a concept that holds others) to zoom into that branch and see it at
   full size. Use **Zoom Out** to come back.
4. **Clear Selection** returns the whole diagram to its starting state.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/prompt-class/sims/ai-concepts-hierarchy/main.html"
        height="607px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

Students will be able to classify the foundational AI concepts into their hierarchical
relationships and explain how each one builds on the concepts that contain it.

**Bloom's Level:** Understand (L2) — classify, organize

### Grade Level

High school through adult learners. No technical background required.

### Duration

10-15 minutes

### Prerequisites

None. This MicroSim is designed as the visual anchor for a student's first pass through
Chapter 1.

### Activities

1. **Free exploration (4 min):** Students hover across the whole diagram and read every
   definition once, without trying to memorise anything.
2. **Containment check (5 min):** Ask students to answer from the diagram alone — Is a
   transformer a kind of neural network, or the other way around? Is Generative AI inside or
   outside Natural Language Processing? Why might reasonable people disagree about where the
   API box belongs?
3. **Dependency trace (5 min):** Have students click *Pre-Training* and list everything that
   depends on it. Then ask the reverse question: what would stop working if training data
   disappeared?

### Discussion Questions

- Why is Human-AI Interaction the most deeply nested concept in this diagram?
- Fine-Tuning depends on both Pre-Training and Transfer Learning. What does that tell you about
  the order in which these stages happen?
- If a new model architecture replaced transformers tomorrow, which boxes in this diagram would
  have to change, and which would stay exactly as they are?

### Assessment

- Can the student place a newly encountered term in the correct container?
- Can the student explain, in their own words, why Context Window depends on Token?
- Can the student name one concept that nearly everything else depends on?

## References

1. [Artificial Intelligence — Wikipedia](https://en.wikipedia.org/wiki/Artificial_intelligence)
2. [Large Language Model — Wikipedia](https://en.wikipedia.org/wiki/Large_language_model)
3. [Transformer (deep learning architecture) — Wikipedia](https://en.wikipedia.org/wiki/Transformer_(deep_learning_architecture))
4. [Chapter 1: AI and Machine Learning Foundations](../../chapters/01-ai-ml-foundations/index.md)
