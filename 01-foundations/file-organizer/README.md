# File Organizer CLI

A command-line tool that sorts files in a folder into subfolders by type.

## Usage

```bash
# Preview what would happen (no files moved)
node organize.js ~/Downloads --dry-run

# Actually organize files
node organize.js ~/Downloads

# Or use the npm script
npm run organize -- ~/Downloads --dry-run
```

## What It Does

Give it a messy folder like this:

```
Downloads/
  photo.jpg
  resume.pdf
  app.js
  song.mp3
  video.mp4
```

And it organizes it into:

```
Downloads/
  Images/photo.jpg
  Documents/resume.pdf
  Code/app.js
  Audio/song.mp3
  Video/video.mp4
```

## Categories

| Folder    | Extensions                            |
|-----------|---------------------------------------|
| Images    | .jpg, .jpeg, .png, .gif, .svg, .webp |
| Documents | .pdf, .doc, .docx, .txt, .xlsx, .csv |
| Code      | .js, .ts, .py, .html, .css, .json    |
| Audio     | .mp3, .wav, .flac, .aac              |
| Video     | .mp4, .mov, .avi, .mkv               |
| Archives  | .zip, .tar, .gz, .rar                |
| Other     | Everything else                       |

## Concepts Covered

- **`process.argv`** — How Node.js CLI tools receive command-line input
- **`fs` module** — Reading directories, creating folders, moving files
- **`path` module** — Cross-platform file path handling
- **Object lookups** — Using a map instead of if/else chains
- **Dry-run pattern** — Previewing destructive operations before executing them
- **Input validation** — Checking that the folder exists before doing anything
