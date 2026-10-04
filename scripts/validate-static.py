from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit
import sys


class SiteParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.links = []
        self.assets = []
        self.policies = []
        self.external_scripts = []
        self.errors = []

    def handle_starttag(self, tag, attributes):
        attributes = dict(attributes)
        identifier = attributes.get("id")
        if identifier:
            if identifier in self.ids:
                self.errors.append(f"Duplicate ID: {identifier}")
            self.ids.add(identifier)
        for key in ("src", "poster", "data-image"):
            if attributes.get(key):
                self.assets.append(attributes[key])
        if "srcset" in attributes:
            self.assets.extend(entry.strip().split()[0] for entry in attributes["srcset"].split(","))
        if tag == "a":
            self.links.append(attributes.get("href", ""))
            if attributes.get("target") == "_blank":
                rel = set(attributes.get("rel", "").lower().split())
                if not {"noopener", "noreferrer"}.issubset(rel):
                    self.errors.append("A new-tab link is missing noopener/noreferrer.")
        if tag == "link" and attributes.get("rel") in ("stylesheet", "icon"):
            self.assets.append(attributes["href"])
        if tag == "meta" and attributes.get("http-equiv", "").lower() == "content-security-policy":
            self.policies.append(attributes.get("content", ""))
        if tag == "script" and urlsplit(attributes.get("src", "")).scheme == "https":
            self.external_scripts.append(attributes)
        if tag == "img" and "alt" not in attributes:
            self.errors.append("An image is missing alternative text.")


root = Path(__file__).resolve().parent.parent
if len(sys.argv) > 1:
    root = root / sys.argv[1]
parser = SiteParser()
pages = sorted(root.rglob("*.html"))
page_errors = []
asset_count = 0
link_count = 0
documents = {}
for page in pages:
    parser = SiteParser()
    parser.feed(page.read_text(encoding="utf-8"))
    documents[page] = parser
    relative_page = page.relative_to(root).as_posix()
    page_errors.extend(f"{relative_page}: {error}" for error in parser.errors)
    if relative_page in {
        "index.html",
        "professional/index.html",
        "personal/index.html",
        "personal/gallery/index.html",
    }:
        if len(parser.policies) != 1:
            page_errors.append(f"{relative_page}: expected one Content Security Policy.")
        elif any(directive not in parser.policies[0] for directive in (
            "object-src 'none'", "base-uri 'self'", "form-action 'self'"
        )) or "'unsafe-eval'" in parser.policies[0]:
            page_errors.append(f"{relative_page}: Content Security Policy is missing required restrictions.")
        for script in parser.external_scripts:
            if not script.get("integrity") or script.get("crossorigin") != "anonymous":
                page_errors.append(f"{relative_page}: external script is missing Subresource Integrity.")
    asset_count += len(parser.assets)
    link_count += len(parser.links)
    for asset in parser.assets:
        parsed = urlsplit(asset)
        if parsed.scheme or not parsed.path:
            continue
        if parsed.path.startswith("/"):
            asset_path = root / parsed.path.lstrip("/")
        else:
            asset_path = page.parent / parsed.path
        if not asset_path.is_file():
            page_errors.append(f"{relative_page}: missing asset {asset}")
for video in ("WebView.mp4", "FinalMobileView.mp4"):
    if not (root / "Animations" / video).is_file():
        page_errors.append(f"Missing responsive video: {video}")
for page, parser in documents.items():
    relative_page = page.relative_to(root).as_posix()
    for link in parser.links:
        parsed = urlsplit(link)
        if parsed.scheme or parsed.netloc:
            continue
        if parsed.path.startswith("/"):
            target = root / parsed.path.lstrip("/")
        elif parsed.path:
            target = page.parent / parsed.path
        else:
            target = page
        if target.is_dir():
            target /= "index.html"
        if not target.is_file():
            page_errors.append(f"{relative_page}: missing link target {link}")
            continue
        if parsed.fragment:
            target_parser = documents.get(target)
            if target_parser and parsed.fragment not in target_parser.ids:
                page_errors.append(f"{relative_page}: missing anchor {link}")
if page_errors:
    raise SystemExit("\n".join(page_errors))
print(f"PASS: {len(pages)} HTML pages, {asset_count} assets, {link_count} links, unique IDs, image alt text, and both videos.")