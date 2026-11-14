# Paranoid Reading

Source for **paranoidreading.com**, the site behind the Paranoid Reading BookTube channel: a reading list compendium for the parapolitical, the paranoid and the Marxist.

## Hosting

GitHub Pages builds and serves this repo from branch `main`. `CNAME` points it at paranoidreading.com. Squarespace holds the domain only, it is not the host. A commit to `main` is the publish step. Deployment takes a minute or two, then confirm on the live page.

## Layout

| Path | Page | Contents |
|---|---|---|
| `index.html` | Choose Your Media | Portal: monthly picks, four format tiles, companion reading lists |
| `novels/` | Fiction | Novels, stories, poetry, drama, graphic novels |
| `film-tv/` | Film and TV | Features, series, documentaries |
| `nonfiction/` | Non-Fiction | Books, histories, theory, primary texts |
| `articles/` | Articles and Journals | Papers, journals, magazines, press, reportage |
| `current/` | Current Academic Work | Monthly academic picks with an archive |
| `random/` | Random Pick | One draw from the catalogue, by format, era, keyword or list |
| `wheel/` | The Wheel | Add titles and spin |
| `topics/` | The Index | Every entry by topic, with read marks |
| `dossiers/gladio/` | Gladio Dossier | Long form dossier with graded holdings |
| `curriculums/` | Pre-Made Curriculums | 99 themed routes plus 20 nonfiction shelves |
| `library/` | The Lens and Build a Curriculum | Statement of the lens and the curriculum builder. The old browse view is retired; `#library?t=<topic>` links forward to The Index |
| `404.html` | Not found | Keeps the sidebar and pre-fills the search |

Retired, kept only as redirects: `daily/` (An Article a Day), `slow-read/` (Deep Reads), `apprenticeship/`. `screen/` is retired, still present, and marked noindex.

## Data

`data/catalogue.json` is the single source for every entry, plus topics, families and regions. The four sections, Random Pick, The Wheel, The Index, the Library, the front page list panels and the sidebar search all load it.

Entry shape: `{id, t:title, by, y:year, k:type, g:evidence grade, s:one sentence summary, kw:[keywords], x:section, src?, c?:country, url?, note?, pending?, pl?:[{n:list name, d:detail}]}`.

`curriculums/index.html` and `dossiers/gladio/index.html` still hold their own data inline as `const DATA = [...]`.

## Linking to an entry

`/<section>/#id=<entry id>` opens exactly one entry, for example `/film-tv/#id=ft-z`. Use this for any link to a single work. `#q=` is a search and will match every title containing the text.

Other filters also live in the hash and can be shared: `q`, `a` (author or director), `y0`, `y1`, `kw`, `pl` (reading list), `k` (type), `g` (evidence), `c` (country), `sort`.

## Shared sidebar

Every page carries its own copy of the sidebar, theme CSS and light mode palette (between the `<!--pr-theme-->` markers). A change to the sidebar has to be made on every page.

## Rules

**Append only.** Visitor progress is saved in `localStorage`, so reordering or deleting existing curriculum or dossier items corrupts saved progress. New items go at the end of their list. Keys in use include `paranoid_index_read_v1`, `paranoid_curricula_done_v1` and `pr-theme`.

**Counts are hardcoded text** on the front page (total and per format tiles, reading list cards), the Curriculums subtitle, and the Index and Library footers. Update them when entries are added.

**Generators live outside the repo.** The section pages are produced by `gen.py` and reading lists are merged by `add_lists.py` in the working folder. Any hand edit to a generated page has to be mirrored there or the next run will undo it.

**Preserve the source lists.** Podcast episode numbers, audiobook flags and any debunked or outdated notes carry through from the source lists into the entries.
