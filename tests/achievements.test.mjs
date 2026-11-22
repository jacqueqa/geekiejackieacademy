// The badges of the Achievements page (ACHIEVEMENTS block of index.html).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { load } from './load.mjs';

const EN = (en, pt) => en, PT = (en, pt) => pt;
const G = load(['ACHIEVEMENTS'], ['buildAchievements', 'achievementFacts', 'earnedAchievements', 'academyTitle', 'longestStreak', 'dayKey']);
const plain = v => JSON.parse(JSON.stringify(v));
const builds = { en: G.buildAchievements(EN), pt: G.buildAchievements(PT) };
const { list, groups } = builds.en;
const asset = p => existsSync(fileURLToPath(new URL('../' + p, import.meta.url)));

// A tiny academy: a Start Track with one level, and DEV with a Git level and a normal level.
const LEVELS = [
  { id: 301, module: 'start' },
  { id: 101, module: 'dev', git: true },
  { id: 1, module: 'dev' },
];
const EXERCISES = [
  { id: 's1', level: 301, xp: 10 }, { id: 's2', level: 301, xp: 10 },
  { id: 'g1', level: 101, xp: 10 },
  { id: 'd1', level: 1, xp: 10 },
];
function facts(state = {}, extra = {}) {
  const st = { done: {}, hints: {}, fails: {}, solutions: {}, revealed: {}, ...state };
  const xp = EXERCISES.filter(e => st.done[e.id]).reduce((s, e) => s + e.xp, 0);
  return G.achievementFacts({ levels: LEVELS, exercises: EXERCISES, modules: ['start', 'dev'], state: st, xp, maxXp: 40, unlocked: {}, ...extra });
}
const earned = (f) => plain(G.earnedAchievements(list, f));

test('every badge has a unique id, a group, texts in both languages and an image', () => {
  assert.equal(new Set(list.map(a => a.id)).size, list.length);
  for (const lang of ['en', 'pt']) {
    for (const a of builds[lang].list) {
      assert.ok(builds[lang].groups.some(g => g.id === a.group), a.id + ' group');
      assert.ok(a.name.trim() && a.rule.trim(), a.id + ' texts (' + lang + ')');
      const img = 'assets/badges/' + (a.shared ? '' : lang + '/') + a.id + '.webp';
      assert.ok(asset(img), img + ' exists');
    }
  }
  for (const img of ['xp', 'progress', 'star-standard', 'star-premium', 'star-monochrome']) assert.ok(asset('assets/badges/' + img + '.webp'), img);
  assert.equal(builds.pt.list.length, list.length);
  assert.ok(groups.length >= 4);
});

test('a brand-new learner has only First Access and the Intern title', () => {
  assert.deepEqual(earned(facts()).sort(), ['first-access', 'intern']);
});

test('coming-soon badges are never earned', () => {
  const soon = list.filter(a => a.soon).map(a => a.id);
  assert.ok(soon.length > 0);
  const all = { done: { s1: true, s2: true, g1: true, d1: true }, bestRun: 99, days: { '2026-01-01': 50 }, visited: { glossary: 1, rulebook: 1, catalog: 1, grimoire: 1 } };
  const got = earned(facts(all, { unlocked: { dev: true, qa: true, ai: true } }));
  soon.forEach(id => assert.ok(!got.includes(id), id));
});

test('academy titles follow the share of XP', () => {
  const at = share => plain(G.academyTitle(list, { ...facts(), xpShare: share }));
  assert.equal(at(0).title.id, 'intern');
  assert.equal(at(0).next.id, 'apprentice');
  assert.equal(at(0.099).title.id, 'intern');
  assert.equal(at(0.10).title.id, 'apprentice');
  assert.equal(at(0.5).title.id, 'specialist');
  assert.equal(at(0.95).title.id, 'archmage');
  assert.equal(at(1).next, null);
});

test('first exercise, a clean solve, a level, a Git level and a whole track', () => {
  let got = earned(facts({ done: { s1: true }, hints: { s1: 1 } }));
  assert.ok(got.includes('first-challenge'));
  assert.ok(!got.includes('mission-completed'), 'a hint was used');
  assert.ok(!got.includes('module-completed'));
  got = earned(facts({ done: { s1: true, s2: true } }));
  assert.ok(got.includes('mission-completed'));
  assert.ok(got.includes('module-completed'));
  assert.ok(got.includes('track-completed') && got.includes('problem-solving'), 'the Start Track has one level');
  assert.ok(!got.includes('git'));
  got = earned(facts({ done: { g1: true } }));
  assert.ok(got.includes('git'));
  got = earned(facts({ done: { g1: true }, solutions: { g1: true } }));
  assert.ok(!got.includes('mission-completed'), 'a revealed solution is not a clean solve');
  got = earned(facts({ done: { s1: true, s2: true, g1: true, d1: true } }));
  assert.ok(got.includes('academy-completed'));
  assert.ok(!got.includes('javascript'), 'JavaScript needs DEV levels 1 and 2');
  assert.ok(!got.includes('multi-track'), 'QA and AI are not finished');
});

test('tracks unlock badges follow the access rule', () => {
  const got = earned(facts({}, { unlocked: { dev: true, qa: true, ai: false } }));
  assert.ok(got.includes('track-dev') && got.includes('track-qa'));
  assert.ok(!got.includes('track-ai'));
});

test('habits: days, streaks, marathon, runs and exploring', () => {
  assert.equal(G.longestStreak([]), 0);
  assert.equal(G.longestStreak(['2026-11-20', '2026-11-22', '2026-11-21']), 3);
  assert.equal(G.longestStreak(['2026-02-27', '2026-02-28', '2026-03-01', '2026-03-03']), 3, 'across the end of the month');
  assert.equal(G.longestStreak(['2026-12-31', '2027-01-01']), 2, 'across the new year');
  const five = { '2026-11-01': 1, '2026-11-02': 1, '2026-11-03': 2, '2026-11-04': 1, '2026-11-05': 1 };
  let got = earned(facts({ days: five }));
  assert.ok(got.includes('consistent-study') && got.includes('study-streak'));
  assert.ok(!got.includes('study-marathon'));
  got = earned(facts({ days: { '2026-11-01': 10 } }));
  assert.ok(got.includes('study-marathon') && !got.includes('consistent-study'));
  assert.ok(!earned(facts({ bestRun: 4 })).includes('quick-delivery'));
  assert.ok(earned(facts({ bestRun: 5 })).includes('quick-delivery'));
  assert.ok(!earned(facts({ visited: { glossary: 1, rulebook: 1, catalog: 1 } })).includes('content-explorer'));
  assert.ok(earned(facts({ visited: { glossary: 1, rulebook: 1, catalog: 1, grimoire: 1 } })).includes('content-explorer'));
});

test('day keys use the local date with two digits', () => {
  assert.equal(G.dayKey(new Date(2026, 0, 5, 23, 59)), '2026-01-05');
});
