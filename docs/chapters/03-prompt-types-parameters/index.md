---
title: Prompt Types and Model Parameters
description: Categories of prompts and model settings like temperature, top-p, and penalties that give you fine-grained control over AI output.
generated_by: claude skill chapter-content-generator
date: 2026-04-08 21:13:55
version: 0.07
---

# Prompt Types and Model Parameters

!!! mascot-welcome "Let's Get Technical!"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Polly waving welcome">
    Use your words! Now that you know the fundamentals of writing good prompts, let's talk about the *types* of prompts and the secret control panel behind every AI model. Think of model parameters as the mixing board in a recording studio — the singer (your prompt) matters most, but the engineer's settings make all the difference.

## The Five Flavors of Prompts

Not all prompts are the same shape. Understanding the different categories helps you choose the right approach for each situation. Let's meet the five main types.

### Directive Prompts

A **directive prompt** tells the AI exactly what to do. It's a command, an instruction, a marching order. Directive prompts are the workhorses of prompt engineering — they get things done.

Examples of directive prompts:

- "Write a 200-word product description for a wireless Bluetooth speaker."
- "Translate the following paragraph from English to Spanish."
- "Create a Python function that sorts a list of dictionaries by the 'date' key."

Directive prompts work best when you know precisely what output you want. They pair perfectly with the specificity and clarity principles from Chapter 2.

### Interrogative Prompts

An **interrogative prompt** asks a question. It requests information, explanation, or analysis rather than commanding a specific output.

Examples:

- "What are the main causes of the French Revolution?"
- "How does photosynthesis work?"
- "Why do neural networks need activation functions?"

Interrogative prompts are great for learning, research, and exploration. The quality of the answer depends heavily on how specific your question is — "Tell me about history" will get you a very different response than "What were the three most important economic factors leading to the Industrial Revolution in England?"

### Open-Ended Prompts

**Open-ended prompts** give the model creative freedom. They don't constrain the format, length, or direction of the response, allowing the AI to explore ideas broadly.

Examples:

- "What are some innovative ways to reduce food waste in cities?"
- "Brainstorm names for a sustainable clothing brand."
- "How might artificial intelligence change education in the next decade?"

Open-ended prompts are ideal for brainstorming, creative writing, and exploring possibilities. The tradeoff is less predictability — you might get brilliant ideas or wandering tangents.

### Closed-Ended Prompts

**Closed-ended prompts** constrain the response to a specific format or set of options. They're the opposite of open-ended prompts — they want a precise, bounded answer.

Examples:

- "Is Python an interpreted or compiled language? Answer in one word."
- "Rate this customer review sentiment as Positive, Negative, or Neutral."
- "What is 2 + 2? Give only the number."

Closed-ended prompts are essential for data extraction, classification, and any task where you need consistent, structured output. They're heavily used in business automation.

### Conversational Prompts

**Conversational prompts** engage the AI in a back-and-forth dialogue. Rather than a single instruction, they build on previous exchanges to progressively refine or explore a topic.

Examples:

- "Let's discuss the pros and cons of remote work."
- "I'm planning a trip to Japan. Can you help me think through the itinerary?"
- "I just got this error in my code. Here's the traceback..." followed by "What if I try using a different data structure?" followed by "Can you show me how that would look?"

Conversational prompts leverage the model's context window — each message builds on the conversation history, allowing for nuanced, evolving interactions.

The following table summarizes when to use each prompt type:

| Prompt Type | Best For | Example Use Case |
|------------|----------|-----------------|
| Directive | Getting specific output | Writing emails, generating code, formatting data |
| Interrogative | Learning and research | Understanding concepts, getting explanations |
| Open-Ended | Brainstorming and creativity | Generating ideas, exploring possibilities |
| Closed-Ended | Classification and extraction | Sentiment analysis, yes/no decisions, data labeling |
| Conversational | Iterative exploration | Debugging, planning, complex problem-solving |

!!! mascot-thinking "Key Insight"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Polly thinking">
    Words matter - let's get them right! In practice, most effective prompts are hybrids. A great prompt might start as a directive ("Write a blog post..."), include interrogative elements ("What would resonate with a millennial audience?"), and use closed-ended constraints ("Format as exactly 5 sections with bold headers"). Don't feel boxed in by categories — mix and match!

## The Model Control Panel: Parameters

Now for the fun part. Behind every AI interface is a set of adjustable parameters that influence *how* the model generates its response. These are the dials and knobs that let you tune the AI's behavior beyond just what you write in the prompt.

Not every interface exposes these settings — consumer chatbots like ChatGPT often hide them behind defaults. But if you're using an API or an advanced interface, understanding these parameters gives you superpowers that most users never discover.

### Temperature Setting

**Temperature** controls the randomness (or creativity) of the model's output. It's a number typically between 0 and 2, with most useful values between 0 and 1.

Here's the intuition: at each step of generating a response, the model calculates a probability for every possible next token. Temperature affects how it picks from those probabilities.

