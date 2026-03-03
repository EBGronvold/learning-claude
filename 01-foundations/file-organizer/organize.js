#!/usr/bin/env node

// Built-in Node.js modules — no npm install needed
const fs = require("fs");
const path = require("path");

// ---------------------------------------------------------------------------
// FILE CATEGORY MAP
// Maps file extensions to folder names. When we find a .jpg, it goes into
// the "Images" folder. This is an object lookup — much cleaner than a
// giant if/else chain, and easy to extend.
// ---------------------------------------------------------------------------
const CATEGORIES = {
  // Images
  ".jpg": "Images",
  ".jpeg": "Images",
  ".png": "Images",
  ".gif": "Images",
  ".svg": "Images",
  ".webp": "Images",

  // Documents
  ".pdf": "Documents",
  ".doc": "Documents",
  ".docx": "Documents",
  ".txt": "Documents",
  ".xlsx": "Documents",
  ".csv": "Documents",

  // Code
  ".js": "Code",
  ".ts": "Code",
  ".py": "Code",
  ".html": "Code",
  ".css": "Code",
  ".json": "Code",

  // Audio
  ".mp3": "Audio",
  ".wav": "Audio",
  ".flac": "Audio",
  ".aac": "Audio",

  // Video
  ".mp4": "Video",
  ".mov": "Video",
  ".avi": "Video",
  ".mkv": "Video",

  // Archives
  ".zip": "Archives",
  ".tar": "Archives",
  ".gz": "Archives",
  ".rar": "Archives",
};

// ---------------------------------------------------------------------------
// PARSE CLI ARGUMENTS
// process.argv is an array: [node, script-path, ...your-args]
// So the actual user arguments start at index 2.
// ---------------------------------------------------------------------------
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const targetFolder = args.find((arg) => !arg.startsWith("--"));

// Show usage if no folder provided
if (!targetFolder) {
  console.log("Usage: node organize.js <folder> [--dry-run]");
  console.log("");
  console.log("Examples:");
  console.log("  node organize.js ~/Downloads --dry-run   Preview changes");
  console.log("  node organize.js ~/Downloads             Move files");
  process.exit(1);
}

// ---------------------------------------------------------------------------
// VALIDATE TARGET FOLDER
// Always check inputs before doing anything destructive.
// ---------------------------------------------------------------------------
const fullPath = path.resolve(targetFolder);

if (!fs.existsSync(fullPath)) {
  console.error(`Error: Folder not found: ${fullPath}`);
  process.exit(1);
}

if (!fs.statSync(fullPath).isDirectory()) {
  console.error(`Error: Not a directory: ${fullPath}`);
  process.exit(1);
}

// ---------------------------------------------------------------------------
// ORGANIZE FILES
// Read all entries in the folder, skip directories, categorize files,
// and move (or preview) them into subfolders.
// ---------------------------------------------------------------------------
const entries = fs.readdirSync(fullPath);
let movedCount = 0;
const categoriesUsed = new Set();

if (dryRun) {
  console.log(`\nDRY RUN — previewing changes in: ${fullPath}\n`);
} else {
  console.log(`\nOrganizing files in: ${fullPath}\n`);
}

for (const entry of entries) {
  const entryPath = path.join(fullPath, entry);

  // Skip directories — we only organize files
  if (fs.statSync(entryPath).isDirectory()) continue;

  // Get the extension (lowercase) and look up the category
  const ext = path.extname(entry).toLowerCase();
  const category = CATEGORIES[ext] || "Other";
  const destFolder = path.join(fullPath, category);
  const destPath = path.join(destFolder, entry);

  if (dryRun) {
    // Just print what would happen
    console.log(`  ${entry} → ${category}/`);
  } else {
    // Create the subfolder if it doesn't exist yet
    if (!fs.existsSync(destFolder)) {
      fs.mkdirSync(destFolder);
    }
    // Move the file
    fs.renameSync(entryPath, destPath);
    console.log(`  Moved: ${entry} → ${category}/`);
  }

  movedCount++;
  categoriesUsed.add(category);
}

// ---------------------------------------------------------------------------
// SUMMARY
// ---------------------------------------------------------------------------
if (movedCount === 0) {
  console.log("No files to organize. Folder is already clean or empty.");
} else if (dryRun) {
  console.log(`\n${movedCount} file(s) would be moved into ${categoriesUsed.size} folder(s).`);
  console.log("Run without --dry-run to apply changes.");
} else {
  console.log(`\nDone! ${movedCount} file(s) organized into ${categoriesUsed.size} folder(s).`);
}
