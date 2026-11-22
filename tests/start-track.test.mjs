// The Start Track (start-track.js): 40 logic exercises, checked by the LOGIC-CHECK block of index.html.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { load } from './load.mjs';

const EN = (en, pt) => en, PT = (en, pt) => pt;
const G = load(['file:start-track.js', 'LOGIC-CHECK', 'ACCESS-RULES'], ['buildStartTrack', 'logicCheck', 'logicSolution', 'logicInitial', 'startTrackProgress']);
const plain = v => JSON.parse(JSON.stringify(v)); // copy out of the sandbox
const builds = { en: G.buildStartTrack(EN), pt: G.buildStartTrack(PT) };
const { module, levels, exercises } = builds.en;
const KINDS = ['order', 'decision', 'trace', 'predict', 'fill', 'bug', 'match', 'pick'];
const isPerm = (arr, n) => arr.length === n && [...arr].sort((a, b) => a - b).every((v, i) => v === i);

test('the Start Track has 40 exercises in 9 levels', () => {
  assert.equal(module.id, 'start');
  assert.equal(exercises.length, 40);
  assert.equal(levels.length, 9);
  assert.ok(levels.every(l => l.module === 'start'));
  for (const l of levels) assert.ok(exercises.some(e => e.level === l.id), 'level ' + l.id + ' has exercises');
});

test('ids and order are in sequence', () => {
  exercises.forEach((e, i) => {
    assert.equal(e.order, i + 1);
    assert.equal(e.id, 'st' + String(i + 1).padStart(2, '0'));
    assert.equal(e.type, 'logic');
  });
});

test('80% means 32 of the 40 exercises', () => {
  const st = { done: {}, solutions: {} };
  exercises.slice(0, 31).forEach(e => { st.done[e.id] = true; });
  assert.equal(G.startTrackProgress(exercises, st).unlocked, false);
  st.done[exercises[31].id] = true;
  const p = G.startTrackProgress(exercises, st);
  assert.equal(p.required, 32);
  assert.equal(p.unlocked, true);
});

for (const lang of ['en', 'pt']) {
  test('every exercise has its texts (' + lang + ')', () => {
    for (const e of builds[lang].exercises) {
      for (const f of ['title', 'tag', 'story', 'what', 'why', 'task', 'ok']) assert.ok(e[f] && String(e[f]).trim(), e.id + ' has ' + f);
      assert.ok(e.hints.length >= 1 && e.hints.length <= 3, e.id + ' has 1 to 3 hints');
      assert.ok(KINDS.includes(e.kind), e.id + ' kind ' + e.kind);
      if (e.js) assert.ok(e.jsNote, e.id + ' explains its JavaScript');
    }
  });
}

test('the two languages have the same exercises and answers', () => {
  builds.en.exercises.forEach((e, i) => {
    const p = builds.pt.exercises[i];
    assert.equal(p.id, e.id); assert.equal(p.kind, e.kind);
    assert.deepEqual(plain(G.logicSolution(p)), plain(G.logicSolution(e)), e.id);
  });
});

