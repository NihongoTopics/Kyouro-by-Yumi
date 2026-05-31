# AGENTS.md — Instructions for Claude Code

This file is the single source of operating instructions for Claude Code on this project. It supersedes any prior ChatGPT-era instructions. Read it fully before starting any task.

---

## Project Identity

This is **Kyouro by Yumi** — a static bilingual (English/Japanese) website about Kyouro (教育ローマ字), a romanization system for Japanese. All content is written in the voice of **Yumi** (ユミ), a 23-year-old biology student in Wisconsin, bilingual in English and Japanese.

Yumi is curious, careful, and genuinely interested in the theory. She cites her sources, stays within what the PDFs actually say, and writes for readers who are intelligent but not specialists.

---

## Canonical Sources

All factual content on the site must be traceable to one of these four PDFs in `sources/`:

| File | Short name used in cites |
|------|--------------------------|
| `Proposing a new romanization system of Japanese (book).pdf` | *Proposing* |
| `Semantics of Tokyo Japanese.pdf` | *Semantics* |
| `Version Seven.pdf` | *Version Seven* |
| `Concatenation.pdf` | *Concatenation* |

**Rules:**
- `sources/` is the canonical location. There are no duplicate copies at the repo root.
- Do not modify any PDF.
- Do not import external linguistic claims not grounded in these documents.
- When stating a rule or fact from a PDF, note which document and a page number or section keyword where feasible.
- The official Kyouro note series at `https://note.com/j9a/n` is a supplementary reference (for context only; do not scrape or embed).

---

## Site Structure

```
index.html          landing page
blog.html           blog listing
post.html           single-post template (loaded dynamically by blog.js)
accent.html         accent / pitch reference page
disclaimer.html     legal disclaimer
styles.css          shared stylesheet
blog.js             blog engine (reads posts/index.json)

posts/
  index.json        post manifest (slug, title, date, summary)
  <slug>.html       individual post bodies

ja/                 full Japanese mirror — same structure as root
  index.html
  blog.html
  post.html
  accent.html
  disclaimer.html
  posts/
    index.json
    <slug>.html

sources/            canonical PDFs (read-only)
ocr_out/            OCR text extractions (internal, not served)
ocr_tmp/            OCR page images (internal, not served)
```

No build system. No external CDNs. Plain HTML/CSS and minimal vanilla JS only.

---

## Authoring Rules

### Voice and content
- Write as Yumi. First person, personal and reflective tone, accurate to the PDFs.
- Never invent linguistic examples not found in the source documents.
- Prefer concrete examples from the PDFs over abstract paraphrase.

### HTML conventions
- Root pages link CSS as `styles.css`; pages inside `ja/` or `posts/` link as `../styles.css`.
- `blog.js` is shared; sub-pages reference it as `../blog.js`.
- No `<script src="...cdn...">` or external font imports.

### Localization
- "Yumi" → **ユミ** in all Japanese content. Never "由美".
- "Kyouro" → **教育ローマ字** in Japanese. Use "教育ローマ字（Kyouro）" on first mention per page only if disambiguation helps.
- Do not add or remove sections between the English page and its `ja/` counterpart — localize text only.

### Bilingual parity
Every English page must have a `ja/` counterpart with equivalent structure:

| English | Japanese |
|---------|----------|
| `index.html` | `ja/index.html` |
| `blog.html` | `ja/blog.html` |
| `post.html` | `ja/post.html` |
| `accent.html` | `ja/accent.html` |
| `disclaimer.html` | `ja/disclaimer.html` |
| `posts/<slug>.html` | `ja/posts/<slug>.html` |
| `posts/index.json` | `ja/posts/index.json` |

Disclaimer must contain these three points (both languages):
1. Content is AI-generated with human moderation.
2. Characters (Yumi, etc.) are fictional.
3. Site is based on official Kyouro documents but is not itself an official Kyouro publication.

### Blog posts
- Add slug to `posts/index.json` and `ja/posts/index.json` simultaneously.
- Post HTML files are fragments (no `<html>`/`<head>`) loaded by `post.html` via `blog.js`.
- Titles, summaries, and dates in `index.json` must match what is in the post HTML.

---

## OCR Normalization

When reading or editing files in `ocr_out/` or `ocr_tmp/`, apply these corrections:

- `Gi` (standalone token) → `G1`
- `Ps` (standalone token) → `P5`

Verify with: `grep -n '\bGi\b\|\bPs\b' ocr_out/*.txt`

---

## Verification Checks

Before committing any change, run:

```bash
# No "由美" anywhere in ja/
grep -rn "由美" ja/ || true

# Confirm bilingual parity — spot-check section headings
grep -n "<h2\|<section\|class=\"card\"" accent.html
grep -n "<h2\|<section\|class=\"card\"" ja/accent.html

# Confirm post manifests are in sync (slugs must match)
python3 -c "
import json
en = json.load(open('posts/index.json'))['posts']
ja = json.load(open('ja/posts/index.json'))['posts']
assert [p['slug'] for p in en] == [p['slug'] for p in ja], 'slug mismatch'
print('post manifests OK')
"
```

---

## Response Etiquette

- Do not ask for the next task at the end of a response.
- Clarifying questions about the **current** task are fine.
- Keep status updates concise.
