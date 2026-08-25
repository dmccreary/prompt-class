# Mascot Generation Session Log

- **Date**: 2026-04-08
- **Skill**: book-installer / learning-mascot.md
- **Project**: Prompt Engineering Class

## Character Design

- **Name**: Polly
- **Species**: Parrot
- **Personality**: Friendly, curious, encouraging, witty, great sense of humor
- **Catchphrases**: "Let's craft the perfect prompt!", "Time to talk to AI!", "Words matter - let's get them right!", "Use your words!"
- **Appearance**: Bright blue parrot with vivid orange accent feathers on chest, wing tips, and tail. Wears a small headset microphone. Large, expressive eyes with playful, witty expression.
- **Art Style**: Modern flat vector cartoon, clean lines, transparent background
- **Theme Colors**: Blue primary (#1565c0), Orange secondary (#e65100)

## Images Generated

All images generated via ChatGPT/DALL-E at 1024x1024, then trimmed with trim-padding-from-image.py.

| Pose | Filename | Trimmed Size |
|------|----------|-------------|
| Neutral | neutral.png | 429x698 |
| Welcome | welcome.png | 548x684 |
| Thinking | thinking.png | 490x775 |
| Tip | tip.png | 500x712 |
| Warning | warning.png | 578x704 |
| Encouraging | encouraging.png | 481x688 |
| Celebration | celebration.png | 743x743 |

## Files Created

- `docs/css/mascot.css` — Custom admonition styles with blue/orange theme
- `docs/img/mascot/image-prompts.md` — 7 AI image generation prompts
- `docs/img/mascot/neutral.png` — 7 mascot pose images
- `docs/img/mascot/welcome.png`
- `docs/img/mascot/thinking.png`
- `docs/img/mascot/tip.png`
- `docs/img/mascot/warning.png`
- `docs/img/mascot/encouraging.png`
- `docs/img/mascot/celebration.png`
- `docs/learning-graph/mascot-test.md` — Style guide with all 7 admonition types

## Files Updated

- `mkdocs.yml` — Added `extra_css: css/mascot.css`, `md_in_html` extension, mascot test page in nav, site logo set to neutral.png
- `CLAUDE.md` — Added Polly character guidelines, voice, placement rules, do's and don'ts

## Issues Encountered

- `extra_css` was initially nested under `theme:` (invalid) — moved to top-level key
- celebration.png was not saved initially — user added it later
- All images needed transparent padding trimmed via trim-padding-from-image.py from claude-skills repo

## Tools Used

- trim-padding-from-image.py from `/Users/danmccreary/Documents/ws/claude-skills/src/image-utils/`
