# tatvadesai.github.io

Personal website, essays, and projects. Built with Jekyll and a shared EB Garamond stylesheet.

## Develop

Install Ruby and Bundler, then:

```sh
bundle install
bundle exec jekyll serve
```

Open `http://127.0.0.1:4000/`. Generated files go in `_site/`.

## Content

- **Essay:** add `_essays/YYYY-MM-DD-slug.md` with `title`, `date`, and `layout: essay` frontmatter. Keep `published: false` on drafts.
- **Project:** add a file in `_projects/`, following an existing entry's `order`, `group`, `summary`, and `links`. Set `featured: true` to include it on the homepage.
- **Navigation and newsletter:** edit the shared files in `_includes/`.
- **Styling:** edit `assets/css/style.css`. The CV is a separate résumé document.

The labels say “writings” and “work,” while existing URLs remain `/essays/`, `/essays/:slug/`, `/personal-software/` and `/software/:slug/`.
Site and integration settings live in `_config.yml`.

## Check

```sh
bundle exec jekyll build
python3 scripts/check-site.py
```

The dependency-free Python check validates local links/assets, shared page structure, newsletter fields, and build exclusions.

GitHub Actions runs these checks and Python/JavaScript syntax checks on pushes and pull requests. The **Site checks** workflow also supports manual runs. It uses read-only repository permissions and does not deploy the site. Browser checks remain a separate local step.

For browser checks, use Node.js 22+ and an open local preview in a CDP-connected browser. Set `AGENT_BROWSER_CDP` to that browser's endpoint, then:

```sh
SITE_URL=http://127.0.0.1:4000 node scripts/check-browser.mjs
```

This checks representative routes at desktop and phone widths, themes, focus, and mocked newsletter submission. It sends no real subscriptions and does not launch a browser.

## Repository boundaries

Keep authored content, images, résumé files, and the two Garamond fonts in version control.
Build output, caches, and design scratch files are ignored. Development files are excluded from the generated site.
Agent-specific conventions live in `AGENTS.md`.
