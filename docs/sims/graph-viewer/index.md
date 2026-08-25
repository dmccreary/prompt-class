---
title: "Learning Graph Viewer"
description: "An interactive vis-network view of the course learning graph, with concept search, category filters, pan and zoom navigation, and live counts of visible nodes and edges."
hide:
  - toc
---

# Learning Graph Viewer

[Open Learning Graph Viewer Fullscreen](./main.html){ .md-button .md-button--primary }

<iframe src="./main.html" width="100%" height="600px" frameborder="0"></iframe>

This interactive viewer allows you to explore the learning graph for the course.

## Features

- **Search**: Type in the search box to find specific concepts
- **Category Filtering**: Use checkboxes to show/hide concept categories
- **Interactive Navigation**: Click and drag to explore, scroll to zoom
- **Statistics**: View real-time counts of visible nodes and edges
- **Concept Impact Sizing**: Node size reflects how much of the course depends on each concept

## Using the Viewer

1. **Search for Concepts**: Start typing in the search box to find concepts. Click on a result to focus on that node.

2. **Filter by Category**: Use the category checkboxes in the sidebar to show or hide groups of related concepts. Use "Check All" or "Uncheck All" for bulk operations.

3. **Navigate the Graph**:
   - Drag to pan around the graph
   - Scroll to zoom in and out
   - Click on a node to select it and highlight its connections

4. **View Statistics**: The sidebar shows counts of visible nodes, edges, and foundational concepts.

## Reading Node Size

Each concept box is sized by its **Concept Impact Score (CIS)** — a measure of how much
of the course's total understanding ultimately rests on that concept. CIS is computed
recursively: a concept's score is 1 plus the scores of every concept that directly
depends on it, so it counts indirect dependents too, not just immediate ones.

- **Large boxes** are high-impact hub concepts. Nearly everything downstream needs them,
  so they are worth mastering first. In this course, *Artificial Intelligence*,
  *Machine Learning*, and *Neural Network Basics* are the largest.
- **Small boxes** are terminal or specialized concepts. Nothing (or very little) depends
  on them, which makes them safe to learn late — or to skip if they fall outside your goals.

Because CIS is heavily skewed (107 of the 305 concepts have the minimum score of 1, while
the top concept reaches 70,418), sizing uses a logarithmic scale. Without it, a handful of
hubs would dwarf everything else and the entire lower half of the graph would look identical.

## Graph Structure

- **Foundational Concepts** (left side): Prerequisites with no dependencies
- **Advanced Concepts** (right side): Topics that build on multiple prerequisites
- **Edges**: Arrows point from a concept to its prerequisites
- **Node Size**: Larger boxes have a higher Concept Impact Score (see above)
