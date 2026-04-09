---
title: Output Format Control
description: Learn how to direct AI models to produce output in specific structured formats including Markdown, JSON, CSV, XML, YAML, HTML, tables, lists, and narrative prose for any use case.
generated_by: claude skill chapter-content-generator
date: 2026-04-08
version: 0.07
---

# Output Format Control

!!! mascot-welcome "Time to Talk Formatting, Fellow Prompt Crafters!"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Polly waving welcome">
    Time to talk to AI! You've learned *what* to ask and *how* to ask it. Now we tackle the equally important question: what should the answer *look like*? A brilliant response in the wrong format is like a gourmet meal served on a frisbee — technically correct, but not exactly what you ordered.

## Why Output Format Matters

Imagine you ask an AI to give you a list of the ten largest cities in the world by population. The AI knows the answer. But does it give you a numbered list? A Markdown table with population figures? A JSON array your app can parse? A rambling paragraph that buries the data in prose? Without explicit format instructions, you're rolling the dice.

Output format control is the skill of telling the AI *exactly* how to structure its response. It's one of the most practical prompt engineering skills you can develop, and it separates casual AI users from people who actually get things done efficiently.

Here's the thing that surprises most beginners: AI models are remarkably good at producing structured output. They've seen millions of examples of JSON, CSV, HTML, Markdown, and every other format you can name. They *want* to help you — they just need clear instructions about which format to use. Think of the model as an eager intern who can format anything perfectly but needs you to specify "give me a spreadsheet, not an essay."

## Output Format Specification

**Output format specification** is the practice of explicitly declaring the desired structure, syntax, and layout of an AI model's response within your prompt. This is the umbrella concept for everything in this chapter. Instead of hoping the model guesses what you need, you tell it directly.

A basic format specification can be as simple as adding a single line to your prompt:

```
List the top 5 programming languages by popularity.
Format: numbered list
```

Or it can be detailed and precise:

```
List the top 5 programming languages by popularity.
Format: JSON array of objects with fields "rank" (integer),
"language" (string), and "popularity_index" (float).
```

Both are valid. The right level of specificity depends on your use case. Writing a blog post? A simple "use headers and bullet points" is fine. Building a data pipeline? You need exact schema control.

**Three levels of format specification:**

| Level | Description | Example Instruction |
|-------|-------------|-------------------|
| Minimal | Name the general format | "Respond in a table" |
| Moderate | Specify format with key details | "Respond in a Markdown table with columns: Name, Date, Description" |
| Precise | Define exact schema and constraints | "Respond in JSON matching this schema: {name: string, date: ISO-8601, description: string (max 100 chars)}" |

The general rule? Be as specific as your use case demands. Over-specifying wastes your time. Under-specifying wastes the model's potential.

## Human-Readable Formats

Let's start with formats designed for people to read directly. These are the formats you'll use most often in day-to-day interactions with AI.

### Markdown Generation

**Markdown** is a lightweight markup language that uses simple symbols to indicate formatting — hash marks for headers, asterisks for bold and italic, dashes for bullet points. It's the lingua franca of AI output because most AI chat interfaces render Markdown automatically.

When you ask an AI to "write an article" or "create documentation," it almost always defaults to Markdown. But you can (and should) get more specific about which Markdown features to use:

```
Write a tutorial on making sourdough bread.
Use H2 headers for main sections, H3 for subsections.
Include a tips section using blockquotes.
Use bold for key terms on first mention.
Include a code block for the recipe measurements.
```

Markdown is also the native format for many documentation systems, wikis, and content management platforms. If you're generating content for any of these, specifying Markdown output ensures the content is ready to publish without conversion.

### Bullet Points

**Bullet points** (also called unordered lists) present information as a series of items preceded by a marker such as a dash, dot, or circle. They're ideal when you have a set of items where the order doesn't matter, or when you want to break dense information into scannable pieces.

```
Summarize the key benefits of remote work.
Use bullet points. Keep each point to one sentence.
```

Bullet points shine when the items are parallel in structure — all benefits, all features, all steps that can be done in any order. If you notice the model returning long paragraphs when you wanted scannable points, just add "Use bullet points" to your prompt. It's one of the simplest and most effective format instructions you can give.

### Numbered Lists

