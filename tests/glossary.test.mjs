// The glossary: the data in glossary.js and the search, filters and A–Z in index.html (GLOSSARY-LOGIC).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { load } from './load.mjs';

const G = load(['file:glossary.js', 'GLOSSARY-LOGIC'],
  ['GLOSSARY', 'GLOSSARY_CATEGORIES', 'GLOSSARY_CATEGORIES_EN', 'glossText', 'glossNormalize', 'glossSort', 'glossFilter', 'glossLetters', 'glossLetter', 'glossGroups', 'glossSlug']);
// Arrays made inside the sandbox come from another realm; copy them so deepEqual compares only the values.
const plain = v => JSON.parse(JSON.stringify(v));
const terms = list => plain(list.map(g => g.term));
const find = (query, opts = {}) => terms(G.glossFilter(G.GLOSSARY, { query, ...opts }));
const TRACKS = ['start', 'dev', 'qa', 'ai'];

/* ---------- Data ---------- */
test('every term has the required fields', () => {
  for (const g of G.GLOSSARY) {
    assert.ok(g.term && g.term.trim(), 'term');
    assert.ok(g.definition && g.definition.trim(), g.term + ': definition');
    assert.ok(G.GLOSSARY_CATEGORIES.includes(g.category), g.term + ': category "' + g.category + '"');
    if (g.abbr !== undefined) assert.ok(g.abbr.trim(), g.term + ': abbr is empty');
    if (g.example !== undefined) assert.ok(g.example.trim(), g.term + ': example is empty');
    (g.tracks || []).forEach(tr => assert.ok(TRACKS.includes(tr), g.term + ': track "' + tr + '"'));
  }
});

test('definitions are short: 1 to 3 sentences', () => {
  for (const g of G.GLOSSARY) {
    const sentences = g.definition.split(/[.!?](?=\s|$)/).filter(s => s.trim()).length;
    assert.ok(sentences >= 1 && sentences <= 3, g.term + ' has ' + sentences + ' sentences');
  }
});

test('there are no duplicate terms (ignoring case and accents)', () => {
  const seen = new Set();
  for (const g of G.GLOSSARY) {
    const key = G.glossNormalize(g.term);
    assert.ok(!seen.has(key), 'duplicate: ' + g.term);
    seen.add(key);
  }
  assert.equal(new Set(G.GLOSSARY.map(g => G.glossSlug(g.term))).size, G.GLOSSARY.length, 'every term has its own id');
});

test('it covers the terms of the reference list and the extras', () => {
  const expected = ['Algoritmo', 'Bug', 'Estrutura de Dados', 'Tratamento de Erros', 'Função', 'Git', 'HTML', 'IDE', 'JSON', 'Loop', 'Biblioteca',
    'Programação Orientada a Objetos', 'Otimização de Performance', 'Garantia de Qualidade', 'Refatoração', 'Stack', 'Sintaxe', 'Testes', 'Variável',
    'Controle de Versão', 'Desenvolvimento Web', 'XML', 'YAML', 'Zero Day',
    'Condição', 'Array', 'Debug', 'Compilador vs Interpretador', 'API', 'Framework', 'Caso de teste', 'Teste automatizado', 'Prompt', 'Modelo de IA'];
  for (const name of expected) {
    assert.ok(G.GLOSSARY.some(g => g.term === name || g.term.startsWith(name + ' (')), 'missing: ' + name);
  }
});

test('the practical terms have an example', () => {
  for (const name of ['Variável', 'Loop (laço de repetição)', 'Função', 'Stack (pilha)', 'Array (lista)', 'Condição (if/else)']) {
    const g = G.GLOSSARY.find(x => x.term === name);
    assert.ok(g && g.example, name + ' has an example');
  }
});

/* ---------- Sorting ---------- */
test('terms are sorted with localeCompare("pt"), accents in the right place', () => {
  const sorted = terms(G.glossSort(G.GLOSSARY));
  const expected = [...sorted].sort((a, b) => a.localeCompare(b, 'pt'));
  assert.deepEqual(sorted, expected);
  assert.ok(sorted.indexOf('Função') > sorted.indexOf('Framework'), '"Função" comes after "Framework", not at the end');
  assert.ok(sorted.indexOf('Variável') < sorted.indexOf('XML'));
});

/* ---------- Search ---------- */
test('search ignores accents', () => {
  assert.ok(find('funcao').includes('Função'));
  assert.ok(find('variavel').includes('Variável'));
  assert.ok(find('Função').includes('Função'));
});

test('search ignores upper and lower case', () => {
  assert.deepEqual(find('json'), find('JSON'));
  assert.ok(find('jSoN').includes('JSON'));
  assert.ok(find('ALGORITMO').includes('Algoritmo'));
});

test('search looks at the term, the acronym and the definition', () => {
  assert.ok(find('OOP').includes('Programação Orientada a Objetos'), 'acronym');
  assert.ok(find('poo').includes('Programação Orientada a Objetos'), 'acronym, lowercase');
  assert.ok(find('Quality Assurance').includes('Garantia de Qualidade'), 'original English name');
  assert.ok(find('receita').includes('Algoritmo'), 'a word of the definition');
});

test('a search with no match returns an empty list', () => {
  assert.deepEqual(find('xyzzy-nada'), []);
  assert.deepEqual(find('   '), terms(G.glossSort(G.GLOSSARY)), 'only spaces = no search');
});

