---
title: ereader
order: 3
group: selected
featured: true
tagline: a reader for scanned books
summary: a pdf reader for clean reading of scanned books downloaded from the archive.
kind: web app
year: 2025 to now
stack: flask, sqlalchemy, pdf.js, sqlite
links:
  - label: github
    url: https://github.com/tatvadesai/EReader_pdf
---

old books on the internet archive are scans, and scans read badly in a normal pdf viewer. ereader renders each page exactly with pdf.js, and also offers a reflowed view when the scan allows it.

it has since grown into a full reader: highlights and notes drawn in svg, everything synced to a small sqlite server so it follows me between devices, and optional local ocr through ollama for scans with no text layer. there are 42 tests and deploy configs, so it can run on a cheap box behind caddy.