**Numbered lists** (also called ordered lists) present items in a specific sequence, with each item preceded by a number. Use these when order matters — steps in a process, rankings, priorities, or chronological events.

```
Explain how to change a flat tire.
Format: numbered list of steps. Each step should be
one clear instruction.
```

The distinction between bullet points and numbered lists seems small, but it matters. A numbered list implies sequence and priority. A bullet list implies equivalence. Choosing the right one makes your AI output clearer and more useful.

!!! mascot-thinking "A Format for Every Occasion"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Polly thinking">
    Words matter - let's get them right! Here's a quick rule of thumb: if you could rearrange the items and the meaning wouldn't change, use bullet points. If the order matters, use numbered lists. And if you have data with multiple attributes per item, use a table. Matching format to content is half the battle.

### Table Generation

**Table generation** is the ability to instruct an AI model to organize information into rows and columns. Tables are one of the most powerful output formats because they make comparisons and patterns immediately visible.

```
Compare Python, JavaScript, and Rust across these dimensions:
learning curve, performance, typical use cases, and community size.
Format: Markdown table.
```

Tables work best when each item has the same set of attributes you want to compare. They're terrible for narrative content (nobody wants to read a story in a table) but unbeatable for structured comparisons, feature matrices, and reference data.

You can also control table details:

```
Create a table of the planets in our solar system.
Columns: Planet Name, Distance from Sun (AU), Diameter (km),
Number of Moons.
Sort by distance from the Sun, nearest first.
```

This level of specificity gives you a table that's ready to paste into a report or presentation without any editing.

### List Generation

**List generation** is the broader concept encompassing both bullet points and numbered lists, as well as more complex list structures. Beyond simple flat lists, you can request nested lists, definition lists, and checklists.

```
Create a project checklist for launching a website.
Format: checklist with main categories and sub-tasks.
Use "- [ ]" for unchecked items.
```

This produces a Markdown checklist that you can paste directly into a project management tool or GitHub issue. The key insight is that lists aren't just "a bunch of items" — they can encode hierarchy, completion status, and categorization.

### Hierarchical Output

**Hierarchical output** is any format that organizes information into parent-child relationships with multiple levels of nesting. This includes outlines, tree structures, nested lists, and organizational charts described in text.

```
Create a course outline for "Introduction to Data Science."
Format: hierarchical outline with Roman numerals for units,
capital letters for lessons, and Arabic numerals for topics.
```

Hierarchical output is essential for conveying structure — course curricula, organizational charts, file system layouts, taxonomy trees, and any content where some items logically "contain" other items. When requesting hierarchical output, always specify how many levels of nesting you want and how each level should be marked.

### Narrative Output

**Narrative output** is continuous prose organized into paragraphs, designed to be read from start to finish. This is the default output format for most AI models, and it's the right choice when you need explanations, stories, persuasive writing, or any content meant to flow naturally.

```
Write a 300-word explanation of why the sky is blue.
Use a narrative format with short paragraphs.
Target audience: middle school students.
```

When do you *not* want narrative output? When the reader needs to scan, compare, or extract specific data points. That's when you should switch to tables, lists, or structured data formats. The trick is knowing which format serves your reader best — and telling the model explicitly.

### Plain Language Output

**Plain language output** is a response written using everyday vocabulary, short sentences, and clear structure, avoiding jargon, technical terms, and complex phrasing. This isn't really a *format* in the structural sense — it's a constraint on the language itself.

```
Explain blockchain technology in plain language.
No jargon. No acronyms unless defined immediately.
Sentences should be under 20 words.
```

Plain language is critical when your audience is non-technical, when you're creating public-facing content, or when clarity is more important than precision. Many government agencies and healthcare organizations require plain language in their communications, so this is a skill with real-world value.

## Machine-Readable Formats

Now let's move to formats designed primarily for computers to parse, though humans can read them too. These formats are essential when AI output feeds into software systems, databases, or automated workflows.

!!! mascot-tip "Pro Tip"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Polly sharing a tip">
    Use your words! When you need machine-readable output, always include an example of the exact format you want. Models are much more accurate when they can see a concrete sample rather than just reading a description. Think "show, don't tell."

### JSON Output

**JSON** (JavaScript Object Notation) is a lightweight data interchange format that uses key-value pairs and arrays to represent structured data. It's the most popular format for web APIs and data exchange, which makes it one of the most useful formats to request from an AI model.