- **Temperature 0** — The model always picks the highest-probability token. Output is deterministic and consistent. Same prompt → same response every time.
- **Temperature 0.3-0.5** — Mostly predictable with occasional variation. Great for factual tasks.
- **Temperature 0.7-0.8** — Good balance of creativity and coherence. The default for most chatbots.
- **Temperature 1.0+** — Highly creative and unpredictable. Can produce surprising insights — or nonsense.

Think of temperature like spice in cooking. Zero is plain rice — reliable, consistent, boring. One is a Thai curry — exciting, flavorful, occasionally too much. You want the right amount for the dish you're making.

| Temperature | Behavior | Best For |
|------------|----------|----------|
| 0.0 | Deterministic, always the same | Code generation, factual Q&A, data extraction |
| 0.3 | Low variation, highly focused | Technical writing, summarization |
| 0.7 | Balanced creativity and coherence | General writing, conversation |
| 1.0 | High variation, creative | Brainstorming, poetry, creative fiction |
| 1.5+ | Very random, often incoherent | Experimental use only |

### Top-P Sampling (Nucleus Sampling)

**Top-P sampling** is an alternative (or complement) to temperature for controlling randomness. Instead of adjusting the probability distribution, top-p defines a cutoff: the model only considers tokens whose cumulative probability adds up to *P*.

- **Top-P = 0.1** — The model only considers the top 10% most likely tokens. Very focused.
- **Top-P = 0.9** — The model considers the top 90% of tokens. More diverse outputs.
- **Top-P = 1.0** — All tokens are considered (default).

In practice, most people adjust either temperature *or* top-p, not both. They achieve similar effects through different mechanisms. If you're new to parameter tuning, start with temperature — it's more intuitive.

### Frequency Penalty

The **frequency penalty** discourages the model from repeating the same words or phrases. It applies a penalty to tokens that have already appeared in the response, proportional to how many times they've appeared.

- **Frequency penalty = 0** — No penalty. The model may repeat words freely.
- **Frequency penalty = 0.5-1.0** — Moderate discouragement of repetition. Good for varied writing.
- **Frequency penalty = 2.0** — Strong penalty. The model aggressively avoids reusing words.

This is useful when you notice the model falling into repetitive patterns — using the same transition phrase, repeating the same adjective, or restating the same point in slightly different words.

### Presence Penalty

The **presence penalty** is similar to frequency penalty but simpler: it applies a flat penalty to any token that has appeared *at all* in the response, regardless of how many times.

- **Presence penalty = 0** — No penalty.
- **Presence penalty = 0.5-1.0** — Encourages the model to explore new topics and vocabulary.
- **Presence penalty = 2.0** — Strongly pushes the model toward novel territory.

The difference between frequency and presence penalty:

- **Frequency penalty** says: "Don't use this word *as often*."
- **Presence penalty** says: "Don't use this word *again at all*."

Presence penalty is great when you want the model to cover diverse topics rather than dwelling on one theme.

### Max Tokens Setting

The **max tokens setting** is the simplest parameter: it caps the maximum length of the model's response in tokens. Remember from Chapter 1 that one token is roughly 3/4 of a word.

- **Max tokens = 100** — Short response (~75 words). Good for quick answers.
- **Max tokens = 500** — Medium response (~375 words). Good for explanations.
- **Max tokens = 2000** — Long response (~1,500 words). Good for articles or detailed analysis.
- **Max tokens = 4096** — Very long response. Good for comprehensive content.

Important: the model will stop generating when it hits the max token limit, even mid-sentence. Set this too low and you'll get cut-off responses. Set it too high and you'll pay for tokens you don't need.

!!! mascot-tip "Polly's Tip"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Polly giving a tip">
    Let's craft the perfect prompt! Here's a pro move: set max tokens slightly higher than you need, but tell the model the desired length *in the prompt* ("Write approximately 300 words"). The prompt controls the natural stopping point; max tokens is the safety net that prevents runaway responses.

### Stop Sequences

**Stop sequences** are specific strings that tell the model to stop generating when encountered. This gives you precise control over where the response ends.

For example, if you set the stop sequence to `"\n\n"` (two newlines), the model will stop at the first double line break. Other common stop sequences:

- `"END"` — Stop when the model generates the word "END"
- `"---"` — Stop at a horizontal rule
- `"Q:"` — Stop before generating the next question (useful for Q&A format)

Stop sequences are especially useful when you want the model to generate one item from a list, one answer from a set, or one section of a document.

### Seed Parameter

The **seed parameter** is a number that initializes the model's random number generator. When you set the same seed with the same prompt and parameters, you get (nearly) the same output every time.

This is invaluable for:

- **Debugging** — Reproduce the same response to test changes
- **Testing** — Compare prompt variations with controlled randomness
- **Collaboration** — Share a prompt+seed combination so others get the same result

Not all providers support the seed parameter, and even with a seed, outputs aren't guaranteed to be perfectly identical across different model versions. But it gets you close.

