# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **MkDocs-based educational website** for a comprehensive prompt engineering course that has been taught since March 2020. The course teaches students how to write effective prompts for large language models through hands-on labs and practical exercises.

**Live Site**: https://dmccreary.github.io/prompt-class

## Development Commands

```bash
# Serve locally with live reload (primary development command)
mkdocs serve

# Build static site to /site/ directory
mkdocs build  

# Deploy to GitHub Pages
mkdocs gh-deploy

# Set up development environment
conda create -n mkdocs python=3
conda activate mkdocs
pip install mkdocs mkdocs-material
```

## Architecture and Structure

### Content Organization
- **`/docs/`** - All source content in Markdown
  - `/docs/labs/` - 17+ laboratory exercises (main educational content)
  - `/docs/sims/` - Interactive JavaScript simulations and P5.js code
  - `/docs/img/` - Images, diagrams, and visual assets
  - Root files: index.md, about.md, glossary.md, references.md, etc.

- **`/site/`** - Generated static site (build output, don't edit directly)
- **`/data/`** - CSV datasets for visualization exercises
- **`/src/`** - Python scripts for data analysis labs
- **`/slides/`** - PowerPoint presentations for classroom use

### Lab Content Pattern
Each lab follows a consistent educational format:
1. **Prompt section** - Exact prompt for students to use with AI
2. **Response section** - Expected AI response examples  
3. **Code examples** - Often P5.js, Python, or data analysis code
4. **Links** - References to live examples on p5js.org editor

### Navigation Structure
Navigation is defined in `mkdocs.yml` with explicit ordering:
- Labs are numbered sequentially (01-lists.md through 17-meta-prompts.md)
- Progression from basic skills to advanced techniques
- Interactive examples heavily use P5.js for visualizations

## Technology Stack

- **MkDocs** with Material theme for static site generation
- **P5.js** extensively used for interactive visualizations and animations
- **Python + matplotlib/plotly** for data science exercises
- **Mermaid** for flowcharts and diagrams
- **Creative Commons license** (CC BY-NC-SA 4.0) - educational, non-commercial use

## Configuration Details

### MkDocs Configuration (`mkdocs.yml`)
- **Theme**: Material with blue/orange color scheme
- **Features**: Navigation expansion, code copying, search
- **Analytics**: Google Analytics enabled (G-NVZ3NEY8KG)
- **Plugins**: Search enabled, social preview commented out

### Content Conventions
- All content authored in Markdown
- Internal cross-references between labs and reference materials
- Consistent frontmatter and formatting across files
- Assets organized by type (images in /img/, code in /sims/)

## Development Context

This is an **educational resource** focused on:
- Classroom instruction with instructor notes
- Hands-on learning requiring AI tool interaction
- Version-controlled content with continuous updates
- Open source educational materials for sharing and adaptation

The codebase is mature and well-structured with established patterns for content creation, consistent lab formatting, and a solid technical foundation using modern documentation tools.