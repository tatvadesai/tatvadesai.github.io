# Working on this site

Tatva Desai's personal Jekyll site. Use the existing Ruby build and shared CSS.
Setup, content examples, and validation commands are in `README.md`.

## Ownership

- `_layouts/home.html` owns the introduction and selected writing/work.
- `_layouts/default.html` is the shared shell; essay and project layouts extend it.
- `_includes/` owns the head, navigation, newsletter, footer, and theme script.
- `assets/css/style.css` owns the shared visual system. The standalone `cv/index.html` keeps its résumé layout.
- `_essays/` and `_projects/` are authored content. Preserve unpublished essays (`published: false`), project facts, portraits, and résumé downloads during cleanup.

## Design

- Keep EB Garamond, paper-and-ink colors, a narrow homepage, and readable article measures. Wider layouts are for project imagery and portraits.
- Use stronger headings and work titles, restrained inline emphasis, and upright metadata. Reserve italics for emphasis and quotations.
- Reuse shared components. A site-wide change belongs in the shared template or stylesheet, not a page-specific override.
- Preserve both themes, visible keyboard focus, and usable phone layouts. Woodcut sources and aspect ratios live in `_data/initials.yml`.
- The two Garamond font files are required site assets and belong in version control.

## Compatibility

- “Writings” keeps `/essays/` and `/essays/:slug/`; “work” keeps `/personal-software/` and `/software/:slug/`. Preserve published routes and links.
- The only signup is “notes from tatva.” Retain `finance=no` in its payload for the existing endpoint, plus the honeypot and retry behavior.
- Mock signup requests in tests; never subscribe real addresses. The endpoint uses `no-cors`, so a resolved fetch is not proof of server-side delivery.
- Analytics and signup settings live in `_config.yml`. Do not duplicate their values in templates or test output.
- Keep development documentation, scripts, and scratch output out of `_site/` through `_config.yml` exclusions.

## Verification

After edits, run `bundle exec jekyll build` and `python3 scripts/check-site.py`.
For styling or interaction changes, also run `scripts/check-browser.mjs` against a local preview as described in `README.md`, and inspect desktop/mobile when capture is available.
Report unavailable checks explicitly. Build outputs and test artifacts are not source files.
