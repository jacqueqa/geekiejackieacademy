// DEV · Algorithm challenges (the 30 JavaScript exercises): structure, reference solution against its tests, starter code that fails.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { load, workerRunner } from './load.mjs';

const L = (en, pt) => en; // English texts are enough to check the content
const { buildAlgoChallenges } = load(['ALGO-CHALLENGES'], ['buildAlgoChallenges']);
const { levels, exercises } = buildAlgoChallenges(L);
const run = workerRunner();
const EXPECTED_TOTAL = 30;
const byId = id => exercises.find(e => e.id === id);

// Marked as "todo" while the track is still being written, a normal test once it has every exercise.
const writing = exercises.length < EXPECTED_TOTAL ? 'only ' + exercises.length + ' written so far' : false;
test('there are ' + EXPECTED_TOTAL + ' challenges: 20 main and 10 reinforcement, all in DEV', { todo: writing }, () => {
  assert.ok(levels.every(l => l.module === 'dev'));
  assert.equal(exercises.length, EXPECTED_TOTAL);
  assert.equal(exercises.filter(e => e.kind === 'main').length, 20);
  assert.equal(exercises.filter(e => e.kind === 'reinforcement').length, 10);
});

test('ids and order are unique and in sequence', () => {
  exercises.forEach((e, i) => {
    assert.equal(e.order, i + 1, e.id);
    assert.equal(e.id, 'alg' + String(i + 1).padStart(2, '0'));
  });
  assert.equal(new Set(exercises.map(e => e.fn)).size, exercises.length, 'every function name is different');
});

test('every exercise has the required fields', () => {
  for (const e of exercises) {
    for (const f of ['title', 'tag', 'conceptTag', 'hr', 'fn', 'story', 'what', 'why', 'task', 'concept', 'sample', 'starter', 'solution']) {
      assert.ok(e[f] && String(e[f]).trim(), e.id + ' has ' + f);
    }
    assert.ok(levels.some(l => l.id === e.level), e.id + ' is in a challenges level');
    assert.ok(e.examples.length >= 2 && e.examples.length <= 3, e.id + ' has 2 to 3 examples');
    assert.ok(e.hints.length >= 1 && e.hints.length <= 3, e.id + ' has 1 to 3 hints');
    assert.ok(e.tests.some(t => !t.hidden), e.id + ' has visible tests');
    assert.ok(e.tests.some(t => t.hidden), e.id + ' has hidden tests');
    assert.ok(e.xp > 0, e.id + ' gives XP');
  }
});

test('reinforcement exercises point to existing main exercises', () => {
  for (const e of exercises.filter(x => x.kind === 'reinforcement')) {
    assert.ok(e.reinforces && e.reinforces.length, e.id + ' says what it reinforces');
    for (const id of e.reinforces) {
      assert.ok(byId(id), e.id + ' reinforces ' + id);
      assert.equal(byId(id).kind, 'main', e.id + ' reinforces a main exercise');
    }
  }
  for (const e of exercises.filter(x => x.kind === 'main')) assert.equal(e.reinforces, null, e.id);
});

test('XP never goes down along the main exercises', () => {
  const main = exercises.filter(e => e.kind === 'main');
  main.slice(1).forEach((e, i) => assert.ok(e.xp >= main[i].xp, e.id + ' gives at least as much XP as ' + main[i].id));
});

for (const e of exercises) {
  test(e.id + ' ' + e.fn + ': the reference solution passes every test (visible and hidden)', async () => {
    const res = await run({ code: e.solution, fnName: e.fn, tests: e.tests, expectStyle: 'chai', msgs: {} });
    assert.equal(res.error, undefined, res.error);
    res.results.forEach((r, i) => assert.ok(r.pass, e.tests[i].name + ' expected ' + r.expected + ', got ' + r.actual + (r.error ? ' (' + r.error + ')' : '')));
  });
  test(e.id + ' ' + e.fn + ': the starter code fails', async () => {
    const res = await run({ code: e.starter, fnName: e.fn, tests: e.tests, expectStyle: 'chai', msgs: {} });
    assert.ok(res.error || res.results.some(r => !r.pass), 'the starter must not pass all tests');
  });
}
