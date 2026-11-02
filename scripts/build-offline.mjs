#!/usr/bin/env node
/**
 * Build a file://-friendly offline portfolio ZIP without changing the
 * GitHub Pages deploy pipeline.
 *
 * Strategy:
 * 1. next build with NEXT_PUBLIC_OFFLINE=1 (skips GoatCounter)
 * 2. Copy out/ → offline-dist/Xiang_Chen_Portfolio/
 * 3. Inject <base href> per HTML depth + force hard navigation on file://
 * 4. Strip leading "/" from site-root absolute asset/page paths in HTML/CSS/JS
 * 5. Normalize internal links to .../index.html for Chrome/Edge file://
 * 6. Zip → Xiang_Chen_Portfolio_Offline.zip
 */

import { spawnSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "out");
const offlineRoot = path.join(root, "offline-dist");
const siteDir = path.join(offlineRoot, "Xiang_Chen_Portfolio");
const zipPath = path.join(root, "Xiang_Chen_Portfolio_Offline.zip");

const TEXT_EXT = new Set([
  ".html",
  ".css",
  ".js",
  ".mjs",
  ".txt",
  ".json",
  ".svg",
  ".xml",
  ".webmanifest",
]);

function run(command, args, env = {}) {
  const result = spawnSync(command, args, {
    cwd: root,
    stdio: "inherit",
    env: { ...process.env, ...env },
    shell: process.platform === "win32",
  });
  if (result.status !== 0) {
    throw new Error(`Command failed: ${command} ${args.join(" ")}`);
  }
}

function walk(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else files.push(full);
  }
  return files;
}

function depthFromSiteRoot(filePath) {
  const rel = path.relative(siteDir, path.dirname(filePath));
  if (!rel || rel === ".") return 0;
  return rel.split(path.sep).filter(Boolean).length;
}

function baseHrefForDepth(depth) {
  if (depth <= 0) return "./";
  return "../".repeat(depth);
}

