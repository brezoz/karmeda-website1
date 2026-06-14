// post-build.js — runs after `vite build` to apply performance optimizations
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync, copyFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, 'dist');
const indexPath = join(distDir, 'index.html');
let html = readFileSync(indexPath, 'utf8');
let changed = false;

html = html.replace(
  /<link rel="stylesheet" crossorigin href="(\/assets\/index-[^"]+\.css)">/g,
  (match, cssPath) => {
    changed = true;
    return `<link rel="preload" as="style" crossorigin href="${cssPath}">\n  <link rel="stylesheet" crossorigin href="${cssPath}" media="print" onload="this.media='all'">\n  <noscript><link rel="stylesheet" crossorigin href="${cssPath}"></noscript>`;
  }
);

if (changed) {
  writeFileSync(indexPath, html);
  console.log('✓ post-build: CSS render-blocking fix applied');
} else {
  console.log('⚠ post-build: CSS link pattern not found');
}

const SOURCE_TEXT_DIRS = ['components', 'src', 'blog', 'lokasi', 'layanan', 'iklan'];
const SOURCE_TEXT_FILES = ['index.html', '404.html', 'styles.css', 'sitemap.xml', 'robots.txt'];
const COPY_DIRS = ['blog', 'lokasi', 'layanan', 'iklan'];
const COPY_FILES = ['404.html', 'styles.css', 'sitemap.xml', 'robots.txt', 'vercel.json'];
const assetSourceDir = join(__dirname, 'assets');
const assetDestDir = join(distDir, 'assets');

function walkFiles(dir) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...walkFiles(full));
    else out.push(full);
  }
  return out;
}

function ensureDir(path) {
  mkdirSync(path, { recursive: true });
}

for (const dir of COPY_DIRS) {
  const src = join(__dirname, dir);
  const dest = join(distDir, dir);
  if (existsSync(src)) cpSync(src, dest, { recursive: true });
}
for (const file of COPY_FILES) {
  const src = join(__dirname, file);
  const dest = join(distDir, file);
  if (existsSync(src)) copyFileSync(src, dest);
}

const texts = [];
for (const dir of SOURCE_TEXT_DIRS) {
  for (const full of walkFiles(join(__dirname, dir))) {
    if (/\.(html|jsx|js|ts|tsx|css|json|xml|md)$/i.test(full)) {
      texts.push(readFileSync(full, 'utf8'));
    }
  }
}
for (const file of SOURCE_TEXT_FILES) {
  const full = join(__dirname, file);
  if (existsSync(full)) texts.push(readFileSync(full, 'utf8'));
}
const haystack = texts.join('\n');

ensureDir(assetDestDir);
let copiedCount = 0;
let copiedBytes = 0;
for (const name of readdirSync(assetSourceDir)) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`(?:https://seragamrapih\\.com/|\\.\\.?/\\.\\.?/|\\.\\.?/|/)??assets/${escaped}(?=["'\\s>])`, 'i');
  if (!pattern.test(haystack)) continue;
  const src = join(assetSourceDir, name);
  const dest = join(assetDestDir, name);
  copyFileSync(src, dest);
  const bytes = statSync(src).size;
  copiedCount += 1;
  copiedBytes += bytes;
}

console.log(`✓ post-build: copied ${copiedCount} referenced source assets (${(copiedBytes / 1024 / 1024).toFixed(2)} MB)`);
