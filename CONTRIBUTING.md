# Contribuindo com a Geekie Jackie Academy · Contributing

🇧🇷 [Português](#-português) · 🇬🇧 [English](#-english)

---

## 🇧🇷 Português

Este guia é para quem mantém a academia: criar exercícios, mudar textos e rodar os testes. Para estudar, veja o [README](README.md).

### Como o projeto é feito

É um site estático: uma página, `index.html`, mais arquivos de dados, sem build e sem nada para instalar. Ele é publicado com o GitHub Pages, e o progresso de cada pessoa fica no `localStorage` do navegador.

| Arquivo ou pasta | O que tem |
|---|---|
| `index.html` | O motor da página e o conteúdo geral, dentro de `buildContent()`: configuração, trilhas, títulos, contexto de Git, níveis e os exercícios de código do Back End, QA e IA, além dos blocos testados (veja abaixo) |
| `start-track.js` | Trilha Inicial: 40 exercícios de lógica. O comentário no topo explica os campos de cada tipo |
| `new-tracks.js` | Trilhas Git, Front End e Dados |
| `qa-track.js` | Trilha QA: o plano dos 8 módulos e os exercícios novos |
| `ai-track.js` | Trilha IA: o plano dos 7 módulos, o CRAFT e os exercícios novos |
| `glossary.js` | Termos do glossário |
| `design-principles.js` | Princípios de design de código (SOLID, DRY, KISS, YAGNI) |
| `assets/` | Artes: trilhas, crachá, bandeirinhas, avatares, medalhas (`badges/pt`, `badges/en` e as sem texto), design |
| `shop/` | A lojinha de mentira, com o [guia](shop/README.md) dela |
| `tests/` | Testes automatizados com o Node |

### Textos nas duas línguas

Todo texto tem inglês e português lado a lado:

```js
title: L('Read the price tag', 'Leia a etiqueta de preço'),
```

Código, comandos, mensagens de commit e nomes de testes ficam em inglês, como nos projetos reais. Use só dados de mentira, como a cliente Jane Doe (`jane@example.com`).

### Tipos de exercício

- **Código** (`fn`, `starter`, `solution`, `tests`): o aluno escreve uma função em JavaScript e roda os testes. O `starter` precisa **falhar** e a `solution` precisa **passar**. Testes com `hidden: true` ficam escondidos.
- **Terminal** (Git): gerados por `makeGitExercises()` a partir do `GIT_CONTEXT` de cada trilha. Só a trilha Git tem o nível "Pegue o código"; as outras trilhas mantêm o `GIT_CONTEXT` para o Grimório do Git.
- **Lógica** (`type: 'logic'`): `order`, `decision`, `trace`, `predict`, `fill`, `bug`, `match` e `pick`. Os campos de cada um estão no topo do `start-track.js`.

### Regras importantes

- **Nunca mude o id de um exercício ou de um nível.** O progresso é guardado pelo id. Por isso a trilha Back End ainda tem o id `dev`, e os níveis antigos de QA e IA (31, 32, 41, 42) mantiveram os ids quando viraram módulos novos.
- **A ordem dos níveis** da QA e da IA vem de `QA_LEVEL_ORDER` e `AI_LEVEL_ORDER`. Nas outras trilhas, vale a ordem em que os níveis aparecem.
- **Regras de negócio novas** entram nas Regras da Loja (BR-XXX-00), e os exercícios citam o código da regra.
- **Conteúdo de QA e IA** é original, alinhado aos conceitos (ISTQB na QA). Não copie textos de syllabus ou de livros.

### Blocos testados do `index.html`

Partes da lógica ficam em blocos marcados, `/* NOME:BEGIN … NOME:END */`, que os testes carregam sozinhos:

| Bloco | O que faz |
|---|---|
| `ACCESS-RULES` | Progresso da Trilha Inicial e acesso às trilhas: 60% recomendados (`UNLOCK_PERCENT`), a escolha de começar antes e a regra de que solução revelada não conta |
| `LOGIC-CHECK` | Correção dos exercícios de lógica |
| `ALGO-CHALLENGES` | Os 30 desafios de algoritmos do Back End |
| `GLOSSARY-LOGIC` | Busca, filtros e A–Z do glossário |
| `ACHIEVEMENTS` | Medalhas, títulos da academia e hábitos de estudo |
| `SAVE-FILE` | O bloco escondido do .md de "Meu trabalho", usado por "Importar progresso" |

**Limitação atual:** não há servidor. As regras rodam no navegador, então quem mexer no `localStorage` consegue burlar, e as respostas ficam visíveis no código-fonte. A ideia é mover isso para um backend (Supabase) depois.

### Testes automatizados

Só precisa do Node 22 ou mais novo, sem instalar nada:

```sh
node --test "tests/*.test.mjs"
```

Eles conferem, entre outras coisas:

- que a solução de cada exercício de código passa em todos os testes e o código inicial falha;
- que cada exercício de lógica aceita a resposta certa e recusa o estado inicial e uma resposta errada;
- que os textos existem nas duas línguas e os ids não se repetem;
- a regra dos 60%, as medalhas, o glossário, os princípios de design e o formato de importar e exportar.

### Como adicionar um termo ao glossário

Copie um item de `GLOSSARY` em `glossary.js` e preencha:

- `term`, `definition` (1 a 3 frases curtas) e `category` (uma de `GLOSSARY_CATEGORIES`);
- `en`, com a versão em inglês (`term`, `definition` e, se fizer sentido, `abbr` e `example`);
- opcionais: `abbr`, `example` (código ou situação da lojinha, como comentário `// ...`) e `tracks` (`start`, `dev`, `qa`, `ai`).

A ordem não importa: a página ordena sozinha. Depois rode os testes.

### Fluxo de trabalho

Crie uma branch a partir da `master` (`feature/…` ou `fix/…`), rode os testes, confira no navegador, no computador e no celular, e abra um pull request. As mensagens de commit seguem o *conventional commits*, como `feat: …` e `fix: …`.

---

## 🇬🇧 English

This guide is for people who maintain the academy: creating exercises, changing texts and running the tests. To study, see the [README](README.md).

### How the project is made

It is a static site: one page, `index.html`, plus data files, with no build and nothing to install. It is published with GitHub Pages, and each person’s progress lives in the browser’s `localStorage`.

| File or folder | What it holds |
|---|---|
| `index.html` | The page engine and the general content, inside `buildContent()`: config, tracks, ranks, Git context, levels and the code exercises of Back End, QA and AI, plus the tested blocks (see below) |
| `start-track.js` | Start Track: 40 logic exercises. The comment at the top explains the fields of each kind |
| `new-tracks.js` | Git, Front End and Data tracks |
| `qa-track.js` | QA track: the plan of the 8 modules and the new exercises |
| `ai-track.js` | AI track: the plan of the 7 modules, CRAFT and the new exercises |
| `glossary.js` | Glossary terms |
| `design-principles.js` | Code design principles (SOLID, DRY, KISS, YAGNI) |
| `assets/` | Art: tracks, badge card, pennants, avatars, badges (`badges/pt`, `badges/en` and the text-free ones), design |
| `shop/` | The mock shop, with its [guide](shop/README.md) |
| `tests/` | Automated tests with Node |

### Texts in both languages

Every text has English and Portuguese side by side:

```js
title: L('Read the price tag', 'Leia a etiqueta de preço'),
```

Code, commands, commit messages and test names stay in English, like in real projects. Use made-up data only, like the customer Jane Doe (`jane@example.com`).

### Exercise kinds

- **Code** (`fn`, `starter`, `solution`, `tests`): the learner writes a JavaScript function and runs the tests. The `starter` must **fail** and the `solution` must **pass**. Tests with `hidden: true` are hidden.
- **Terminal** (Git): made by `makeGitExercises()` from each track’s `GIT_CONTEXT`. Only the Git track has the “Get the code” level; the other tracks keep their `GIT_CONTEXT` for the Git grimoire.
- **Logic** (`type: 'logic'`): `order`, `decision`, `trace`, `predict`, `fill`, `bug`, `match` and `pick`. The fields of each are at the top of `start-track.js`.

### Important rules

- **Never change the id of an exercise or a level.** Progress is saved by id. That is why the Back End track still has the id `dev`, and the old QA and AI levels (31, 32, 41, 42) kept their ids when they became new modules.
- **The order of the levels** in QA and AI comes from `QA_LEVEL_ORDER` and `AI_LEVEL_ORDER`. In the other tracks, the order in which the levels are listed is used.
- **New business rules** go into the Shop Rulebook (BR-XXX-00), and exercises cite the rule’s code.
- **QA and AI content** is original, aligned with the concepts (ISTQB for QA). Don’t copy text from syllabi or books.

### Tested blocks of `index.html`

Parts of the logic live in marked blocks, `/* NAME:BEGIN … NAME:END */`, which the tests load on their own:

| Block | What it does |
|---|---|
| `ACCESS-RULES` | Start Track progress and track access: the recommended 60% (`UNLOCK_PERCENT`), the choice to start early, and the rule that revealed solutions don’t count |
| `LOGIC-CHECK` | Checking the logic exercises |
| `ALGO-CHALLENGES` | The 30 Back End algorithm challenges |
| `GLOSSARY-LOGIC` | Glossary search, filters and A–Z |
| `ACHIEVEMENTS` | Badges, academy titles and study habits |
| `SAVE-FILE` | The hidden block of the “My work” .md, used by “Import progress” |

**Current limitation:** there is no server. The rules run in the browser, so editing `localStorage` bypasses them and the answers can be read in the page source. The plan is to move this to a backend (Supabase) later.

### Automated tests

Only Node 22 or later is needed, nothing to install:

```sh
node --test "tests/*.test.mjs"
```

Among other things, they check:

- that every code exercise’s solution passes all its tests and its starter fails;
- that every logic exercise accepts the right answer and refuses the starting state and a wrong answer;
- that texts exist in both languages and ids are unique;
- the 60% rule, the badges, the glossary, the design principles and the export/import format.

### Adding a glossary term

Copy an item of `GLOSSARY` in `glossary.js` and fill in:

- `term`, `definition` (1 to 3 short sentences) and `category` (one of `GLOSSARY_CATEGORIES`);
- `en`, with the English version (`term`, `definition` and, when useful, `abbr` and `example`);
- optional: `abbr`, `example` (code or a shop situation, as a `// ...` comment) and `tracks` (`start`, `dev`, `qa`, `ai`).

Order doesn’t matter: the page sorts them. Then run the tests.

### Workflow

Create a branch from `master` (`feature/…` or `fix/…`), run the tests, check in the browser on a computer and a phone, and open a pull request. Commit messages follow *conventional commits*, like `feat: …` and `fix: …`.
