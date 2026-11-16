# Picture Bingo Studio - Free Image Bingo Card Generator

**Make custom picture bingo cards from your own images and download a printable PDF.** Picture Bingo Studio is a free, browser-based bingo card maker for photo bingo, classroom vocabulary games, party games, and themed activities. Customize fonts and colors, then generate up to **100 unique 5x5 bingo cards** at once.

## Try the picture bingo maker

**[Open Picture Bingo Studio](https://pinox64.github.io/bingo-card/)**

No sign-up, installation, or image uploads to a server. Your pictures, fonts, and generated PDFs stay on your device. You can also download this repository and open `index.html` to use it locally without an internet connection.

## What you can make

- **Custom image and photo bingo:** use your own photos, illustrations, symbols, or vocabulary pictures instead of numbers.
- **Printable bingo cards:** export 1-100 distinct card arrangements in a multipage PDF, with one card per page in US Letter or A4 format.
- **Classroom and educational bingo:** create visual games for vocabulary, plants, animals, science topics, or other lessons.
- **Party and themed bingo:** build a picture collection for birthdays, holidays, family activities, or group events.
- **75-ball picture bingo:** assign an image to each number and keep the standard B-I-N-G-O column ranges.

## How to make bingo cards with your own pictures

1. **[Open the bingo card generator](https://pinox64.github.io/bingo-card/)** and choose picture bingo or classic 75-ball rules.
2. **Add your pictures.** Click **Choose multiple images** and select several files using Ctrl/Command or Shift, or drag a group of images into the upload area. Images fill empty entries in filename order; click an individual tile to assign or replace its picture.
3. **Customize your cards.** Choose a font or upload your own font file, set the ink, paper, and accent colors, and adjust the title, image fit, and optional free center.
4. **Preview and shuffle.** Check the layout before exporting.
5. **Generate your PDF.** Choose between 1 and 100 cards, click **Generate PDF**, and print the downloaded file.

**Keep your work:** use **Save project** to download a project file containing your pictures, font, and settings. Use **Open project** to continue later. Projects are not saved automatically, so save before closing or refreshing the page.

## Picture bingo and classic 75-ball rules

| Mode | How pictures are placed | Pictures needed |
| --- | --- | --- |
| Picture bingo | Any assigned picture can appear in any square. | At least 24 with a free center, or 25 without. |
| Classic 75-ball | Each image represents a number. B uses 1-15, I uses 16-30, N uses 31-45, G uses 46-60, and O uses 61-75. | At least five assigned pictures per column, or four for N with a free center. Assign all 75 for a full standard pool. |

Entry numbers identify your pictures in the editor. Printed cards show images by default; small number labels are optional. Bulk imports preserve existing pictures, show progress, and skip unreadable files. Picture mode supports up to 300 entries.

## Frequently asked questions

### Is this bingo card maker free?

Yes. You can use the hosted tool or run it locally. No account is required.

### Can I upload multiple bingo images at once?

Yes. Use **Choose multiple images**, the visible multi-file picker, or drag and drop a group of image files. Files are sorted naturally by filename, so `2.png` comes before `10.png`.

### Can I make 100 different bingo cards in one PDF?

Yes. Each export supports up to 100 unique arrangements, with one card per PDF page. Cards can share pictures, as in a normal bingo game.

### Are my pictures sent anywhere?

No. Image processing and PDF generation happen in your browser. The app uses no external font services, analytics, CDNs, or runtime downloads.

### Can I use it offline?

Yes. Download the repository files and open `index.html` in a modern browser. There is no build step or server requirement.

### How do images look when printed?

PDF pages contain embedded raster images at approximately 140 DPI; text is rasterized too. **Fit entire image** preserves the whole picture, while **Fill square** crops it to fill the cell. Choose US Letter or A4 to match your paper.

The **Try sample pictures** button replaces the current image pool with sample artwork rendered using your device's emoji font.

## Randomness and unique cards

Cards use the browser's `crypto.getRandomValues` and Fisher-Yates shuffle. Bounded random integers use rejection sampling to avoid modulo bias. Each entry occurs at most once on a card. Classic columns are sampled independently without replacement; the free center uses no picture.

Duplicate complete arrangements are rejected within each PDF batch. Separate exports can overlap. If you assign the same image to several entries, those entries remain distinct and may appear together.

## Host your own on GitHub Pages

The tool is built with plain HTML, CSS, and JavaScript, with no dependencies or build tools.

1. Copy these files into your GitHub repository.
2. Go to **Settings > Pages**.
3. Select **Deploy from a branch**, choose your branch and **/(root)**, and save.

The site uses relative paths, so repository subpath hosting works. `.nojekyll` disables unnecessary Jekyll processing.

## Development checks

With Node.js 20 or later, run:

```sh
node --test tests/core.test.cjs tests/upload.test.cjs
```

Tests cover card constraints, random integer rejection, unique batches, PDF object offsets and page counts, and bulk image imports. There are no dependencies.
