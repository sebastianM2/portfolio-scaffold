<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project workflow rules

## Always check the GitHub repo for unmerged changes before editing site content

The site owner sometimes edits `src/content/site.ts`, images, or other
site files directly on GitHub (or via another tool/session) between
conversations. Before making any edit to site files, an agent working
in a separate local/sandboxed copy of this repo MUST first sync with
the actual GitHub repository and reconcile differences — do not assume
a local working copy is current.

Practical steps:
1. `git clone` (or `git pull` if already cloned) the repo fresh:
   `https://github.com/sebastianM2/portfolio-scaffold`
2. Diff the remote against the local working copy, file by file
   (`diff` or `git diff`), for every file about to be touched —
   especially `src/content/site.ts`, `src/app/**/*.tsx`, and
   `src/app/globals.css`.
3. If the remote has changes not present locally, treat the remote as
   source of truth for content/copy decisions (the owner's edits win),
   and re-apply any pending code changes on top of that, not the other
   way around.
4. Before finalizing, verify every image path referenced in
   `site.ts` actually resolves to a real file in `public/` — broken
   references have slipped in before from manual edits (typo'd
   filenames, wrong folder casing, duplicate folders). A quick check:
   ```
   python3 -c "
   import re, os
   content = open('src/content/site.ts').read()
   srcs = re.findall(r'src: \"(/images/[^\"]+)\"', content)
   missing = [s for s in srcs if not os.path.exists('public' + s)]
   print(f'Total: {len(srcs)}, Missing: {len(missing)}')
   for m in missing: print(' MISSING:', m)
   "
   ```
5. Watch for accidental duplicate asset folders (e.g. differently-cased
   or differently-punctuated versions of the same folder name) and
   oversized images (anything over ~1-2MB is worth double-checking) —
   both have happened before from manual uploads and should be
   consolidated/optimized rather than committed as-is.