```
Generate information about three famous scientists.
Format: JSON array. Each object should have:
- "name" (string)
- "birth_year" (integer)
- "field" (string)
- "notable_achievement" (string)

Example:
[
  {
    "name": "Marie Curie",
    "birth_year": 1867,
    "field": "Physics and Chemistry",
    "notable_achievement": "Discovery of radium and polonium"
  }
]
```

Providing a single example object dramatically improves the consistency of JSON output. The model will mirror your exact key names, data types, and formatting style.

**Common JSON pitfalls to watch for:**

- Trailing commas (invalid in JSON but common in JavaScript)
- Single quotes instead of double quotes
- Unquoted keys
- Missing closing brackets

If you're feeding the output into a real system, add the instruction "Ensure the output is valid, parseable JSON with no additional text before or after the JSON." This prevents the model from adding helpful but format-breaking commentary like "Here's your JSON:" before the actual data.

### CSV Output

**CSV** (Comma-Separated Values) is a tabular data format where each row is a line of text and columns are separated by commas. It's the simplest structured data format, and it's universally supported by spreadsheet applications, databases, and data analysis tools.

```
Generate sample sales data for a small bookstore.
Format: CSV with headers.
Columns: date, title, author, genre, price, quantity_sold
Generate 10 rows of realistic sample data.
```

CSV output is perfect when you want data you can immediately open in Excel, Google Sheets, or pandas. One important tip: if your data might contain commas (like city names such as "Portland, Oregon"), instruct the model to use quoted fields or choose a different delimiter like tabs (TSV format).

### XML Output

**XML** (Extensible Markup Language) is a format that uses nested tags to represent hierarchical data. While JSON has largely replaced XML in modern web development, XML remains important in healthcare (HL7), publishing (EPUB), document processing (DOCX is XML inside), and many enterprise systems.

```
Generate a book catalog entry in XML format.
Include elements for title, author, ISBN, publisher,
publication_date, and a list of genres.
```

XML output is verbose compared to JSON, but its self-documenting tag names and support for attributes make it the right choice when your target system requires it. Always specify whether you want a full XML document with a declaration (`<?xml version="1.0"?>`) or just an XML fragment.

### YAML Output

