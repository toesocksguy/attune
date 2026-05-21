#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, '..');
const SRC = resolve(ROOT, 'attune-cards.md');
const OUT = resolve(ROOT, 'data/cards.ts');

const NAME_TO_SLUG = {
  Warmup: 'warmup',
  Connection: 'connection',
  Depth: 'depth',
  Intimacy: 'intimacy',
  Challenges: 'challenges',
  Spicy: 'spicy',
};

const TYPE_TO_CANON = {
  Questions: 'question',
  Activities: 'activity',
  Dares: 'dare',
};

const EXPECTED = {
  warmup: { total: 30, type: 'question', level: 1 },
  connection: { total: 40, type: 'question', level: 2 },
  depth: { total: 40, type: 'question', level: 3 },
  intimacy: { total: 30, type: 'question', level: 4 },
  challenges: { total: 30, type: 'activity', level: 5 },
  spicy: { total: 30, type: 'dare', level: 6 },
};

const HEADING_RE = /^##\s+(?:\S+\s+)?(.+?)\s*$/;
const META_RE = /^\*(\d+)\s+cards\s*·\s*Type:\s*(\w+)\s*·\s*Level\s*(\d+)\*$/;
const CARD_RE = /^(\d+)\.\s+(.+?)\s*$/;
const STOP_RE = /^##\s+Summary/;

function fail(msg) {
  console.error(`generate-cards: ${msg}`);
  process.exit(1);
}

async function main() {
  const md = await readFile(SRC, 'utf8');
  const lines = md.split('\n');

  const cards = [];
  const seenSlugs = new Set();
  let current = null;
  let categoryCardCount = 0;

  const flushCategory = () => {
    if (!current) return;
    const expected = EXPECTED[current.slug];
    if (categoryCardCount !== expected.total) {
      fail(
        `category ${current.slug}: expected ${expected.total} cards, got ${categoryCardCount}`,
      );
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (STOP_RE.test(line)) break;

    const heading = line.match(HEADING_RE);
    if (heading && line.startsWith('## ')) {
      const name = heading[1].trim();
      const slug = NAME_TO_SLUG[name];
      if (!slug) continue;
      flushCategory();
      if (seenSlugs.has(slug)) fail(`duplicate category section: ${slug}`);
      seenSlugs.add(slug);

      let metaLine = '';
      for (let j = i + 1; j < lines.length; j++) {
        if (lines[j].trim() === '') continue;
        metaLine = lines[j].trim();
        break;
      }
      const meta = metaLine.match(META_RE);
      if (!meta) fail(`category ${slug}: missing or malformed meta line`);
      const declaredTotal = Number(meta[1]);
      const declaredType = TYPE_TO_CANON[meta[2]];
      const declaredLevel = Number(meta[3]);
      const expected = EXPECTED[slug];
      if (declaredTotal !== expected.total) {
        fail(`${slug}: meta total ${declaredTotal} != expected ${expected.total}`);
      }
      if (declaredType !== expected.type) {
        fail(`${slug}: meta type ${meta[2]} -> ${declaredType} != expected ${expected.type}`);
      }
      if (declaredLevel !== expected.level) {
        fail(`${slug}: meta level ${declaredLevel} != expected ${expected.level}`);
      }
      current = { slug, type: expected.type, level: expected.level };
      categoryCardCount = 0;
      continue;
    }

    const card = line.match(CARD_RE);
    if (card && current) {
      const localIndex = Number(card[1]);
      const text = card[2].trim();
      if (text.length === 0) fail(`${current.slug} #${localIndex}: empty text`);
      categoryCardCount += 1;
      if (localIndex !== categoryCardCount) {
        fail(
          `${current.slug}: out-of-order numbering at local index ${localIndex} (expected ${categoryCardCount})`,
        );
      }
      cards.push({
        id: cards.length + 1,
        category: current.slug,
        type: current.type,
        level: current.level,
        text,
      });
    }
  }
  flushCategory();

  if (seenSlugs.size !== Object.keys(EXPECTED).length) {
    const missing = Object.keys(EXPECTED).filter((s) => !seenSlugs.has(s));
    fail(`missing category sections: ${missing.join(', ')}`);
  }

  const expectedTotal = Object.values(EXPECTED).reduce((s, c) => s + c.total, 0);
  if (cards.length !== expectedTotal) {
    fail(`total card count ${cards.length} != expected ${expectedTotal}`);
  }

  const ids = new Set(cards.map((c) => c.id));
  if (ids.size !== cards.length) fail('duplicate card IDs');

  const escape = (s) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  const body = cards
    .map(
      (c) =>
        `  { id: ${c.id}, category: '${c.category}', type: '${c.type}', level: ${c.level}, text: '${escape(c.text)}' },`,
    )
    .join('\n');

  const out = `// GENERATED FILE — do not edit by hand.
// Source: attune-cards.md
// Regenerate with: npm run generate:cards

import type { Card } from './types';

export const CARDS: readonly Card[] = [
${body}
];
`;

  await writeFile(OUT, out, 'utf8');
  console.log(`generate-cards: wrote ${cards.length} cards to ${OUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