function rewriteRootAbsolutePaths(content) {
  // CSS url(/fonts/...) → url(fonts/...)
  content = content.replace(/url\(\s*['"]?\//g, (match) =>
    match.replace("/", ""),
  );

  // HTML attrs: href="/x" src="/x" poster="/x" (not protocol-relative //)
  content = content.replace(
    /(\b(?:href|src|poster|action|data-goatcounter)=["'])\/(?!\/)/g,
    "$1",
  );

  // srcset="/images/a.png 1x, /images/b.png 2x"
  content = content.replace(
    /(\bsrcset=["'][^"']*)/gi,
    (chunk) => chunk.replace(/(^|[\s,])\/(?!\/)/g, "$1"),
  );

  // JS/JSON/string literals: "/_next/..." "/images/..." "/guestbook" etc.
  content = content.replace(
    /(["'`])\/(?!\/)(_next|images|fonts|icons|videos|projects|guestbook|resume(?:-cn)?(?:\.pdf)?|favicon\.ico|seo)\b/g,
    "$1$2",
  );

  // Bare Next public paths in quotes that start with /
  content = content.replace(
    /(["'`])\/(projects\/[^"'`]+|guestbook\/?|resume\/?|resume-cn\/?)\b/g,
    "$1$2",
  );

  return content;
}

function normalizeInternalLinks(content) {
  // href="/" → href="index.html"
  content = content.replace(/(\bhref=["'])\/(["'])/g, "$1index.html$2");
  content = content.replace(/(\bhref=["'])\.(["'])/g, "$1index.html$2");

  // After slash-stripping: href="guestbook" / href="guestbook/" /
  // href="projects/en/foo/" → .../index.html
  content = content.replace(
    /(\bhref=["'])((?:projects\/[a-z]{2}\/[a-z0-9-]+|guestbook|resume|resume-cn))\/?(["'])/gi,
    "$1$2/index.html$3",
  );

  // Router strings in JS: "projects/en/foo/" → ensure index.html for file://
  content = content.replace(
    /(["'`])((?:projects\/[a-z]{2}\/[a-z0-9-]+|guestbook|resume|resume-cn))\/(["'`])/gi,
    "$1$2/index.html$3",
  );

  return content;
}

function offlineBootstrap(baseHref) {
  return `<base href="${baseHref}"/><script>(function(){if(location.protocol!=="file:")return;document.addEventListener("click",function(e){var a=e.target&&e.target.closest&&e.target.closest("a[href]");if(!a)return;var href=a.getAttribute("href");if(!href||href.charAt(0)==="#"||/^(https?:|mailto:|tel:)/i.test(href))return;e.preventDefault();e.stopImmediatePropagation();window.location.href=a.href;},true);})();</script>`;
}

function processHtml(filePath, content) {
  const depth = depthFromSiteRoot(filePath);
  const baseHref = baseHrefForDepth(depth);
  content = rewriteRootAbsolutePaths(content);
  content = normalizeInternalLinks(content);

  if (/<base\s/i.test(content)) {
    content = content.replace(/<base\s[^>]*>/i, offlineBootstrap(baseHref));
  } else if (/<head[^>]*>/i.test(content)) {
    content = content.replace(
      /<head([^>]*)>/i,
      `<head$1>${offlineBootstrap(baseHref)}`,
    );
  } else {
    content = offlineBootstrap(baseHref) + content;
  }

  // Strip GoatCounter if any slipped through
  content = content.replace(
    /<script[^>]*gc\.zgo\.at\/count\.js[^>]*>\s*<\/script>/gi,
    "",
  );
  content = content.replace(
    /<script[^>]*data-goatcounter=["'][^"']*["'][^>]*>\s*<\/script>/gi,
    "",
  );

  return content;
}

function processTextAsset(content) {
  content = rewriteRootAbsolutePaths(content);
  content = normalizeInternalLinks(content);
  return content;
}

function writeReadme(targetDir) {
  const readme = `Xiang Chen — Portfolio (Offline Pack)

How to open
1. Unzip Xiang_Chen_Portfolio_Offline.zip
2. Open the folder Xiang_Chen_Portfolio
3. Double-click index.html
4. Use Chrome or Edge (recommended)

Notes
- This pack is fully local. No GitHub Pages or server is required.
- EN/CN toggle, project pages, images, videos, and resume viewers work offline.
- "Leave a note" needs internet (FormSubmit). Other pages do not.
- If a page looks blank, make sure you opened index.html from inside the unzipped folder (do not open files from inside the .zip directly).

Built for offline interview review.
`;
  writeFileSync(path.join(targetDir, "README.txt"), readme, "utf8");
}

function zipSite() {
  if (existsSync(zipPath)) rmSync(zipPath);
  // Zip contents so unzip yields Xiang_Chen_Portfolio/
  const result = spawnSync(
    "zip",
    ["-r", "-q", zipPath, "Xiang_Chen_Portfolio"],
    { cwd: offlineRoot, stdio: "inherit" },
  );
  if (result.status !== 0) {
    throw new Error("zip failed — is the zip CLI available?");
  }
}

function verify() {
  const indexPath = path.join(siteDir, "index.html");
  const html = readFileSync(indexPath, "utf8");
  const problems = [];

  if (!html.includes('<base href="./"/>') && !html.includes('<base href="./">')) {
    problems.push("index.html missing <base href=\"./\"/>");
  }
  if (html.includes('src="/_next/') || html.includes('href="/_next/')) {
    problems.push("index.html still has absolute /_next paths");
  }
  if (html.includes("gc.zgo.at")) {
    problems.push("GoatCounter script still present");
  }
  if (!existsSync(path.join(siteDir, "_next"))) {
    problems.push("missing _next assets");
  }
  if (!existsSync(path.join(siteDir, "images"))) {
    problems.push("missing images/");
  }
  if (!existsSync(path.join(siteDir, "projects"))) {
    problems.push("missing projects/");
  }

  // Spot-check a nested page
  const nested = path.join(
    siteDir,
    "projects/en/reddit-growth-os/index.html",
  );
  if (existsSync(nested)) {
    const nestedHtml = readFileSync(nested, "utf8");
    if (!nestedHtml.includes('<base href="../../../"')) {
      problems.push("nested project page missing correct <base href>");
    }
    if (nestedHtml.includes('src="/_next/') || nestedHtml.includes('href="/images/')) {
      problems.push("nested page still has root-absolute asset paths");
    }
  } else {
    problems.push("missing sample project page projects/en/reddit-growth-os/");
  }

  // Ensure no HTML file retains root-absolute _next refs
  const htmlFiles = walk(siteDir).filter((f) => f.endsWith(".html"));
  for (const file of htmlFiles) {
    const text = readFileSync(file, "utf8");
    if (text.includes('="/_next/') || text.includes("='/_next/") || text.includes('href="/_next/') || text.includes('src="/_next/')) {
      problems.push(`absolute /_next left in ${path.relative(siteDir, file)}`);
      break;
    }
  }

  return problems;
}

function main() {
  console.log("→ Building Next.js static export (OFFLINE)…");
  run("npm", ["run", "build"], { NEXT_PUBLIC_OFFLINE: "1" });

  console.log("→ Preparing offline-dist…");
  rmSync(offlineRoot, { recursive: true, force: true });
  mkdirSync(offlineRoot, { recursive: true });
  cpSync(outDir, siteDir, { recursive: true });
  writeReadme(siteDir);

  console.log("→ Rewriting paths for file:// …");
  const files = walk(siteDir);
  let rewritten = 0;
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!TEXT_EXT.has(ext)) continue;
    const original = readFileSync(file, "utf8");
    let next = original;
    if (ext === ".html") next = processHtml(file, original);
    else next = processTextAsset(original);
    if (next !== original) {
      writeFileSync(file, next, "utf8");
      rewritten += 1;
    }
  }
  console.log(`  updated ${rewritten} text assets`);

  console.log("→ Creating ZIP…");
  zipSite();

  const problems = verify();
  if (problems.length) {
    console.error("Verification failed:");
    for (const p of problems) console.error(" -", p);
    process.exit(1);
  }

  const zipStat = statSync(zipPath);
  console.log("");
  console.log("Done.");
  console.log(`  Folder: ${siteDir}`);
  console.log(`  ZIP:    ${zipPath}`);
  console.log(`  Size:   ${(zipStat.size / (1024 * 1024)).toFixed(1)} MB`);
  console.log("  Open:   unzip, then double-click Xiang_Chen_Portfolio/index.html");
}

main();
