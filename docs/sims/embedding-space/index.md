# Embedding Space Explorer

[Open Embedding Space Explorer Fullscreen](./main.html){ .md-button .md-button--primary }

<iframe src="./main.html" width="100%" height="600px" frameborder="0" scrolling="no"></iframe>

This interactive MicroSim visualizes how text embeddings map phrases into a
two-dimensional space where semantically similar phrases cluster together.

## How to Use

1. **Hover** over any dot to see the phrase and its category.
2. **Search** by typing a phrase in the search box and pressing Enter or clicking Search.
   The simulator places your query in the space and draws dashed lines to the 3 nearest neighbors, showing Euclidean distances.
3. **Reset** clears the search and returns to the default view.

## What This Demonstrates

- **Semantic clustering**: Phrases about AI/ML group together, cooking phrases group together, etc. — even though they share few words in common.
- **Similarity search**: When you enter a query, the nearest neighbors are the most semantically similar phrases — the same principle that powers RAG retrieval.
- **Distance as meaning**: Phrases that are close in the embedding space have similar meanings; distant phrases are unrelated.

## Concepts Illustrated

- Embeddings
- Vector similarity
- Semantic search
- Nearest neighbor retrieval
