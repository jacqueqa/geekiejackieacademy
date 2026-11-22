# 🧙‍♀️ Geekie Jackie Academy

**Learn. Build. Test. Evolve.**

🇧🇷 [Português](#-português) · 🇬🇧 [English](#-english)

---

## 🇧🇷 Português

Você acaba de ser contratado como estagiário de tecnologia na lojinha de tarot e baralho cigano da **Bruxa Maria**. Para ajudar a loja, você vai aprender regras de negócio, Git e princípios de programação, resolvendo desafios no estilo HackerRank.

### Trilhas

| Trilha | O que se aprende |
|---|---|
| **Inicial** | Resolução de problemas: arrays, loops, textos, conjuntos e matrizes, em 30 exercícios (pré-requisito das outras) |
| **DEV** | Git, objetos, loops, condicionais e regras de negócio em JavaScript |
| **QA** | Git, asserções com Chai `expect()`, dados ruins e valores-limite |
| **IA** | Git, prompts montados a partir de dados, alucinações e revisão de código gerado por IA |

Todas as trilhas usam o mesmo universo: os produtos, pedidos, cupons e regras da lojinha.

### Trilha Inicial e desbloqueio

- 30 exercícios: 20 principais e 10 de reforço. Cada reforço indica qual exercício principal ele reforça.
- Os conceitos seguem problemas clássicos do HackerRank (o nome aparece no exercício), mas todos os enunciados, exemplos e testes são originais e passados na lojinha. Valores em dinheiro ficam em cêntimos (`3490` = €34,90).
- **DEV, QA e IA só abrem com 24 dos 30 exercícios concluídos (80%)**. Os de reforço contam. Até lá, os cartões mostram um cadeado e quanto falta, e um link direto para a trilha abre uma página de bloqueio.
- **Solução revelada não conta:** depois de 2 tentativas o aluno pode ver a solução, mas aí o exercício dá 0 XP e não conta para os 80%. O botão "Resolver de novo sozinho" recomeça o exercício; resolvido assim, ele passa a contar (continua com 0 XP).
- Cada exercício tem de 1 a 3 dicas progressivas (3 XP cada) e testes visíveis e ocultos. Os ocultos aparecem só como "3 testes ocultos: 2 passando".
- **Limitação atual:** a academia não tem servidor. A regra de acesso fica em funções isoladas (bloco `ACCESS-RULES` do `index.html`) e roda no navegador, então quem mexer no `localStorage` consegue burlar, e os testes ocultos ficam visíveis no código-fonte. A ideia é mover isso para o backend (Supabase) depois.
- Regras novas da loja criadas para os enunciados: BR-ORD-06 (hora em 24 h), BR-LOY-01 (pontos de fidelidade) e BR-RES-01 (taxa de reserva atrasada).

### O que tem na academia

- **Exercícios de código** com editor e botão "Rodar testes", com resultado em verde ou vermelho como num test runner de verdade.
- **Exercícios de Git** num terminal simulado, com o equivalente no VS Code para cada comando.
- **XP, títulos e medalhas** por trilha, dicas (custam 3 XP) e solução depois de 2 tentativas.
- **Regras da Loja**: as regras de negócio, cada uma ligada aos exercícios que a usam.
- **Catálogo de produtos**: os dados de mentira dos exercícios, em cartões ou em JSON.
- **Grimório do Git**: todos os comandos, erros comuns e glossário.
- **Glossário de programação**: 34 termos explicados de forma simples, em português e inglês, com exemplos da lojinha, busca (sem diferenciar acentos e maiúsculas), navegação A–Z e filtros por categoria e por trilha.
- **A lojinha** ([`shop/`](shop/)): um e-commerce de mentira com as mesmas regras e produtos, para treinar testes manuais, Cypress e testes de API. Veja o [guia da loja](shop/README.md).
- **Meu trabalho (.md)**: exporta o progresso e o código em Markdown.
- **Duas línguas**: português do Brasil e inglês. Código, comandos e nomes de testes ficam em inglês, como nos projetos reais.

### Como usar

É uma página, `index.html`, mais os termos do glossário em `glossary.js`, sem nada para instalar. Abra no navegador ou publique com o GitHub Pages. O progresso fica salvo no navegador de quem usa.

### Como editar o conteúdo

Todo o conteúdo fica no primeiro bloco `<script>` do `index.html`, dentro de `buildContent()`. Cada texto tem as duas línguas lado a lado:

```js
title: L('Read the price tag', 'Leia a etiqueta de preço'),
```

Ao criar um exercício novo, confira duas coisas: o código inicial (`starter`) precisa **falhar** nos testes e a `solution` precisa **passar**.

Os exercícios da Trilha Inicial ficam no bloco `START-TRACK` (função `buildStartTrack`), cada um escrito com `S({...})`: enunciado, entrada, saída, restrições, exemplos, dicas, testes visíveis e ocultos (`hidden`) e a solução.

### Testes automatizados

Só precisa do Node (22 ou mais), sem instalar nada:

```sh
node --test "tests/*.test.mjs"
```

Eles conferem o cálculo do progresso, o bloqueio abaixo de 80%, o desbloqueio em exatamente 24 de 30, que soluções reveladas não contam, e, para cada um dos 30 exercícios, que a solução de referência passa em todos os testes (visíveis e ocultos) e que o código inicial falha. No glossário, conferem os campos nas duas línguas, que não há termos repetidos, que os exemplos em inglês não ficaram com português, a ordem alfabética, a busca (acentos, maiúsculas, sigla, sem resultados), os filtros e a barra A–Z.

### Como adicionar um termo ao glossário

Os termos ficam em `glossary.js`, separados da página. Copie um item da lista `GLOSSARY` e preencha `term`, `definition` (1 a 3 frases curtas) e `category` (uma de `GLOSSARY_CATEGORIES`). Preencha também `en` com a versão em inglês: `term` e `definition`, mais `abbr` e `example` se fizer sentido (sem `example` em `en`, o modo inglês usa o exemplo em português, o que serve quando ele é só código). `abbr` (sigla ou nome em inglês), `example` (código ou situação da lojinha, como comentário `// ...`) e `tracks` (`start`, `dev`, `qa`, `ai`) são opcionais. A ordem não importa: a página ordena sozinha. Depois rode os testes.

---

## 🇬🇧 English

You have just been hired as a tech intern at **Bruxa Maria’s** little tarot and Lenormand shop. To help the shop, you learn business rules, Git and programming principles by solving HackerRank-style challenges.

### Tracks

| Track | What you learn |
|---|---|
| **Start** | Problem solving: arrays, loops, text, sets and matrices, in 30 exercises (prerequisite of the others) |
| **DEV** | Git, objects, loops, conditionals and business rules in JavaScript |
| **QA** | Git, Chai `expect()` assertions, bad data and boundary values |
| **AI** | Git, prompts built from data, hallucinations and reviewing AI-generated code |

Every track shares the same world: the shop’s products, orders, coupons and rules.

### Start Track and unlocking

- 30 exercises: 20 main and 10 reinforcement, each reinforcement pointing to the main exercise it practises again.
- The concepts follow classic HackerRank problems (named on each exercise); every statement, example and test is original and set in the shop. Money is in cents (`3490` = €34.90).
- **DEV, QA and AI open with 24 of the 30 exercises done (80%)**, reinforcement included. Until then their cards show a lock and what is missing, and a direct link opens a locked page.
- **A revealed solution does not count:** after 2 attempts the learner may see the solution, but the exercise then gives 0 XP and does not count toward the 80%. "Solve it again on my own" restarts it; solved that way it counts (still 0 XP).
- Every exercise has 1 to 3 progressive hints (3 XP each) and visible and hidden tests. Hidden ones only show as "3 hidden tests: 2 passing".
- **Current limitation:** there is no server. The access rule lives in isolated functions (the `ACCESS-RULES` block in `index.html`) and runs in the browser, so editing `localStorage` bypasses it and hidden tests can be read in the page source. The plan is to move this to the backend (Supabase) later.
- New shop rules written for the statements: BR-ORD-06 (24-hour time), BR-LOY-01 (loyalty points) and BR-RES-01 (late reservation fee).

### What’s inside

- **Code exercises** with an editor and a "Run tests" button, with green and red results like a real test runner.
- **Git exercises** in a simulated terminal, with the VS Code equivalent of each command.
- **XP, ranks and badges** per track, hints (3 XP each) and a solution after 2 failed attempts.
- **Shop Rulebook**: the business rules, each linked to the exercises that use it.
- **Product catalog**: the exercises’ mock data, as cards or as JSON.
- **Programming glossary**: 34 terms explained simply, with shop examples, search (ignoring accents and case), A–Z navigation and filters by category and track. In English and Portuguese, like the rest of the academy.
- **Git grimoire**: every command, common errors and a glossary.
- **The shop** ([`shop/`](shop/)): a mock e-commerce with the same rules and products, to practise manual tests, Cypress and API checks. See the [shop guide](shop/README.md).
- **My work (.md)**: exports progress and code as Markdown.
- **Two languages**: Brazilian Portuguese and English. Code, commands and test names stay in English, like in real projects.

### How to use it

It is one page, `index.html`, plus the glossary terms in `glossary.js`, with nothing to install. Open it in a browser or publish it with GitHub Pages. Progress is saved in each learner’s browser.

### How to edit the content

All content lives in the first `<script>` block of `index.html`, inside `buildContent()`. Every text has both languages side by side:

```js
title: L('Read the price tag', 'Leia a etiqueta de preço'),
```

When you add an exercise, check two things: the `starter` code must **fail** the tests and the `solution` must **pass** them.

Start Track exercises live in the `START-TRACK` block (`buildStartTrack`), each written with `S({...})`: statement, input, output, constraints, examples, hints, visible and `hidden` tests, and the solution.

### Automated tests

Only Node (22 or later) is needed, nothing to install:

```sh
node --test "tests/*.test.mjs"
```

They check the progress maths, the lock below 80%, the unlock at exactly 24 of 30, that revealed solutions don’t count, and, for each of the 30 exercises, that the reference solution passes every test (visible and hidden) and the starter code fails. For the glossary they check the fields in both languages, no duplicates, that English examples have no Portuguese left, the alphabetical order, the search (accents, case, acronyms, no results), the filters and the A–Z bar.

### Adding a glossary term

Terms live in `glossary.js`, apart from the page. Copy an item of `GLOSSARY` and fill in `term`, `definition` (1 to 3 short sentences) and `category` (one of `GLOSSARY_CATEGORIES`). Also fill in `en` with the English version: `term` and `definition`, plus `abbr` and `example` when useful (without `en.example`, English shows the Portuguese example, fine when it is only code). `abbr`, `example` and `tracks` (`start`, `dev`, `qa`, `ai`) are optional. Order doesn't matter: the page sorts them. Then run the tests.

---

Created by **Jacqueline (Jackie) Pereira** · [github.com/jacqueqa](https://github.com/jacqueqa)
