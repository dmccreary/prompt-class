---
title: AI and Machine Learning Foundations
description: An introduction to the fundamental concepts of artificial intelligence, machine learning, and large language models that underpin modern prompt engineering.
generated_by: claude skill chapter-content-generator
date: 2026-04-08 21:06:17
version: 0.07
---

# AI and Machine Learning Foundations

!!! mascot-welcome "Welcome, Fellow Prompt Crafters!"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Polly waving welcome">
    Let's craft the perfect prompt! But before we start typing instructions into an AI chatbot, let's peek under the hood. Don't worry — you don't need an engineering degree. Think of this chapter as the "how does the magic trick work" part of the show. Once you understand the basics, you'll craft prompts like a pro.

## Why This Chapter Matters

Here's a secret that the ["Get Rich with ChatGPT" books](../../appendices/chatgpt-millionaires.md) won't tell you: the best prompt engineers aren't just good at writing instructions. They have a basic mental model of *how* these AI systems work. You don't need to understand every mathematical detail (we certainly won't cover that here), but knowing the fundamentals gives you a genuine edge.

It's like driving a car. You don't need to rebuild the engine, but knowing that the gas pedal controls speed and the brake pedal stops you? Pretty helpful. This chapter gives you the AI equivalent of that understanding.

## What Is Artificial Intelligence?

**Artificial Intelligence** (AI) is the broad field of computer science dedicated to creating systems that can perform tasks that typically require human intelligence. These tasks include recognizing speech, translating languages, making decisions, and — the one we care most about — understanding and generating human language.

AI has been around since the 1950s, but it's only in the last few years that it has become something you can casually chat with over your morning coffee. That's thanks to a specific kind of AI that we'll explore throughout this chapter.

There are two concepts you'll hear tossed around in AI conversations:

- **Narrow AI** (also called "weak AI") — Systems designed for a specific task, like spam filtering or playing chess. Every AI system you interact with today, including ChatGPT and Claude, is technically narrow AI — even though they can do *a lot* of things.
- **General AI** (also called "strong AI" or AGI) — A hypothetical system that can do anything a human can do, across any domain. This doesn't exist yet, despite what some breathless headlines suggest.

## Machine Learning: Teaching Computers to Learn

**Machine learning** (ML) is a subset of AI where systems learn patterns from data rather than being explicitly programmed with rules. Instead of a human writing "if the email contains 'Nigerian prince,' mark it as spam," a machine learning system examines thousands of spam emails and figures out the patterns on its own.

This distinction is important for prompt engineering because the AI systems you'll be prompting weren't hand-coded with conversation rules. They *learned* how language works by studying enormous amounts of text. That's why they can be so flexible — and also why they sometimes get things hilariously wrong.

The three main types of machine learning are:

- **Supervised learning** — The system learns from labeled examples (input-output pairs). "Here's a picture of a cat, and here's a picture of a dog — now figure out the difference."
- **Unsupervised learning** — The system finds patterns in data without labels. "Here's a pile of data — find the interesting groups."
- **Reinforcement learning** — The system learns by trial and error, receiving rewards for good outcomes. "Play this game a million times and figure out how to win."

The large language models you'll be prompting use elements of all three, but they start with a special variant we'll get to shortly.

## Natural Language Processing: When Computers Read

**Natural language processing** (NLP) is the branch of AI focused specifically on the interaction between computers and human language. It sits at the intersection of AI and linguistics, and it's the reason your AI assistant can understand "What's the weather like?" even though you could phrase that question a hundred different ways.

NLP covers tasks like:

- **Text classification** — Is this movie review positive or negative?
- **Named entity recognition** — Which words in this sentence are people, places, or organizations?
- **Machine translation** — Convert this English text to French
- **Text generation** — Write a paragraph about pandas (this is where prompt engineering lives!)

For decades, NLP was clunky. Early systems relied on rigid grammar rules and keyword matching. Then machine learning transformed the field. And then *transformers* (which we'll meet soon) changed everything again.

## Neural Networks: The Building Blocks

A **neural network** is a computing system loosely inspired by the human brain. It consists of layers of interconnected nodes (called "neurons") that process information. Each connection has a weight — a number that determines how much influence one neuron has on the next.

Here's a simple way to think about it: imagine a network of friends giving you restaurant recommendations. Each friend has a different level of influence on your decision (that's the weight). Some friends are foodies whose opinions matter a lot; others... well, they think gas station pizza is fine dining. The network combines all these weighted opinions to produce a final recommendation.

Neural networks learn by adjusting these weights. When the network gets an answer wrong, it tweaks the weights slightly so it'll do better next time. Repeat this millions of times with millions of examples, and you get a system that's remarkably good at recognizing patterns.

The key layers in a neural network are:

| Layer | What It Does | Analogy |
|-------|-------------|---------|
| Input Layer | Receives raw data | Your eyes reading a page |
| Hidden Layers | Processes and transforms data | Your brain making sense of what you read |
| Output Layer | Produces the final result | Your mouth speaking the answer |

Modern large language models have *billions* of these connections. That's why they can seem almost magical — it's a massive web of weighted relationships that has been trained on a staggering amount of text.

!!! mascot-thinking "Key Insight"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Polly thinking">
    Words matter - let's get them right! When someone says a model has "175 billion parameters," they mean 175 billion of those connection weights. More parameters generally means the model can learn more complex patterns — but also means it needs more data and computing power to train.

## The Transformer Architecture: The Breakthrough

The **Transformer architecture** is the specific neural network design that powers virtually every modern large language model. It was introduced in a 2017 research paper with the now-famous title "Attention Is All You Need" — possibly the most consequential paper title in AI history.

Before Transformers, language models processed text one word at a time, like reading a book through a keyhole. Transformers introduced a mechanism called **attention** that allows the model to look at all the words in a passage simultaneously and understand how they relate to each other.

Think of it this way: when you read "The cat sat on the mat because **it** was tired," you instantly know "it" refers to the cat, not the mat. You make this connection because you're paying *attention* to the relationships between words. Transformers do something remarkably similar, using mathematical attention scores to weigh how much each word should influence the interpretation of every other word.

This ability to process words in parallel (rather than sequentially) also made Transformers enormously faster to train, which is why they enabled the creation of truly massive language models.

## Tokens and Tokenization: How AI Reads Text

Before an AI model can process your prompt, it needs to break your text into smaller pieces. These pieces are called **tokens**, and the process of splitting text into tokens is called **tokenization**.

A token isn't exactly a word. It's more like a chunk of text that the model has learned to recognize. Common words like "the" or "hello" are usually a single token. Longer or less common words get split into multiple tokens. For example:

- "hello" → 1 token
- "prompt" → 1 token
- "unbelievable" → 2-3 tokens ("un" + "believ" + "able")
- "supercalifragilisticexpialidocious" → many tokens (good luck with that one)

Numbers, punctuation, and spaces are also tokens. Even emojis are tokens (yes, your AI counts those too).

Here's a quick rule of thumb: **1 token is roughly 3/4 of a word** in English. So 100 words is about 130-140 tokens. This matters more than you might think, because AI models have limits on how many tokens they can process at once.

| Text | Approximate Token Count |
|------|------------------------|
| "Hello" | 1 token |
| A tweet (280 characters) | ~60-80 tokens |
| This paragraph | ~50 tokens |
| A full page of text | ~300-400 tokens |
| A 300-page novel | ~100,000+ tokens |

Why should you care about tokens? Two reasons: **cost** and **limits**. Most AI services charge per token, and every model has a maximum number of tokens it can handle in a single conversation. Understanding tokens helps you write prompts that are efficient and stay within bounds. We'll explore this much more in later chapters.

## The Context Window: Your AI's Working Memory

The **context window** is the maximum number of tokens an AI model can consider at once — both your input (the prompt) and its output (the response) combined. Think of it as the model's working memory.

If the context window is 100,000 tokens, that's your total budget for the entire conversation. Your prompt, the model's response, any previous messages in the conversation — all of it counts against that limit.

Context windows have grown dramatically:

- Early GPT models: ~4,000 tokens (a few pages)
- Current frontier models: 100,000-200,000+ tokens (entire books)

This matters for prompt engineering because a larger context window means you can provide more examples, more background information, and more detailed instructions. But bigger isn't always better — models can sometimes lose track of information buried in the middle of very long contexts. We'll discuss strategies for managing this in Chapter 7.

## Training Data: What the Model Learned From

**Training data** is the massive collection of text that a language model learns from during its creation. Think of it as everything the model has ever "read." For modern large language models, this includes:

- Books and academic papers
- Websites and online articles
- Code repositories
- Encyclopedias and reference materials
- Forums and discussions

The scale is staggering. Modern models are trained on *trillions* of tokens — essentially a significant chunk of the text that humanity has produced and put online. This is why they know about everything from Shakespeare to sandwich recipes.

However, training data has important limitations:

- **Knowledge cutoff** — The model only knows about events up to a certain date
- **Bias** — The training data reflects the biases present in its sources
- **Quality variation** — Not everything on the internet is accurate (shocking, we know)

Understanding training data helps you write better prompts because it tells you what you can reasonably expect the model to know — and what it might get wrong.

## Model Parameters: The Dials and Knobs

**Model parameters** are the adjustable values (weights and biases) within a neural network that get tuned during training. When people say a model has "70 billion parameters," they're describing the sheer number of these internal values that have been optimized to produce good outputs.

More parameters generally means more capacity to learn complex patterns, but it also means:

- More expensive to train
- More expensive to run (inference costs)
- More data needed for training
- Slower response times

This is why AI providers offer models at different sizes. A smaller model might be faster and cheaper for simple tasks, while a larger model handles complex reasoning better. As a prompt engineer, knowing this helps you choose the right model for the job — you don't always need the biggest, most powerful option.

## Inference: When the Model Thinks

**Inference** is the process of a trained model generating a response to your input. When you type a prompt and hit enter, inference is what happens next. The model takes your tokens, runs them through its billions of parameters, and produces output tokens one at a time.

Here's something that surprises many people: language models generate text **one token at a time**, from left to right. Each time the model produces a token, it considers everything that came before (your prompt plus all the tokens it has generated so far) and predicts the most likely next token. This is why you sometimes see the text appearing word by word in chat interfaces — you're literally watching inference happen in real time.

This token-by-token generation is important for prompt engineering because it means the model can't "go back" and revise earlier parts of its response. What's written is written. This is why techniques like chain-of-thought prompting (asking the model to think step by step) work so well — they force the model to lay out its reasoning before jumping to a conclusion.

!!! mascot-tip "Polly's Tip"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Polly giving a tip">
    Time to talk to AI! Here's a fun experiment: ask an AI to solve a math problem in two ways. First, just ask for the answer. Then ask it to "think step by step." You'll often get a better answer the second time — because the step-by-step tokens help guide the model's reasoning process. That's the power of understanding inference!

## Generative AI and Large Language Models

**Generative AI** is the category of AI systems that can create new content — text, images, music, code, video — rather than just analyzing or classifying existing content. Every time an AI writes a paragraph, generates an image, or composes a melody, that's generative AI in action.

A **Large Language Model** (LLM) is a specific type of generative AI that specializes in understanding and producing human language. Models like GPT-4, Claude, Gemini, and Llama are all LLMs. They're "large" because they have billions of parameters and are trained on enormous datasets.

LLMs are the systems you'll be prompting throughout this course. They are remarkably versatile:

- Answer questions
- Write essays, emails, and code
- Translate between languages
- Summarize documents
- Roleplay characters
- Analyze data
- And much, much more

The fact that one model can do all these things is what makes prompt engineering so powerful — and so interesting. The same model that writes your marketing copy can also debug your Python code. It all depends on how you ask.

## Foundation Models, Pre-Training, and Fine-Tuning

These three concepts describe the lifecycle of how a large language model goes from raw data to useful assistant.

A **foundation model** is a large model trained on a broad dataset that can be adapted for many different tasks. Think of it as a well-educated generalist — someone who has read widely and can discuss almost any topic, but hasn't specialized yet.

**Pre-training** is the initial training phase where the model learns language patterns from massive amounts of text. During pre-training, the model essentially plays a prediction game: given a sequence of tokens, predict the next one. After trillions of these predictions, the model develops a deep understanding of language, facts, reasoning, and even some degree of common sense.

**Fine-tuning** takes a pre-trained model and trains it further on a smaller, more specific dataset to adapt it for particular tasks or behaviors. This is how a raw language model becomes a helpful, polite assistant rather than just a text-completion engine. Fine-tuning can teach the model to:

- Follow instructions more reliably
- Refuse harmful requests
- Format responses in specific ways
- Specialize in certain domains (medical, legal, coding)

**Transfer learning** is the underlying principle that makes this pipeline work. The knowledge learned during pre-training (how language works, what facts exist, how to reason) *transfers* to the fine-tuned model. The model doesn't start from scratch — it builds on everything it already knows.

This is why the same base model can be fine-tuned into a coding assistant, a medical advisor, or a creative writing partner. The foundation provides the knowledge; fine-tuning provides the specialization.

#### Diagram: Foundation Model Training Pipeline

<iframe src="../../sims/foundation-model-pipeline/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Foundation Model Training Pipeline</summary>
Type: infographic
**sim-id:** foundation-model-pipeline<br/>
**Library:** p5.js<br/>
**Status:** Specified

Purpose: Illustrate the three-stage pipeline from raw data to useful AI assistant (pre-training, fine-tuning, deployment), showing how each stage transforms the model.

Bloom Level: Understand (L2)
Bloom Verb: explain, summarize
Learning Objective: Explain how pre-training, fine-tuning, and transfer learning work together to create a useful language model.

Layout: Horizontal left-to-right pipeline with three main stages connected by arrows.

Stage 1 - Pre-Training (left):
- Icon: large stack of documents/books
- Label: "Pre-Training"
- Sub-label: "Trillions of tokens from books, web, code"
- Output: "Foundation Model" (large neural network icon)
- Hover text: "The model learns language patterns by predicting the next token billions of times."

Stage 2 - Fine-Tuning (center):
- Icon: smaller focused dataset with human feedback annotations
- Label: "Fine-Tuning"
- Sub-label: "Instructions, conversations, human feedback"
- Output: "Specialized Assistant" (refined network icon)
- Hover text: "The foundation model is adapted to follow instructions, be helpful, and refuse harmful requests."

Stage 3 - Deployment (right):
- Icon: chat interface with user and assistant messages
- Label: "Your Prompt"
- Sub-label: "Inference: generating responses token by token"
- Output: "Response"
- Hover text: "The fine-tuned model generates responses to your prompts using everything it learned."

Arrows between stages with labels:
- Stage 1 → Stage 2: "Transfer Learning"
- Stage 2 → Stage 3: "API / Chat Interface"

Color scheme: Blue gradient (lighter for earlier stages, darker for later stages), with orange accent for user interaction at Stage 3.

Interactive features:
- Hover over each stage to see detailed explanation panel
- Click stage to expand with example data (sample pre-training text, sample fine-tuning instruction, sample prompt/response)

Responsive: Must adapt to window width. Use percentage-based positioning.

Instructional Rationale: A static pipeline diagram with hover-to-reveal details supports the Understand objective by letting students trace the process at their own pace and connect each stage to concrete examples.

Implementation: p5.js canvas with clickable/hoverable regions
</details>

## APIs and Chatbot Interfaces: How You Talk to AI

An **API** (Application Programming Interface) is a way for software programs to communicate with each other. When you use an AI tool, there's almost always an API behind the scenes that sends your prompt to the model and returns the response.

You can interact with LLMs in two main ways:

- **Chatbot Interface** — A web-based or app-based conversation window (like ChatGPT, Claude, or Gemini). You type, the AI responds, you type again. This is the most common way people interact with AI and the primary tool in this course.
- **API Access** — A programmatic interface where you send prompts via code and receive responses in a structured format. Developers use this to build AI into their applications.

For this course, we'll mostly use chatbot interfaces. But it's useful to know that APIs exist because they unlock more advanced prompt engineering techniques like:

- Sending system prompts (hidden instructions that shape the model's behavior)
- Controlling parameters like temperature and max tokens
- Chaining multiple prompts together programmatically
- Building automated workflows

## Human-AI Interaction: The Art of the Conversation

**Human-AI interaction** is the study and practice of how humans communicate with AI systems. And here's where everything in this chapter comes together — because *this* is what prompt engineering is really about.

When you type a prompt into ChatGPT or Claude, here's what actually happens:

1. Your text gets **tokenized** — broken into tokens the model can process
2. The tokens enter the model's **context window** — its working memory
3. The **transformer architecture** processes your tokens through billions of **parameters**
4. The model performs **inference** — generating response tokens one at a time
5. The response tokens get decoded back into readable text
6. You see the response in your **chatbot interface**

All of that happens in seconds. And the quality of what comes out depends enormously on the quality of what goes in — your prompt.

This is why millions of people are quietly becoming much more productive at work. They've figured out that a well-crafted prompt turns a mediocre AI response into an excellent one. Their reports are suddenly polished. Their emails are suddenly diplomatic. Their code reviews are suddenly thorough. (They haven't mentioned the AI part to their boss yet. We won't tell.)

!!! mascot-celebration "Great Progress!"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Polly celebrating">
    Use your words! You've just built the mental model that separates casual AI users from skilled prompt engineers. You understand tokens, context windows, inference, and how these models were trained. That's not trivial — that's your new superpower starting to charge up!

## Key Takeaways

Let's recap the foundational concepts that will power your prompt engineering journey:

- **AI** is the broad field; **machine learning** is how modern AI systems learn from data
- **Natural language processing** is the AI specialty focused on human language
- **Neural networks** are the building blocks, with **transformers** being the breakthrough architecture
- **Tokens** are how AI reads text — roughly 3/4 of a word each
- The **context window** is your total token budget for a conversation
- Models learn from massive **training data** during **pre-training**, then get specialized through **fine-tuning**
- **Inference** happens one token at a time — understanding this helps you write better prompts
- **LLMs** are incredibly versatile generative AI systems — your prompt determines what they do

The field of AI is evolving at a breathtaking pace. New models, new capabilities, and new techniques appear every few months. But here's the good news: the fundamentals you just learned are durable. Models will get bigger and smarter, but they'll still use tokens, context windows, and transformer-based architectures. Understanding *how* these systems work will make you a better prompt engineer no matter what model you're using.

Now that you know what's happening behind the scenes, you're ready to start crafting prompts. In Chapter 2, we'll dive into the fundamentals of prompt design — the principles that turn a vague request into a precise, effective instruction.

#### Diagram: AI Concepts Hierarchy

<iframe src="../../sims/ai-concepts-hierarchy/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>AI Concepts Hierarchy</summary>
Type: infographic
**sim-id:** ai-concepts-hierarchy<br/>
**Library:** p5.js<br/>
**Status:** Specified

Purpose: Show how the 20 foundational concepts in this chapter relate to each other in a nested hierarchy, from the broadest (AI) to the most specific (Human-AI Interaction).

Bloom Level: Understand (L2)
Bloom Verb: classify, organize
Learning Objective: Classify the foundational AI concepts into their hierarchical relationships and explain how they build on each other.

Layout: Nested concentric rounded rectangles (Russian nesting doll style), with the broadest concept (AI) as the outermost container and more specific concepts nested inside.

Structure:
- Outermost: Artificial Intelligence
  - Machine Learning
    - Neural Network Basics
      - Transformer Architecture
    - Training Data
    - Transfer Learning
  - Natural Language Processing
    - Large Language Model
      - Foundation Model (Pre-Training, Fine-Tuning)
      - Token, Tokenization
      - Context Window
      - Model Parameters
      - Inference
      - Generative AI
    - API
      - Chatbot Interface
        - Human-AI Interaction

Color scheme:
- AI (outermost): light blue background
- ML: slightly darker blue
- NLP: light orange
- LLM: medium orange
- Specific concepts: individual colored badges within their parent

Interactive features:
- Hover over any concept to highlight it and show a one-sentence definition
- Click a concept to see which other concepts depend on it (highlight dependents)
- Smooth zoom on click to focus on a sub-hierarchy

Responsive: Must scale to fill container width. Use percentage-based sizing.

Instructional Rationale: A hierarchical visualization helps students organize the 20 concepts into a mental framework rather than treating them as a flat list. Hover definitions reinforce vocabulary. Click-to-highlight dependencies preview the learning graph concept.

Implementation: p5.js canvas with hover detection and click handling
</details>

## Concepts

1. Artificial Intelligence
2. Machine Learning
3. Natural Language Processing
4. Large Language Model
5. Neural Network Basics
6. Transformer Architecture
7. Token
8. Tokenization
9. Context Window
10. Training Data
11. Model Parameters
12. Inference
13. Generative AI
14. Foundation Model
15. Pre-Training
16. Fine-Tuning
17. Transfer Learning
18. API
19. Chatbot Interface
20. Human-AI Interaction

## Prerequisites

None. This is the first chapter and requires no prior knowledge of AI or prompt engineering.
