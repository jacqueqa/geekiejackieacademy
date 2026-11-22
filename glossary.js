/* =====================================================================
   GLOSSÁRIO DE TERMOS DE PROGRAMAÇÃO
   Recursos técnicos → Glossário (index.html#glossary)

   Só dados: a busca, a navegação A–Z e os filtros ficam no index.html (bloco GLOSSARY-LOGIC).
   A ordem aqui não importa: a página ordena tudo por ordem alfabética.

   Para adicionar um termo, copie um item e preencha:
     term        nome do termo, em português                       (obrigatório)
     abbr        sigla ou nome original em inglês                   (opcional)
     definition  1 a 3 frases curtas, para quem está começando      (obrigatório)
     example     mini exemplo de código ou situação da lojinha      (opcional)
                 Situações vão como comentários (// ...), para tudo aparecer em fonte de código.
     category    uma das GLOSSARY_CATEGORIES abaixo                 (obrigatório)
     tracks      trilhas relacionadas: 'start' (Inicial), 'dev', 'qa', 'ai'   (opcional)
     en          a versão em inglês: { term, abbr?, definition, example? }   (obrigatório)
                 Sem `example` em `en`, o modo inglês usa o exemplo em português (bom quando ele é só código).
   Depois rode os testes:  node --test "tests/*.test.mjs"
   ===================================================================== */

var GLOSSARY_CATEGORIES = ['Fundamentos', 'Estruturas e lógica', 'Web e dados', 'Ferramentas', 'Qualidade e testes'];
// The same categories in English (the Portuguese names are the ids used in `category`).
var GLOSSARY_CATEGORIES_EN = { 'Fundamentos': 'Fundamentals', 'Estruturas e lógica': 'Structures and logic', 'Web e dados': 'Web and data', 'Ferramentas': 'Tools', 'Qualidade e testes': 'Quality and testing' };

