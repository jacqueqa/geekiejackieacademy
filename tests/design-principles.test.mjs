// The code design principles page: the data in design-principles.js.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import { load } from './load.mjs';

const G = load(['file:design-principles.js'], ['DESIGN_PRINCIPLES']);
const LIST = G.DESIGN_PRINCIPLES;
const TRACKS = ['start', 'dev', 'qa', 'ai'];
const asset = p => existsSync(fileURLToPath(new URL('../' + p, import.meta.url)));
const HTML = readFileSync(fileURLToPath(new URL('../index.html', import.meta.url)), 'utf8');
const filled = v => typeof v === 'string' && v.trim().length > 0;
// The code must be valid JavaScript (it is compiled, never run).
const compiles = (code, where) => assert.doesNotThrow(() => new vm.Script(code), where + ' is not valid JavaScript');

test('the four principles of the map, in order', () => {
  assert.deepEqual(JSON.parse(JSON.stringify(LIST.map(p => p.id))), ['solid', 'dry', 'kiss', 'yagni']);
  assert.equal(new Set(LIST.map(p => p.id)).size, LIST.length);
});

test('every principle has its texts in both languages, an image and a colour', () => {
  for (const p of LIST) {
    for (const f of ['name', 'full', 'title', 'summary', 'why', 'smell']) assert.ok(filled(p[f]), p.id + ': ' + f);
    for (const f of ['title', 'summary', 'why', 'smell']) assert.ok(filled(p.en && p.en[f]), p.id + ': en.' + f);
    assert.match(p.color, /^#[0-9A-Fa-f]{6}$/, p.id + ': color');
    assert.ok(asset(p.image), p.id + ': ' + p.image + ' exists');
    (p.tracks || []).forEach(tr => assert.ok(TRACKS.includes(tr), p.id + ': track ' + tr));
  }
});

test('every example compiles, in both languages, and before differs from after', () => {
  for (const p of LIST) {
    const examples = p.parts ? p.parts.map(x => [p.id + ' ' + x.letter, x]) : [[p.id, p]];
    for (const [where, x] of examples) {
      for (const lang of ['pt', 'en']) {
        const src = lang === 'pt' ? x : x.en;
        assert.ok(filled(src.before) && filled(src.after), where + ' (' + lang + ') has before and after');
        compiles(src.before, where + ' before (' + lang + ')');
        compiles(src.after, where + ' after (' + lang + ')');
        assert.notEqual(src.before, src.after, where + ' (' + lang + ')');
      }
    }
  }
});

test('SOLID has its five letters, each with texts in both languages', () => {
  const solid = LIST.find(p => p.id === 'solid');
  assert.equal(solid.parts.map(x => x.letter).join(''), 'SOLID');
  for (const x of solid.parts) {
    assert.ok(filled(x.title) && filled(x.full) && filled(x.summary), x.letter);
    assert.ok(filled(x.en.title) && filled(x.en.summary), x.letter + ' en');
  }
});

test('the shop rules cited exist in the Rulebook', () => {
  const cited = new Set(LIST.flatMap(p => (p.rules || []).concat(...(p.parts || []).map(x => x.rules || []))));
  assert.ok(cited.size > 0);
  for (const r of cited) assert.ok(HTML.includes("id: '" + r + "'"), r + ' is in the Rulebook');
});
