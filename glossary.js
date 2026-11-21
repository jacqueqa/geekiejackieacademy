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
   Depois rode os testes:  node --test "tests/*.test.mjs"
   ===================================================================== */

var GLOSSARY_CATEGORIES = ['Fundamentos', 'Estruturas e lógica', 'Web e dados', 'Ferramentas', 'Qualidade e testes'];

var GLOSSARY = [
  /* ---------- Fundamentos ---------- */
  {
    term: 'Algoritmo', abbr: 'algorithm', category: 'Fundamentos', tracks: ['start', 'dev'],
    definition: 'Uma sequência de passos bem definidos para resolver um problema. É como uma receita: seguindo os passos na ordem, você chega sempre ao mesmo resultado.',
    example: '// Algoritmo para fechar o caixa da lojinha:\n// 1. Começar o total em 0\n// 2. Para cada venda do dia, somar o valor ao total\n// 3. Mostrar o total no fim',
  },
  {
    term: 'Variável', abbr: 'variable', category: 'Fundamentos', tracks: ['start', 'dev'],
    definition: 'Um nome que guarda um valor para você usar depois, como uma etiqueta numa caixa. O valor pode mudar ao longo do programa.',
    example: 'let stock = 12;      // 12 baralhos Rider-Waite na prateleira\nstock = stock - 1;   // vendemos um\nconsole.log(stock);  // 11',
  },
  {
    term: 'Função', abbr: 'function', category: 'Fundamentos', tracks: ['start', 'dev'],
    definition: 'Um bloco de código com nome que faz uma tarefa. Você escreve uma vez e usa quantas vezes quiser, passando valores diferentes (os parâmetros).',
    example: 'function orderTotal(price, shipping) {\n  return price + shipping;\n}\n\norderTotal(3490, 490); // 3980 cêntimos = €39,80',
  },
  {
    term: 'Sintaxe', abbr: 'syntax', category: 'Fundamentos', tracks: ['start', 'dev'],
    definition: 'As regras de escrita de uma linguagem: onde vão parênteses, chaves, vírgulas e aspas. Um erro de sintaxe impede o programa de rodar, como uma frase sem pé nem cabeça.',
    example: '// Certo:\nif (stock > 0) { sell(); }\n\n// Erro de sintaxe: faltou fechar o parêntese\nif (stock > 0 { sell(); }',
  },
  {
    term: 'Compilador vs Interpretador', abbr: 'compiler / interpreter', category: 'Fundamentos', tracks: ['start', 'dev'],
    definition: 'Os dois traduzem o seu código para o computador entender. O compilador traduz o programa inteiro antes de rodar; o interpretador vai traduzindo e executando enquanto o programa roda. Muitas linguagens modernas, como o JavaScript, misturam as duas ideias.',
    example: '// Compilado: você gera um programa pronto e depois executa\n// Interpretado: o navegador lê o JavaScript da lojinha\n//   e já vai executando, sem um passo separado',
  },
  {
    term: 'Programação Orientada a Objetos', abbr: 'POO · OOP', category: 'Fundamentos', tracks: ['dev', 'qa'],
    definition: 'Um jeito de organizar o código em objetos que juntam dados e ações. A classe é o molde, e cada objeto é uma peça feita com esse molde.',
    example: 'class Product {\n  constructor(name, price) {\n    this.name = name;\n    this.price = price;\n  }\n  withDiscount(percent) {\n    return this.price * (100 - percent) / 100;\n  }\n}\n\nconst deck = new Product("Lenormand deck", 2200);\ndeck.withDiscount(10); // 1980',
  },

  /* ---------- Estruturas e lógica ---------- */
  {
    term: 'Condição (if/else)', abbr: 'conditional', category: 'Estruturas e lógica', tracks: ['start', 'dev', 'qa'],
    definition: 'Uma pergunta que o programa faz para decidir o que fazer: se for verdade, faz uma coisa; senão, faz outra.',
    example: 'if (stock >= quantity) {\n  sell(quantity);\n} else {\n  showMessage("Esgotado");\n}',
  },
  {
    term: 'Loop (laço de repetição)', abbr: 'for · while', category: 'Estruturas e lógica', tracks: ['start', 'dev'],
    definition: 'Repete um bloco de código várias vezes, por exemplo uma vez para cada item de uma lista. Evita escrever a mesma coisa de novo e de novo.',
    example: 'const prices = [3490, 850, 850];\nlet total = 0;\nfor (const p of prices) {\n  total += p;\n}\n// total = 5190',
  },
  {
    term: 'Array (lista)', abbr: 'array', category: 'Estruturas e lógica', tracks: ['start', 'dev', 'qa'],
    definition: 'Uma lista de valores em ordem, guardada numa só variável. Cada item tem uma posição, o índice, que começa em 0.',
    example: 'const skus = ["TAR-001", "LEN-001", "CAN-001"];\nskus[0];      // "TAR-001"\nskus.length;  // 3',
  },
  {
    term: 'Estrutura de Dados', abbr: 'data structure', category: 'Estruturas e lógica', tracks: ['start', 'dev'],
    definition: 'Uma forma de organizar dados para usar com facilidade. Arrays, objetos, pilhas e conjuntos são estruturas de dados, e cada uma é boa para um tipo de tarefa.',
    example: '// Array: a ordem importa (fila de pedidos)\nconst queue = ["ord-1001", "ord-1002"];\n\n// Objeto: buscar pelo nome do campo\nconst product = { sku: "TAR-001", price: 3490 };\n\n// Set: sem repetidos\nconst soldToday = new Set(["Tarot", "Tarot", "Crystals"]); // 2 itens',
  },
  {
    term: 'Stack (pilha)', abbr: 'stack', category: 'Estruturas e lógica', tracks: ['start', 'dev'],
    definition: 'Uma estrutura em que o último item que entra é o primeiro que sai, como uma pilha de caixas de baralho. Atenção: “stack” também é usado para o conjunto de tecnologias de um projeto, como em “a stack do projeto é JavaScript”.',
    example: 'const boxes = [];\nboxes.push("Tarot");     // ["Tarot"]\nboxes.push("Lenormand"); // ["Tarot", "Lenormand"]\nboxes.pop();             // sai "Lenormand", o último que entrou',
  },
  {
    term: 'Tratamento de Erros', abbr: 'error handling', category: 'Estruturas e lógica', tracks: ['dev', 'qa'],
    definition: 'Preparar o programa para quando algo der errado, para ele avisar com clareza em vez de travar ou mostrar uma tela em branco.',
    example: 'try {\n  createOrder(cart);\n} catch (error) {\n  showMessage("Não foi possível criar o pedido: " + error.message);\n}',
  },
  {
    term: 'Otimização de Performance', abbr: 'performance optimization', category: 'Estruturas e lógica', tracks: ['dev'],
    definition: 'Fazer o programa gastar menos tempo ou memória para fazer a mesma coisa. A ordem certa é: primeiro funcionar, depois medir, e só então otimizar o que está lento.',
    example: '// Lento: procura no catálogo inteiro a cada venda\ncatalog.find(p => p.sku === sku);\n\n// Rápido: monta um mapa uma vez e busca direto\nconst bySku = new Map(catalog.map(p => [p.sku, p]));\nbySku.get(sku);',
  },

  /* ---------- Web e dados ---------- */
  {
    term: 'HTML', abbr: 'HyperText Markup Language', category: 'Web e dados', tracks: ['dev', 'qa'],
    definition: 'A linguagem que descreve a estrutura de uma página web: títulos, parágrafos, botões e imagens. O navegador lê o HTML e desenha a página.',
    example: '<h1>Lojinha da Bruxa Maria</h1>\n<button data-test="add-to-cart">\n  Adicionar ao carrinho\n</button>',
  },
  {
    term: 'JSON', abbr: 'JavaScript Object Notation', category: 'Web e dados', tracks: ['dev', 'qa', 'ai'],
    definition: 'Um formato de texto para guardar e enviar dados, com pares de nome e valor. É o formato que a API da lojinha usa nas respostas.',
    example: '{\n  "sku": "TAR-001",\n  "name": "Rider-Waite Tarot",\n  "price": 34.9,\n  "stock": 12\n}',
  },
  {
    term: 'XML', abbr: 'eXtensible Markup Language', category: 'Web e dados', tracks: ['dev'],
    definition: 'Outro formato de texto para dados, com etiquetas (tags) parecidas com as do HTML. É mais antigo e mais longo que o JSON, mas ainda aparece em integrações e documentos fiscais.',
    example: '<product>\n  <sku>TAR-001</sku>\n  <name>Rider-Waite Tarot</name>\n  <price>34.90</price>\n</product>',
  },
  {
    term: 'YAML', abbr: 'YAML Ain’t Markup Language', category: 'Web e dados', tracks: ['dev', 'qa'],
    definition: 'Um formato de texto muito usado em arquivos de configuração. Em vez de chaves, ele usa recuo (espaços) para mostrar o que fica dentro de quê.',
    example: '# Configuração dos testes da lojinha\nbaseUrl: https://lojinha.example.com\nbrowsers:\n  - chrome\n  - firefox\nretries: 2',
  },
  {
    term: 'API', abbr: 'Application Programming Interface', category: 'Web e dados', tracks: ['dev', 'qa'],
    definition: 'Uma porta de comunicação entre programas. Um programa faz um pedido (a requisição) e a API devolve uma resposta, geralmente em JSON.',
    example: 'GET /api/products/TAR-001\n→ 200 OK\n{ "sku": "TAR-001", "price": 34.9, "stock": 12 }',
  },
  {
    term: 'Desenvolvimento Web', abbr: 'web development', category: 'Web e dados', tracks: ['dev', 'qa'],
    definition: 'Criar sites e aplicações que rodam no navegador. Costuma ter a parte da frente (front-end: o que a cliente vê e clica) e a parte de trás (back-end: o servidor, as regras e os dados).',
    example: '// Front-end: a página da lojinha e o botão "Finalizar compra"\n// Back-end: a API que confere o estoque e cria o pedido',
  },

  /* ---------- Ferramentas ---------- */
  {
    term: 'Git', category: 'Ferramentas', tracks: ['dev', 'qa', 'ai'],
    definition: 'Uma ferramenta que guarda o histórico das mudanças do código. Cada commit é uma foto do projeto que você pode consultar ou desfazer depois.',
    example: 'git add .\ngit commit -m "feat: block sales without stock"\ngit push',
  },
  {
    term: 'Controle de Versão', abbr: 'version control', category: 'Ferramentas', tracks: ['dev', 'qa', 'ai'],
    definition: 'A prática de registrar cada mudança do código: quem mudou, quando e por quê. Permite várias pessoas trabalharem juntas e voltar atrás quando algo quebra. O Git é a ferramenta mais usada para isso.',
    example: '// Ana corrige os cupons na branch feature/101_coupon-rules\n// Bia mexe no frete na branch feature/102_shipping\n// As duas juntam o trabalho na main sem apagar o da outra',
  },
  {
    term: 'IDE', abbr: 'Integrated Development Environment', category: 'Ferramentas', tracks: ['start', 'dev', 'qa', 'ai'],
    definition: 'O programa onde você escreve código, com ajudas como cores, sugestões, terminal e ferramentas para achar erros. Na academia usamos o VS Code.',
  },
  {
    term: 'Biblioteca', abbr: 'library', category: 'Ferramentas', tracks: ['dev', 'qa'],
    definition: 'Código pronto, escrito por outras pessoas, que você adiciona ao projeto para não reinventar a roda. Quando precisa, você chama as funções dela.',
    example: '// Chai é uma biblioteca de asserções usada nos testes:\nexpect(res.status).to.equal(201);',
  },
  {
    term: 'Framework', category: 'Ferramentas', tracks: ['dev', 'qa'],
    definition: 'Uma estrutura pronta que organiza o projeto e comanda o fluxo principal; você preenche as partes. A diferença para a biblioteca: você chama a biblioteca, mas é o framework que chama o seu código.',
    example: '// Cypress é um framework de testes:\n// ele abre o navegador e chama o seu teste\ndescribe("checkout", () => {\n  it("creates the order", () => { /* seu código */ });\n});',
  },
  {
    term: 'Prompt', category: 'Ferramentas', tracks: ['ai'],
    definition: 'O texto que você escreve para pedir algo a um modelo de IA. Quanto mais claro e com mais contexto, melhor a resposta.',
    example: 'const prompt = `Escreva uma descrição de até 200 caracteres\npara o produto "${product.name}" (${product.category}).\nNão invente preços nem promoções.`;',
  },
  {
    term: 'Modelo de IA', abbr: 'AI model', category: 'Ferramentas', tracks: ['ai'],
    definition: 'Um programa treinado com muitos exemplos para reconhecer padrões e gerar respostas, como textos ou imagens. Ele pode errar e até inventar coisas (alucinar), por isso a resposta precisa sempre ser conferida.',
    example: '// O oráculo da lojinha é um modelo de IA.\n// Ele recomendou o "Dragon egg" (DRG-999),\n// que não existe no catálogo: uma alucinação.',
  },

  /* ---------- Qualidade e testes ---------- */
  {
    term: 'Bug', category: 'Qualidade e testes', tracks: ['dev', 'qa'],
    definition: 'Um erro no programa que faz ele se comportar diferente do esperado. Em inglês, “bug” quer dizer inseto.',
    example: '// Regra: pode vender a última unidade.\n// Bug: com stock 1 e quantity 1, o ">" bloqueia a venda\nreturn stock > quantity;   // o certo é stock >= quantity',
  },
  {
    term: 'Debug (depuração)', abbr: 'debugging', category: 'Qualidade e testes', tracks: ['start', 'dev', 'qa'],
    definition: 'Procurar e corrigir a causa de um bug. Você investiga passo a passo: olha os valores, testa uma hipótese de cada vez e confirma a correção.',
    example: 'console.log("stock:", stock, "quantity:", quantity);\n// stock: 1 quantity: 1 → a regra deveria deixar vender!',
  },
  {
    term: 'Refatoração', abbr: 'refactoring', category: 'Qualidade e testes', tracks: ['dev', 'ai'],
    definition: 'Melhorar o código por dentro sem mudar o que ele faz por fora: nomes mais claros, partes repetidas reunidas numa função. Os testes garantem que nada quebrou no caminho.',
    example: '// Antes\nconst t = p1 + p2 + p3;\n\n// Depois: mesmo resultado, mais fácil de ler\nconst subtotal = cartSubtotal([p1, p2, p3]);',
  },
  {
    term: 'Garantia de Qualidade', abbr: 'QA · Quality Assurance', category: 'Qualidade e testes', tracks: ['qa'],
    definition: 'O trabalho de garantir que o software faz o que deveria, prevenindo e encontrando problemas antes que cheguem à cliente. Envolve entender as regras, planejar testes e conferir os resultados.',
    example: '// Regra BR-CPN-01: o cupom vale até o dia expiresOn, inclusive.\n// QA pergunta: e no próprio dia? E no dia seguinte?',
  },
  {
    term: 'Testes', abbr: 'testing', category: 'Qualidade e testes', tracks: ['qa', 'dev'],
    definition: 'Verificar se o programa funciona como esperado, comparando o resultado obtido com o resultado esperado. Podem ser feitos à mão ou com código.',
    example: '// Esperado: pedido sem estoque recusado com 409\n// Obtido:   409 "OUT_OF_STOCK"  → passou ✓',
  },
  {
    term: 'Caso de teste', abbr: 'test case', category: 'Qualidade e testes', tracks: ['qa', 'start'],
    definition: 'Um cenário específico para testar: os dados de entrada, os passos e o resultado esperado. Bons casos de teste cobrem também os limites e os dados ruins.',
    example: '// Dado:   a Crystal ball tem stock 1\n// Quando: a cliente compra 1 unidade\n// Então:  o pedido é criado (201)',
  },
  {
    term: 'Teste automatizado', abbr: 'automated test', category: 'Qualidade e testes', tracks: ['qa', 'dev'],
    definition: 'Um teste escrito em código que o computador roda sozinho, quantas vezes for preciso. Ele avisa rápido quando uma mudança quebra algo que funcionava.',
    example: 'it("refuses an order out of stock", async () => {\n  const res = await api.post("/api/orders", {\n    items: [{ sku: "TAR-004", quantity: 1 }],\n  });\n  expect(res.status).to.equal(409);\n});',
  },
  {
    term: 'Zero Day', abbr: 'dia zero', category: 'Qualidade e testes', tracks: ['qa'],
    definition: 'Uma falha de segurança que os responsáveis pelo software ainda não conhecem, ou que ainda não tem correção. O nome vem de a equipe ter tido “zero dias” para corrigir quando o ataque acontece.',
    example: '// Atacantes descobrem uma falha no pagamento da lojinha\n// antes da equipe. Ainda não existe correção:\n// isso é uma vulnerabilidade zero day.',
  },
];
