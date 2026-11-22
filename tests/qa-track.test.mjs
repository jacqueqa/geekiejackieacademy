// QA track (qa-track.js): module order, texts in both languages, every logic exercise checked.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { load } from './load.mjs';

const EN = (en, pt) => en, PT = (en, pt) => pt;
const G = load(['file:qa-track.js', 'LOGIC-CHECK'], ['buildQaTrack', 'QA_LEVEL_ORDER', 'logicCheck', 'logicSolution', 'logicInitial']);
const plain = v => JSON.parse(JSON.stringify(v));
const en = G.buildQaTrack(EN), pt = G.buildQaTrack(PT);

test('the QA modules keep their order, with the two existing levels as modules 04 and 07', () => {
  const order = plain(G.QA_LEVEL_ORDER);
  assert.equal(order.length, 8);
  assert.equal(order.indexOf(32), 3, '“Hunt the Bugs” (32) is module 04');
  assert.equal(order.indexOf(31), 6, '“The Quality Spell” (31) is module 07');
  for (const l of en.levels) {
    assert.ok(order.includes(l.id), 'level ' + l.id + ' has a place in the order');
    assert.equal(l.module, 'qa');
    assert.ok(en.exercises.some(e => e.level === l.id), 'level ' + l.id + ' has exercises');
  }
});

test('ids are unique and both languages have the same exercises and texts', () => {
  assert.equal(new Set(en.exercises.map(e => e.id)).size, en.exercises.length);
  assert.deepEqual(plain(pt.exercises.map(e => e.id)), plain(en.exercises.map(e => e.id)));
  pt.levels.forEach((l, i) => assert.notEqual(l.name, en.levels[i].name, 'level ' + l.id + ' is translated'));
  for (const lang of [en, pt]) for (const e of lang.exercises) {
    for (const f of ['title', 'tag', 'story', 'what', 'why', 'task', 'ok']) assert.ok(e[f] && String(e[f]).trim(), e.id + ' has ' + f);
    assert.ok(e.hints.length >= 1, e.id + ' has a hint');
    assert.ok(e.xp > 0, e.id);
  }
});

for (const e of en.exercises) {
  test('QA ' + e.id + ' ' + e.kind + ': the right answer passes, the start fails', () => {
    const right = G.logicCheck(e, G.logicSolution(e));
    assert.equal(right.ok, true, JSON.stringify(plain(right.marks)));
    assert.equal(G.logicCheck(e, G.logicInitial(e)).ok, false);
  });
}
