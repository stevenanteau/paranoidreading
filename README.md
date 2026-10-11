# Paranoid Reading

Source for **paranoidreading.com**, the site behind the Paranoid Reading BookTube channel and Substack: crime fiction, weird fiction, demonology, dystopia and deep politics.

## Hosting

GitHub Pages builds and serves this repo from branch `main`. `CNAME` points it at paranoidreading.com. Squarespace holds the domain only, it is not the host. A commit to `main` is the publish step, there is nothing to do anywhere else. Deployment takes a minute or two, then confirm on the live page.

## Layout

| Path | Page | Contents |
|---|---|---|
| `index.html` | Landing | Hub, nav, social links |
| `canon/index.html` | The Canon | 116 books in 14 strands |
| `curriculums/index.html` | The Curriculums | 119 items in 16 veins |
| `every-book/index.html` | Every Book | 577 books, plus a copy of all 119 curriculum items |
| `noided/index.html` | Noided | 33 books across 4 strands, rating system showcase |
| `apprenticeship/index.html` | The Apprenticeship | Static essay page |
| `slow-read/index.html` | Slow Read | Index of the slow read guides |
| `slow-read/<slug>/index.html` | Slow reads | 2666, before-lovecraft, fascist-japan, gnostic-villains, gravitys-rainbow, how-to-read-a-conspiracy |

Every page is a single self contained HTML file. No build step, no shared CSS or JS, no dependencies. Styles, scripts and data all live inline in the one file.

## Data shapes

Data sits in the page as a `const` holding JSON, matched by the pattern `const NAME = [...];` on its own line.

**`canon/index.html` and `noided/index.html`, `const DATA`** is a list of strands:

```js
{ num:"I", name:"The De Maria Strand", sub:"short blurb", scoring:"CC",
  entries:[ { n:1, head:"Author — Title.", desc:"...", len:"≈ 450 pp",
              bar:3, commit:"M", chal:2, chan:null } ] }
```

`commit` keys into `CLOCK`/`CLABEL` (`B` Brief, `M` Medium, `L` Long, `E` Epic). `chal` keys into `CHLAB` (1 Accessible, 2 Demanding, 3 Formidable).

**`curriculums/index.html`, `const DATA`** is a list of veins:

```js
{ vein:"The Core Slate",
  items:[ { t:"title of the route", f:true, b:["Title — Author", ...],
            o:"optional extra book", h:"the argument, one paragraph" } ] }
```

`f` marks a flagship. The last vein, `Parapolitics: The Nonfiction Shelves`, is the nonfiction format: long lists, no `o`, and the book strings carry parenthetical tags, podcast episode numbers and audiobook flags, for example `Rogue Agents — David Teacher (Le Circle · ep. 25, 96)`.

**`every-book/index.html`** holds two:

```js
const BOOKS = [ { title:"...", author:"...", tier:"touchstone"|"book",
                  strand:null, desc:"...", curricula:["route title", ...] } ];
const CURRICULA = [ ...identical to the curriculums DATA... ];
```

`CURRICULA` is a verbatim copy. Any change to a vein or item has to be made in both files or the two pages disagree.

## Rules

**Append only.** Visitor progress is saved in `localStorage` by index position, so reordering or deleting an existing entry silently corrupts every visitor's saved progress. New items go at the end of their list. The keys in use:

- `paranoid_canon_read_v1`
- `paranoid_curricula_done_v1`
- `paranoid_master_read_v3`
- `paranoid_noided_read_v1`
- `paranoid_theme`

**Counts are hardcoded text** and have to be updated by hand whenever items are added:

- `canon/index.html`: "116 books", "14 strands", "0 / 116 read", and in the footer "119 routes through" and "Every Book (577, one list)"
- `curriculums/index.html`: the subtitle "99 themed routes ... plus 20 nonfiction shelves", "0 / 119 done", and in the footer "116 books" and "Every Book (577)"
- `every-book/index.html`: "0 / 577 read"

**Ratings.** Noided/Grim is the brand's official rating system. New books stay unrated until Steven assigns a rating.

**Preserve the source lists.** Podcast episode numbers, audiobook flags and any debunked or outdated notes carry through from Steven's lists into the book strings and the `desc` field.

## Design

Oxblood and bone. Georgia serif. Accent `#6B1414`, hover `#8f2320`, paper `#faf7f2`, ink `#1a1a1a`, muted `#5a5a5a`, rules and panels `#eaded4` / `#f4ede4`. Match the existing pages rather than introducing new tokens.

## Working files

Outside this repo, in `paranoid-reading-project/`:

- `data/nonfiction-curriculums-source.txt`, the plain text source for the Nonfiction Shelves vein. Format is `## Title || blurb` followed by `* Title - Author (tags) [ep. 25] {audiobook available}` lines.
- `scripts/add_nonfiction_vein.py`, the one time script that parsed that file into the three pages. Kept as a reference for the parsing rules, not reusable as is.

## Checklist for a change

1. Edit the local file, append only.
2. Update every hardcoded count listed above.
3. Mirror any curriculum change into both `curriculums/index.html` and `every-book/index.html`.
4. Open the page locally and confirm it renders with no console errors and the totals read correctly.
5. Verify the existing data is intact, same counts plus exactly what was added.
6. Commit to `main`, then load the live page and confirm.