**YAML** (YAML Ain't Markup Language) is a human-friendly data serialization format that uses indentation to represent hierarchy. It's widely used for configuration files in tools like Docker, Kubernetes, Ansible, and — fun fact — the very MkDocs system that built the website you might be reading this on.

```
Generate a YAML configuration for a simple web application.
Include sections for: database settings, server settings,
and logging configuration.
```

YAML's advantage is readability. Compared to JSON, YAML is easier for humans to read and write because it avoids curly braces and quotation marks. Its disadvantage is that indentation errors break everything — a lesson many DevOps engineers have learned the hard way at 2 AM.

### HTML Generation

**HTML** (HyperText Markup Language) is the standard markup language for web pages. When you need AI-generated content that's ready to display in a browser, HTML output is the way to go.

```
Create an HTML snippet for a product comparison card.
Use semantic HTML5 elements. Include a heading, a description
paragraph, a features list, and a "Buy Now" button.
Add CSS classes (but not inline styles) for styling hooks.
```

HTML generation is particularly useful for creating email templates, web components, landing page sections, and documentation snippets. Be specific about whether you want a complete HTML document (with `<html>`, `<head>`, and `<body>` tags) or just a fragment you'll embed in an existing page.

<details markdown="1">
<summary>Diagram: Format Selection Decision Tree</summary>

#### Diagram: Format Selection Decision Tree

A flowchart showing how to choose the right output format based on the intended use case.

```
Start: "What is the output for?"
  |
  ├── Human reading only
  |     ├── Needs to be scannable? → Lists, Tables, Bullet Points
  |     ├── Needs to tell a story? → Narrative Output
  |     └── Needs formatting/structure? → Markdown
  |
  ├── Machine processing
  |     ├── Web API / JavaScript? → JSON
  |     ├── Spreadsheet / Data analysis? → CSV
  |     ├── Configuration file? → YAML
  |     ├── Enterprise / Legacy system? → XML
  |     └── Browser display? → HTML
  |
  └── Both human and machine
        ├── Primary audience is developers? → JSON or YAML
        └── Primary audience is non-technical? → Markdown or HTML
```

This decision tree helps you quickly identify the right format before you start writing your prompt. The most common mistake beginners make is defaulting to narrative prose when a table or structured format would be far more useful.

</details>

## Structured Data Output

**Structured data output** is any response that organizes information into a predictable, consistent schema with defined fields and data types. This is a higher-level concept that encompasses JSON, CSV, XML, and YAML — essentially, any format where a program could reliably extract specific values from the response.

The key to getting reliable structured data output is to define your schema explicitly:

```
Generate data about 5 national parks.
Each entry must include exactly these fields:
- name: string (official park name)
- state: string (US state abbreviation)
- established: integer (year established)
- area_sq_miles: float (total area)
- annual_visitors: integer (most recent year)

Output as a JSON array.
```

Notice how each field has a name, a data type, and a brief description. This level of precision virtually eliminates ambiguity. The model knows exactly what you want, and you get exactly what you need.

### Schema-Guided Output

**Schema-guided output** takes structured data one step further by providing the model with a formal schema definition that the output must conform to. This technique is especially powerful when you need output that will be validated by a system with strict requirements.

```
Generate a user profile that conforms to this JSON Schema:

{
  "type": "object",
  "required": ["id", "name", "email", "role"],
  "properties": {
    "id": {"type": "integer", "minimum": 1},
    "name": {"type": "string", "minLength": 1},
    "email": {"type": "string", "format": "email"},
    "role": {"type": "string", "enum": ["admin", "editor", "viewer"]},
    "preferences": {
      "type": "object",
      "properties": {
        "theme": {"type": "string", "enum": ["light", "dark"]},
        "notifications": {"type": "boolean"}
      }
    }
  }
}
```

Schema-guided output is the gold standard for reliability. When you provide a schema, you're giving the model an unambiguous contract to follow. Many modern AI API platforms even support "structured output" modes that guarantee the response conforms to your schema at the system level — no post-processing required.

!!! mascot-warning "Watch Out!"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Polly giving a warning">
    Even with schema guidance, always validate AI-generated structured data before feeding it into production systems. Models are remarkably good at following schemas, but they're not perfect. A simple validation check — like running the output through a JSON Schema validator — catches rare format errors before they cause downstream problems.

## Code Generation

**Code generation** is the practice of prompting AI to produce executable source code in a specified programming language. While this is a deep topic that could fill its own chapter, the format control aspect is what concerns us here: how do you get clean, well-formatted, runnable code from an AI?

```
Write a Python function that takes a list of dictionaries
and returns a CSV string.
- Include type hints
- Add a docstring with usage example
- Handle edge cases (empty list, missing keys)
- Use only standard library modules
- Format: Python code block only, no explanation
```

That last line — "no explanation" — is crucial. By default, models surround code with explanatory prose. That's helpful when learning, but annoying when you just need code to paste into your editor. Specifying "code block only" or "return only the code" eliminates the extra commentary.

You can also request specific code formatting standards:

```
Write a JavaScript function to debounce user input.
Follow the Airbnb style guide.
Use ES6+ syntax.
Include JSDoc comments.
```

Code generation combines format control with content generation in a way that makes it one of the most powerful practical applications of prompt engineering.

<details markdown="1">
<summary>Diagram: Format Comparison Matrix</summary>

#### Diagram: Format Comparison Matrix

A table-style diagram comparing key characteristics of each output format covered in this chapter.

```
Format     | Human-Readable | Machine-Parseable | Hierarchical | Best For
-----------|----------------|-------------------|--------------|------------------
Markdown   | Excellent      | Moderate           | Yes          | Documentation, articles
JSON       | Moderate       | Excellent          | Yes          | APIs, web apps, configs
CSV        | Good           | Excellent          | No           | Tabular data, spreadsheets
XML        | Low            | Excellent          | Yes          | Enterprise, publishing
YAML       | Excellent      | Excellent          | Yes          | Configuration files
HTML       | Excellent*     | Good               | Yes          | Web display
Tables     | Excellent      | Moderate           | No           | Comparisons, reference data
Lists      | Excellent      | Low                | Limited      | Scannable items, steps
Narrative  | Excellent      | Low                | No           | Explanations, stories

* When rendered in a browser
```

This matrix helps you evaluate trade-offs between human readability and machine parseability when choosing a format. Most real-world projects require a mix of formats for different purposes.

</details>

## Combining Formats

In practice, you'll often need output that combines multiple formats. A report might have narrative introduction paragraphs, a data table in the middle, and a bullet-point summary at the end. A technical document might mix Markdown prose with JSON code blocks and a YAML configuration example.

The key is to describe the complete structure in your prompt:

```
Write a data analysis report with these sections:
1. Executive Summary (2-3 narrative paragraphs)
2. Key Findings (bullet points, max 5 items)
3. Data Table (Markdown table with metrics)
4. Raw Data Sample (JSON code block, 3 example records)
5. Recommendations (numbered list, prioritized)
```

This "format recipe" approach is incredibly effective because it leverages the model's ability to switch between formats seamlessly. Each section gets the format that best serves its content.

## Practical Tips for Format Control

After working through all these formats, here are the principles that tie everything together:

**1. State the format early in your prompt.** Models pay attention to the beginning of prompts. If you bury your format instruction at the end of a long prompt, it may receive less attention.

**2. Provide examples when precision matters.** A single example of your desired output format is worth a hundred words of description. This is sometimes called "format few-shot prompting."

**3. Specify what to exclude.** "Return only the JSON, with no additional text or explanation" is often as important as specifying what to include.

**4. Match format to audience.** Technical audiences can handle JSON and YAML. Business stakeholders want tables and bullet points. General audiences prefer narrative prose and simple lists.

**5. Test edge cases.** Does your format hold up when the data includes special characters, empty fields, or unusually long values? Request that the model handle these explicitly.

**6. Use format constraints for consistency.** When generating multiple items (like product descriptions or FAQ entries), specifying a rigid format ensures every item has the same structure. This is invaluable for batch content generation.

And here's a bonus tip that experienced prompt engineers swear by: when your format specification gets complex, put it in a **system prompt** or **prefix** that you reuse across multiple queries. This keeps your individual prompts clean while maintaining consistent formatting across an entire project.

!!! mascot-celebration "You've Got the Power!"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Polly celebrating">
    Let's craft the perfect prompt! You now have the ability to control not just *what* AI says, but exactly *how* it presents the information. That's a genuine superpower in a world where everyone is asking AI the same questions but most people are getting unstructured walls of text. You're not most people anymore.

## Key Takeaways

- **Output format specification** is the practice of explicitly declaring the desired structure of an AI response. Always specify format rather than leaving it to chance.
- **Human-readable formats** — Markdown, bullet points, numbered lists, tables, and narrative prose — serve different purposes. Match the format to how the reader will consume the content.
- **Machine-readable formats** — JSON, CSV, XML, YAML, and HTML — are essential when AI output feeds into software systems. Always provide example structures and explicit schemas.
- **Schema-guided output** provides the highest level of format reliability by giving the model a formal contract to follow.
- **Code generation** benefits enormously from format control — specify the language, style guide, and whether to include or exclude explanatory text.
- **Combining formats** in a single prompt lets you create complex documents where each section uses the format best suited to its content.
- **Provide examples** of your desired format whenever precision matters. One example beats ten sentences of description.
- **Validate structured output** before sending it to production systems, even when using schema guidance.

## Concepts

1. Output Format Specification
2. Markdown Generation
3. JSON Output
4. CSV Output
5. Table Generation
6. List Generation
7. Code Generation
8. Structured Data Output
9. Schema-Guided Output
10. XML Output
11. YAML Output
12. HTML Generation
13. Bullet Points
14. Numbered Lists
15. Hierarchical Output
16. Narrative Output
17. Plain Language Output

## Prerequisites

- [Chapter 1: AI and Machine Learning Foundations](../01-ai-ml-foundations/index.md)
- [Chapter 2: Prompt Fundamentals](../02-prompt-fundamentals/index.md)
- [Chapter 3: Prompt Types and Model Parameters](../03-prompt-types-parameters/index.md)
- [Chapter 4: Core Prompt Techniques](../04-core-prompt-techniques/index.md)
- [Chapter 5: Advanced Prompt Techniques](../05-advanced-prompt-techniques/index.md)
