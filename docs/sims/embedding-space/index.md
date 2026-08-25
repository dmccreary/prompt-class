---
title: "Embedding Space Explorer"
description: "A two-dimensional map of text embeddings where semantically similar phrases cluster together, with a search box that plots your own query and draws dashed lines to its three nearest neighbors."
image: /sims/embedding-space/embedding-space.png
og:image: /sims/embedding-space/embedding-space.png
twitter:image: /sims/embedding-space/embedding-space.png
social:
   cards: false
hide:
  - toc
---

# Embedding Space Explorer

<iframe src="main.html" height="582px" width="100%" scrolling="no"></iframe>

[Run the Embedding Space Explorer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

Here is the thing that makes retrieval work, and it is genuinely strange the first time you
meet it: a computer can tell that "neural networks" and "deep learning algorithms" are about
the same subject, even though the two phrases share exactly zero words.

It does this by turning text into a *position*. Every phrase gets coordinates, and phrases
about similar things end up near each other. Meaning becomes geography.

This MicroSim shows twenty-three phrases from five unrelated topics — AI, cooking, space,
music, and medicine — plotted in a simplified two-dimensional embedding space. The clusters
are the whole point. Nobody labeled them by hand at retrieval time; the phrases sort
themselves by what they are *about*.

Then you get to try it. Type a query, and the simulator scores it against the vocabulary,
drops it into the space, and draws dashed lines to its three nearest neighbors with the
actual distances shown. That search — find the query's position, grab what's closest — is
exactly the retrieval step in a RAG pipeline. Everything else is plumbing.

!!! note "About the dimensions"
    Real embedding models use hundreds or thousands of dimensions, not two. Two is what fits
    on a screen. The distance math shown here is the same math a vector database runs; it is
    just running it on a drastically flattened version of the space.

## How to Use

1. **Hover** over any dot to see the phrase, its category, and — once you have searched — its
   distance from your query.
2. **Type a query phrase** in the box and press Enter or click **Search**. An orange diamond
   marks where your query lands, and dashed lines connect it to the 3 nearest phrases.
3. **Pick from "Try an example..."** if you want a query that is known to behave interestingly.
4. **Click Reset** to clear the query and return to the plain map.

Now try to break it. Search *"learning to play the piano"*. You will get neighbors about
gradient descent and training data, because the word *learning* pulls hardest toward the AI
cluster in this vocabulary. The query lands stranded between AI and Music and retrieves from
both. Nothing malfunctioned — an ambiguous word did exactly what ambiguous words do, and a real
retrieval system would have handed those same off-topic passages to the model.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/prompt-class/sims/embedding-space/main.html"
        height="582px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

Students will be able to explain how text embeddings represent semantic meaning as positions
in a vector space, where similar phrases cluster together and dissimilar phrases are far apart,
and predict which phrases a given query will retrieve.

**Bloom's Level:** Understand (L2) — explain, predict, classify

### Grade Level

High school through adult learners. Students need to be able to read a coordinate plane. No
linear algebra required.

### Duration

15 minutes

### Prerequisites

Students should know that language models work with text broken into tokens (Chapter 1), and
should have seen the idea that a RAG system retrieves documents before generating an answer.

### Activities

1. **Read the map (4 min):** Before touching the search box, students hover over dots and
   name the five clusters. Then the key question: find two phrases in the same cluster that
   share no words at all. There are several. What makes them neighbors?
2. **Predict, then search (6 min):** Students write down a query and predict which cluster it
   will land in *before* pressing Search. Do this three times. Track the hit rate — most
   students get 3 for 3, which is worth noticing: their intuition about meaning matches the
   machine's.
3. **Break it on purpose (5 min):** Start the class with the worked example
   *"learning to play the piano"*, which returns AI results because of one ambiguous word.
   Then students write their own query that lands somewhere useless — stranded between
   clusters, or with neighbors from three different topics. Nonsense text works too: it still
   returns three confident neighbors. Discuss: in a real RAG system, what would the model have
   been handed as context, and what would it then have answered?

### Discussion Questions

- "Neural networks" and "deep learning algorithms" have no words in common but sit close
  together. What information does the model have that plain keyword search does not?
- Real embeddings have hundreds of dimensions. What does this 2D picture get wrong, and does
  that matter for understanding retrieval?
- The three nearest neighbors are always returned, even for a nonsense query. Why is that a
  problem for a RAG system, and what could you do about it?
- Searching "learning to play the piano" returns results about AI training. Whose mistake is
  that — the query's, the model's, or the person who built the vocabulary?

### Assessment

- Can the student predict which cluster a novel query will land in, and justify the prediction
  by naming the shared topic vocabulary?
- Can the student explain the difference between keyword matching and embedding similarity,
  using two specific phrases from the map?
- Can the student describe why a nearest-neighbor result being *closest* does not make it
  *relevant*?

## Concepts Illustrated

- Embeddings
- Vector similarity
- Semantic search
- Nearest neighbor retrieval
- Euclidean distance

## References

1. [Word Embedding — Wikipedia](https://en.wikipedia.org/wiki/Word_embedding)
2. [Nearest Neighbor Search — Wikipedia](https://en.wikipedia.org/wiki/Nearest_neighbor_search)
3. [Cosine Similarity — Wikipedia](https://en.wikipedia.org/wiki/Cosine_similarity)
4. [Chapter 8: Retrieval Augmented Generation](../../chapters/08-retrieval-augmented-generation/index.md)
