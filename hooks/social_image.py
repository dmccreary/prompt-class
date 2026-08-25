"""Use a page's own screenshot as its social preview image.

The mkdocs-material social plugin generates a title-and-description card for
every page and injects the corresponding Open Graph / Twitter meta tags into
``page.meta["meta"]``.  For MicroSim pages that is the wrong image: we want the
actual screenshot of the simulation, which is far more informative in a Slack,
Teams, or Zoom-chat unfurl than a text card.

Any page whose front matter declares::

    image: /sims/<name>/<name>.png

has its social image swapped for that screenshot.  The declared path is
root-relative to the site, so ``site_url`` is prepended to produce the absolute
URL that social crawlers require.

Note on ``social: cards: false``: mkdocs-material 9.5.x has no per-page opt-out
for the social plugin (it only honours the global ``cards`` setting), so that
front-matter key is currently inert.  This hook therefore *ensures* the tags
are correct rather than assuming the plugin left them alone -- it rewrites them
when present and appends them when absent, so it keeps working if a later
version starts honouring the per-page flag.
"""

import os
import posixpath

# og:image:width / og:image:height are hardcoded to the 1200x630 card size by
# the social plugin; a screenshot is a different shape, so they get corrected
# from the real file or dropped.
_DIMENSION_KEYS = {"og:image:width", "og:image:height"}
_IMAGE_KEYS = {"og:image", "twitter:image"}


def _absolute(url_path, config):
    """Turn a root-relative '/sims/x/x.png' into an absolute https URL."""
    site_url = (config.get("site_url") or "").rstrip("/")
    if not site_url:
        return url_path
    return site_url + "/" + url_path.lstrip("/")


def _dimensions(url_path, config):
    """Real pixel size of the screenshot, or None if it cannot be read."""
    local = os.path.join(config["docs_dir"], url_path.lstrip("/"))
    try:
        from PIL import Image

        with Image.open(local) as img:
            return img.size
    except Exception:
        return None


def on_page_context(context, page, config, nav):
    image = page.meta.get("image") if page.meta else None
    if not image:
        return context

    url = _absolute(image, config)
    size = _dimensions(image, config)

    tags = []
    seen = set()
    for tag in page.meta.get("meta", []):
        key = tag.get("property") or tag.get("name")
        if key in _IMAGE_KEYS:
            # Rewrite the plugin's generated-card URL to the screenshot.
            tag = dict(tag)
            tag["content"] = url
            seen.add(key)
        elif key in _DIMENSION_KEYS:
            if not size:
                continue  # unknown shape: better to omit than to lie
            tag = dict(tag)
            tag["content"] = str(size[0] if key.endswith("width") else size[1])
        tags.append(tag)

    # If the social plugin did not run for this page, add the tags ourselves.
    for key in sorted(_IMAGE_KEYS - seen):
        attr = "property" if key.startswith("og:") else "name"
        tags.append({attr: key, "content": url})
    if not seen:
        tags.append({"name": "twitter:card", "content": "summary_large_image"})
        if size:
            tags.append({"property": "og:image:width", "content": str(size[0])})
            tags.append({"property": "og:image:height", "content": str(size[1])})

    page.meta["meta"] = tags
    return context
