# README

This GitHub repo contains materils for my prompt engineering classes.

The website is:

https://dmccreary.github.io/prompt-class

## How to Build

This site is built using:

1. Markdown
1. [mkdocs](http://mkdocs.org)
2. The [material](https://squidfunk.github.io/mkdocs-material/) mkdocs theme
3. [GitHub pages](https://pages.github.com/)

To build you must install the mkdocs and mkdocs-material Python libraries and then run the following:

```sh
mkdocs gh-deploy
```

## Conda Setup

Here is a sample [conda](https://docs.conda.io/en/latest/) setup for creating a Python virtual image:

```sh
conda create -n mkdocs python=3
conda activate mkdocs
pip install mkdocs mkdocs-material
```

## License

All content is original and is licensed under the following license:

[CC BY-NC-SA 4.0 DEED](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en)