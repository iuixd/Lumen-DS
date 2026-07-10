// One-time-per-batch helper for the Lumen-DS-2027 bulk icon library (canvas
// node 432:14782, ~51 category frames, ~1,900 icons — see docs/figma-sync.md
// "Icons" source 3). Figma's download_assets only exports a whole node at
// once, and exporting 1,900 icons individually isn't practical, so instead
// this exports one combined SVG per *category* frame (each icon rendered as
// a `<g id="{icon-name}">` sibling inside it) and splits that apart locally.
//
// Input:
//   --manifest <path>   JSON: [{ id, name, icons: [{ id, name, x, y, w, h }] }]
//                        (name = final kebab-case icon name; x/y/w/h = the
//                        icon's position within its category frame, i.e. the
//                        same coordinate space the category SVG export uses)
//   --svg-dir <path>    directory of raw category exports, one file per
//                        category named "{categoryId with : replaced by -}.svg"
// Output: writes packages/ui/src/icons/svg/{icon-name}.svg — each one just
//   the extracted `<g>` for that icon, wrapped in a 0 0 {w} {h} viewBox and
//   translated so the icon's own bounding box becomes the origin. Colors are
//   left as authored (untouched) — icons-import.mjs's existing recolor pass
//   handles currentColor normalization for every source uniformly.
//
// Usage: node scripts/icons-bulk-split.mjs --manifest manifest.json --svg-dir ./raw
// Then run the usual `pnpm --filter @lumen/ui icons:import`.

import { readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, "../src/icons/svg");

function arg(name) {
  const i = process.argv.indexOf(name);
  return i === -1 ? undefined : process.argv[i + 1];
}

function escapeAttr(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Non-greedy `<g id="X">...</g>` regexes can't be trusted here: several
// icons (multi-path brand logos especially) nest their own `<g>` children
// (e.g. `<g id="DownloadFilled"><g id="Group">...</g></g>`), which would
// make a naive match stop at the first inner `</g>` and truncate the icon.
// This scans forward counting open/close tags so nesting of any depth
// resolves to the correctly balanced slice.
function extractBalancedGroup(svgText, iconName) {
  // Some icons (e.g. ones Figma auto-added a clip-path to) have extra
  // attributes on their own <g> beyond just id — match those too, not just
  // the exact `<g id="X">` shape.
  const openTagRe = new RegExp(`<g id="${escapeAttr(iconName)}"[^>]*>`);
  const openMatch = svgText.match(openTagRe);
  if (!openMatch) return null;
  const contentStart = openMatch.index + openMatch[0].length;
  const tagRe = /<g(?:\s[^>]*)?>|<\/g>/g;
  tagRe.lastIndex = contentStart;
  let depth = 1;
  let match;
  while ((match = tagRe.exec(svgText))) {
    depth += match[0] === "</g>" ? -1 : 1;
    if (depth === 0) {
      return svgText.slice(contentStart, match.index);
    }
  }
  return null;
}

async function main() {
  const manifestPath = arg("--manifest");
  const svgDir = arg("--svg-dir");
  if (!manifestPath || !svgDir) {
    console.error("Usage: node icons-bulk-split.mjs --manifest <path> --svg-dir <path>");
    process.exit(1);
  }

  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  let written = 0;
  let skipped = 0;
  const failures = [];

  for (const category of manifest) {
    const svgFile = join(svgDir, `${category.id.replace(":", "-")}.svg`);
    let categorySvg;
    try {
      categorySvg = await readFile(svgFile, "utf8");
    } catch {
      failures.push(`${category.name}: missing export file ${svgFile}`);
      continue;
    }

    for (const icon of category.icons) {
      if (icon.skip) {
        skipped++;
        continue;
      }
      const inner = extractBalancedGroup(categorySvg, icon.rawName ?? icon.name);
      if (inner === null) {
        failures.push(`${category.name} / ${icon.name}: group not found or unbalanced in ${svgFile}`);
        continue;
      }
      const wrapped = `<svg viewBox="0 0 ${icon.w} ${icon.h}" fill="none" xmlns="http://www.w3.org/2000/svg"><g transform="translate(${-icon.x} ${-icon.y})">${inner}</g></svg>\n`;
      await writeFile(join(outDir, `${icon.name}.svg`), wrapped);
      written++;
    }
  }

  console.log(`icons-bulk-split: wrote ${written} icon svgs, skipped ${skipped}, ${failures.length} failures`);
  for (const f of failures) console.error(`  FAILED: ${f}`);
  if (failures.length > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
