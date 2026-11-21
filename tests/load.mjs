// Loads pieces of index.html into a sandbox so they can be tested with Node only (no dependencies).
// Run every test with:  node --test "tests/*.test.mjs"
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const HTML = readFileSync(fileURLToPath(new URL('../index.html', import.meta.url)), 'utf8');

// Returns the code between /* NAME:BEGIN and /* NAME:END in index.html.
export function block(name) {
  const start = HTML.indexOf('/* ' + name + ':BEGIN');
  const end = HTML.indexOf('/* ' + name + ':END */');
  if (start < 0 || end < 0) throw new Error('Block ' + name + ' not found in index.html');
  return HTML.slice(start, end);
}

// Runs the given blocks in one sandbox and returns the requested globals.
export function load(blocks, names, extra = {}) {
  const ctx = vm.createContext({ ...extra });
  const exportLine = '\n;globalThis.__out = {' + names.map(n => n + ': typeof ' + n + ' !== "undefined" ? ' + n + ' : undefined').join(', ') + '};';
  vm.runInContext(blocks.map(block).join('\n') + exportLine, ctx);
  return ctx.__out;
}

// The test runner the learners use (the <script id="worker-src"> block), driven without a Web Worker.
export function workerRunner() {
  const m = HTML.match(/<script[^>]*\bid="worker-src"[^>]*>([\s\S]*?)<\/script>/);
  if (!m) throw new Error('worker-src not found in index.html');
  return function run(payload) {
    return new Promise(resolve => {
      const self = { postMessage: resolve, addEventListener() {} };
      const ctx = vm.createContext({ self, console });
      vm.runInContext(m[1], ctx);
      ctx.self.onmessage({ data: payload });
    });
  };
}
