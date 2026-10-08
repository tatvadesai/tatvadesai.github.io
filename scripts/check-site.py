#!/usr/bin/env python3
"""Check a Jekyll build using only the Python standard library."""

import re
import sys
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit


class Page(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.elements = []
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        self.elements.append((tag, dict(attrs)))

    handle_startendtag = handle_starttag

    def matching(self, tag=None, **attrs):
        return [
            node for node_tag, node in self.elements
            if (tag is None or tag == node_tag)
            and all(key in node and (value is None or node[key] == value)
                    for key, value in attrs.items())
        ]


def check_site(root):
    errors = []
    files = sorted(root.rglob("*.html"))
    pages = {path: Page(path.read_text()) for path in files}

    def require(condition, message):
        if not condition:
            errors.append(message)

    def check_reference(reference, owner, fragments=False):
        url = urlsplit(urljoin("/" + owner.relative_to(root).as_posix(), reference))
        if url.scheme or url.netloc:
            return
        target = (root / unquote(url.path).lstrip("/")).resolve()
        if not target.is_relative_to(root):
            errors.append(f"{owner.relative_to(root)}: reference escapes build")
            return
        if target.is_dir():
            target /= "index.html"
        require(target.is_file(), f"{owner.relative_to(root)}: missing {url.path}")
        if fragments and url.fragment and target in pages:
            require(
                any(a.get("id") == unquote(url.fragment)
                    or (tag == "a" and a.get("name") == unquote(url.fragment))
                    for tag, a in pages[target].elements),
                f"{owner.relative_to(root)}: missing fragment {url.path}#{url.fragment}",
            )

    shared_pages = 0
    for path, page in pages.items():
        name = path.relative_to(root).as_posix()
        ids = Counter(a["id"] for _, a in page.elements if "id" in a)
        require(all(count == 1 for count in ids.values()), f"{name}: duplicate IDs")
        for tag, attrs in page.elements:
            if tag == "img":
                require("alt" in attrs, f"{name}: image needs alt text")
            for attribute in ("href", "src", "poster"):
                if attrs.get(attribute):
                    check_reference(attrs[attribute], path, fragments=tag == "a")
            if "style" in attrs:
                for _, url in re.findall(r"url\((['\"]?)(.*?)\1\)", attrs["style"]):
                    check_reference(url, path)

        if not any("sheet" in a.get("class", "").split()
                   for a in page.matching("main")):
            continue  # The standalone CV owns its layout.
        shared_pages += 1
        require(len(page.matching("h1")) == 1, f"{name}: expected one h1")
        require(len(page.matching("form", id="site-signup-form")) == 1,
                f"{name}: expected the shared signup")
        require(len(page.matching("input", id="signup-email", type="email", required=None)) == 1,
                f"{name}: expected a required email field")
        require(bool(page.matching("label", **{"for": "signup-email"})),
                f"{name}: email needs a visible label")
        require(not page.matching("input", name="finance"), f"{name}: obsolete finance opt-in")
        require(bool(page.matching("input", name="website")), f"{name}: missing honeypot")
        require(bool(page.matching(id="signup-error", role="alert")), f"{name}: missing error region")
        require(len(page.matching("footer", **{"class": "site-footer"})) == 1,
                f"{name}: expected shared footer")
        require(len(page.matching("button", **{"data-theme-choice": "light"})) == 1
                and len(page.matching("button", **{"data-theme-choice": "dark"})) == 1,
                f"{name}: missing or duplicate theme controls")

    css_path = root / "assets/css/style.css"
    require(css_path.is_file(), "Missing shared stylesheet")
    if css_path.is_file():
        for _, reference in re.findall(r"url\((['\"]?)(.*?)\1\)", css_path.read_text()):
            check_reference(reference, css_path)
    for asset in ("eb-garamond.woff2", "eb-garamond-italic.woff2"):
        require((root / "assets/fonts" / asset).is_file(), f"Missing required font: {asset}")

    for name in ("AGENTS.md", "CLAUDE.md", "README.md", "Gemfile", "Gemfile.lock",
                 "deploy-to-phone.sh", "scripts", "font-preview", ".impeccable"):
        require(not (root / name).exists(), f"Development file published: {name}")
    require(shared_pages > 0, "No shared site pages found")
    return errors, len(pages), shared_pages


if __name__ == "__main__":
    default = Path(__file__).resolve().parents[1] / "_site"
    root = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else default
    if not root.is_dir():
        sys.exit("Build the site first: bundle exec jekyll build")
    errors, total, shared = check_site(root)
    if errors:
        sys.exit("\n".join(f"FAIL: {error}" for error in errors))
    print(f"PASS: {total} HTML pages, {shared} shared layouts, local links/assets, signup and build exclusions.")
