# Picture Bingo Studio

A fully local image bingo card maker, built with plain HTML, CSS, and JavaScript. No build tools, servers, CDNs, analytics, or runtime downloads. Fonts, images, and generated PDFs stay on the device.

## Use

Open `index.html` in a modern browser, or serve this folder with any static web server. Use **Choose multiple images**, the visible multi-file picker, or drag a group of image files into the upload area to add pictures in bulk (sorted naturally by filename). Hold Ctrl/Command or Shift in the file picker to select several images. Bulk uploads fill empty entries without replacing existing pictures, show import progress, and skip unreadable files. You can also add pictures individually, or click a numbered tile to assign or replace its picture. Entry numbers identify pictures; cards display images rather than numbers by default.

- **Picture bingo:** any picture can go in any square. Requires 24 images with a free center, or 25 without.
- **Classic 75-ball:** pictures correspond to numbers 1–75. B draws from 1–15, I from 16–30, N from 31–45, G from 46–60, O from 61–75. Each column needs at least five assigned pictures (four for N when using the free center). Assign all 75 for a full standard game.
- Pick system fonts or upload a local font file. Change paper, ink, and accent colors, image fit, title, and free center text.
- Generate 1–100 distinct arrangements, one per page, in a Letter or A4 PDF. Images are embedded in raster pages approximately 140 DPI; text is rasterized too. Fit preserves the full picture; fill crops it.
- Save a project JSON to keep your images, font, and settings; open it later. Projects are not automatically persisted. Export projects before closing or refreshing.
- The sample button replaces the current image pool. Sample artwork uses your device's emoji font.

## GitHub Pages

Commit these files to a GitHub repository. In **Settings → Pages**, select **Deploy from a branch**, choose your branch and **/(root)**, and save. The site uses relative paths, so repository subpath hosting works. `.nojekyll` disables unnecessary Jekyll processing. There is no build step.

## Randomness

Cards use the browser's `crypto.getRandomValues` and Fisher–Yates shuffle. Bounded random integers use rejection sampling to avoid modulo bias. Each picture occurs at most once on a card. Classic columns are sampled independently without replacement; the free center uses no picture. Duplicate complete arrangements are rejected within each PDF batch. Cards may share pictures, as normal bingo cards do. A newly exported batch can overlap with earlier batches. If you assign the same picture to several entries, those entries remain distinct and may appear together.

## Checks

With Node.js 20 or later, run `node --test tests/core.test.cjs`. Tests cover card constraints, unbiased integer rejection, unique batches, and PDF object offsets/page count. There are no dependencies.
