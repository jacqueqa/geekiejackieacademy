// Git, Front End and Data tracks (new-tracks.js): structure, code exercises against their tests, logic exercises checked.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { load, workerRunner } from './load.mjs';

const EN = (en, pt) => en, PT = (en, pt) => pt;
const G = load(['file:new-tracks.js', 'LOGIC-CHECK'], ['buildGitTrack', 'buildFrontendTrack', 'buildDataTrack', 'logicCheck', 'logicSolution', 'logicInitial']);
const SHARED = { FORK_URL: 'https://github.com/<you>/geekiejackieacademy', FORK_PATTERN: 'x', FORK_NOTE: 'fork it' };
const plain = v => JSON.parse(JSON.stringify(v));
const run = workerRunner();
const asset = p => existsSync(fileURLToPath(new URL('../' + p, import.meta.url)));
const TRACKS = { git: G.buildGitTrack, frontend: G.buildFrontendTrack, data: G.buildDataTrack };

for (const [modId, build] of Object.entries(TRACKS)) {
  const en = build(EN, SHARED), pt = build(PT, SHARED);

  test(modId + ': module, ranks, Git and levels', () => {
    assert.equal(en.module.id, modId);
    assert.ok(asset(en.module.image), en.module.image + ' exists');
    assert.equal(en.ranks.length, 5);
    assert.equal(en.ranks[0].at, 0);
    for (const f of ['repo', 'url', 'folder', 'pullWhy', 'pullFile', 'task', 'branch', 'branchNote', 'file', 'commitMsg', 'commitNote']) assert.ok(en.git[f], 'git.' + f);
    assert.match(en.git.branch, /^feature\/\d+_/);
    assert.ok(en.levels.every(l => l.module === modId));
    // only the Git track has the "Get the code" level (its terminal exercises are made in index.html)
    assert.equal(en.levels.filter(l => l.git).length, modId === 'git' ? 1 : 0, 'Git level');
    for (const l of en.levels.filter(l => !l.git)) assert.ok(en.exercises.some(e => e.level === l.id), 'level ' + l.id + ' has exercises');
  });

  test(modId + ': ids are unique and both languages have the same exercises', () => {
    assert.equal(new Set(en.exercises.map(e => e.id)).size, en.exercises.length);
    assert.deepEqual(plain(pt.exercises.map(e => e.id)), plain(en.exercises.map(e => e.id)));
    for (const lang of [en, pt]) for (const e of lang.exercises) {
      for (const f of ['title', 'tag', 'story', 'what', 'why', 'task']) assert.ok(e[f] && String(e[f]).trim(), e.id + ' has ' + f);
      assert.ok(e.xp > 0, e.id);
    }
  });

  for (const e of en.exercises.filter(x => x.type === 'logic')) {
    test(modId + ' ' + e.id + ' ' + e.kind + ': the right answer passes, the start fails', () => {
      const right = G.logicCheck(e, G.logicSolution(e));
      assert.equal(right.ok, true, JSON.stringify(plain(right.marks)));
      assert.equal(G.logicCheck(e, G.logicInitial(e)).ok, false);
      assert.ok(e.hints.length >= 1 && e.ok, e.id + ' has hints and an ok message');
    });
  }
  for (const e of en.exercises.filter(x => x.type !== 'logic')) {
    test(modId + ' ' + e.id + ' ' + e.fn + ': the solution passes every test, the starter fails', async () => {
      for (const f of ['fn', 'concept', 'sample', 'starter', 'solution', 'hint']) assert.ok(e[f], e.id + ' has ' + f);
      assert.ok(e.tests.length >= 2, e.id + ' has tests');
      const res = await run({ code: e.solution, fnName: e.fn, tests: e.tests, expectStyle: 'chai', msgs: {} });
      assert.equal(res.error, undefined, res.error);
      res.results.forEach((r, i) => assert.ok(r.pass, e.tests[i].name + ' expected ' + r.expected + ', got ' + r.actual + (r.error ? ' (' + r.error + ')' : '')));
      const start = await run({ code: e.starter, fnName: e.fn, tests: e.tests, expectStyle: 'chai', msgs: {} });
      assert.ok(start.error || start.results.some(r => !r.pass), 'the starter must not pass all tests');
    });
  }
}

test('the new tracks don’t reuse level or exercise ids', () => {
  const all = Object.values(TRACKS).map(b => b(EN, SHARED));
  const levelIds = all.flatMap(t => t.levels.map(l => l.id));
  const exIds = all.flatMap(t => t.exercises.map(e => e.id));
  assert.equal(new Set(exIds).size, exIds.length, 'exercise ids are unique across the tracks');
  assert.equal(new Set(levelIds).size, levelIds.length);
  for (const id of levelIds) assert.ok(![1, 2, 31, 32, 41, 42, 101, 102, 103, 201, 202, 203, 204].includes(id) && !(id >= 301 && id <= 309), 'level ' + id + ' is free');
});
