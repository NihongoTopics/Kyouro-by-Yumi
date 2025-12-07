# Repository Guidelines

This repository currently stores research PDFs (e.g., romanization and Tokyo Japanese semantics). Use this guide to keep structure, naming, and contributions consistent as the repo grows.

## Project Structure & Module Organization
- Current: PDFs live at the repository root.
- Preferred (as content grows):
  - `docs/`: primary manuscripts and exported PDFs
  - `sources/`: editable sources (Markdown, LaTeX, Word)
  - `assets/`: figures, images, and data used by sources
  - `scripts/`: small utilities for conversion/QA

Example:
```
docs/Proposing-a-new-romanization.pdf
sources/romanization.md
assets/figures/long-vowels.svg
```

## Build, Test, and Development Commands
- No build system is required for PDFs. Helpful utilities:
  - Verify file types: `file docs/*.pdf`
  - Check changes via hash: `md5 docs/<file>.pdf`
  - Strip metadata before commit: `exiftool -all= -overwrite_original docs/<file>.pdf`
  - Track large binaries: `git lfs install && git lfs track "*.pdf" && git add .gitattributes`

## File Naming & Conventions
- Use kebab-case, concise English titles: `semantics-of-tokyo-japanese.pdf`.
- Include date or version when meaningful: `2025-01-12-romanization-draft-v2.pdf`.
- Keep sources and exports paired (same stem): `sources/romanization.md` → `docs/romanization.pdf`.
- Prefer vector originals (SVG/PDF) for figures; store high-res assets in `assets/`.

## Testing Guidelines
- Manual QA: open each PDF, verify links, figures, and fonts; confirm page count if unchanged.
- Metadata/format checks: `pdfinfo docs/<file>.pdf` and `file docs/<file>.pdf`.
- Optional proofreading for text sources: run a spell checker on `sources/` before exporting.

## Commit & Pull Request Guidelines
- Branch names: `feature/add-romanization-appendix`, `chore/restructure-docs`.
- Commits (conventional style): `docs(romanization): add section on long vowels`.
- PRs include: concise description, affected files list, rationale, linked issue (if any), and confirmation that PDFs are LFS-tracked and metadata-stripped. Add screenshots only when relevant.

## Security & Configuration Tips
- Remove personal or tool metadata from PDFs prior to commit (see `exiftool`).
- Do not embed sensitive data in documents or file metadata. Review figures for hidden layers.

## Agent Job: Build “Kyouro” Website (Yumi)
- Scope: Create a static website in this repository that explains Kyouro “in the name of Yumi” (a 23-year-old biology student in Wisconsin, bilingual in English/Japanese).
- Sources only: All website content must be derived strictly from the two PDFs in this repo: `Proposing a new romanization system of Japanese (book).pdf` and `Semantics of Tokyo Japanese.pdf`. Do not import external linguistic knowledge or assumptions.
- No PDF changes: Never modify, rename, or move the PDF files; they are reference materials.
- Output: A `site/` directory with `index.html`, section pages (e.g., `romanization.html`, `semantics.html`, `notation.html`, `quickstart.html`), and `styles.css`. Keep tone accessible and authored by “Yumi,” while remaining faithful to the PDFs.
- Constraints: No network-required frameworks. Use plain HTML/CSS (and minimal JS only if necessary without external CDNs).
- Links: Include relative links to the PDFs in the repo for verification. When asserting rules, cite which PDF and section/page keyword when feasible.
- Review: Perform a fidelity check to ensure all claims match the PDFs; avoid adding examples not supported by them.

## Authoring Protocol (concise)
- Sources of truth: The two PDFs in this repo and official Kyouro notes at `https://note.com/j9a/n`.
- Invariants: Do not modify PDFs; keep assets local; avoid external CDNs.
- Blog: Use `blog.html`, `post.html`, `blog.js`, and `posts/index.json` with `posts/<slug>.html` files.
- Traceability: Prefer citing relevant PDF page keywords/sections when restating rules.
