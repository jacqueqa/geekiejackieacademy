// The 80% rule: DEV, QA and AI open after 80% of the Start Track, or earlier if the learner confirms they want to start.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { load } from './load.mjs';

const { startTrackProgress, canAccessTrack, countsForUnlock, UNLOCK_PERCENT } =
  load(['ACCESS-RULES'], ['startTrackProgress', 'canAccessTrack', 'countsForUnlock', 'UNLOCK_PERCENT']);

const START = Array.from({ length: 30 }, (_, i) => ({ id: 's' + String(i + 1).padStart(2, '0') }));
const DEV = { id: 'dev', requires: 'start' };
const STARTMOD = { id: 'start' };

// A learner who solved the first n exercises on their own (and, optionally, more with the solution).
function learner(n, withSolution = 0) {
  const st = { done: {}, solutions: {} };
  START.slice(0, n).forEach(ex => { st.done[ex.id] = true; });
  START.slice(n, n + withSolution).forEach(ex => { st.done[ex.id] = true; st.solutions[ex.id] = true; });
  return st;
}

test('the unlock threshold is 80%', () => {
  assert.equal(UNLOCK_PERCENT, 80);
  assert.equal(startTrackProgress(START, learner(0)).required, 24);
});

test('percent of progress', () => {
  assert.equal(startTrackProgress(START, learner(0)).percent, 0);
  assert.equal(startTrackProgress(START, learner(3)).percent, 10);
  assert.equal(startTrackProgress(START, learner(15)).percent, 50);
  assert.equal(startTrackProgress(START, learner(23)).percent, 76); // rounded down: never shows 80% too early
  assert.equal(startTrackProgress(START, learner(24)).percent, 80);
  assert.equal(startTrackProgress(START, learner(30)).percent, 100);
});

test('missing exercises are counted', () => {
  assert.equal(startTrackProgress(START, learner(0)).missing, 24);
  assert.equal(startTrackProgress(START, learner(20)).missing, 4);
  assert.equal(startTrackProgress(START, learner(29)).missing, 0);
});

test('DEV, QA and AI are locked below 80%', () => {
  for (const n of [0, 1, 12, 20, 23]) {
    const p = startTrackProgress(START, learner(n));
    assert.equal(p.unlocked, false, n + ' done');
    assert.equal(canAccessTrack(DEV, p), false, n + ' done');
  }
});

test('they unlock at exactly 24 of 30', () => {
  const p = startTrackProgress(START, learner(24));
  assert.equal(p.done, 24);
  assert.equal(p.unlocked, true);
  assert.equal(canAccessTrack(DEV, p), true);
  assert.equal(canAccessTrack(DEV, startTrackProgress(START, learner(30))), true);
});

test('a learner who chose to start early can open the track below 80%', () => {
  const p = startTrackProgress(START, learner(3));
  assert.equal(canAccessTrack(DEV, p), false, 'no choice yet');
  assert.equal(canAccessTrack(DEV, p, false), false);
  assert.equal(canAccessTrack(DEV, p, true), true, 'chose to start early');
  assert.equal(p.unlocked, false, 'the 80% rule itself does not change');
});

test('the Start Track itself is always open', () => {
  assert.equal(canAccessTrack(STARTMOD, startTrackProgress(START, learner(0))), true);
});

test('exercises solved with the revealed solution do not count', () => {
  assert.equal(countsForUnlock(START[0], { done: { s01: true }, solutions: { s01: true } }), false);
  const p = startTrackProgress(START, learner(20, 10)); // 20 alone + 10 with the solution
  assert.equal(p.done, 20);
  assert.equal(p.unlocked, false);
});

test('reinforcement exercises count like the main ones', () => {
  const st = { done: {}, solutions: {} };
  START.slice(6).forEach(ex => { st.done[ex.id] = true; }); // s07..s30: 14 main + 10 reinforcement = 24
  assert.equal(startTrackProgress(START, st).unlocked, true);
});

test('an empty Start Track never unlocks anything', () => {
  assert.equal(startTrackProgress([], { done: {}, solutions: {} }).unlocked, false);
});