test('filters by category and by track', () => {
  const qa = G.glossFilter(G.GLOSSARY, { category: 'Qualidade e testes' });
  assert.ok(qa.length > 0 && qa.every(g => g.category === 'Qualidade e testes'));
  const ai = G.glossFilter(G.GLOSSARY, { track: 'ai' });
  assert.ok(terms(ai).includes('Prompt') && ai.every(g => g.tracks.includes('ai')));
  assert.deepEqual(find('json', { category: 'Ferramentas' }), [], 'search and filter together');
});

/* ---------- A–Z ---------- */
test('the A–Z bar has 26 letters and disables those without terms', () => {
  const letters = G.glossLetters(G.GLOSSARY);
  assert.equal(letters.length, 26);
  const on = l => letters.find(x => x.letter === l).enabled;
  assert.equal(on('A'), true);
  assert.equal(on('F'), true, 'Função and Framework');
  assert.equal(on('K'), true, 'Kanban');
  assert.equal(on('Q'), false);
  assert.equal(on('W'), false);
});

test('the A–Z bar follows the search', () => {
  // "json" also finds API and XML, whose definitions mention JSON: the letters follow the results.
  const on = query => plain(G.glossLetters(G.glossFilter(G.GLOSSARY, { query }))).filter(x => x.enabled).map(x => x.letter);
  assert.deepEqual(on('json'), ['A', 'J', 'X']);
  assert.deepEqual(on('yaml'), ['Y']);
  assert.ok(G.glossLetters([]).every(x => !x.enabled), 'no results, no letters');
});

test('accented first letters go under the plain letter', () => {
  assert.equal(G.glossLetter('Árvore'), 'A');
  assert.equal(G.glossLetter('Ética'), 'E');
  assert.equal(G.glossLetter('çedilha'), 'C');
});

test('groups by letter keep the alphabetical order', () => {
  const groups = plain(G.glossGroups(G.GLOSSARY));
  assert.deepEqual(groups.map(g => g.letter), [...new Set(groups.map(g => g.letter))], 'each letter once');
  assert.deepEqual(groups.map(g => g.letter), [...groups.map(g => g.letter)].sort());
  assert.equal(groups.reduce((n, g) => n + g.terms.length, 0), G.GLOSSARY.length);
});

/* ---------- English ---------- */
const EN = { lang: 'en' };
const findEn = (query, opts = {}) => plain(G.glossFilter(G.GLOSSARY, { query, ...opts, ...EN }).map(g => G.glossText(g, 'en').term));

test('every term has an English version with the required fields', () => {
  for (const g of G.GLOSSARY) {
    assert.ok(g.en && g.en.term && g.en.term.trim(), g.term + ': en.term');
    assert.ok(g.en.definition && g.en.definition.trim(), g.term + ': en.definition');
    const sentences = g.en.definition.split(/[.!?](?=\s|$)/).filter(s => s.trim()).length;
    assert.ok(sentences >= 1 && sentences <= 3, g.term + ': en.definition has ' + sentences + ' sentences');
    if (g.en.abbr !== undefined) assert.ok(g.en.abbr.trim(), g.term + ': en.abbr is empty');
  }
  const seen = new Set(G.GLOSSARY.map(g => G.glossNormalize(g.en.term)));
  assert.equal(seen.size, G.GLOSSARY.length, 'no duplicate English terms');
});

test('English examples have no Portuguese left in them', () => {
  const pt = /\b(não|você|para|cada|venda|vendemos|baralhos|pedido|cliente|loja|lojinha|Esgotado|depois|antes|regra|Certo|Erro)\b/i;
  for (const g of G.GLOSSARY) {
    const ex = G.glossText(g, 'en').example;
    const found = ex ? ex.match(pt) : null;
    assert.equal(found, null, g.term + ': the English example still has Portuguese: ' + (found && found[0]));
  }
});

test('every category has an English name', () => {
  for (const c of G.GLOSSARY_CATEGORIES) assert.ok(G.GLOSSARY_CATEGORIES_EN[c], c);
});

test('in English, terms are sorted with localeCompare("en")', () => {
  const sorted = plain(G.glossSort(G.GLOSSARY, 'en').map(g => G.glossText(g, 'en').term));
  assert.deepEqual(sorted, [...sorted].sort((a, b) => a.localeCompare(b, 'en')));
  assert.equal(sorted[0], 'AI Model');
});

test('English search uses the English texts and ignores case', () => {
  assert.ok(findEn('function').includes('Function'));
  assert.deepEqual(findEn('FUNCTION'), findEn('function'));
  assert.ok(findEn('recipe').includes('Algorithm'), 'a word of the English definition');
  assert.ok(findEn('qa').includes('Quality Assurance'), 'the acronym');
  assert.deepEqual(findEn('funcao'), [], 'Portuguese words are not searched in English');
  assert.deepEqual(findEn('xyzzy'), []);
});

test('in English the A–Z bar uses the English terms', () => {
  const on = (lang) => plain(G.glossLetters(G.GLOSSARY, lang)).filter(x => x.enabled).map(x => x.letter);
  assert.ok(on('en').includes('Q'), '"Quality Assurance" is under Q in English');
  assert.ok(!on('pt').includes('Q'), 'and under G ("Garantia de Qualidade") in Portuguese');
  const groups = plain(G.glossGroups(G.GLOSSARY, 'en'));
  assert.equal(groups.reduce((n, g) => n + g.terms.length, 0), G.GLOSSARY.length);
});
