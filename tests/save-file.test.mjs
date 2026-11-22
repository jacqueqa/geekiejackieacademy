// The hidden progress block of the "My work" .md (SAVE-FILE block of index.html), used by "Import progress".
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { load } from './load.mjs';

const G = load(['SAVE-FILE'], ['saveBlock', 'readSaveBlock', 'cleanSave', 'saveSummary'], { btoa, atob, TextEncoder, TextDecoder });
const plain = v => JSON.parse(JSON.stringify(v));
const fresh = () => ({ grimoireTrack: null, badges: {}, days: {}, visited: {}, run: 0, bestRun: 0, logic: {}, folds: {}, name: '', avatar: null, current: null, lastByModule: {}, done: {}, hints: {}, solutions: {}, revealed: {}, fails: {}, code: {}, term: {} });

const STATE = {
  ...fresh(),
  name: 'Luna Estrela-d’Água ✨', avatar: 4, current: 'st35', bestRun: 6, run: 2,
  done: { st01: true, st02: true }, hints: { st02: 2 }, fails: { st02: 1 },
  badges: { 'first-access': '2026-11-20', intern: '2026-11-20' }, days: { '2026-11-20': 2 },
  code: { alg01: 'function f(a) {\n  return a --> 0; // "-->" would end an HTML comment\n}' },
  logic: { st03: { order: [2, 0, 1], touched: true } },
};
const report = '# Geekie Jackie Academy · Luna\n\nExportado em 2026-11-22.\n\n- [x] **O caminho do pedido**\n';

test('export then import gives back exactly the same progress', () => {
  const md = report + '\n' + G.saveBlock(STATE, '2026-11-22');
  const res = plain(G.readSaveBlock(md));
  assert.equal(res.ok, true);
  assert.equal(res.exported, '2026-11-22');
  assert.deepEqual(res.state, plain(STATE));
});

test('the block is an HTML comment that the code inside cannot close early', () => {
  const block = G.saveBlock(STATE, '2026-11-22');
  assert.ok(block.startsWith('<!-- geekie-jackie-save v1\n'));
  assert.equal(block.match(/-->/g).length, 1, 'only the closing -->');
  assert.ok(block.split('\n').every(l => l.length <= 160), 'short lines');
});

test('Windows line endings and extra text around the block still work', () => {
  const md = (report + '\n' + G.saveBlock(STATE, '2026-11-22') + '\nNotes I added later.\n').replace(/\n/g, '\r\n');
  const res = plain(G.readSaveBlock(md));
  assert.equal(res.ok, true);
  assert.deepEqual(res.state, plain(STATE));
});

test('a file without the block, a damaged block and a newer version are refused', () => {
  assert.equal(G.readSaveBlock(report).error, 'none');
  assert.equal(G.readSaveBlock('').error, 'none');
  const block = G.saveBlock(STATE, '2026-11-22');
  const lines = block.split('\n');
  lines[3] = lines[3].slice(0, 10) + 'AAAA' + lines[3].slice(14); // flip some characters
  assert.equal(G.readSaveBlock(lines.join('\n')).error, 'bad');
  assert.equal(G.readSaveBlock(block.replace('save v1', 'save v2')).error, 'newer');
  const other = '<!-- geekie-jackie-save v1\n' + btoa(JSON.stringify({ app: 'something-else', v: 1, state: {} })) + '\n-->';
  assert.equal(G.readSaveBlock(other).error, 'bad');
});

test('cleanSave keeps only known fields with the right types', () => {
  const raw = { ...plain(STATE), done: ['st01'], run: 'lots', name: 'x'.repeat(60), avatar: '3', hacked: { admin: true }, badges: null };
  const out = plain(G.cleanSave(raw, fresh()));
  assert.deepEqual(out.done, {}, 'an array is not a valid done map');
  assert.equal(out.run, 0);
  assert.equal(out.name.length, 40);
  assert.equal(out.avatar, '3', 'kept: validAvatar() checks it when drawing');
  assert.equal(out.hacked, undefined);
  assert.deepEqual(out.badges, {});
  assert.deepEqual(out.hints, { st02: 2 });
  assert.deepEqual(Object.keys(out).sort(), Object.keys(fresh()).sort());
});

test('the summary counts exercises done and badges', () => {
  assert.deepEqual(plain(G.saveSummary(STATE)), { name: 'Luna Estrela-d’Água ✨', done: 2, badges: 2 });
  assert.deepEqual(plain(G.saveSummary({})), { name: '', done: 0, badges: 0 });
});