test('the data of each kind is consistent', () => {
  for (const e of exercises) {
    const at = e.id + ' (' + e.kind + ')';
    if (e.kind === 'order') {
      assert.ok(e.steps.length >= 3, at);
      assert.ok(isPerm(e.start, e.steps.length), at + ': start is a shuffle of the steps');
      assert.ok(e.start.some((v, i) => v !== i), at + ': start is not already solved');
    } else if (e.kind === 'decision') {
      assert.ok(e.answer >= 0 && e.answer < e.options.length, at);
      assert.ok(e.yes && e.no && e.outcome.yes && e.outcome.no, at);
      assert.ok(e.cases.length >= 3, at);
      e.cases.forEach(c => { assert.equal(c.cells.length, e.caseHead.length, at); assert.ok(['yes', 'no'].includes(c.answer), at); });
      assert.ok(e.cases.some(c => c.answer === 'yes') && e.cases.some(c => c.answer === 'no'), at + ': cases with both outcomes');
      assert.ok(e.cases.some(c => c.edge), at + ': at least one edge case');
    } else if (e.kind === 'trace') {
      assert.ok(e.rows.length >= 1, at);
      e.rows.forEach(r => assert.equal(r.cells.length + 1, e.head.length, at + ': cells + answer = columns'));
      if (e.start) assert.equal(e.start.length, e.head.length, at);
      if (e.choices) e.rows.forEach(r => assert.ok(r.answer >= 0 && r.answer < e.choices.length, at));
      else e.rows.forEach(r => assert.equal(typeof r.answer, 'number', at));
      (e.questions || []).forEach(q => assert.equal(typeof q.answer, 'number', at));
    } else if (e.kind === 'predict') {
      e.questions.forEach(q => {
        assert.ok(q.options.length >= 2, at);
        assert.ok(q.answer >= 0 && q.answer < q.options.length, at);
        assert.equal(new Set(q.options).size, q.options.length, at + ': options are different');
      });
    } else if (e.kind === 'fill') {
      assert.equal(e.lines.filter(l => l === null).length, 1, at + ': exactly one blank');
      assert.ok(e.answer >= 0 && e.answer < e.options.length, at);
    } else if (e.kind === 'bug') {
      assert.ok(e.lines.length >= 3, at);
      assert.ok(e.answer >= 0 && e.answer < e.lines.length, at);
    } else if (e.kind === 'match') {
      assert.equal(e.left.length, e.right.length, at);
      assert.ok(isPerm(e.answer, e.right.length), at + ': each right item used once');
      assert.ok(e.answer.some((v, i) => v !== i), at + ': not in the same order on both sides');
    } else if (e.kind === 'pick') {
      assert.equal(e.options.length, e.correct.length, at);
      assert.ok(e.correct.includes(true) && e.correct.includes(false), at);
    }
  }
});

test('reinforcement exercises point to earlier exercises', () => {
  const reinforce = exercises.filter(e => e.reinforces);
  assert.equal(reinforce.length, 5);
  for (const e of reinforce) {
    assert.equal(e.level, 309, e.id);
    for (const id of e.reinforces) {
      const target = exercises.find(x => x.id === id);
      assert.ok(target, e.id + ' reinforces ' + id);
      assert.ok(target.order < e.order && !target.reinforces, e.id + ' reinforces an earlier main exercise');
    }
  }
});

test('XP never goes down along the track', () => {
  exercises.slice(1).forEach((e, i) => assert.ok(e.xp >= exercises[i].xp, e.id));
});

// A complete but wrong answer for each kind.
function wrongAnswer(e) {
  const s = plain(G.logicSolution(e));
  switch (e.kind) {
    case 'order': return { order: e.start.slice() };
    case 'decision': return { choice: (e.answer + 1) % e.options.length, cases: s.cases };
    case 'trace': if (e.choices) s.rows[0] = (s.rows[0] + 1) % e.choices.length; else s.rows[0] = s.rows[0] + 1; return s;
    case 'predict': s.q[0] = (s.q[0] + 1) % e.questions[0].options.length; return s;
    case 'fill': return { choice: (e.answer + 1) % e.options.length };
    case 'bug': return { line: (e.answer + 1) % e.lines.length };
    case 'match': return { m: s.m.slice(1).concat(s.m[0]) };
    case 'pick': return { sel: e.correct.map(c => !c) };
  }
}

for (const e of exercises) {
  test(e.id + ' ' + e.kind + ': the right answer passes, the start and a wrong answer fail', () => {
    const right = G.logicCheck(e, G.logicSolution(e));
    assert.equal(right.ok, true, 'solution: ' + JSON.stringify(plain(right.marks)));
    assert.equal(G.logicCheck(e, G.logicInitial(e)).ok, false, 'the starting state must not pass');
    const wrong = G.logicCheck(e, wrongAnswer(e));
    assert.equal(wrong.ok, false, 'a wrong answer must not pass');
    assert.equal(wrong.missing, false, 'the wrong answer is complete, so it is checked');
  });
}

test('numbers can be typed with a comma or a dot', () => {
  const sub = exercises.find(e => e.id === 'st14'); // the cart subtotal
  const ok = a => G.logicCheck(sub, { rows: a, q: ['3'] }).ok;
  assert.equal(ok(['34,90', '43,40', '51,90']), true);
  assert.equal(ok(['34.9', '43.4', '51.9']), true);
  assert.equal(ok(['€ 34,90', '43,4', '€51.90']), true);
  assert.equal(ok(['34,90', '43,40', '52,90']), false);
});
