# Cover Image Prompt

Prompt for regenerating the book cover after the course was renamed to
**Agent Orchestration: From Prompt Engineering to Managing AI Agent Teams**.

Paste everything in the fenced block below into ChatGPT (or Midjourney, Gemini,
Ideogram, Leonardo.ai). Generate 2–4 drafts, compare, and refine *this file*
rather than just re-rolling. Save the winner as `docs/img/cover.png` at
1200×630.

---

## Design notes (context for whoever runs this — not part of the prompt)

**Why this keeps the painterly style.** This book already has a visual identity:
five cover variants in `docs/img/` are all Maxfield Parrish–inspired neoclassical
paintings — luminous sunset skies, fluted columns, a still reflecting pool,
saturated golds and turquoise. `docs/img/Daybreak_by_Parrish_1922.jpg` sits in the
image folder as the evident reference. Switching to a flat-vector concept montage
would be a full rebrand, not a retitle. The prompt below keeps the established
style and changes the *staging* to carry the new meaning.

**The core visual idea.** The old cover showed one woman alone with a laptop —
a single person, a single prompt. The new title is about directing many agents at
once, so the composition changes to **one figure orchestrating many**: a central
conductor and a fleet of luminous agent-figures working in parallel along the
pool. Same world, new relationship.

**About Polly.** The mascot is a flat-vector cartoon parrot (bright blue, orange
accents, headset mic). Dropping that cartoon onto an oil painting would look
pasted-on. The prompt asks for Polly rendered *as a painted macaw* in the same
style — recognizably blue-and-orange, perched at the conductor's side. If a draft
makes her look like a mascot decal, try the variant note at the bottom instead.

---

## The prompt

```text
Create a wide-landscape book cover image, 1200 x 630 pixels (1.91:1 aspect
ratio), PNG, suitable for an Open Graph social media preview.

STYLE

Paint this in the style of Maxfield Parrish: luminist neoclassical oil
painting, dreamlike and idealized, with the signature Parrish glow. Deep
saturated cobalt and turquoise sky against warm gold, amber, and rose light.
Soft-edged sculptural clouds. Everything lit as if from a low sun just at the
horizon. Rich, glazed, slightly stylized brushwork — a painting, never a
photograph, and never a flat vector illustration.

SCENE

A long, perfectly still reflecting pool runs from the foreground toward a
distant sunrise between rolling mountains. Tall fluted classical columns with
ornate Corinthian capitals frame both the left and right edges of the frame.
Slender cypress and evergreen trees line the pool. The water mirrors the sky
with near-perfect clarity.

THE CENTRAL FIGURE — THE ORCHESTRATOR

In the lower-center-right foreground, standing on the wide stone rim of the
pool, is a young woman with wavy auburn hair, wearing a flowing burnt-orange
robe over an off-the-shoulder white blouse, cinched with a sash. She stands
in a relaxed conductor's pose, one arm raised and open, the other extended
outward — clearly directing, not performing. Her expression is calm,
confident, and pleased. She is small enough in the frame that she reads as
part of the composition, not a portrait.

THE AGENT FLEET

Arrayed down both sides of the reflecting pool, receding toward the sunrise,
are eight to ten smaller luminous figures — the agents she is directing. Each
is a semi-translucent human silhouette made of warm golden light, seated or
standing at its own small stone workstation along the pool's edge. Each agent
is doing a different task, suggested simply and legibly:

  - one traces a glowing constellation of connected nodes in the air
    (a knowledge graph)
  - one reads from an unrolled luminous scroll (a long document)
    - one arranges floating geometric tiles into a neat grid (structured output)
  - one holds a small set of glowing tools
  - one tends a softly pulsing lantern (a running task)
  - one passes a ribbon of light to the agent beside it (a handoff)
  - the remaining agents work at glowing tablets and open books

Thin filaments of golden light run from the orchestrator's raised hand out to
each agent — visible but delicate, like harp strings or telegraph lines,
connecting her to every one of them. This is the single most important idea
in the image: one person, many coordinated workers, all linked.

THE MASCOT

Perched on a low stone plinth just to the orchestrator's left is a parrot,
painted in the same oil-painting style as everything else — NOT a cartoon and
NOT a sticker. It is a vivid cobalt-blue macaw with bright orange accent
feathers on its chest, wing tips, and tail, a yellow beak, and an alert,
cheerful expression. It wears a small, subtle headset microphone. It should
look like a real bird that belongs in this painted world, catching the same
golden sunrise light as the rest of the scene.

TITLE TEXT

Across the upper third of the image, centered, place exactly this text:

    Agent Orchestration

Set it in an elegant, high-contrast serif face with generous letter spacing —
warm cream-white or pale gold lettering with a soft drop shadow and a thin
underline rule beneath it. It must be large, crisp, and immediately legible.
Keep the sky directly behind the title relatively open and uncluttered so the
lettering never fights the clouds.

Do not add a subtitle. Do not add an author name. Do not add any other text
anywhere in the image.

COMPOSITION

- Title in the upper third, centered, with clear space around it.
- Sunrise and vanishing point at the center of the horizon.
- Orchestrator in the lower-center-right foreground.
- Macaw on its plinth at her left.
- Agent figures receding in two rows along the pool, smaller with distance.
- Columns anchoring the far left and far right edges.
- Keep the outer 5% margin on all sides free of important detail — social
  media platforms crop the edges.

AVOID

- No readable paragraphs of text, no UI screenshots, no browser windows,
  no laptops, no phones, no keyboards, no modern devices of any kind.
- No robots, no humanoid androids, no glowing brain icons, no circuit-board
  patterns, no binary digits, no "AI" cliches.
- No flat vector or cartoon elements mixed into the painting.
- No photorealistic human faces; keep faces painterly and idealized.
- Nothing should overlap or crowd the title text.
```

---

## If a draft misses

| Problem in the draft | Change to make here |
|---|---|
| Polly looks like a cartoon decal | Delete the MASCOT block entirely and regenerate. The painting works without her; she still appears throughout the chapters. |
| Title is small or garbled | Generate the scene with no text at all, then set "Agent Orchestration" in a real font afterward. Most reliable fix. |
| Agents read as ghosts or look eerie | Change "semi-translucent human silhouette made of warm golden light" to "robed scholar figures haloed in warm light." |
| Too busy behind the title | Add: "the upper third of the sky is calm and nearly cloudless." |
| Looks like generic fantasy art | Strengthen the Parrish cue: name *Daybreak* (1922) directly, and add "cobalt and gold, hyper-still water, theatrical stillness." |
| Wrong aspect ratio | Most tools ignore exact pixel requests. Generate at 16:9 and crop to 1200×630. |

## After you pick a winner

```bash
# from the repo root
sips -z 630 1200 ~/Downloads/<generated>.png --out docs/img/cover.png
```

Then update [`docs/index.md`](../index.md) so `image:` and `og:image:` point at
`img/cover.png` instead of `img/cover-landscape.png`, and replace the body
reference on line 11 (which currently points at a file that does not exist).
