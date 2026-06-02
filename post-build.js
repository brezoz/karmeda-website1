// post-build.js — runs after `vite build` to apply performance optimizations
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const indexPath = join(__dirname, 'dist', 'index.html');
let html = readFileSync(indexPath, 'utf8');
let changed = false;

// Convert render-blocking CSS link to preload + deferred load pattern
// Saves ~150ms on FCP/LCP by not blocking the initial render
html = html.replace(
  /<link rel="stylesheet" crossorigin href="(\/assets\/index-[^"]+\.css)">/g,
  (match, cssPath) => {
    changed = true;
    return `<link rel="preload" as="style" crossorigin href="${cssPath}">
  <link rel="stylesheet" crossorigin href="${cssPath}" media="print" onload="this.media='all'">
  <noscript><link rel="stylesheet" crossorigin href="${cssPath}"></noscript>`;
  }
);

if (changed) {
  writeFileSync(indexPath, html);
  console.log('✓ post-build: CSS render-blocking fix applied');
} else {
  console.log('⚠ post-build: CSS link pattern not found');
}
