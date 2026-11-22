// AI track (ai-track.js): module order, texts in both languages, every logic exercise checked.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { load } from './load.mjs';

const EN = (en, pt) => en, PT = (en, pt) => pt;
const G = load(['file:ai-track.js', 'LOGIC-CHECK'], ['buildAiTrack', 'AI_LEVEL_ORDER', 'logicCheck', 'logicSolution', 'logicInitial']);
const plain = v => JSON.parse(JSON.stringify(v));
const en = G.buildAiTrack(EN), pt = G.buildAiTrack(PT);

test('the AI modules keep their order, with the two existing levels as modules 02 and 03', () => {
  const order = plain(G.AI_LEVEL_ORDER);
  assert.equal(order.length, 7);
  assert.equal(order.indexOf(41), 1, '“Ask the Oracle” (41) is module 02');
  assert.equal(order.indexOf(42), 2, '“Spot the Hallucination” (42) is module 03');
  for (const l of en.levels) {
    assert.ok(order.includes(l.id), 'level ' + l.id + ' has a place in the order');
    assert.equal(l.module, 'ai');
  }
  for (const e of en.exercises) assert.ok(order.includes(e.level), e.id + ' is in an AI level');
});

test('the CRAFT exercise has the five letters, in both languages', () => {
  for (const lang of [en, pt]) {
    const craft = lang.exercises.find(e => e.tag === 'CRAFT' && e.kind === 'match');
    assert.equal(craft.right.length, 5);
    assert.equal(plain(craft.right.map(r => r.charAt(0))).sort().join(''), 'ACFRT');
  }
});

test('ids are unique and both languages have the same exercises and texts', () => {
  assert.equal(new Set(en.exercises.map(e => e.id)).size, en.exercises.length);
  assert.ok(en.exercises.every(e => /^ai\d{2}$/.test(e.id)), 'ids look like ai01 (index.html relies on it)');
  assert.deepEqual(plain(pt.exercises.map(e => e.id)), plain(en.exercises.map(e => e.id)));
  pt.levels.forEach((l, i) => assert.notEqual(l.name, en.levels[i].name, 'level ' + l.id + ' is translated'));
  for (const lang of [en, pt]) for (const e of lang.exercises) {
    for (const f of ['title', 'tag', 'story', 'what', 'why', 'task', 'ok']) assert.ok(e[f] && String(e[f]).trim(), e.id + ' has ' + f);
    assert.ok(e.hints.length >= 1, e.id + ' has a hint');
  }
});

for (const e of en.exercises) {
  test('AI ' + e.id + ' ' + e.kind + ': the right answer passes, the start fails', () => {
    const right = G.logicCheck(e, G.logicSolution(e));
    assert.equal(right.ok, true, JSON.stringify(plain(right.marks)));
    assert.equal(G.logicCheck(e, G.logicInitial(e)).ok, false);
  });
}
