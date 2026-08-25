# Agent Orchestration

**🌐 Course Website: [https://dmccreary.github.io/prompt-class](https://dmccreary.github.io/prompt-class)**

[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)
[![Website](https://img.shields.io/badge/website-live-brightgreen)](https://dmccreary.github.io/prompt-class)
[![GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-blue)](https://pages.github.com/)
[![MkDocs](https://img.shields.io/badge/Built%20with-MkDocs-blue)](https://www.mkdocs.org/)
[![Material for MkDocs](https://img.shields.io/badge/Material%20for-MkDocs-526CFE)](https://squidfunk.github.io/mkdocs-material/)

> A comprehensive course on orchestrating teams of AI agents, from prompt engineering fundamentals through managing dozens of concurrent agents on desktop AI platforms, with hands-on labs.

## Table of Contents

- [About the Project](#about-the-project)
- [Course Features](#course-features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Quick Start](#quick-start)
- [Course Structure](#course-structure)
- [Usage](#usage)
- [Building the Site](#building-the-site)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)

## About the Project

This GitHub repository contains materials for a comprehensive prompt engineering course that has been taught since March 2020. The course is designed to help students write better prompts to get superior results from large language models.

### What You'll Learn

- **Fundamentals**: How large language models work under the hood
- **Practical Skills**: Tips and tricks for crafting effective prompts
- **Problem Solving**: Overcoming common frustrations with AI responses
- **Advanced Techniques**: Controlling and directing AI output effectively
- **Real-World Applications**: Hands-on labs and practical exercises

### Target Audience

- Developers working with AI/ML
- Content creators using generative AI
- Students learning about large language models
- Anyone looking to improve their prompt engineering skills

## Course Features

- 📚 **Comprehensive Content**: From basics to advanced techniques
- 🧪 **Hands-on Labs**: 16+ practical exercises and projects
- 📊 **Data Analysis**: Real-world datasets and visualization examples
- 🎯 **Interactive Examples**: P5.js visualizations and dynamic content
- 📝 **Assessment Tools**: Quizzes and validation exercises
- 🔧 **Technical Integration**: GitHub, Python, and web technologies

## Getting Started

### Prerequisites

- Basic understanding of programming concepts
- Familiarity with command line operations
- Python 3.x installed on your system

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dmccreary/prompt-class.git
   cd prompt-class
   ```

2. **Set up Python environment using Conda**
   ```bash
   conda create -n mkdocs python=3
   conda activate mkdocs
   pip install mkdocs mkdocs-material
   ```

3. **Alternative: Using pip directly**
   ```bash
   pip install mkdocs mkdocs-material
   ```

### Quick Start

1. **View the live website**: [https://dmccreary.github.io/prompt-class](https://dmccreary.github.io/prompt-class)

2. **Run locally for development**:
   ```bash
   mkdocs serve
   ```
   Then open [http://localhost:8000](http://localhost:8000) in your browser.

3. **Deploy to GitHub Pages**:
   ```bash
   mkdocs gh-deploy
   ```

## Course Structure

The course is organized into several key areas:

### 📖 Core Documentation
- **About**: Course overview and objectives
- **Glossary**: Key terms and definitions
- **References**: Additional learning resources

### 🧪 Hands-on Labs
1. **License and Lists**: Understanding open source and markdown basics
2. **Mermaid Diagrams**: Creating flowcharts and diagrams
3. **Data Visualization**: Working with healthcare and demographic data
4. **Interactive Content**: P5.js animations and user interfaces
5. **AI Applications**: Embeddings, analysis, and practical implementations
6. **Assessment Tools**: Quiz generation and testing frameworks

### 📊 Sample Data
- Healthcare cost analysis datasets
- Life expectancy statistics
- Demographic information for visualization exercises

### 🎨 Visual Resources
- Course cover images and branding
- Diagram examples and templates
- Interactive visualization samples

## Usage

### For Students
1. Start with the [course website](https://dmccreary.github.io/prompt-class)
2. Work through labs sequentially
3. Use the provided datasets for hands-on practice
4. Reference the glossary for unfamiliar terms

### For Instructors
1. Fork this repository
2. Customize content for your specific needs
3. Use the slide templates in the `slides/` directory
4. Leverage the assessment tools for student evaluation

## Building the Site

This site is built using modern documentation tools:

- **[Markdown](https://www.markdownguide.org/)**: For content creation
- **[MkDocs](http://mkdocs.org)**: Static site generator
- **[Material Theme](https://squidfunk.github.io/mkdocs-material/)**: Modern, responsive design
- **[GitHub Pages](https://pages.github.com/)**: Free hosting and deployment

### Build Commands

```bash
# Serve locally with live reload
mkdocs serve

# Build static site
mkdocs build

# Deploy to GitHub Pages
mkdocs gh-deploy
```

## Contributing

Contributions are welcome! This course content is continuously improved based on student feedback and new developments in AI.

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Areas for Contribution

- New lab exercises and examples
- Updated datasets and visualizations
- Improved documentation and explanations
- Bug fixes and technical improvements
- Translation to other languages

## License

This project is licensed under the **Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License**.

[![CC BY-NC-SA 4.0](https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

**You are free to:**
- Share — copy and redistribute the material in any medium or format
- Adapt — remix, transform, and build upon the material

**Under the following terms:**
- **Attribution** — You must give appropriate credit
- **NonCommercial** — You may not use the material for commercial purposes
- **ShareAlike** — If you remix, transform, or build upon the material, you must distribute your contributions under the same license

See the [LICENSE](license.md) file for full details.

## Contact

**Dan McCreary** - Course Instructor and Content Creator

- 💼 LinkedIn: [Dan McCreary](https://www.linkedin.com/in/danmccreary/)
- 🌐 Course Website: [https://dmccreary.github.io/prompt-class](https://dmccreary.github.io/prompt-class)
- 📧 GitHub: [@dmccreary](https://github.com/dmccreary)

### Getting Help

- 📖 Check the [course documentation](https://dmccreary.github.io/prompt-class)
- 🐛 Report issues using [GitHub Issues](https://github.com/dmccreary/prompt-class/issues)
- 💬 Start a discussion in [GitHub Discussions](https://github.com/dmccreary/prompt-class/discussions)

## Acknowledgments

- **MkDocs Community** - For the excellent static site generator
- **Material Theme** - For the beautiful, responsive design
- **GitHub** - For free hosting and collaboration tools
- **Students and Contributors** - For continuous feedback and improvements
- **Open Source Community** - For the tools and libraries that make this possible

---

⭐ **Found this course helpful?** Please consider giving it a star on GitHub!

📚 **Want to learn more?** Visit the [full course website](https://dmccreary.github.io/prompt-class) to get started.