var GLOSSARY = [
  /* ---------- Fundamentos ---------- */
  {
    term: 'Algoritmo', abbr: 'algorithm', category: 'Fundamentos', tracks: ['start', 'dev'],
    definition: 'Uma sequência de passos bem definidos para resolver um problema. É como uma receita: seguindo os passos na ordem, você chega sempre ao mesmo resultado.',
    example: '// Algoritmo para fechar o caixa da lojinha:\n// 1. Começar o total em 0\n// 2. Para cada venda do dia, somar o valor ao total\n// 3. Mostrar o total no fim',
    en: {
      term: "Algorithm",
      definition: "A sequence of well-defined steps to solve a problem. It is like a recipe: follow the steps in order and you always reach the same result.",
      example: "// An algorithm to close the shop’s till:\n// 1. Start the total at 0\n// 2. For each sale of the day, add its value to the total\n// 3. Show the total at the end",
    },
  },
  {
    term: 'Variável', abbr: 'variable', category: 'Fundamentos', tracks: ['start', 'dev'],
    definition: 'Um nome que guarda um valor para você usar depois, como uma etiqueta numa caixa. O valor pode mudar ao longo do programa.',
    example: 'let stock = 12;      // 12 baralhos Rider-Waite na prateleira\nstock = stock - 1;   // vendemos um\nconsole.log(stock);  // 11',
    en: {
      term: "Variable",
      definition: "A name that stores a value so you can use it later, like a label on a box. The value can change while the program runs.",
      example: "let stock = 12;      // 12 Rider-Waite decks on the shelf\nstock = stock - 1;   // we sold one\nconsole.log(stock);  // 11",
    },
  },
  {
    term: 'Função', abbr: 'function', category: 'Fundamentos', tracks: ['start', 'dev'],
    definition: 'Um bloco de código com nome que faz uma tarefa. Você escreve uma vez e usa quantas vezes quiser, passando valores diferentes (os parâmetros).',
    example: 'function orderTotal(price, shipping) {\n  return price + shipping;\n}\n\norderTotal(3490, 490); // 3980 cêntimos = €39,80',
    en: {
      term: "Function",
      definition: "A named block of code that does one task. You write it once and use it as many times as you want, passing different values (the parameters).",
      example: "function orderTotal(price, shipping) {\n  return price + shipping;\n}\n\norderTotal(3490, 490); // 3980 cents = €39.80",
    },
  },
  {
    term: 'Sintaxe', abbr: 'syntax', category: 'Fundamentos', tracks: ['start', 'dev'],
    definition: 'As regras de escrita de uma linguagem: onde vão parênteses, chaves, vírgulas e aspas. Um erro de sintaxe impede o programa de rodar, como uma frase sem pé nem cabeça.',
    example: '// Certo:\nif (stock > 0) { sell(); }\n\n// Erro de sintaxe: faltou fechar o parêntese\nif (stock > 0 { sell(); }',
    en: {
      term: "Syntax",
      definition: "The writing rules of a language: where parentheses, braces, commas and quotes go. A syntax error stops the program from running, like a sentence that makes no sense.",
      example: "// Right:\nif (stock > 0) { sell(); }\n\n// Syntax error: the parenthesis is never closed\nif (stock > 0 { sell(); }",
    },
  },
  {
    term: 'Compilador vs Interpretador', abbr: 'compiler / interpreter', category: 'Fundamentos', tracks: ['start', 'dev'],
    definition: 'Os dois traduzem o seu código para o computador entender. O compilador traduz o programa inteiro antes de rodar; o interpretador vai traduzindo e executando enquanto o programa roda. Muitas linguagens modernas, como o JavaScript, misturam as duas ideias.',
    example: '// Compilado: você gera um programa pronto e depois executa\n// Interpretado: o navegador lê o JavaScript da lojinha\n//   e já vai executando, sem um passo separado',
    en: {
      term: "Compiler vs Interpreter",
      definition: "Both translate your code so the computer understands it. A compiler translates the whole program before it runs; an interpreter translates and runs it as it goes. Many modern languages, like JavaScript, mix both ideas.",
      example: "// Compiled: you build a ready program, then run it\n// Interpreted: the browser reads the shop’s JavaScript\n//   and runs it right away, with no separate step",
    },
  },
  {
    term: 'Programação Orientada a Objetos', abbr: 'POO · OOP', category: 'Fundamentos', tracks: ['dev', 'qa'],
    definition: 'Um jeito de organizar o código em objetos que juntam dados e ações. A classe é o molde, e cada objeto é uma peça feita com esse molde.',
    example: 'class Product {\n  constructor(name, price) {\n    this.name = name;\n    this.price = price;\n  }\n  withDiscount(percent) {\n    return this.price * (100 - percent) / 100;\n  }\n}\n\nconst deck = new Product("Lenormand deck", 2200);\ndeck.withDiscount(10); // 1980',
    en: {
      term: "Object-Oriented Programming", abbr: "OOP",
      definition: "A way to organise code into objects that bring data and actions together. The class is the mould, and each object is a piece made with that mould.",
    },
  },

  /* ---------- Estruturas e lógica ---------- */
  {
    term: 'Condição (if/else)', abbr: 'conditional', category: 'Estruturas e lógica', tracks: ['start', 'dev', 'qa'],
    definition: 'Uma pergunta que o programa faz para decidir o que fazer: se for verdade, faz uma coisa; senão, faz outra.',
    example: 'if (stock >= quantity) {\n  sell(quantity);\n} else {\n  showMessage("Esgotado");\n}',
    en: {
      term: "Condition (if/else)", abbr: "conditional",
      definition: "A question the program asks to decide what to do: if it is true, it does one thing; otherwise, it does another.",
      example: "if (stock >= quantity) {\n  sell(quantity);\n} else {\n  showMessage(\"Sold out\");\n}",
    },
  },
  {
    term: 'Loop (laço de repetição)', abbr: 'for · while', category: 'Estruturas e lógica', tracks: ['start', 'dev'],
    definition: 'Repete um bloco de código várias vezes, por exemplo uma vez para cada item de uma lista. Evita escrever a mesma coisa de novo e de novo.',
    example: 'const prices = [3490, 850, 850];\nlet total = 0;\nfor (const p of prices) {\n  total += p;\n}\n// total = 5190',
    en: {
      term: "Loop", abbr: "for · while",
      definition: "Repeats a block of code several times, for example once for each item of a list. It saves you from writing the same thing over and over.",
    },
  },
  {
    term: 'Array (lista)', abbr: 'array', category: 'Estruturas e lógica', tracks: ['start', 'dev', 'qa'],
    definition: 'Uma lista de valores em ordem, guardada numa só variável. Cada item tem uma posição, o índice, que começa em 0.',
    example: 'const skus = ["TAR-001", "LEN-001", "CAN-001"];\nskus[0];      // "TAR-001"\nskus.length;  // 3',
    en: {
      term: "Array", abbr: "list",
      definition: "A list of values in order, kept in a single variable. Each item has a position, the index, which starts at 0.",
    },
  },
  {
    term: 'Estrutura de Dados', abbr: 'data structure', category: 'Estruturas e lógica', tracks: ['start', 'dev'],
    definition: 'Uma forma de organizar dados para usar com facilidade. Arrays, objetos, pilhas e conjuntos são estruturas de dados, e cada uma é boa para um tipo de tarefa.',
    example: '// Array: a ordem importa (fila de pedidos)\nconst queue = ["ord-1001", "ord-1002"];\n\n// Objeto: buscar pelo nome do campo\nconst product = { sku: "TAR-001", price: 3490 };\n\n// Set: sem repetidos\nconst soldToday = new Set(["Tarot", "Tarot", "Crystals"]); // 2 itens',
    en: {
      term: "Data Structure",
      definition: "A way to organise data so it is easy to use. Arrays, objects, stacks and sets are data structures, and each one is good at a different kind of task.",
      example: "// Array: order matters (queue of orders)\nconst queue = [\"ord-1001\", \"ord-1002\"];\n\n// Object: look things up by field name\nconst product = { sku: \"TAR-001\", price: 3490 };\n\n// Set: no repeats\nconst soldToday = new Set([\"Tarot\", \"Tarot\", \"Crystals\"]); // 2 items",
    },
  },
  {
    term: 'Stack (pilha)', abbr: 'stack', category: 'Estruturas e lógica', tracks: ['start', 'dev'],
    definition: 'Uma estrutura em que o último item que entra é o primeiro que sai, como uma pilha de caixas de baralho. Atenção: “stack” também é usado para o conjunto de tecnologias de um projeto, como em “a stack do projeto é JavaScript”.',
    example: 'const boxes = [];\nboxes.push("Tarot");     // ["Tarot"]\nboxes.push("Lenormand"); // ["Tarot", "Lenormand"]\nboxes.pop();             // sai "Lenormand", o último que entrou',
    en: {
      term: "Stack",
      definition: "A structure where the last item in is the first one out, like a pile of deck boxes. Careful: “stack” also means the set of technologies of a project, as in “the project’s stack is JavaScript”.",
      example: "const boxes = [];\nboxes.push(\"Tarot\");     // [\"Tarot\"]\nboxes.push(\"Lenormand\"); // [\"Tarot\", \"Lenormand\"]\nboxes.pop();             // \"Lenormand\" comes out: the last one in",
    },
  },
  {
    term: 'Tratamento de Erros', abbr: 'error handling', category: 'Estruturas e lógica', tracks: ['dev', 'qa'],
    definition: 'Preparar o programa para quando algo der errado, para ele avisar com clareza em vez de travar ou mostrar uma tela em branco.',
    example: 'try {\n  createOrder(cart);\n} catch (error) {\n  showMessage("Não foi possível criar o pedido: " + error.message);\n}',
    en: {
      term: "Error Handling",
      definition: "Preparing the program for when something goes wrong, so it explains the problem clearly instead of crashing or showing a blank screen.",
      example: "try {\n  createOrder(cart);\n} catch (error) {\n  showMessage(\"The order could not be created: \" + error.message);\n}",
    },
  },
  {
    term: 'Otimização de Performance', abbr: 'performance optimization', category: 'Estruturas e lógica', tracks: ['dev'],
    definition: 'Fazer o programa gastar menos tempo ou memória para fazer a mesma coisa. A ordem certa é: primeiro funcionar, depois medir, e só então otimizar o que está lento.',
    example: '// Lento: procura no catálogo inteiro a cada venda\ncatalog.find(p => p.sku === sku);\n\n// Rápido: monta um mapa uma vez e busca direto\nconst bySku = new Map(catalog.map(p => [p.sku, p]));\nbySku.get(sku);',
    en: {
      term: "Performance Optimization",
      definition: "Making the program use less time or memory to do the same thing. The right order is: first make it work, then measure, and only then speed up what is slow.",
      example: "// Slow: searches the whole catalog on every sale\ncatalog.find(p => p.sku === sku);\n\n// Fast: build a map once and look it up directly\nconst bySku = new Map(catalog.map(p => [p.sku, p]));\nbySku.get(sku);",
    },
  },

  /* ---------- Web e dados ---------- */
  {
    term: 'HTML', abbr: 'HyperText Markup Language', category: 'Web e dados', tracks: ['dev', 'qa'],
    definition: 'A linguagem que descreve a estrutura de uma página web: títulos, parágrafos, botões e imagens. O navegador lê o HTML e desenha a página.',
    example: '<h1>Lojinha da Bruxa Maria</h1>\n<button data-test="add-to-cart">\n  Adicionar ao carrinho\n</button>',
    en: {
      term: "HTML", abbr: "HyperText Markup Language",
      definition: "The language that describes the structure of a web page: headings, paragraphs, buttons and images. The browser reads the HTML and draws the page.",
      example: "<h1>Bruxa Maria’s Shop</h1>\n<button data-test=\"add-to-cart\">\n  Add to cart\n</button>",
    },
  },
  {
    term: 'JSON', abbr: 'JavaScript Object Notation', category: 'Web e dados', tracks: ['dev', 'qa', 'ai'],
    definition: 'Um formato de texto para guardar e enviar dados, com pares de nome e valor. É o formato que a API da lojinha usa nas respostas.',
    example: '{\n  "sku": "TAR-001",\n  "name": "Rider-Waite Tarot",\n  "price": 34.9,\n  "stock": 12\n}',
    en: {
      term: "JSON", abbr: "JavaScript Object Notation",
      definition: "A text format to store and send data, as pairs of names and values. It is the format the shop’s API uses in its responses.",
    },
  },
  {
    term: 'XML', abbr: 'eXtensible Markup Language', category: 'Web e dados', tracks: ['dev'],
    definition: 'Outro formato de texto para dados, com etiquetas (tags) parecidas com as do HTML. É mais antigo e mais longo que o JSON, mas ainda aparece em integrações e documentos fiscais.',
    example: '<product>\n  <sku>TAR-001</sku>\n  <name>Rider-Waite Tarot</name>\n  <price>34.90</price>\n</product>',
    en: {
      term: "XML", abbr: "eXtensible Markup Language",
      definition: "Another text format for data, with tags similar to the ones in HTML. It is older and longer than JSON, but it still shows up in integrations and tax documents.",
    },
  },
  {
    term: 'YAML', abbr: 'YAML Ain’t Markup Language', category: 'Web e dados', tracks: ['dev', 'qa'],
    definition: 'Um formato de texto muito usado em arquivos de configuração. Em vez de chaves, ele usa recuo (espaços) para mostrar o que fica dentro de quê.',
    example: '# Configuração dos testes da lojinha\nbaseUrl: https://lojinha.example.com\nbrowsers:\n  - chrome\n  - firefox\nretries: 2',
    en: {
      term: "YAML", abbr: "YAML Ain’t Markup Language",
      definition: "A text format used a lot for configuration files. Instead of braces, it uses indentation (spaces) to show what goes inside what.",
      example: "# Settings for the shop tests\nbaseUrl: https://shop.example.com\nbrowsers:\n  - chrome\n  - firefox\nretries: 2",
    },
  },
  {
    term: 'API', abbr: 'Application Programming Interface', category: 'Web e dados', tracks: ['dev', 'qa'],
    definition: 'Uma porta de comunicação entre programas. Um programa faz um pedido (a requisição) e a API devolve uma resposta, geralmente em JSON.',
    example: 'GET /api/products/TAR-001\n→ 200 OK\n{ "sku": "TAR-001", "price": 34.9, "stock": 12 }',
    en: {
      term: "API", abbr: "Application Programming Interface",
      definition: "A door that lets programs talk to each other. One program makes a request and the API sends back a response, usually in JSON.",
    },
  },
  {
    term: 'Desenvolvimento Web', abbr: 'web development', category: 'Web e dados', tracks: ['dev', 'qa'],
    definition: 'Criar sites e aplicações que rodam no navegador. Costuma ter a parte da frente (front-end: o que a cliente vê e clica) e a parte de trás (back-end: o servidor, as regras e os dados).',
    example: '// Front-end: a página da lojinha e o botão "Finalizar compra"\n// Back-end: a API que confere o estoque e cria o pedido',
    en: {
      term: "Web Development",
      definition: "Building sites and applications that run in the browser. It usually has a front-end (what the customer sees and clicks) and a back-end (the server, the rules and the data).",
      example: "// Front-end: the shop page and the \"Checkout\" button\n// Back-end: the API that checks the stock and creates the order",
    },
  },

  /* ---------- Ferramentas ---------- */
  {
    term: 'Git', category: 'Ferramentas', tracks: ['dev', 'qa', 'ai'],
    definition: 'Uma ferramenta que guarda o histórico das mudanças do código. Cada commit é uma foto do projeto que você pode consultar ou desfazer depois.',
    example: 'git add .\ngit commit -m "feat: block sales without stock"\ngit push',
    en: {
      term: "Git",
      definition: "A tool that keeps the history of every change to the code. Each commit is a snapshot of the project that you can look at or undo later.",
    },
  },
  {
    term: 'Controle de Versão', abbr: 'version control', category: 'Ferramentas', tracks: ['dev', 'qa', 'ai'],
    definition: 'A prática de registrar cada mudança do código: quem mudou, quando e por quê. Permite várias pessoas trabalharem juntas e voltar atrás quando algo quebra. O Git é a ferramenta mais usada para isso.',
    example: '// Ana corrige os cupons na branch feature/101_coupon-rules\n// Bia mexe no frete na branch feature/102_shipping\n// As duas juntam o trabalho na main sem apagar o da outra',
    en: {
      term: "Version Control",
      definition: "The practice of recording every change to the code: who changed it, when and why. It lets several people work together and go back when something breaks. Git is the most used tool for it.",
      example: "// Ana fixes the coupons on the branch feature/101_coupon-rules\n// Bia changes shipping on the branch feature/102_shipping\n// Both merge their work into main without erasing each other’s",
    },
  },
  {
    term: 'IDE', abbr: 'Integrated Development Environment', category: 'Ferramentas', tracks: ['start', 'dev', 'qa', 'ai'],
    definition: 'O programa onde você escreve código, com ajudas como cores, sugestões, terminal e ferramentas para achar erros. Na academia usamos o VS Code.',
    en: {
      term: "IDE", abbr: "Integrated Development Environment",
      definition: "The program where you write code, with helpers like colours, suggestions, a terminal and tools to find errors. At the academy we use VS Code.",
    },
  },
  {
    term: 'Biblioteca', abbr: 'library', category: 'Ferramentas', tracks: ['dev', 'qa'],
    definition: 'Código pronto, escrito por outras pessoas, que você adiciona ao projeto para não reinventar a roda. Quando precisa, você chama as funções dela.',
    example: '// Chai é uma biblioteca de asserções usada nos testes:\nexpect(res.status).to.equal(201);',
    en: {
      term: "Library",
      definition: "Ready-made code, written by other people, that you add to your project so you don’t reinvent the wheel. You call its functions when you need them.",
      example: "// Chai is an assertion library used in the tests:\nexpect(res.status).to.equal(201);",
    },
  },
  {
    term: 'Framework', category: 'Ferramentas', tracks: ['dev', 'qa'],
    definition: 'Uma estrutura pronta que organiza o projeto e comanda o fluxo principal; você preenche as partes. A diferença para a biblioteca: você chama a biblioteca, mas é o framework que chama o seu código.',
    example: '// Cypress é um framework de testes:\n// ele abre o navegador e chama o seu teste\ndescribe("checkout", () => {\n  it("creates the order", () => { /* seu código */ });\n});',
    en: {
      term: "Framework",
      definition: "A ready-made structure that organises the project and runs the main flow; you fill in the parts. The difference from a library: you call a library, but a framework calls your code.",
      example: "// Cypress is a testing framework:\n// it opens the browser and calls your test\ndescribe(\"checkout\", () => {\n  it(\"creates the order\", () => { /* your code */ });\n});",
    },
  },
  {
    term: 'Prompt', category: 'Ferramentas', tracks: ['ai'],
    definition: 'O texto que você escreve para pedir algo a um modelo de IA. Quanto mais claro e com mais contexto, melhor a resposta.',
    example: 'const prompt = `Escreva uma descrição de até 200 caracteres\npara o produto "${product.name}" (${product.category}).\nNão invente preços nem promoções.`;',
    en: {
      term: "Prompt",
      definition: "The text you write to ask an AI model for something. The clearer it is and the more context it has, the better the answer.",
      example: "const prompt = `Write a description of up to 200 characters\nfor the product \"${product.name}\" (${product.category}).\nDo not invent prices or offers.`;",
    },
  },
  {
    term: 'Modelo de IA', abbr: 'AI model', category: 'Ferramentas', tracks: ['ai'],
    definition: 'Um programa treinado com muitos exemplos para reconhecer padrões e gerar respostas, como textos ou imagens. Ele pode errar e até inventar coisas (alucinar), por isso a resposta precisa sempre ser conferida.',
    example: '// O oráculo da lojinha é um modelo de IA.\n// Ele recomendou o "Dragon egg" (DRG-999),\n// que não existe no catálogo: uma alucinação.',
    en: {
      term: "AI Model",
      definition: "A program trained on many examples to recognise patterns and generate answers, like text or images. It can be wrong and even make things up (hallucinate), so its answers always need checking.",
      example: "// The shop’s oracle is an AI model.\n// It recommended the \"Dragon egg\" (DRG-999),\n// which is not in the catalog: a hallucination.",
    },
  },

  /* ---------- Qualidade e testes ---------- */
  {
    term: 'Bug', category: 'Qualidade e testes', tracks: ['dev', 'qa'],
    definition: 'Um erro no programa que faz ele se comportar diferente do esperado. Em inglês, “bug” quer dizer inseto.',
    example: '// Regra: pode vender a última unidade.\n// Bug: com stock 1 e quantity 1, o ">" bloqueia a venda\nreturn stock > quantity;   // o certo é stock >= quantity',
    en: {
      term: "Bug",
      definition: "A mistake in the program that makes it behave differently from what was expected. In everyday English, “bug” means a small insect.",
      example: "// Rule: the last unit can be sold.\n// Bug: with stock 1 and quantity 1, the \">\" blocks the sale\nreturn stock > quantity;   // it should be stock >= quantity",
    },
  },
  {
    term: 'Debug (depuração)', abbr: 'debugging', category: 'Qualidade e testes', tracks: ['start', 'dev', 'qa'],
    definition: 'Procurar e corrigir a causa de um bug. Você investiga passo a passo: olha os valores, testa uma hipótese de cada vez e confirma a correção.',
    example: 'console.log("stock:", stock, "quantity:", quantity);\n// stock: 1 quantity: 1 → a regra deveria deixar vender!',
    en: {
      term: "Debugging", abbr: "debug",
      definition: "Finding and fixing the cause of a bug. You investigate step by step: look at the values, test one idea at a time and confirm the fix.",
      example: "console.log(\"stock:\", stock, \"quantity:\", quantity);\n// stock: 1 quantity: 1 → the rule should allow the sale!",
    },
  },
  {
    term: 'Refatoração', abbr: 'refactoring', category: 'Qualidade e testes', tracks: ['dev', 'ai'],
    definition: 'Melhorar o código por dentro sem mudar o que ele faz por fora: nomes mais claros, partes repetidas reunidas numa função. Os testes garantem que nada quebrou no caminho.',
    example: '// Antes\nconst t = p1 + p2 + p3;\n\n// Depois: mesmo resultado, mais fácil de ler\nconst subtotal = cartSubtotal([p1, p2, p3]);',
    en: {
      term: "Refactoring",
      definition: "Improving code on the inside without changing what it does on the outside: clearer names, repeated parts gathered into a function. The tests make sure nothing broke along the way.",
      example: "// Before\nconst t = p1 + p2 + p3;\n\n// After: same result, easier to read\nconst subtotal = cartSubtotal([p1, p2, p3]);",
    },
  },
  {
    term: 'Garantia de Qualidade', abbr: 'QA · Quality Assurance', category: 'Qualidade e testes', tracks: ['qa'],
    definition: 'O trabalho de garantir que o software faz o que deveria, prevenindo e encontrando problemas antes que cheguem à cliente. Envolve entender as regras, planejar testes e conferir os resultados.',
    example: '// Regra BR-CPN-01: o cupom vale até o dia expiresOn, inclusive.\n// QA pergunta: e no próprio dia? E no dia seguinte?',
    en: {
      term: "Quality Assurance", abbr: "QA",
      definition: "The work of making sure the software does what it should, preventing and finding problems before they reach the customer. It means understanding the rules, planning tests and checking the results.",
      example: "// Rule BR-CPN-01: a coupon is valid up to and including expiresOn.\n// QA asks: and on that very day? And on the day after?",
    },
  },
  {
    term: 'Testes', abbr: 'testing', category: 'Qualidade e testes', tracks: ['qa', 'dev'],
    definition: 'Verificar se o programa funciona como esperado, comparando o resultado obtido com o resultado esperado. Podem ser feitos à mão ou com código.',
    example: '// Esperado: pedido sem estoque recusado com 409\n// Obtido:   409 "OUT_OF_STOCK"  → passou ✓',
    en: {
      term: "Testing",
      definition: "Checking that the program works as expected, by comparing the actual result with the expected one. It can be done by hand or with code.",
      example: "// Expected: an order without stock is refused with 409\n// Actual:   409 \"OUT_OF_STOCK\"  → passed ✓",
    },
  },
  {
    term: 'Caso de teste', abbr: 'test case', category: 'Qualidade e testes', tracks: ['qa', 'start'],
    definition: 'Um cenário específico para testar: os dados de entrada, os passos e o resultado esperado. Bons casos de teste cobrem também os limites e os dados ruins.',
    example: '// Dado:   a Crystal ball tem stock 1\n// Quando: a cliente compra 1 unidade\n// Então:  o pedido é criado (201)',
    en: {
      term: "Test Case",
      definition: "One specific scenario to test: the input data, the steps and the expected result. Good test cases also cover the limits and the bad data.",
      example: "// Given: the Crystal ball has stock 1\n// When:  the customer buys 1 unit\n// Then:  the order is created (201)",
    },
  },
  {
    term: 'Teste automatizado', abbr: 'automated test', category: 'Qualidade e testes', tracks: ['qa', 'dev'],
    definition: 'Um teste escrito em código que o computador roda sozinho, quantas vezes for preciso. Ele avisa rápido quando uma mudança quebra algo que funcionava.',
    example: 'it("refuses an order out of stock", async () => {\n  const res = await api.post("/api/orders", {\n    items: [{ sku: "TAR-004", quantity: 1 }],\n  });\n  expect(res.status).to.equal(409);\n});',
    en: {
      term: "Automated Test",
      definition: "A test written in code that the computer runs by itself, as many times as needed. It warns you quickly when a change breaks something that used to work.",
    },
  },
  {
    term: 'Zero Day', abbr: 'dia zero', category: 'Qualidade e testes', tracks: ['qa'],
    definition: 'Uma falha de segurança que os responsáveis pelo software ainda não conhecem, ou que ainda não tem correção. O nome vem de a equipe ter tido “zero dias” para corrigir quando o ataque acontece.',
    example: '// Atacantes descobrem uma falha no pagamento da lojinha\n// antes da equipe. Ainda não existe correção:\n// isso é uma vulnerabilidade zero day.',
    en: {
      term: "Zero Day", abbr: "zero-day",
      definition: "A security flaw that the people responsible for the software don’t know about yet, or that has no fix yet. The name comes from the team having had “zero days” to fix it when the attack happens.",
      example: "// Attackers find a flaw in the shop’s payments\n// before the team does. There is no fix yet:\n// that is a zero-day vulnerability.",
    },
  },
];
