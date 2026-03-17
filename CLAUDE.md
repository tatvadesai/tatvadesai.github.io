# tatvadesai.github.io — Claude Context

Personal website for Tatva Desai. Jekyll static site hosted on GitHub Pages.

## Stack

- **Generator**: Jekyll 4.3 (Ruby)
- **Hosting**: GitHub Pages (`main` branch deploys automatically)
- **Styling**: Custom CSS (`assets/css/style.css`) + Tailwind CDN (homepage only)
- **Analytics**: PostHog (keys in `_config.yml`, referenced via `{{ site.posthog_api_key }}`)
- **Plugins**: `jekyll-feed`, `jekyll-sitemap`, `jekyll-seo-tag`

## Directory Structure

```
_config.yml          # Site config (title, URL, PostHog keys, collections)
_layouts/
  home.html          # Homepage layout (Tailwind CDN, standalone)
  default.html       # All other pages (custom CSS, PostHog, nav)
  essay.html         # Individual essay pages (extends default)
_essays/             # Essay collection — files here auto-publish to /essays/:slug/
assets/
  css/style.css      # Main stylesheet (CSS variables, dark theme)
  fonts/             # Local fonts (gitignored — add manually after clone)
cv/index.html        # CV page at /cv/
index.markdown       # Homepage — uses `layout: home`
about.markdown       # About page — uses `layout: default`
essays.html          # Essays index at /essays/
404.html             # Custom 404
Gemfile              # Ruby deps — run `bundle install` before serving
```

## Local Development

```bash
bundle install
bundle exec jekyll serve
```

## Adding a New Essay

Create `_essays/YYYY-MM-DD-slug.md` with frontmatter:

```yaml
---
title: "Essay Title"
date: YYYY-MM-DD
layout: essay
---
```

## Key Decisions

- **No `_posts/`**: All writing lives in `_essays/` (custom collection). Jekyll's default `_posts/` is not used.
- **Two CSS approaches**: `home.html` uses Tailwind CDN for the landing page; all other pages use `assets/css/style.css`. This is intentional — the homepage has a distinct visual design.
- **PostHog config**: API key and host are in `_config.yml` and read via `{{ site.posthog_api_key }}` / `{{ site.posthog_host }}`. `default.html` currently has the key hardcoded — keep in sync if rotating keys.
- **`assets/fonts/`** is gitignored. The font `design_system.woff` must be added manually after cloning.

## Gitignored (not committed)

- `_site/` — generated build output
- `.jekyll-cache/`, `.jekyll-metadata` — build artifacts
- `.DS_Store` — macOS system files
- `.claude/` — local IDE config
- `assets/fonts/` — local font files
