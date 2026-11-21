# 🧙‍♀️ Geekie Jackie Academy

**Learn. Build. Test. Evolve.**

🇧🇷 [Português](#-português) · 🇬🇧 [English](#-english)

---

## 🇧🇷 Português

Você acaba de ser contratado como estagiário de tecnologia na lojinha de tarot e baralho cigano da **Bruxa Maria**. Para ajudar a loja, você vai aprender regras de negócio, Git e princípios de programação, resolvendo desafios no estilo HackerRank.

### Trilhas

| Trilha | O que se aprende |
|---|---|
| **DEV** | Git, objetos, loops, condicionais e regras de negócio em JavaScript |
| **QA** | Git, asserções com Chai `expect()`, dados ruins e valores-limite |
| **IA** | Git, prompts montados a partir de dados, alucinações e revisão de código gerado por IA |

Todas as trilhas usam o mesmo universo: os produtos, pedidos, cupons e regras da lojinha.

### O que tem na academia

- **Exercícios de código** com editor e botão "Rodar testes", com resultado em verde ou vermelho como num test runner de verdade.
- **Exercícios de Git** num terminal simulado, com o equivalente no VS Code para cada comando.
- **XP, títulos e medalhas** por trilha, dicas (custam 3 XP) e solução depois de 2 tentativas.
- **Regras da Loja**: as regras de negócio, cada uma ligada aos exercícios que a usam.
- **Catálogo de produtos**: os dados de mentira dos exercícios, em cartões ou em JSON.
- **Grimório do Git**: todos os comandos, erros comuns e glossário.
- **A lojinha** ([`shop/`](shop/)): um e-commerce de mentira com as mesmas regras e produtos, para treinar testes manuais, Cypress e testes de API. Veja o [guia da loja](shop/README.md).
- **Meu trabalho (.md)**: exporta o progresso e o código em Markdown.
- **Duas línguas**: português do Brasil e inglês. Código, comandos e nomes de testes ficam em inglês, como nos projetos reais.

### Como usar

É um único arquivo, `index.html`, sem nada para instalar. Abra no navegador ou publique com o GitHub Pages. O progresso fica salvo no navegador de quem usa.

### Como editar o conteúdo

Todo o conteúdo fica no primeiro bloco `<script>` do `index.html`, dentro de `buildContent()`. Cada texto tem as duas línguas lado a lado:

```js
title: L('Read the price tag', 'Leia a etiqueta de preço'),
```

Ao criar um exercício novo, confira duas coisas: o código inicial (`starter`) precisa **falhar** nos testes e a `solution` precisa **passar**.

---

## 🇬🇧 English

You have just been hired as a tech intern at **Bruxa Maria’s** little tarot and Lenormand shop. To help the shop, you learn business rules, Git and programming principles by solving HackerRank-style challenges.

### Tracks

| Track | What you learn |
|---|---|
| **DEV** | Git, objects, loops, conditionals and business rules in JavaScript |
| **QA** | Git, Chai `expect()` assertions, bad data and boundary values |
| **AI** | Git, prompts built from data, hallucinations and reviewing AI-generated code |

Every track shares the same world: the shop’s products, orders, coupons and rules.

### What’s inside

- **Code exercises** with an editor and a "Run tests" button, with green and red results like a real test runner.
- **Git exercises** in a simulated terminal, with the VS Code equivalent of each command.
- **XP, ranks and badges** per track, hints (3 XP each) and a solution after 2 failed attempts.
- **Shop Rulebook**: the business rules, each linked to the exercises that use it.
- **Product catalog**: the exercises’ mock data, as cards or as JSON.
- **Git grimoire**: every command, common errors and a glossary.
- **The shop** ([`shop/`](shop/)): a mock e-commerce with the same rules and products, to practise manual tests, Cypress and API checks. See the [shop guide](shop/README.md).
- **My work (.md)**: exports progress and code as Markdown.
- **Two languages**: Brazilian Portuguese and English. Code, commands and test names stay in English, like in real projects.

### How to use it

It is a single `index.html` file with nothing to install. Open it in a browser or publish it with GitHub Pages. Progress is saved in each learner’s browser.

### How to edit the content

All content lives in the first `<script>` block of `index.html`, inside `buildContent()`. Every text has both languages side by side:

```js
title: L('Read the price tag', 'Leia a etiqueta de preço'),
```

When you add an exercise, check two things: the `starter` code must **fail** the tests and the `solution` must **pass** them.

---

Created by **Jacqueline (Jackie) Pereira** · [github.com/jacqueqa](https://github.com/jacqueqa)
