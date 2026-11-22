# 🧙‍♀️ Geekie Jackie Academy

**Learn. Build. Test. Evolve.**

🇧🇷 [Português](#-português) · 🇬🇧 [English](#-english)

---

## 🇧🇷 Português

Você acaba de ser contratado como estagiário de tecnologia na lojinha de tarot e baralho cigano da **Bruxa Maria**. Para ajudar a loja, você vai aprender regras de negócio, Git e princípios de programação, resolvendo desafios no estilo HackerRank.

### Trilhas

| Trilha | O que se aprende |
|---|---|
| **Inicial** | Lógica em português, com caixinhas e diagramas, sem escrever código: 40 exercícios (pré-requisito das outras) |
| **Back End** | Git, objetos, loops, condicionais e regras de negócio em JavaScript, mais 30 desafios de algoritmos (era a trilha DEV; o id continua `dev`) |
| **Front End** | Git, HTML e acessibilidade, CSS (seletores, cascata, caixa, flexbox) e JavaScript que monta a vitrine a partir dos dados |
| **QA** | Git, asserções com Chai `expect()`, dados ruins e valores-limite |
| **IA** | Git, prompts montados a partir de dados, alucinações e revisão de código gerado por IA |
| **Dados** | Git, contar, somar e tirar médias dos pedidos, agrupar por categoria e por dia em JavaScript, ler SQL e escolher o gráfico certo |

Todas as trilhas usam o mesmo universo: os produtos, pedidos, cupons e regras da lojinha.

### Comece por aqui

Na página inicial, a seção **Comece por aqui** tem o cartão do guia (imagem da loja mágica), que abre o **Como jogar** (`#how-to`) com todas as regras, e logo abaixo o cartão da Trilha Inicial.

### Trilha Inicial e desbloqueio

- **40 exercícios de lógica, sem código para escrever.** Os passos aparecem em português estruturado (`PARA CADA preço NO carrinho: total ← total + preço`), em caixinhas e fluxogramas, sempre com a lojinha como contexto.
- **9 níveis:** Pensar como o computador · Guardar informação · Decidir · Repetir · Organizar · Conferir · A caixa de ferramentas (pastas, terminal, Git, API, JSON) · Ponte para o código · Reforço. Cada exercício de reforço indica qual exercício ele reforça.
- **Tipos de exercício**, todos corrigidos automaticamente: ordenar os passos, escolher a pergunta do losango e prever os casos de teste, rastrear uma variável numa tabela, prever o resultado, completar a caixinha vazia, achar o passo com bug, ligar pares e marcar os casos certos.
- **Ponte para o código:** quase todo exercício tem **👀 Ver em JavaScript**, com o mesmo algoritmo em código, só para ler. O nível "Ponte para o código" pede para reconhecer qual código faz o que as caixinhas dizem.
- **O ideal é fazer pelo menos 24 dos 40 exercícios (60%) antes de DEV, QA e IA**. Os de reforço contam. Com 60%, essas trilhas abrem direto. Até lá, os cartões delas mostram uma dica com quanto falta, e o cartão da Trilha Inicial mostra o progresso.
- **Dá para começar antes:** ao abrir DEV, QA ou IA antes dos 60%, a Geekie Jackie (arte `assets/geekie-loading.webp`) explica o que a trilha ensina, lembra que o ideal é ter 60% da Trilha Inicial e pergunta se o aluno quer começar. **Sim** libera aquela trilha (guardado por trilha em `earlyAccess`); **Não** volta para a Trilha Inicial. As medalhas DEV, QA e IA vêm com os 60%.
- **Solução revelada não conta:** depois de 2 tentativas o aluno pode ver a solução, mas aí o exercício dá 0 XP e não conta para os 60%. O botão "Resolver de novo sozinho" recomeça o exercício; resolvido assim, ele passa a contar (continua com 0 XP).
- Cada exercício tem de 1 a 3 dicas progressivas (3 XP cada).
- **Os 30 exercícios em JavaScript** (inspirados em problemas clássicos do HackerRank, com enunciados originais) agora são os **Desafios de algoritmos** da trilha DEV.
- **Limitação atual:** a academia não tem servidor. A regra de acesso fica em funções isoladas (bloco `ACCESS-RULES` do `index.html`) e roda no navegador, então quem mexer no `localStorage` consegue burlar, e as respostas ficam visíveis no código-fonte. A ideia é mover isso para o backend (Supabase) depois.
- Regras novas da loja criadas para os enunciados: BR-ORD-06 (hora em 24 h), BR-LOY-01 (pontos de fidelidade) e BR-RES-01 (taxa de reserva atrasada).

### Conquistas (medalhas)

- A página **Conquistas** (`#achievements`, link embaixo do XP) mostra todas as medalhas: as conquistadas coloridas e com a data, as bloqueadas com a regra para ganhar, e as **em breve**, que dependem de contas de aluno ou de exercícios novos.
- **Títulos da academia** pelo XP de todas as trilhas juntas: Estagiário(a) 0%, Aprendiz 10%, Assistente 25%, Especialista 50%, Mestre 75% e Arquimago(a) 95%. Os títulos de cada trilha continuam iguais.
- As regras ficam no bloco `ACHIEVEMENTS` do `index.html` (função `buildAchievements`), testadas em `tests/achievements.test.mjs`. O progresso guarda também os dias de estudo, os exercícios seguidos de primeira e as páginas de recursos abertas.
- **Crachá:** na página inicial, embaixo do banner, o crachá (`assets/cracha.webp`) mostra o avatar, o nome, o nível (o número do título), o XP até o próximo título, a trilha atual com a bandeirinha dela (a do último exercício aberto), o progresso dela por nível, o título atual e as 3 últimas medalhas. No celular ele vira um cartão empilhado.
- Imagens: `assets/badges/pt/` e `assets/badges/en/` (medalhas com texto) e `assets/badges/` (as sem texto, iguais nas duas línguas).

### O que tem na academia

- **Exercícios de código** com editor e botão "Rodar testes", com resultado em verde ou vermelho como num test runner de verdade.
- **Exercícios de Git** num terminal simulado, com o equivalente no VS Code para cada comando.
- **XP, títulos e medalhas** por trilha, dicas (custam 3 XP) e solução depois de 2 tentativas.
- **Regras da Loja**: as regras de negócio, cada uma ligada aos exercícios que a usam.
- **Catálogo de produtos**: os dados de mentira dos exercícios, em cartões ou em JSON.
- **Grimório do Git**: todos os comandos, erros comuns e glossário.
- **Princípios de design de código** (`#design`): antes de abrir, a Geekie Jackie avisa que é um conteúdo de reforço para quem já está na DEV ou já conhece código (**Sim** abre a página e vale até fechar o navegador; **Não** volta para a página inicial). SOLID, DRY, KISS e YAGNI num mapa, com o grimório no centro; cada cartão abre uma janela de status com o que é, por que importa, o sinal de alerta e o código antes e depois da lojinha. Os textos ficam em `design-principles.js` (testado em `tests/design-principles.test.mjs`) e as artes em `assets/design/`.
- **Glossário de programação**: 34 termos explicados de forma simples, em português e inglês, com exemplos da lojinha, busca (sem diferenciar acentos e maiúsculas), navegação A–Z e filtros por categoria e por trilha.
- **A lojinha** ([`shop/`](shop/)): um e-commerce de mentira com as mesmas regras e produtos, para treinar testes manuais, Cypress e testes de API. Veja o [guia da loja](shop/README.md).
- **Meu trabalho (.md)**: exporta o progresso e o código em Markdown.
- **Importar progresso**: o .md exportado termina com um bloco escondido (um comentário HTML, invisível no GitHub e no VS Code) com o progresso completo. Ao importar esse arquivo em qualquer navegador, o progresso daquele navegador é **substituído** pelo do arquivo, depois de uma confirmação. Arquivos exportados antes dessa função não têm o bloco. O formato fica no bloco `SAVE-FILE` do `index.html`, testado em `tests/save-file.test.mjs`.
- **Duas línguas**: português do Brasil e inglês. Código, comandos e nomes de testes ficam em inglês, como nos projetos reais.

### Como usar

É uma página, `index.html`, mais os arquivos de dados `start-track.js` (Trilha Inicial), `new-tracks.js` (Front End e Dados), `glossary.js` (glossário) e `design-principles.js`, sem nada para instalar. Abra no navegador ou publique com o GitHub Pages. O progresso fica salvo no navegador de quem usa.

### Como editar o conteúdo

Todo o conteúdo fica no primeiro bloco `<script>` do `index.html`, dentro de `buildContent()`. Cada texto tem as duas línguas lado a lado:

```js
title: L('Read the price tag', 'Leia a etiqueta de preço'),
```

Ao criar um exercício novo, confira duas coisas: o código inicial (`starter`) precisa **falhar** nos testes e a `solution` precisa **passar**.

Os exercícios da Trilha Inicial ficam em `start-track.js`, separados da página: cada um tem o tipo (`kind`), os textos, as dicas e a resposta certa. O comentário no topo do arquivo explica os campos de cada tipo. Os desafios de algoritmos da DEV ficam no bloco `ALGO-CHALLENGES` do `index.html` (função `buildAlgoChallenges`), cada um escrito com `S({...})`: enunciado, entrada, saída, restrições, exemplos, dicas, testes visíveis e ocultos (`hidden`) e a solução.

### Testes automatizados

Só precisa do Node (22 ou mais), sem instalar nada:

```sh
node --test "tests/*.test.mjs"
```

Eles conferem o cálculo do progresso, a pergunta abaixo de 60%, a abertura direta em exatamente 24 de 40 e que soluções reveladas não contam. Na Trilha Inicial, para cada um dos 40 exercícios e nas duas línguas: os campos, que a resposta certa passa e que o estado inicial e uma resposta errada não passam. Nos desafios da DEV, que a solução de referência passa em todos os testes (visíveis e ocultos) e que o código inicial falha. No glossário, conferem os campos nas duas línguas, que não há termos repetidos, que os exemplos em inglês não ficaram com português, a ordem alfabética, a busca (acentos, maiúsculas, sigla, sem resultados), os filtros e a barra A–Z.

### Como adicionar um termo ao glossário

Os termos ficam em `glossary.js`, separados da página. Copie um item da lista `GLOSSARY` e preencha `term`, `definition` (1 a 3 frases curtas) e `category` (uma de `GLOSSARY_CATEGORIES`). Preencha também `en` com a versão em inglês: `term` e `definition`, mais `abbr` e `example` se fizer sentido (sem `example` em `en`, o modo inglês usa o exemplo em português, o que serve quando ele é só código). `abbr` (sigla ou nome em inglês), `example` (código ou situação da lojinha, como comentário `// ...`) e `tracks` (`start`, `dev`, `qa`, `ai`) são opcionais. A ordem não importa: a página ordena sozinha. Depois rode os testes.

---

## 🇬🇧 English

You have just been hired as a tech intern at **Bruxa Maria’s** little tarot and Lenormand shop. To help the shop, you learn business rules, Git and programming principles by solving HackerRank-style challenges.

### Tracks

| Track | What you learn |
|---|---|
| **Start** | Logic in plain language, with boxes and diagrams, no code to write: 40 exercises (prerequisite of the others) |
| **Back End** | Git, objects, loops, conditionals and business rules in JavaScript, plus 30 algorithm challenges (it was the DEV track; the id is still `dev`) |
| **Front End** | Git, HTML and accessibility, CSS (selectors, cascade, box model, flexbox) and JavaScript that builds the shop window from data |
| **QA** | Git, Chai `expect()` assertions, bad data and boundary values |
| **AI** | Git, prompts built from data, hallucinations and reviewing AI-generated code |
| **Data** | Git, counting, summing and averaging orders, grouping by category and by day in JavaScript, reading SQL and picking the right chart |

Every track shares the same world: the shop’s products, orders, coupons and rules.

### Start here

On the home page, the **Start here** section has the guide card (the magic shop picture), which opens **How to play** (`#how-to`) with every rule, followed by the Start Track card.

### Start Track and unlocking

- **40 logic exercises, no code to write.** Steps are written in plain pseudocode (`FOR EACH price IN cart: total ← total + price`), in boxes and flowcharts, always set in the shop.
- **9 levels:** Think like a computer · Store information · Decide · Repeat · Organise · Check · The toolbox (folders, terminal, Git, API, JSON) · Bridge to code · Reinforcement. Each reinforcement exercise names the one it reinforces.
- **Exercise kinds**, all checked automatically: put the steps in order, pick the diamond’s question and predict the test cases, trace a variable in a table, predict the result, fill the empty box, find the step with the bug, match pairs and mark the right cases.
- **Bridge to code:** almost every exercise has **👀 See it in JavaScript**, the same algorithm in code, just to read. The “Bridge to code” level asks which code does what the boxes say.
- **The ideal is at least 24 of the 40 exercises (60%) before DEV, QA and AI**, reinforcement included. At 60% those tracks open straight away. Until then their cards show a tip with what is missing, and the Start Track card shows the progress.
- **Starting early is allowed:** opening DEV, QA or AI before 60% shows Geekie Jackie (art `assets/geekie-loading.webp`) explaining what the track teaches, reminding that the ideal is 60% of the Start Track and asking if the learner wants to start. **Yes** opens that track (kept per track in `earlyAccess`); **No** goes back to the Start Track. The DEV, QA and AI badges come with the 60%.
- **A revealed solution does not count:** after 2 attempts the learner may see the solution, but the exercise then gives 0 XP and does not count toward the 60%. “Solve it again on my own” restarts it; solved that way it counts (still 0 XP).
- Every exercise has 1 to 3 progressive hints (3 XP each).
- **The 30 JavaScript exercises** (inspired by classic HackerRank problems, with original statements) are now the DEV track’s **Algorithm challenges**.
- **Current limitation:** there is no server. The access rule lives in isolated functions (the `ACCESS-RULES` block in `index.html`) and runs in the browser, so editing `localStorage` bypasses it and the answers can be read in the page source. The plan is to move this to the backend (Supabase) later.
- New shop rules written for the statements: BR-ORD-06 (24-hour time), BR-LOY-01 (loyalty points) and BR-RES-01 (late reservation fee).

### Achievements (badges)

- The **Achievements** page (`#achievements`, linked under the XP) shows every badge: earned ones in colour with the date, locked ones with the rule to earn them, and **coming soon** ones that need student accounts or new exercises.
- **Academy titles** by the XP of all tracks together: Intern 0%, Apprentice 10%, Assistant 25%, Specialist 50%, Master 75% and Archmage 95%. Each track keeps its own ranks.
- The rules live in the `ACHIEVEMENTS` block of `index.html` (`buildAchievements`), tested in `tests/achievements.test.mjs`. Progress now also keeps study days, exercises solved in a row at the first try and the resource pages opened.
- **Badge card (crachá):** on the home page, under the banner, the card (`assets/cracha.webp`) shows the avatar, the name, the level (the title number), the XP to the next title, the current track with its pennant (the one of the last exercise opened), its progress per level, the current title and the 3 latest badges. On phones it becomes a stacked card.
- Images: `assets/badges/pt/` and `assets/badges/en/` (badges with text) and `assets/badges/` (the ones without text, shared by both languages).

### What’s inside

- **Code exercises** with an editor and a "Run tests" button, with green and red results like a real test runner.
- **Git exercises** in a simulated terminal, with the VS Code equivalent of each command.
- **XP, ranks and badges** per track, hints (3 XP each) and a solution after 2 failed attempts.
- **Shop Rulebook**: the business rules, each linked to the exercises that use it.
- **Product catalog**: the exercises’ mock data, as cards or as JSON.
- **Programming glossary**: 34 terms explained simply, with shop examples, search (ignoring accents and case), A–Z navigation and filters by category and track. In English and Portuguese, like the rest of the academy.
- **Git grimoire**: every command, common errors and a glossary.
- **Code design principles** (`#design`): before it opens, Geekie Jackie says it is extra content for those already on DEV or who know some code (**Yes** opens the page and lasts until the browser is closed; **No** goes back home). SOLID, DRY, KISS and YAGNI on a map, with the grimoire in the centre; each card opens a status window with what it is, why it matters, the warning sign and before/after code from the shop. The texts live in `design-principles.js` (tested in `tests/design-principles.test.mjs`) and the art in `assets/design/`.
- **The shop** ([`shop/`](shop/)): a mock e-commerce with the same rules and products, to practise manual tests, Cypress and API checks. See the [shop guide](shop/README.md).
- **My work (.md)**: exports progress and code as Markdown.
- **Import progress**: the exported .md ends with a hidden block (an HTML comment, invisible on GitHub and in VS Code) holding the full progress. Importing that file in any browser **replaces** that browser’s progress with the file’s, after a confirmation. Files exported before this feature don’t have the block. The format lives in the `SAVE-FILE` block of `index.html`, tested in `tests/save-file.test.mjs`.
- **Two languages**: Brazilian Portuguese and English. Code, commands and test names stay in English, like in real projects.

### How to use it

It is one page, `index.html`, plus the data files `start-track.js` (Start Track), `new-tracks.js` (Front End and Data), `glossary.js` (glossary) and `design-principles.js`, with nothing to install. Open it in a browser or publish it with GitHub Pages. Progress is saved in each learner’s browser.

### How to edit the content

All content lives in the first `<script>` block of `index.html`, inside `buildContent()`. Every text has both languages side by side:

```js
title: L('Read the price tag', 'Leia a etiqueta de preço'),
```

When you add an exercise, check two things: the `starter` code must **fail** the tests and the `solution` must **pass** them.

Start Track exercises live in `start-track.js`, apart from the page: each one has its kind, texts, hints and right answer; the comment at the top of the file explains the fields of each kind. DEV’s algorithm challenges live in the `ALGO-CHALLENGES` block of `index.html` (`buildAlgoChallenges`), each written with `S({...})`: statement, input, output, constraints, examples, hints, visible and `hidden` tests, and the solution.

### Automated tests

Only Node (22 or later) is needed, nothing to install:

```sh
node --test "tests/*.test.mjs"
```

They check the progress maths, the question below 60%, the direct opening at exactly 24 of 40 and that revealed solutions don’t count. For each of the 40 Start Track exercises, in both languages: the fields, that the right answer passes and that the starting state and a wrong answer don’t. For DEV’s challenges, that the reference solution passes every test (visible and hidden) and the starter code fails. For the glossary they check the fields in both languages, no duplicates, that English examples have no Portuguese left, the alphabetical order, the search (accents, case, acronyms, no results), the filters and the A–Z bar.

### Adding a glossary term

Terms live in `glossary.js`, apart from the page. Copy an item of `GLOSSARY` and fill in `term`, `definition` (1 to 3 short sentences) and `category` (one of `GLOSSARY_CATEGORIES`). Also fill in `en` with the English version: `term` and `definition`, plus `abbr` and `example` when useful (without `en.example`, English shows the Portuguese example, fine when it is only code). `abbr`, `example` and `tracks` (`start`, `dev`, `qa`, `ai`) are optional. Order doesn't matter: the page sorts them. Then run the tests.

---

Created by **Jacqueline (Jackie) Pereira** · [github.com/jacqueqa](https://github.com/jacqueqa)
