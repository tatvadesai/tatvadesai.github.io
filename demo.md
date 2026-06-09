# tatvadesai.github.io — craft-redesign final version

*2026-03-22T19:25:01Z by Showboat 0.6.1*
<!-- showboat-id: dd3f9b47-640a-439f-bad2-dc9748a08200 -->

Full site redesign inspired by benji.org. Clean, functional, readable. Inter + Young Serif + Newsreader fonts, 36rem max-width, light/dark mode, top fade gradient, minimal transitions.

```bash
bundle exec jekyll build 2>&1
```

```output
Configuration file: /Users/tatvadesai/Desktop/tatva/tatvawrites/tatvadesai.github.io/_config.yml
            Source: /Users/tatvadesai/Desktop/tatva/tatvawrites/tatvadesai.github.io
       Destination: /Users/tatvadesai/Desktop/tatva/tatvawrites/tatvadesai.github.io/_site
 Incremental build: disabled. Enable with --incremental
      Generating... 
       Jekyll Feed: Generating feed for posts
                    done in 0.051 seconds.
 Auto-regeneration: disabled. Use --watch to enable.
```

Files changed in this redesign:

```bash
git diff --name-only HEAD
```

```output
_layouts/default.html
_layouts/home.html
assets/css/style.css
```

Key design decisions:
- **Palette**: Clean white (#FFF) / dark (#111) — no grain, no noise
- **Fonts**: Inter (body), Young Serif (headings), Newsreader (italic accents)
- **Layout**: 36rem max-width, matching benji.org's content-first approach
- **Top fade**: body::before gradient fading nav into content
- **Status pill**: 'open to cool stuff' links directly to mailto — zero friction
- **Skill issue**: Grayscale photos with color-on-hover, slide-up person info
- **Dark mode**: CSS custom properties + localStorage persistence
- **Animations**: Subtle fadeUp on load, IntersectionObserver reveals on scroll

```bash
wc -l assets/css/style.css _layouts/home.html _layouts/default.html _layouts/essay.html skill-issue.markdown
```

```output
     585 assets/css/style.css
     108 _layouts/home.html
      97 _layouts/default.html
      22 _layouts/essay.html
      63 skill-issue.markdown
     875 total
```

```bash
bundle exec jekyll build 2>&1 && echo '--- Build verified OK ---'
```

```output
Configuration file: /Users/tatvadesai/Desktop/tatva/tatvawrites/tatvadesai.github.io/_config.yml
            Source: /Users/tatvadesai/Desktop/tatva/tatvawrites/tatvadesai.github.io
       Destination: /Users/tatvadesai/Desktop/tatva/tatvawrites/tatvadesai.github.io/_site
 Incremental build: disabled. Enable with --incremental
      Generating... 
       Jekyll Feed: Generating feed for posts
                    done in 0.059 seconds.
 Auto-regeneration: disabled. Use --watch to enable.
--- Build verified OK ---
```