### Reproducibility

**Reproducibility** is the broader goal that the seed parameter serves: the ability to get the same (or very similar) results when running the same prompt under the same conditions.

Achieving reproducibility requires controlling:

- The prompt text (identical)
- The model version (same checkpoint)
- Temperature (set to 0 for maximum reproducibility)
- Seed (if available)
- Max tokens and other parameters (identical)

Reproducibility matters in professional settings where you need to demonstrate, audit, or validate AI-generated outputs. It's also essential for scientific applications of prompt engineering.

#### Diagram: Temperature Explorer

<iframe src="../../sims/temperature-explorer/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Temperature Explorer MicroSim</summary>
Type: microsim
**sim-id:** temperature-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Purpose: Let students interactively explore how temperature affects the probability distribution of next-token selection, visualizing the tradeoff between creativity and consistency.

Bloom Level: Apply (L3)
Bloom Verb: demonstrate, practice
Learning Objective: Demonstrate how the temperature parameter changes the probability distribution of token selection and predict the effect on output creativity.

Layout:
- Left area (60%): Bar chart showing probability distribution of top 10 candidate tokens
- Right area (40%): Controls and explanation panel

Visual elements:
- Bar chart with 10 bars representing top candidate tokens (labeled with words like "the," "a," "brilliant," "unusual," "purple")
- Bars colored from blue (high probability) to orange (low probability)
- Highlighted bar showing which token would be selected
- Text display showing the resulting sentence building token by token

Controls:
- Temperature slider: 0.0 to 2.0 (default 0.7), step 0.1
- "Generate Next Token" button: samples one token from the distribution
- "Generate 10 Tokens" button: samples 10 tokens in sequence
- "Reset" button: clears generated text
- Prompt input field with default "The best way to learn is"

Behavior:
- At temp 0: tallest bar always selected, same word every time
- At temp 0.7: usually high-probability tokens, occasional surprises
- At temp 1.5+: nearly random selection, often producing unexpected combinations
- Bar heights adjust dynamically as temperature changes
- Generated sentence appears below the chart, growing token by token

Data Visibility Requirements:
- Stage 1: Show raw probability scores for each candidate token
- Stage 2: Show temperature-adjusted probabilities (softmax with temperature)
- Stage 3: Show selected token highlighted
- Stage 4: Show running sentence with new token appended

Responsive: Must adapt to window width.

Instructional Rationale: Interactive parameter exploration at Bloom's Apply level lets students build intuition through experimentation rather than memorization. Seeing the probability distribution change in real-time connects the abstract concept of "temperature" to concrete token selection behavior.

Implementation: p5.js with bar chart rendering, probability math, and text accumulation
</details>

## Combining Prompt Types and Parameters

The real magic happens when you combine the right prompt type with the right parameters. Here are some proven combinations:

| Task | Prompt Type | Temperature | Max Tokens | Other Settings |
|------|------------|-------------|------------|----------------|
| Extract data from text | Closed-ended + Directive | 0.0 | 200 | — |
| Write creative fiction | Open-ended | 0.9 | 2000 | Presence penalty 0.6 |
| Answer factual questions | Interrogative | 0.2 | 500 | — |
| Brainstorm ideas | Open-ended | 1.0 | 1000 | Presence penalty 0.8 |
| Code generation | Directive | 0.0-0.2 | 1000 | Frequency penalty 0 |
| Conversational tutoring | Conversational | 0.5 | 500 | — |

!!! mascot-celebration "Great Progress!"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Polly celebrating">
    Let's craft the perfect prompt! You now have TWO levers for controlling AI output — what you write (prompt type and content) and how the model processes it (parameters). Most people only know about the first one. You, fellow prompt crafter, are already in the top tier.

## Key Takeaways

- Prompts come in five main types: **directive**, **interrogative**, **open-ended**, **closed-ended**, and **conversational** — choose based on your task
- **Temperature** controls creativity vs. consistency (0 = predictable, 1+ = creative)
- **Top-P** is an alternative randomness control that limits the token pool
- **Frequency** and **presence penalties** reduce repetition and encourage variety
- **Max tokens** caps response length — set it as a safety net, not a target
- **Stop sequences** give precise control over where responses end
- The **seed parameter** enables **reproducibility** — same seed + same prompt = same output
- The best results come from combining the right prompt type with the right parameter settings

## Concepts

1. Directive Prompts
2. Interrogative Prompts
3. Open-Ended Prompts
4. Closed-Ended Prompts
5. Conversational Prompts
6. Temperature Setting
7. Top-P Sampling
8. Frequency Penalty
9. Presence Penalty
10. Max Tokens Setting
11. Stop Sequences
12. Seed Parameter
13. Reproducibility

## Prerequisites

- [Chapter 1: AI and Machine Learning Foundations](../01-ai-ml-foundations/index.md)
- [Chapter 2: Prompt Fundamentals](../02-prompt-fundamentals/index.md)
