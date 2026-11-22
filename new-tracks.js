/* =====================================================================
   TRILHAS GIT, FRONT END E ANÁLISE DE DADOS
   Only data, like start-track.js: index.html draws the exercises and checks the answers.
   Two kinds of exercise:
     logic  (type: 'logic') the same kinds as the Start Track: order, match, predict, bug, pick
            (see the comment at the top of start-track.js for the fields of each kind)
     code   a JavaScript function: fn, starter, solution, tests[{ name, args, expected, hidden? }]
   HTML inside texts is shown as HTML: write tags you want to SHOW as &lt;tag&gt; (the helper h() does it).
   Run the tests after editing:  node --test "tests/*.test.mjs"
   ===================================================================== */

// shared: { FORK_URL, FORK_PATTERN, FORK_NOTE } from index.html. `git` is each track's repo context:
// the Git track teaches with its own, and the Git grimoire uses every track's one.
function buildFrontendTrack(L, shared) {
  const h = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const c = s => '<code>' + h(s) + '</code>';
  let n = 0;
  const id = () => 'fe' + String(++n).padStart(2, '0');
  const X = (level, xp, d) => Object.assign({ id: id(), level, xp, type: 'logic', conceptTag: d.tag, hints: [],
    action: { method: 'UI', path: d.tag, label: L('Concept', 'Conceito') } }, d);
  const C = (level, xp, d) => Object.assign({ id: id(), level, xp, action: { method: 'UI', path: d.path, label: L('Shop window', 'Vitrine da loja') } }, d);

  const module = {
    id: 'frontend', name: 'Front End', image: 'assets/track-frontend.webp',
    imageAlt: L('Pixel art: Geekie Jackie points at a web page being built, with HTML, CSS and JavaScript blocks', 'Pixel art: a Geekie Jackie aponta para uma página web sendo montada, com blocos de HTML, CSS e JavaScript'),
    stack: L('Interfaces · HTML, CSS and JavaScript', 'Interfaces · HTML, CSS e JavaScript'), color: 'var(--m-patch)',
    art: '&lt;article class="card"&gt;\n  &lt;h3&gt;<b>Rider-Waite Tarot</b>&lt;/h3&gt;\n&lt;/article&gt;\n// Make it beautiful.',
    bullets: [L('HTML: the structure of the shop window', 'HTML: a estrutura da vitrine'), L('CSS: selectors, cascade and spacing', 'CSS: seletores, cascata e espaçamento'), L('JavaScript that builds the screen from data', 'JavaScript que monta a tela a partir dos dados')],
  };
  const ranks = [
    { at: 0, name: L('New Intern', 'Novo Estagiário') }, { at: 0.15, name: L('Shop Apprentice', 'Aprendiz da Loja') }, { at: 0.4, name: L('Window Designer', 'Desenhista de Vitrines') },
    { at: 0.7, name: L('Style Weaver', 'Tecelã de Estilos') }, { at: 0.95, name: L('Front End Master', 'Mestre do Front End') },
  ];
  const git = {
    repo: 'geekiejackieacademy', tool: L('shop window', 'da vitrine'),
    url: shared.FORK_URL, urlPattern: shared.FORK_PATTERN, forkNote: shared.FORK_NOTE,
    folder: 'geekiejackieacademy',
    pullWhy: L('For example, a teammate changed the card styles yesterday. Without <code>git pull</code> your screen would use the old colours and the review would find conflicts.',
      'Por exemplo, alguém do time mudou o estilo dos cards ontem. Sem <code>git pull</code> a sua tela usaria as cores antigas e a revisão acharia conflitos.'),
    pullFile: 'src/ui/styles/card.css',
    task: L('show “Sold out” on product cards', 'mostrar “Esgotado” nos cards de produto'),
    branch: 'feature/123_sold-out-badge',
    branchNote: L('Branches start with <code>feature/</code> and the ticket number, like <code>feature/101_cart-badge</code>.',
      'As branches começam com <code>feature/</code> e o número do ticket, como <code>feature/101_cart-badge</code>.'),
    file: 'src/ui/product-card.js',
    commitMsg: 'feat: show sold out badge on cards',
    commitNote: L('The shop uses <b>conventional commits</b>: <code>feat:</code> for something new on the screen, <code>fix:</code> for repairs, <code>style:</code> for formatting only.',
      'A loja usa <b>conventional commits</b>: <code>feat:</code> para algo novo na tela, <code>fix:</code> para correções, <code>style:</code> só para formatação. As mensagens de commit são escritas em inglês.'),
  };
  const levels = [
    { id: 51, module: 'frontend', name: L('The Shop Window in HTML', 'A Vitrine em HTML'), topic: L('Structure and meaning', 'Estrutura e significado'), badge: '</>' },
    { id: 52, module: 'frontend', name: L('Dressing It with CSS', 'O Visual com CSS'), topic: L('Selectors, cascade and spacing', 'Seletores, cascata e espaçamento'), badge: '🎨' },
    { id: 53, module: 'frontend', name: L('JavaScript in the Window', 'JavaScript na Vitrine'), topic: L('The screen from the data', 'A tela a partir dos dados'), badge: '✦' },
  ];

  const exercises = [
    /* ---------- 51 · HTML ---------- */
    X(51, 15, {
      kind: 'match', title: L('Tags and what they mean', 'Tags e o que elas significam'), tag: 'HTML',
      story: L('The new product page is coming! Before drawing it, let’s learn the pieces it is made of.', 'A página nova de produto vem aí! Antes de desenhar, vamos conhecer as peças de que ela é feita.'),
      what: L('<p><b>HTML</b> describes what each part of a page <b>is</b>: a title, a picture, a link, a button. Each part is a <b>tag</b>, like ' + c('<h1>') + '.</p>',
        '<p><b>HTML</b> descreve o que cada parte da página <b>é</b>: um título, uma imagem, um link, um botão. Cada parte é uma <b>tag</b>, como ' + c('<h1>') + '.</p>'),
      why: L('<p>Browsers, search engines and screen readers read these tags to understand the page. The right tag makes the shop easier to use for everyone.</p>',
        '<p>Navegadores, buscadores e leitores de tela leem essas tags para entender a página. A tag certa deixa a loja mais fácil de usar para todo mundo.</p>'),
      task: L('Match each tag with what it is.', 'Ligue cada tag ao que ela é.'),
      left: [c('<h1>'), c('<img>'), c('<a>'), c('<button>')],
      right: [L('a link to another page', 'um link para outra página'), L('the main title of the page', 'o título principal da página'), L('something you click to do an action', 'algo que você clica para fazer uma ação'), L('a picture', 'uma imagem')],
      answer: [1, 3, 0, 2],
      hints: [L('<code>h1</code> is “heading 1”; <code>a</code> comes from “anchor”.', '<code>h1</code> é “heading 1” (título 1); <code>a</code> vem de “anchor” (âncora).')],
      ok: L('Right! h1 title, img picture, a link, button action.', 'Isso! h1 título, img imagem, a link, button ação.'),
    }),
    X(51, 15, {
      kind: 'order', title: L('The product page, top to bottom', 'A página do produto, de cima para baixo'), tag: L('Page structure', 'Estrutura da página'),
      story: L('Bruxa Maria drew the product page on paper. Put the pieces in the order they appear.', 'A Bruxa Maria desenhou a página do produto no papel. Coloque as peças na ordem em que aparecem.'),
      what: L('<p>A page has a <b>header</b> on top (' + c('<header>') + '), the <b>main content</b> in the middle (' + c('<main>') + ') and a <b>footer</b> at the bottom (' + c('<footer>') + ').</p>',
        '<p>Uma página tem um <b>cabeçalho</b> no topo (' + c('<header>') + '), o <b>conteúdo principal</b> no meio (' + c('<main>') + ') e um <b>rodapé</b> embaixo (' + c('<footer>') + ').</p>'),
      why: L('<p>The order in the HTML is the order a screen reader reads aloud and the order the page loads. It has to make sense on its own.</p>',
        '<p>A ordem no HTML é a ordem que o leitor de tela lê em voz alta e a ordem em que a página carrega. Ela precisa fazer sentido sozinha.</p>'),
      task: L('Put the parts of the page in order, from top to bottom.', 'Coloque as partes da página em ordem, de cima para baixo.'),
      steps: [L('Header with the logo and the menu', 'Cabeçalho com o logo e o menu'), L('Title with the product name', 'Título com o nome do produto'), L('Picture of the product', 'Foto do produto'),
        L('Price', 'Preço'), L('“Add to cart” button', 'Botão “Adicionar ao carrinho”'), L('Footer with contact and address', 'Rodapé com contato e endereço')],
      start: [3, 0, 5, 1, 4, 2],
      hints: [L('The header and the footer are the two ends. The button comes after you know the price.', 'O cabeçalho e o rodapé são as duas pontas. O botão vem depois de você saber o preço.')],
      ok: L('Perfect: header, title, picture, price, button, footer.', 'Perfeito: cabeçalho, título, foto, preço, botão, rodapé.'),
    }),
    X(51, 20, {
      kind: 'bug', style: 'pseudo', title: L('The card nobody can “see”', 'O card que ninguém consegue “ver”'), tag: L('Accessibility', 'Acessibilidade'),
      story: L('A customer who uses a screen reader wrote to us: on the product card, the reader says only “image”. Can you find the line?', 'Uma cliente que usa leitor de tela escreveu para nós: no card do produto, o leitor só fala “imagem”. Você acha a linha?'),
      what: L('<p>The ' + c('alt') + ' attribute describes a picture in words. Screen readers read it, and the browser shows it when the picture fails to load.</p>',
        '<p>O atributo ' + c('alt') + ' descreve a imagem em palavras. Leitores de tela leem esse texto, e o navegador mostra ele quando a imagem não carrega.</p>'),
      why: L('<p>Without ' + c('alt') + ', a blind customer doesn’t know which product is on the card. Accessibility is part of quality, not an extra.</p>',
        '<p>Sem ' + c('alt') + ', uma cliente cega não sabe qual produto está no card. Acessibilidade faz parte da qualidade, não é um extra.</p>'),
      task: L('Click the line with the bug.', 'Clique na linha com o bug.'),
      lines: [h('<article class="card">'), h('  <h3>Rider-Waite Tarot</h3>'), h('  <img src="tarot.webp">'), h('  <p class="price">€ 34,90</p>'), h('  <button>Add to cart</button>'), h('</article>')],
      answer: 2,
      hints: [L('Look for the tag that shows something but says nothing about it in words.', 'Procure a tag que mostra algo, mas não diz nada em palavras sobre isso.')],
      ok: L('Found it! It needs <code>alt="Rider-Waite Tarot deck, 78 cards"</code>.', 'Achou! Ela precisa de <code>alt="Baralho Rider-Waite Tarot, 78 cartas"</code>.'),
    }),
    X(51, 20, {
      kind: 'pick', title: L('A card for everyone', 'Um card para todo mundo'), tag: L('Accessibility', 'Acessibilidade'),
      story: L('Let’s review the product card before it goes live. Which choices help every customer use it?', 'Vamos revisar o card de produto antes de ir para o ar. Quais escolhas ajudam qualquer cliente a usar?'),
      what: L('<p>Accessible HTML uses the right tag for each job and never hides information only in an image or only in a colour.</p>',
        '<p>HTML acessível usa a tag certa para cada função e nunca esconde informação só numa imagem ou só numa cor.</p>'),
      why: L('<p>Keyboard users, screen reader users and people on slow connections are customers too.</p>',
        '<p>Quem usa teclado, leitor de tela ou internet lenta também é cliente.</p>'),
      task: L('Mark the good choices.', 'Marque as boas escolhas.'),
      options: [L('An <code>alt</code> that describes the product', 'Um <code>alt</code> que descreve o produto'), L('A real <code>&lt;button&gt;</code> for “Add to cart”', 'Um <code>&lt;button&gt;</code> de verdade para “Adicionar ao carrinho”'),
        L('A <code>&lt;div&gt;</code> with a click handler instead of a button', 'Uma <code>&lt;div&gt;</code> com clique no lugar do botão'), L('The price written only inside the picture', 'O preço escrito só dentro da imagem'),
        L('A <code>&lt;label&gt;</code> for the quantity field', 'Um <code>&lt;label&gt;</code> para o campo de quantidade')],
      correct: [true, true, false, false, true],
      hints: [L('A <code>div</code> can’t be reached with the Tab key, and text inside a picture can’t be read aloud.', 'Uma <code>div</code> não é alcançada com a tecla Tab, e texto dentro de imagem não é lido em voz alta.')],
      ok: L('Exactly: alt, a real button and a label. The other two lock people out.', 'Exato: alt, botão de verdade e label. As outras duas deixam gente de fora.'),
    }),

    /* ---------- 52 · CSS ---------- */
    X(52, 15, {
      kind: 'match', title: L('Who does this rule paint?', 'Essa regra pinta quem?'), tag: L('Selectors', 'Seletores'),
      story: L('The stylesheet is full of rules. To change a colour without breaking the rest, you need to know what each selector picks.', 'A folha de estilo está cheia de regras. Para mudar uma cor sem estragar o resto, você precisa saber o que cada seletor escolhe.'),
      what: L('<p>A <b>CSS rule</b> has a <b>selector</b> (who) and declarations (how). ' + c('.price') + ' picks a class, ' + c('#cart') + ' picks an id, ' + c('button') + ' picks a tag.</p>',
        '<p>Uma <b>regra CSS</b> tem um <b>seletor</b> (quem) e declarações (como). ' + c('.price') + ' escolhe uma classe, ' + c('#cart') + ' escolhe um id, ' + c('button') + ' escolhe uma tag.</p>'),
      why: L('<p>A selector that is too wide paints things you didn’t want; one that is too narrow paints nothing.</p>',
        '<p>Um seletor largo demais pinta coisas que você não queria; um estreito demais não pinta nada.</p>'),
      task: L('Match each selector with what it picks.', 'Ligue cada seletor ao que ele escolhe.'),
      left: [c('.price'), c('#cart'), c('button'), c('.card img')],
      right: [L('every button of the page', 'todos os botões da página'), L('pictures inside a card', 'imagens dentro de um card'), L('every element with the class price', 'todo elemento com a classe price'), L('the one element with the id cart', 'o único elemento com o id cart')],
      answer: [2, 3, 0, 1],
      hints: [L('A dot is a class, a hash is an id, and a space means “inside”.', 'Ponto é classe, cerquilha é id, e o espaço quer dizer “dentro de”.')],
      ok: L('Right! Class, id, tag and “inside”.', 'Isso! Classe, id, tag e “dentro de”.'),
    }),
    X(52, 20, {
      kind: 'predict', title: L('Which colour wins?', 'Qual cor ganha?'), tag: L('Cascade', 'Cascata'),
      story: L('The price shows up green and nobody knows why. Let’s follow the cascade.', 'O preço aparece verde e ninguém sabe por quê. Vamos seguir a cascata.'),
      what: L('<p>When several rules paint the same element, the <b>more specific</b> selector wins: an id beats classes, two classes beat one, a class beats a tag.</p>',
        '<p>Quando várias regras pintam o mesmo elemento, ganha o seletor <b>mais específico</b>: id ganha de classes, duas classes ganham de uma, classe ganha de tag.</p>'),
      why: L('<p>Knowing the cascade saves you from “fixing” things with <code>!important</code> everywhere.</p>',
        '<p>Entender a cascata evita “consertar” tudo com <code>!important</code> espalhado.</p>'),
      task: L('Read the CSS and answer.', 'Leia o CSS e responda.'),
      data: '<pre class="lg-pseudo">' + h('p              { color: purple; }\n.price         { color: gold; }\n.card .price   { color: green; }') + '</pre>',
      questions: [
        { q: L('What colour is <code>&lt;p class="price"&gt;</code> inside a <code>.card</code>?', 'Qual a cor de <code>&lt;p class="price"&gt;</code> dentro de um <code>.card</code>?'), options: [L('purple', 'roxo'), L('gold', 'dourado'), L('green', 'verde'), L('black', 'preto')], answer: 2 },
        { q: L('And <code>&lt;p class="price"&gt;</code> outside any card?', 'E <code>&lt;p class="price"&gt;</code> fora de qualquer card?'), options: [L('purple', 'roxo'), L('gold', 'dourado'), L('green', 'verde')], answer: 1 },
        { q: L('And a plain <code>&lt;p&gt;</code> with no class?', 'E um <code>&lt;p&gt;</code> comum, sem classe?'), options: [L('purple', 'roxo'), L('gold', 'dourado'), L('green', 'verde')], answer: 0 },
      ],
      hints: [L('<code>.card .price</code> has two classes, so it beats <code>.price</code> alone.', '<code>.card .price</code> tem duas classes, então ganha de <code>.price</code> sozinho.')],
      ok: L('Exactly: green, gold, purple. The most specific rule wins.', 'Exato: verde, dourado, roxo. Ganha a regra mais específica.'),
    }),
    X(52, 20, {
      kind: 'predict', title: L('How wide is the card?', 'Qual a largura do card?'), tag: L('Box model', 'Modelo de caixa'),
      story: L('Four cards of 200px don’t fit in a row of 800px and nobody understands why. Let’s measure.', 'Quatro cards de 200px não cabem numa linha de 800px e ninguém entende por quê. Vamos medir.'),
      what: L('<p>Every element is a <b>box</b>: content, then <b>padding</b>, then <b>border</b>, then margin. By default, <code>width</code> is only the content; padding and border are added on top.</p>',
        '<p>Todo elemento é uma <b>caixa</b>: conteúdo, depois <b>padding</b>, depois <b>borda</b>, depois margem. Por padrão, <code>width</code> é só o conteúdo; padding e borda somam por fora.</p>'),
      why: L('<p>That is the reason layouts “overflow” by a few pixels. <code>box-sizing: border-box</code> makes <code>width</code> include padding and border.</p>',
        '<p>É por isso que layouts “estouram” por alguns pixels. <code>box-sizing: border-box</code> faz o <code>width</code> incluir padding e borda.</p>'),
      task: L('Read the CSS and answer.', 'Leia o CSS e responda.'),
      data: '<pre class="lg-pseudo">' + h('.card {\n  width: 200px;\n  padding: 16px;\n  border: 2px solid gold;\n}') + '</pre>',
      questions: [
        { q: L('How wide is the card on the screen?', 'Qual a largura do card na tela?'), options: ['200px', '216px', '232px', '236px'], answer: 3 },
        { q: L('And with <code>box-sizing: border-box</code>?', 'E com <code>box-sizing: border-box</code>?'), options: ['200px', '236px', '168px'], answer: 0 },
      ],
      hints: [L('Add both sides: 200 + 16 + 16 + 2 + 2.', 'Some os dois lados: 200 + 16 + 16 + 2 + 2.')],
      ok: L('Right: 236px by default, 200px with border-box.', 'Isso: 236px por padrão, 200px com border-box.'),
    }),
    X(52, 20, {
      kind: 'predict', title: L('Cards side by side', 'Cards lado a lado'), tag: 'Flexbox',
      story: L('The products are stacked one under the other. I want them side by side, with some space between them.', 'Os produtos estão empilhados um embaixo do outro. Quero eles lado a lado, com um espaço entre eles.'),
      what: L('<p><b>Flexbox</b> lines up the children of a box: <code>display: flex</code> puts them in a row, and <code>gap</code> sets the space between them.</p>',
        '<p>O <b>Flexbox</b> alinha os filhos de uma caixa: <code>display: flex</code> coloca todos numa linha, e <code>gap</code> define o espaço entre eles.</p>'),
      why: L('<p>Spacing with <code>gap</code> keeps every card the same and avoids a stray margin at the end of the row.</p>',
        '<p>Espaçar com <code>gap</code> deixa todos os cards iguais e evita uma margem sobrando no fim da linha.</p>'),
      task: L('Pick the line that completes the CSS.', 'Escolha a linha que completa o CSS.'),
      data: '<pre class="lg-pseudo">' + h('.products {\n  display: flex;\n  ???            /* 16px between the cards */\n}') + '</pre>',
      questions: [
        { q: L('Which line goes in place of <code>???</code>?', 'Qual linha vai no lugar de <code>???</code>?'), code: true, options: ['gap: 16px;', 'color: 16px;', 'flex: gap;', 'border: 16px;'], answer: 0 },
      ],
      hints: [L('The property is literally the word for “space between”.', 'A propriedade é literalmente a palavra para “vão” em inglês.')],
      ok: L('That’s it: <code>gap: 16px;</code>', 'É isso: <code>gap: 16px;</code>'),
    }),

    /* ---------- 53 · JavaScript in the window ---------- */
    C(53, 15, {
      title: L('The price on the screen', 'O preço na tela'), tag: L('Formatting', 'Formatação'), path: 'formatPrice()', fn: 'formatPrice',
      story: L('The API sends prices like <code>34.9</code>, but the window must show <code>€ 34,90</code>, with a comma and always two decimals.', 'A API manda preços como <code>34.9</code>, mas a vitrine precisa mostrar <code>€ 34,90</code>, com vírgula e sempre duas casas.'),
      what: L('<p>Data and screen are different things: the number stays a number, and the screen shows it <b>formatted</b> for people.</p>',
        '<p>Dado e tela são coisas diferentes: o número continua número, e a tela mostra ele <b>formatado</b> para pessoas.</p>'),
      why: L('<p>A price shown as <code>34.9</code> looks like a bug and makes customers distrust the shop.</p>',
        '<p>Um preço aparecendo como <code>34.9</code> parece bug e faz a cliente desconfiar da loja.</p>'),
      task: L('<p>Write <code>formatPrice(value)</code> that returns the text <code>"€ 34,90"</code> for <code>34.9</code>.</p>', '<p>Escreva <code>formatPrice(value)</code>, que devolve o texto <code>"€ 34,90"</code> para <code>34.9</code>.</p>'),
      concept: L('<code>value.toFixed(2)</code> gives <code>"34.90"</code>, and <code>.replace(".", ",")</code> swaps the dot for a comma.', '<code>value.toFixed(2)</code> dá <code>"34.90"</code>, e <code>.replace(".", ",")</code> troca o ponto pela vírgula.'),
      sample: 'formatPrice(34.9)  // "€ 34,90"\nformatPrice(8.5)   // "€ 8,50"\nformatPrice(120)   // "€ 120,00"',
      starter: 'function formatPrice(value) {\n  // "€ " + the value with 2 decimals and a comma\n\n}\n',
      hint: L('<pre>return "€ " + value.toFixed(2).replace(".", ",");</pre>', '<pre>return "€ " + value.toFixed(2).replace(".", ",");</pre>'),
      solution: 'function formatPrice(value) {\n  return "€ " + value.toFixed(2).replace(".", ",");\n}\n',
      tests: [
        { name: 'Rider-Waite Tarot: 34.9', args: [34.9], expected: '€ 34,90' },
        { name: 'Moon candle: 8.5', args: [8.5], expected: '€ 8,50' },
        { name: 'a round price: 120', args: [120], expected: '€ 120,00' },
        { name: 'a free gift: 0', args: [0], expected: '€ 0,00', hidden: true },
      ],
    }),
    C(53, 20, {
      title: L('The stock label', 'A etiqueta de estoque'), tag: L('Conditions on the screen', 'Condições na tela'), path: 'stockLabel()', fn: 'stockLabel',
      story: L('Each card shows a small label about the stock. Customers love “Last units”!', 'Cada card mostra uma etiquetinha sobre o estoque. As clientes adoram “Últimas unidades”!'),
      what: L('<p>The rules of the label:</p><ul><li><code>stock</code> 0 → <code>"Sold out"</code> (BR-STK-04)</li><li>1 to 3 → <code>"Last units"</code></li><li>more than 3 → <code>"In stock"</code></li><li>digital products have <code>stock: null</code> → <code>"In stock"</code> (BR-STK-05)</li></ul>',
        '<p>As regras da etiqueta:</p><ul><li><code>stock</code> 0 → <code>"Sold out"</code> (BR-STK-04)</li><li>1 a 3 → <code>"Last units"</code></li><li>mais de 3 → <code>"In stock"</code></li><li>produtos digitais têm <code>stock: null</code> → <code>"In stock"</code> (BR-STK-05)</li></ul>'),
      why: L('<p>The screen is where business rules meet the customer: a wrong label sells what isn’t there, or hides what is.</p>',
        '<p>A tela é onde as regras de negócio encontram a cliente: uma etiqueta errada vende o que não existe, ou esconde o que existe.</p>'),
      task: L('<p>Write <code>stockLabel(product)</code> that returns the right text.</p>', '<p>Escreva <code>stockLabel(product)</code>, que devolve o texto certo.</p>'),
      concept: L('Check the special case first: <code>if (product.stock === null) return "In stock";</code>', 'Confira o caso especial primeiro: <code>if (product.stock === null) return "In stock";</code>'),
      sample: '{ name: "Moon candle", stock: 40 }          // "In stock"\n{ name: "Crystal ball", stock: 2 }          // "Last units"\n{ name: "Tarot guide (PDF)", stock: null }  // "In stock"',
      starter: 'function stockLabel(product) {\n  // "Sold out", "Last units" or "In stock"\n\n}\n',
      hint: L('<pre>if (product.stock === null) return "In stock";\nif (product.stock === 0) return "Sold out";\nif (product.stock <= 3) return "Last units";\nreturn "In stock";</pre>', '<pre>if (product.stock === null) return "In stock";\nif (product.stock === 0) return "Sold out";\nif (product.stock <= 3) return "Last units";\nreturn "In stock";</pre>'),
      solution: 'function stockLabel(product) {\n  if (product.stock === null) return "In stock";\n  if (product.stock === 0) return "Sold out";\n  if (product.stock <= 3) return "Last units";\n  return "In stock";\n}\n',
      tests: [
        { name: 'plenty of stock', args: [{ name: 'Moon candle', stock: 40 }], expected: 'In stock' },
        { name: 'two left', args: [{ name: 'Crystal ball', stock: 2 }], expected: 'Last units' },
        { name: 'sold out', args: [{ name: 'Lenormand deck', stock: 0 }], expected: 'Sold out' },
        { name: 'digital product', args: [{ name: 'Tarot guide (PDF)', stock: null }], expected: 'In stock' },
        { name: 'exactly 3 left', args: [{ name: 'Rider-Waite Tarot', stock: 3 }], expected: 'Last units', hidden: true },
        { name: 'exactly 4 left', args: [{ name: 'Rider-Waite Tarot', stock: 4 }], expected: 'In stock', hidden: true },
      ],
    }),
    C(53, 20, {
      title: L('The cart bubble', 'A bolinha do carrinho'), tag: L('Edge cases on the screen', 'Casos-limite na tela'), path: 'cartBadge()', fn: 'cartBadge',
      story: L('The little bubble on the cart icon broke the header when someone bought 120 candles. Let’s cap it.', 'A bolinha do ícone do carrinho quebrou o cabeçalho quando alguém comprou 120 velas. Vamos limitar.'),
      what: L('<p>The bubble shows how many items are in the cart: nothing when it is empty, the number up to 9, and <code>"9+"</code> from 10 on.</p>',
        '<p>A bolinha mostra quantos itens tem no carrinho: nada quando está vazio, o número até 9, e <code>"9+"</code> a partir de 10.</p>'),
      why: L('<p>Screens have limited room. Designing for the empty case and the huge case is what keeps the layout from breaking.</p>',
        '<p>Telas têm espaço limitado. Pensar no caso vazio e no caso enorme é o que impede o layout de quebrar.</p>'),
      task: L('<p>Write <code>cartBadge(count)</code> that returns <code>""</code>, the number as text, or <code>"9+"</code>.</p>', '<p>Escreva <code>cartBadge(count)</code>, que devolve <code>""</code>, o número em texto, ou <code>"9+"</code>.</p>'),
      concept: L('<code>String(7)</code> turns the number 7 into the text <code>"7"</code>.', '<code>String(7)</code> transforma o número 7 no texto <code>"7"</code>.'),
      sample: 'cartBadge(0)    // ""\ncartBadge(3)    // "3"\ncartBadge(120)  // "9+"',
      starter: 'function cartBadge(count) {\n\n}\n',
      hint: L('<pre>if (count === 0) return "";\nif (count > 9) return "9+";\nreturn String(count);</pre>', '<pre>if (count === 0) return "";\nif (count > 9) return "9+";\nreturn String(count);</pre>'),
      solution: 'function cartBadge(count) {\n  if (count <= 0) return "";\n  if (count > 9) return "9+";\n  return String(count);\n}\n',
      tests: [
        { name: 'empty cart', args: [0], expected: '' },
        { name: 'three items', args: [3], expected: '3' },
        { name: '120 candles', args: [120], expected: '9+' },
        { name: 'exactly 9', args: [9], expected: '9', hidden: true },
        { name: 'exactly 10', args: [10], expected: '9+', hidden: true },
      ],
    }),
    C(53, 25, {
      title: L('Build the product card', 'Monte o card do produto'), tag: L('HTML from data', 'HTML a partir dos dados'), path: 'productCard()', fn: 'productCard',
      story: L('Time to put it all together: from a product record, build the HTML of its card.', 'Hora de juntar tudo: a partir do registro de um produto, monte o HTML do card dele.'),
      what: L('<p>Front end code often builds HTML from data. A <b>template literal</b> (text between backticks) lets you put values inside the text with <code>${...}</code>.</p>',
        '<p>Código de front end muitas vezes monta HTML a partir de dados. Uma <b>template literal</b> (texto entre crases) deixa colocar valores dentro do texto com <code>${...}</code>.</p>'),
      why: L('<p>One function that builds every card keeps all 50 products looking the same. Fix it once, and every card is fixed.</p>',
        '<p>Uma função que monta todos os cards deixa os 50 produtos com a mesma cara. Corrigiu uma vez, todos os cards ficam corrigidos.</p>'),
      task: L('<p>Write <code>productCard(product)</code> that returns this HTML (no spaces or line breaks between the tags):</p><pre>' + h('<article class="card"><h3>NAME</h3><p class="price">€ 34,90</p></article>') + '</pre><p>When <code>stock</code> is 0, the class is <code>"card sold-out"</code>.</p>',
        '<p>Escreva <code>productCard(product)</code>, que devolve este HTML (sem espaços nem quebras de linha entre as tags):</p><pre>' + h('<article class="card"><h3>NOME</h3><p class="price">€ 34,90</p></article>') + '</pre><p>Quando <code>stock</code> é 0, a classe é <code>"card sold-out"</code>.</p>'),
      concept: L('<code>`&lt;h3&gt;${product.name}&lt;/h3&gt;`</code> puts the name inside the tag.', '<code>`&lt;h3&gt;${product.name}&lt;/h3&gt;`</code> coloca o nome dentro da tag.'),
      sample: '{ name: "Rider-Waite Tarot", price: 34.9, stock: 12 }\n// <article class="card"><h3>Rider-Waite Tarot</h3><p class="price">€ 34,90</p></article>',
      starter: 'function productCard(product) {\n  // the price like "€ 34,90"; class "card sold-out" when stock is 0\n\n}\n',
      hint: L('<pre>const price = "€ " + product.price.toFixed(2).replace(".", ",");\nconst cls = product.stock === 0 ? "card sold-out" : "card";\nreturn `&lt;article class="${cls}"&gt;&lt;h3&gt;${product.name}&lt;/h3&gt;&lt;p class="price"&gt;${price}&lt;/p&gt;&lt;/article&gt;`;</pre>',
        '<pre>const price = "€ " + product.price.toFixed(2).replace(".", ",");\nconst cls = product.stock === 0 ? "card sold-out" : "card";\nreturn `&lt;article class="${cls}"&gt;&lt;h3&gt;${product.name}&lt;/h3&gt;&lt;p class="price"&gt;${price}&lt;/p&gt;&lt;/article&gt;`;</pre>'),
      solution: 'function productCard(product) {\n  const price = "€ " + product.price.toFixed(2).replace(".", ",");\n  const cls = product.stock === 0 ? "card sold-out" : "card";\n  return `<article class="${cls}"><h3>${product.name}</h3><p class="price">${price}</p></article>`;\n}\n',
      tests: [
        { name: 'a product in stock', args: [{ name: 'Rider-Waite Tarot', price: 34.9, stock: 12 }], expected: '<article class="card"><h3>Rider-Waite Tarot</h3><p class="price">€ 34,90</p></article>' },
        { name: 'a sold-out product', args: [{ name: 'Lenormand deck', price: 22, stock: 0 }], expected: '<article class="card sold-out"><h3>Lenormand deck</h3><p class="price">€ 22,00</p></article>' },
        { name: 'a digital product', args: [{ name: 'Tarot guide (PDF)', price: 9.9, stock: null }], expected: '<article class="card"><h3>Tarot guide (PDF)</h3><p class="price">€ 9,90</p></article>', hidden: true },
      ],
    }),
  ];
  return { module, ranks, git, levels, exercises };
}

function buildDataTrack(L, shared) {
  const h = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  let n = 0;
  const id = () => 'da' + String(++n).padStart(2, '0');
  const X = (level, xp, d) => Object.assign({ id: id(), level, xp, type: 'logic', conceptTag: d.tag, hints: [],
    action: { method: 'API', path: d.tag, label: L('Concept', 'Conceito') } }, d);
  const C = (level, xp, d) => Object.assign({ id: id(), level, xp, action: { method: 'GET', path: d.path, label: L('Read the shop data', 'Ler os dados da loja') } }, d);
  const ORDERS = [
    { id: 'ORD-101', date: '2026-11-20', status: 'Paid', total: 34.9 },
    { id: 'ORD-102', date: '2026-11-20', status: 'Pending', total: 22 },
    { id: 'ORD-103', date: '2026-11-21', status: 'Paid', total: 57.4 },
    { id: 'ORD-104', date: '2026-11-21', status: 'Cancelled', total: 8.5 },
    { id: 'ORD-105', date: '2026-11-22', status: 'Paid', total: 17 },
  ];
  const ITEMS = [
    { name: 'Rider-Waite Tarot', category: 'Tarot', price: 34.9, qty: 2 },
    { name: 'Moon candle', category: 'Accessories', price: 8.5, qty: 4 },
    { name: 'Lenormand deck', category: 'Oracles', price: 22, qty: 1 },
    { name: 'Moon candle', category: 'Accessories', price: 8.5, qty: 3 },
    { name: 'Amethyst', category: 'Crystals', price: 12, qty: 2 },
  ];
  const sample = v => JSON.stringify(v, null, 0).replace(/},{/g, '},\n  {').replace(/^\[/, '[\n  ').replace(/\]$/, '\n]');

  const module = {
    id: 'data', name: L('Data', 'Dados'), image: 'assets/track-data.webp',
    imageAlt: L('Pixel art: Geekie Jackie at a laptop in front of a dashboard with charts, with books about Python, SQL, Pandas, NumPy and Power BI', 'Pixel art: a Geekie Jackie no notebook diante de um painel com gráficos, com livros de Python, SQL, Pandas, NumPy e Power BI'),
    stack: L('Data Analysis · JavaScript and SQL', 'Análise de Dados · JavaScript e SQL'), color: 'var(--m-get)',
    art: 'SELECT category,\n  <b>SUM</b>(price * qty)\nFROM order_items\n<b>GROUP BY</b> category;\n// Find the story in the data.',
    bullets: [L('Count, sum and average the shop’s orders', 'Contar, somar e tirar médias dos pedidos'), L('Group by category and by day', 'Agrupar por categoria e por dia'), L('Read SQL and choose the right chart', 'Ler SQL e escolher o gráfico certo')],
  };
  const ranks = [
    { at: 0, name: L('New Intern', 'Novo Estagiário') }, { at: 0.15, name: L('Shop Apprentice', 'Aprendiz da Loja') }, { at: 0.4, name: L('Table Reader', 'Leitora de Tabelas') },
    { at: 0.7, name: L('Data Storyteller', 'Contadora de Histórias com Dados') }, { at: 0.95, name: L('Data Oracle', 'Oráculo dos Dados') },
  ];
  const git = {
    repo: 'geekiejackieacademy', tool: L('reports', 'de relatórios'),
    url: shared.FORK_URL, urlPattern: shared.FORK_PATTERN, forkNote: shared.FORK_NOTE,
    folder: 'geekiejackieacademy',
    pullWhy: L('For example, a teammate fixed the daily sales report yesterday. Without <code>git pull</code> you would start from the old numbers.',
      'Por exemplo, alguém do time corrigiu o relatório de vendas por dia ontem. Sem <code>git pull</code> você começaria pelos números antigos.'),
    pullFile: 'reports/daily-sales.sql',
    task: L('add the sales report by category', 'adicionar o relatório de vendas por categoria'),
    branch: 'feature/123_sales-by-category',
    branchNote: L('Branches start with <code>feature/</code> and the ticket number, like <code>feature/101_monthly-report</code>.',
      'As branches começam com <code>feature/</code> e o número do ticket, como <code>feature/101_monthly-report</code>.'),
    file: 'reports/sales-by-category.sql',
    commitMsg: 'feat: add sales by category report',
    commitNote: L('Reports are code too: queries get commits, reviews and history, so anyone can repeat the numbers.',
      'Relatórios também são código: consultas têm commits, revisão e histórico, e assim qualquer pessoa consegue repetir os números. As mensagens de commit são escritas em inglês.'),
  };
  const levels = [
    { id: 61, module: 'data', name: L('Reading the Data', 'Lendo os Dados'), topic: L('Count, sum and average', 'Contar, somar e média'), badge: 'Σ' },
    { id: 62, module: 'data', name: L('Group and Summarise', 'Agrupar e Resumir'), topic: L('By category and by day', 'Por categoria e por dia'), badge: '▦' },
    { id: 63, module: 'data', name: L('SQL and Charts', 'SQL e Gráficos'), topic: L('Queries and visualisations', 'Consultas e visualizações'), badge: '📊' },
  ];

  const exercises = [
    /* ---------- 61 · reading the data ---------- */
    C(61, 10, {
      title: L('How many orders were paid?', 'Quantos pedidos foram pagos?'), tag: L('Counting', 'Contar'), path: '/api/orders', fn: 'countPaid',
      story: L('Bruxa Maria wants a number for the week: how many orders were actually paid?', 'A Bruxa Maria quer um número da semana: quantos pedidos foram pagos de verdade?'),
      what: L('<p>Data analysis starts by asking a clear question and <b>filtering</b> the rows that answer it. Here: only orders with <code>status</code> <code>"Paid"</code>.</p>',
        '<p>Análise de dados começa com uma pergunta clara e com <b>filtrar</b> as linhas que respondem a ela. Aqui: só os pedidos com <code>status</code> <code>"Paid"</code>.</p>'),
      why: L('<p>Pending and cancelled orders didn’t bring money in. Counting them would make the week look better than it was.</p>',
        '<p>Pedidos pendentes e cancelados não trouxeram dinheiro. Contar esses pedidos faria a semana parecer melhor do que foi.</p>'),
      task: L('<p>Write <code>countPaid(orders)</code> that returns how many orders have the status <code>"Paid"</code>.</p>', '<p>Escreva <code>countPaid(orders)</code>, que devolve quantos pedidos têm o status <code>"Paid"</code>.</p>'),
      concept: L('<code>orders.filter(o => o.status === "Paid")</code> keeps only the paid ones; <code>.length</code> counts them.', '<code>orders.filter(o => o.status === "Paid")</code> guarda só os pagos; <code>.length</code> conta quantos são.'),
      sample: '// GET /api/orders\n' + sample(ORDERS),
      starter: 'function countPaid(orders) {\n\n}\n',
      hint: L('<pre>return orders.filter(o => o.status === "Paid").length;</pre>', '<pre>return orders.filter(o => o.status === "Paid").length;</pre>'),
      solution: 'function countPaid(orders) {\n  return orders.filter(o => o.status === "Paid").length;\n}\n',
      tests: [
        { name: 'the week of the sample', args: [ORDERS], expected: 3 },
        { name: 'no orders at all', args: [[]], expected: 0 },
        { name: 'nothing paid yet', args: [[{ id: 'ORD-1', status: 'Pending', total: 10 }]], expected: 0, hidden: true },
      ],
    }),
    C(61, 15, {
      title: L('The week’s revenue', 'O faturamento da semana'), tag: L('Summing', 'Somar'), path: '/api/orders', fn: 'revenue',
      story: L('Now the money: how much did the paid orders bring in?', 'Agora o dinheiro: quanto os pedidos pagos trouxeram?'),
      what: L('<p><b>Revenue</b> is the sum of the totals of the paid orders. Money is rounded to 2 decimals at the end (BR-ORD-04).</p>',
        '<p><b>Faturamento</b> é a soma dos totais dos pedidos pagos. Dinheiro é arredondado para 2 casas no fim (BR-ORD-04).</p>'),
      why: L('<p>Decimal numbers in JavaScript can come out as <code>109.30000000000001</code>. Rounding keeps reports clean and equal to the bank statement.</p>',
        '<p>Números decimais em JavaScript podem sair como <code>109.30000000000001</code>. Arredondar deixa o relatório limpo e igual ao extrato do banco.</p>'),
      task: L('<p>Write <code>revenue(orders)</code> that returns the sum of the totals of the <code>"Paid"</code> orders, rounded to 2 decimals.</p>', '<p>Escreva <code>revenue(orders)</code>, que devolve a soma dos totais dos pedidos <code>"Paid"</code>, arredondada para 2 casas.</p>'),
      concept: L('<code>Math.round(x * 100) / 100</code> rounds to 2 decimals.', '<code>Math.round(x * 100) / 100</code> arredonda para 2 casas.'),
      sample: '// GET /api/orders\n' + sample(ORDERS),
      starter: 'function revenue(orders) {\n\n}\n',
      hint: L('<pre>const sum = orders.filter(o => o.status === "Paid").reduce((s, o) => s + o.total, 0);\nreturn Math.round(sum * 100) / 100;</pre>', '<pre>const sum = orders.filter(o => o.status === "Paid").reduce((s, o) => s + o.total, 0);\nreturn Math.round(sum * 100) / 100;</pre>'),
      solution: 'function revenue(orders) {\n  const sum = orders.filter(o => o.status === "Paid").reduce((s, o) => s + o.total, 0);\n  return Math.round(sum * 100) / 100;\n}\n',
      tests: [
        { name: 'the week of the sample', args: [ORDERS], expected: 109.3 },
        { name: 'no orders', args: [[]], expected: 0 },
        { name: 'cancelled orders don’t count', args: [[{ status: 'Cancelled', total: 50 }, { status: 'Paid', total: 0.1 }, { status: 'Paid', total: 0.2 }]], expected: 0.3, hidden: true },
      ],
    }),
    C(61, 20, {
      title: L('The average ticket', 'O ticket médio'), tag: L('Average', 'Média'), path: '/api/orders', fn: 'averageTicket',
      story: L('“How much does a customer spend per order?” That is the average ticket, the favourite number of every shop owner.', '“Quanto uma cliente gasta por pedido?” Esse é o ticket médio, o número favorito de toda dona de loja.'),
      what: L('<p>The <b>average ticket</b> is the revenue divided by the number of paid orders. With no paid orders it is 0, never <code>NaN</code>.</p>',
        '<p>O <b>ticket médio</b> é o faturamento dividido pelo número de pedidos pagos. Sem pedidos pagos ele é 0, nunca <code>NaN</code>.</p>'),
      why: L('<p>Dividing by zero is the classic report bug: the dashboard shows <code>NaN</code> on the first day of the month.</p>',
        '<p>Dividir por zero é o bug clássico de relatório: o painel mostra <code>NaN</code> no primeiro dia do mês.</p>'),
      task: L('<p>Write <code>averageTicket(orders)</code>: the average total of the paid orders, rounded to 2 decimals; 0 when there are none.</p>', '<p>Escreva <code>averageTicket(orders)</code>: a média dos totais dos pedidos pagos, arredondada para 2 casas; 0 quando não houver nenhum.</p>'),
      concept: L('Guard first: <code>if (paid.length === 0) return 0;</code>', 'Proteja primeiro: <code>if (paid.length === 0) return 0;</code>'),
      sample: '// GET /api/orders\n' + sample(ORDERS),
      starter: 'function averageTicket(orders) {\n\n}\n',
      hint: L('<pre>const paid = orders.filter(o => o.status === "Paid");\nif (paid.length === 0) return 0;\nconst sum = paid.reduce((s, o) => s + o.total, 0);\nreturn Math.round(sum / paid.length * 100) / 100;</pre>', '<pre>const paid = orders.filter(o => o.status === "Paid");\nif (paid.length === 0) return 0;\nconst sum = paid.reduce((s, o) => s + o.total, 0);\nreturn Math.round(sum / paid.length * 100) / 100;</pre>'),
      solution: 'function averageTicket(orders) {\n  const paid = orders.filter(o => o.status === "Paid");\n  if (paid.length === 0) return 0;\n  const sum = paid.reduce((s, o) => s + o.total, 0);\n  return Math.round(sum / paid.length * 100) / 100;\n}\n',
      tests: [
        { name: 'the week of the sample', args: [ORDERS], expected: 36.43 },
        { name: 'no paid orders', args: [[{ status: 'Pending', total: 20 }]], expected: 0 },
        { name: 'no orders at all', args: [[]], expected: 0, hidden: true },
      ],
    }),

    /* ---------- 62 · group and summarise ---------- */
    C(62, 20, {
      title: L('Revenue by category', 'Faturamento por categoria'), tag: L('Grouping', 'Agrupar'), path: '/api/order-items', fn: 'revenueByCategory',
      story: L('Which category pays the bills? I want the revenue of each one.', 'Qual categoria paga as contas? Quero o faturamento de cada uma.'),
      what: L('<p><b>Grouping</b> means putting rows together by a field and summing each group. The result is an object: <code>{ Tarot: 69.8, Accessories: 59.5 }</code>.</p>',
        '<p><b>Agrupar</b> é juntar as linhas por um campo e somar cada grupo. O resultado é um objeto: <code>{ Tarot: 69.8, Accessories: 59.5 }</code>.</p>'),
      why: L('<p>This is the same idea as <code>GROUP BY</code> in SQL and pivot tables in spreadsheets: the most used tool of data analysis.</p>',
        '<p>É a mesma ideia do <code>GROUP BY</code> no SQL e das tabelas dinâmicas das planilhas: a ferramenta mais usada da análise de dados.</p>'),
      task: L('<p>Write <code>revenueByCategory(items)</code> that returns an object with the sum of <code>price × qty</code> of each category, rounded to 2 decimals.</p>', '<p>Escreva <code>revenueByCategory(items)</code>, que devolve um objeto com a soma de <code>price × qty</code> de cada categoria, arredondada para 2 casas.</p>'),
      concept: L('<code>result[item.category] = (result[item.category] || 0) + value;</code> starts each group at 0.', '<code>result[item.category] = (result[item.category] || 0) + valor;</code> começa cada grupo em 0.'),
      sample: '// GET /api/order-items\n' + sample(ITEMS),
      starter: 'function revenueByCategory(items) {\n  const result = {};\n\n  return result;\n}\n',
      hint: L('<pre>for (const item of items) {\n  result[item.category] = (result[item.category] || 0) + item.price * item.qty;\n}\nfor (const k in result) result[k] = Math.round(result[k] * 100) / 100;</pre>', '<pre>for (const item of items) {\n  result[item.category] = (result[item.category] || 0) + item.price * item.qty;\n}\nfor (const k in result) result[k] = Math.round(result[k] * 100) / 100;</pre>'),
      solution: 'function revenueByCategory(items) {\n  const result = {};\n  for (const item of items) {\n    result[item.category] = (result[item.category] || 0) + item.price * item.qty;\n  }\n  for (const k in result) result[k] = Math.round(result[k] * 100) / 100;\n  return result;\n}\n',
      tests: [
        { name: 'the items of the sample', args: [ITEMS], expected: { Tarot: 69.8, Accessories: 59.5, Oracles: 22, Crystals: 24 } },
        { name: 'no items', args: [[]], expected: {} },
        { name: 'one category only', args: [[{ name: 'Amethyst', category: 'Crystals', price: 12, qty: 1 }, { name: 'Quartz', category: 'Crystals', price: 9.9, qty: 2 }]], expected: { Crystals: 31.8 }, hidden: true },
      ],
    }),
    C(62, 20, {
      title: L('Orders per day', 'Pedidos por dia'), tag: L('Grouping by date', 'Agrupar por data'), path: '/api/orders', fn: 'ordersPerDay',
      story: L('Is the shop busier on some days? Let’s count the orders of each day, whatever their status.', 'A loja fica mais cheia em alguns dias? Vamos contar os pedidos de cada dia, qualquer que seja o status.'),
      what: L('<p>Grouping by <b>date</b> is the first step of every trend chart: one point per day.</p>',
        '<p>Agrupar por <b>data</b> é o primeiro passo de todo gráfico de tendência: um ponto por dia.</p>'),
      why: L('<p>Here every order counts, even cancelled ones: the question is about movement in the shop, not money. Always check which rows the question needs.</p>',
        '<p>Aqui todo pedido conta, até os cancelados: a pergunta é sobre movimento na loja, não sobre dinheiro. Sempre confira quais linhas a pergunta precisa.</p>'),
      task: L('<p>Write <code>ordersPerDay(orders)</code> that returns an object like <code>{ "2026-11-20": 2 }</code>.</p>', '<p>Escreva <code>ordersPerDay(orders)</code>, que devolve um objeto como <code>{ "2026-11-20": 2 }</code>.</p>'),
      concept: L('Same pattern as before, adding 1 instead of a value: <code>(result[o.date] || 0) + 1</code>.', 'O mesmo padrão de antes, somando 1 no lugar de um valor: <code>(result[o.date] || 0) + 1</code>.'),
      sample: '// GET /api/orders\n' + sample(ORDERS),
      starter: 'function ordersPerDay(orders) {\n\n}\n',
      hint: L('<pre>const result = {};\nfor (const o of orders) result[o.date] = (result[o.date] || 0) + 1;\nreturn result;</pre>', '<pre>const result = {};\nfor (const o of orders) result[o.date] = (result[o.date] || 0) + 1;\nreturn result;</pre>'),
      solution: 'function ordersPerDay(orders) {\n  const result = {};\n  for (const o of orders) result[o.date] = (result[o.date] || 0) + 1;\n  return result;\n}\n',
      tests: [
        { name: 'the week of the sample', args: [ORDERS], expected: { '2026-11-20': 2, '2026-11-21': 2, '2026-11-22': 1 } },
        { name: 'no orders', args: [[]], expected: {} },
      ],
    }),
    C(62, 25, {
      title: L('The best seller', 'O mais vendido'), tag: L('Group, then compare', 'Agrupar e depois comparar'), path: '/api/order-items', fn: 'bestSeller',
      story: L('Which product sold the most units? Careful: the same product shows up in more than one order.', 'Qual produto vendeu mais unidades? Cuidado: o mesmo produto aparece em mais de um pedido.'),
      what: L('<p>First <b>group</b> the quantities by product name, then find the <b>largest</b> group.</p>',
        '<p>Primeiro <b>agrupe</b> as quantidades por nome de produto, depois encontre o <b>maior</b> grupo.</p>'),
      why: L('<p>Looking only at single rows would crown the wrong product: the Moon candle sold 4 + 3 = 7 units in two orders.</p>',
        '<p>Olhar só linhas soltas coroaria o produto errado: a Moon candle vendeu 4 + 3 = 7 unidades em dois pedidos.</p>'),
      task: L('<p>Write <code>bestSeller(items)</code> that returns the name of the product with the most units sold. With no items, return <code>null</code>.</p>', '<p>Escreva <code>bestSeller(items)</code>, que devolve o nome do produto com mais unidades vendidas. Sem itens, devolva <code>null</code>.</p>'),
      concept: L('After grouping, walk the groups keeping the best one: <code>if (units > bestUnits) { best = name; bestUnits = units; }</code>', 'Depois de agrupar, percorra os grupos guardando o melhor: <code>if (units > bestUnits) { best = name; bestUnits = units; }</code>'),
      sample: '// GET /api/order-items\n' + sample(ITEMS),
      starter: 'function bestSeller(items) {\n\n}\n',
      hint: L('<pre>const units = {};\nfor (const i of items) units[i.name] = (units[i.name] || 0) + i.qty;\nlet best = null, bestUnits = 0;\nfor (const name in units) if (units[name] > bestUnits) { best = name; bestUnits = units[name]; }\nreturn best;</pre>', '<pre>const units = {};\nfor (const i of items) units[i.name] = (units[i.name] || 0) + i.qty;\nlet best = null, bestUnits = 0;\nfor (const name in units) if (units[name] > bestUnits) { best = name; bestUnits = units[name]; }\nreturn best;</pre>'),
      solution: 'function bestSeller(items) {\n  const units = {};\n  for (const i of items) units[i.name] = (units[i.name] || 0) + i.qty;\n  let best = null, bestUnits = 0;\n  for (const name in units) if (units[name] > bestUnits) { best = name; bestUnits = units[name]; }\n  return best;\n}\n',
      tests: [
        { name: 'the items of the sample', args: [ITEMS], expected: 'Moon candle' },
        { name: 'no items', args: [[]], expected: null },
        { name: 'one big order beats two small ones', args: [[{ name: 'A', qty: 2 }, { name: 'B', qty: 5 }, { name: 'A', qty: 2 }]], expected: 'B', hidden: true },
      ],
    }),

    /* ---------- 63 · SQL and charts ---------- */
    X(63, 15, {
      kind: 'match', title: L('The parts of a query', 'As partes de uma consulta'), tag: 'SQL',
      story: L('The shop’s data lives in a database, and people ask it questions in SQL. Let’s learn the words.', 'Os dados da loja moram num banco de dados, e a gente faz perguntas para ele em SQL. Vamos conhecer as palavras.'),
      what: L('<p><b>SQL</b> asks questions to tables. A query reads almost like English: “select these columns from this table where this is true, ordered by that”.</p>',
        '<p><b>SQL</b> faz perguntas para tabelas. Uma consulta é quase uma frase em inglês: “selecione estas colunas desta tabela onde isto é verdade, ordenado por aquilo”.</p>'),
      why: L('<p>Almost every company keeps its data in SQL databases. Reading a query is the first skill of anyone who works with data.</p>',
        '<p>Quase toda empresa guarda os dados em bancos SQL. Ler uma consulta é a primeira habilidade de quem trabalha com dados.</p>'),
      task: L('Match each part of the query with what it does.', 'Ligue cada parte da consulta ao que ela faz.'),
      left: ['<code>SELECT id, total</code>', '<code>FROM orders</code>', '<code>WHERE status = \'Paid\'</code>', '<code>ORDER BY total DESC</code>'],
      right: [L('keeps only the rows where this is true', 'guarda só as linhas em que isso é verdade'), L('sorts the result, biggest first', 'ordena o resultado, do maior para o menor'), L('chooses the columns to show', 'escolhe as colunas que aparecem'), L('says which table to read', 'diz qual tabela ler')],
      answer: [2, 3, 0, 1],
      hints: [L('<code>FROM</code> is “from where”; <code>WHERE</code> is the filter; <code>DESC</code> means descending.', '<code>FROM</code> é “de onde”; <code>WHERE</code> é o filtro; <code>DESC</code> quer dizer decrescente.')],
      ok: L('Right! SELECT columns, FROM table, WHERE filter, ORDER BY sort.', 'Isso! SELECT colunas, FROM tabela, WHERE filtro, ORDER BY ordem.'),
    }),
    X(63, 20, {
      kind: 'predict', title: L('Run the query in your head', 'Rode a consulta de cabeça'), tag: L('Reading SQL', 'Ler SQL'),
      story: L('Before running a query on the real database, a good analyst predicts the answer. Let’s practise.', 'Antes de rodar uma consulta no banco de verdade, uma boa analista prevê a resposta. Vamos treinar.'),
      what: L('<p>The database applies the query in steps: <b>FROM</b> (the table), <b>WHERE</b> (filter the rows), <b>SELECT</b> (choose the columns), <b>ORDER BY</b> (sort).</p>',
        '<p>O banco aplica a consulta em etapas: <b>FROM</b> (a tabela), <b>WHERE</b> (filtra as linhas), <b>SELECT</b> (escolhe as colunas), <b>ORDER BY</b> (ordena).</p>'),
      why: L('<p>Predicting the result is how you notice a wrong query before its numbers reach a report.</p>',
        '<p>Prever o resultado é como você percebe uma consulta errada antes que os números dela cheguem a um relatório.</p>'),
      task: L('Read the table and the query, then answer.', 'Leia a tabela e a consulta, depois responda.'),
      data: '<div class="lg-scroll"><table class="lg-table"><thead><tr><th>id</th><th>status</th><th>total</th></tr></thead><tbody>' +
        ORDERS.map(o => '<tr><td>' + o.id + '</td><td>' + o.status + '</td><td>' + o.total + '</td></tr>').join('') + '</tbody></table></div>' +
        '<pre class="lg-pseudo">SELECT id, total\nFROM orders\nWHERE status = \'Paid\'\nORDER BY total DESC;</pre>',
      questions: [
        { q: L('How many rows come back?', 'Quantas linhas voltam?'), options: ['2', '3', '4', '5'], answer: 1 },
        { q: L('Which order is in the first row?', 'Qual pedido está na primeira linha?'), options: ['ORD-101', 'ORD-103', 'ORD-105', 'ORD-102'], answer: 1 },
        { q: L('Does the <code>status</code> column show up in the result?', 'A coluna <code>status</code> aparece no resultado?'), options: [L('Yes', 'Sim'), L('No: it is used to filter, but it isn’t in the SELECT', 'Não: ela é usada no filtro, mas não está no SELECT')], answer: 1 },
      ],
      hints: [L('Three orders are Paid. Sorted by total from the biggest: 57.4, 34.9, 17.', 'Três pedidos estão Paid. Ordenando pelo total do maior: 57,4, 34,9, 17.')],
      ok: L('Exactly: 3 rows, ORD-103 first, and only id and total as columns.', 'Exato: 3 linhas, ORD-103 primeiro, e só id e total como colunas.'),
    }),
    X(63, 20, {
      kind: 'predict', title: L('Summing by category in SQL', 'Somando por categoria no SQL'), tag: 'GROUP BY',
      story: L('Remember <code>revenueByCategory</code>? The same report in SQL needs one more line.', 'Lembra da <code>revenueByCategory</code>? O mesmo relatório em SQL precisa de mais uma linha.'),
      what: L('<p><code>SUM(...)</code> adds values, and <code>GROUP BY</code> says which groups to add separately: one total per category.</p>',
        '<p><code>SUM(...)</code> soma valores, e <code>GROUP BY</code> diz quais grupos somar separadamente: um total por categoria.</p>'),
      why: L('<p>Without <code>GROUP BY</code> the database sums everything into one number, and the category column makes no sense.</p>',
        '<p>Sem <code>GROUP BY</code> o banco soma tudo num número só, e a coluna de categoria não faz sentido.</p>'),
      task: L('Choose the line that completes the query.', 'Escolha a linha que completa a consulta.'),
      data: '<pre class="lg-pseudo">SELECT category, SUM(price * qty) AS revenue\nFROM order_items\n???;</pre>',
      questions: [
        { q: L('Which line goes in place of <code>???</code>?', 'Qual linha vai no lugar de <code>???</code>?'), code: true, options: ['GROUP BY category', 'ORDER BY category', 'WHERE category', 'SUM BY category'], answer: 0 },
        { q: L('With the items of level II, what is the revenue of <code>Accessories</code>?', 'Com os itens do nível II, qual o faturamento de <code>Accessories</code>?'), options: ['8.5', '34', '59.5', '69.8'], answer: 2 },
      ],
      hints: [L('The query must make one group per category. And the candles: 8.5 × 4 + 8.5 × 3.', 'A consulta precisa fazer um grupo por categoria. E as velas: 8,5 × 4 + 8,5 × 3.')],
      ok: L('Right: <code>GROUP BY category</code>, and 59.5 for Accessories.', 'Isso: <code>GROUP BY category</code>, e 59,5 para Accessories.'),
    }),
    X(63, 20, {
      kind: 'match', title: L('The right chart for the question', 'O gráfico certo para a pergunta'), tag: L('Data visualisation', 'Visualização de dados'),
      story: L('Bruxa Maria wants a dashboard. Each question deserves its own kind of chart.', 'A Bruxa Maria quer um painel. Cada pergunta merece o seu tipo de gráfico.'),
      what: L('<p>Charts are answers drawn: <b>lines</b> show change over time, <b>bars</b> compare categories, a <b>donut</b> shows parts of a whole, and <b>scatter</b> shows the relation between two numbers.</p>',
        '<p>Gráficos são respostas desenhadas: <b>linhas</b> mostram mudança no tempo, <b>barras</b> comparam categorias, uma <b>rosca</b> mostra partes de um todo, e a <b>dispersão</b> mostra a relação entre dois números.</p>'),
      why: L('<p>The wrong chart hides the answer: a pie with 12 slices or a line between categories confuses more than it explains.</p>',
        '<p>O gráfico errado esconde a resposta: uma pizza com 12 fatias ou uma linha entre categorias confunde mais do que explica.</p>'),
      task: L('Match each question with the best chart.', 'Ligue cada pergunta ao melhor gráfico.'),
      left: [L('How did sales change day by day?', 'Como as vendas mudaram dia a dia?'), L('Which category sells the most?', 'Qual categoria vende mais?'), L('What share of the revenue comes from Tarot?', 'Que parte do faturamento vem do Tarot?'), L('Do cheaper products sell more units?', 'Produtos mais baratos vendem mais unidades?')],
      right: [L('Bars', 'Barras'), L('Scatter', 'Dispersão'), L('Line', 'Linha'), L('Donut', 'Rosca')],
      answer: [2, 0, 3, 1],
      hints: [L('Time → line. Compare → bars. Part of a whole → donut. Two numbers together → scatter.', 'Tempo → linha. Comparar → barras. Parte de um todo → rosca. Dois números juntos → dispersão.')],
      ok: L('Perfect: line, bars, donut and scatter.', 'Perfeito: linha, barras, rosca e dispersão.'),
    }),
  ];
  return { module, ranks, git, levels, exercises };
}

// The Git track: the terminal exercises of "Get the code" (made by makeGitExercises in index.html from `git`),
// then the ideas behind them, in the same logic kinds as the Start Track.
function buildGitTrack(L, shared) {
  const h = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const c = s => '<code>' + h(s) + '</code>';
  let n = 0;
  const id = () => 'gt' + String(++n).padStart(2, '0');
  const X = (level, xp, d) => Object.assign({ id: id(), level, xp, type: 'logic', conceptTag: d.tag, hints: [],
    action: { method: 'GIT', path: d.tag, label: L('Concept', 'Conceito') } }, d);

  const module = {
    id: 'git', name: 'Git', image: 'assets/track-git.webp',
    imageAlt: L('Pixel art: Geekie Jackie at a laptop in front of a board with main, develop and feature branches, and books about Git, GitHub, GitLab and Bitbucket', 'Pixel art: a Geekie Jackie no notebook diante de um quadro com as branches main, develop e feature, e livros de Git, GitHub, GitLab e Bitbucket'),
    stack: L('Version control · Git and GitHub', 'Controle de versão · Git e GitHub'), color: 'var(--m-git)',
    art: 'git switch -c <b>feature/123_coupon</b>\ngit commit -m <b>"feat: …"</b>\ngit push -u origin …\n// Every change has a story.',
    bullets: [L('Clone, branch, commit and push in the terminal and in VS Code', 'Clone, branch, commit e push no terminal e no VS Code'), L('init, status, add, commit and log', 'init, status, add, commit e log'),
      L('Branches: main, develop and feature/*', 'Branches: main, develop e feature/*'), L('Merge, conflicts and pull requests', 'Merge, conflitos e pull requests')],
  };
  const ranks = [
    { at: 0, name: L('New Intern', 'Novo Estagiário') }, { at: 0.15, name: L('Shop Apprentice', 'Aprendiz da Loja') }, { at: 0.4, name: L('Commit Keeper', 'Guardiã dos Commits') },
    { at: 0.7, name: L('Branch Weaver', 'Tecelã de Branches') }, { at: 0.95, name: L('Git Master', 'Mestre do Git') },
  ];
  const git = {
    repo: 'geekiejackieacademy', tool: L('academy', 'da academia'),
    url: shared.FORK_URL, urlPattern: shared.FORK_PATTERN, forkNote: shared.FORK_NOTE,
    folder: 'geekiejackieacademy',
    pullWhy: L('For example, Bruxa Maria added a new rule to the Rulebook yesterday. Without <code>git pull</code> you would fix a typo in an old version of the file.',
      'Por exemplo, a Bruxa Maria acrescentou uma regra nova nas Regras da Loja ontem. Sem <code>git pull</code> você corrigiria um erro de digitação numa versão antiga do arquivo.'),
    pullFile: 'docs/rulebook.md',
    task: L('fix a typo in the Shop Rulebook', 'corrigir um erro de digitação nas Regras da Loja'),
    branch: 'feature/123_fix-rulebook-typo',
    branchNote: L('Branches start with <code>feature/</code> and the ticket number, like <code>feature/101_coupon-rules</code>.',
      'As branches começam com <code>feature/</code> e o número do ticket, como <code>feature/101_coupon-rules</code>.'),
    file: 'docs/rulebook.md',
    commitMsg: 'docs: fix typo in the rulebook',
    commitNote: L('The shop uses <b>conventional commits</b>: a type, a colon and what changed. <code>docs:</code> is for documentation, <code>feat:</code> for something new, <code>fix:</code> for repairs.',
      'A loja usa <b>conventional commits</b>: um tipo, dois-pontos e o que mudou. <code>docs:</code> é para documentação, <code>feat:</code> para algo novo, <code>fix:</code> para correções. As mensagens de commit são escritas em inglês.'),
  };
  const levels = [
    { id: 701, module: 'git', git: true, name: L('Get the code', 'Pegue o código'), topic: L('Clone, branch, commit and push', 'Clone, branch, commit e push'), badge: 'git' },
    { id: 71, module: 'git', name: L('First Spells', 'Primeiros Feitiços'), topic: 'init, status, add, commit, log', badge: '✦' },
    { id: 72, module: 'git', name: 'Branches', topic: 'main, develop, feature/*', badge: '⑂' },
    { id: 73, module: 'git', name: L('Bringing Work Together', 'Juntando o Trabalho'), topic: L('Pull, push, merge and PR', 'Pull, push, merge e PR'), badge: '⇄' },
  ];

  const exercises = [
    /* ---------- 71 · first spells ---------- */
    X(71, 15, {
      kind: 'match', title: L('Five commands to start', 'Cinco comandos para começar'), tag: L('Git commands', 'Comandos do Git'),
      story: L('Every project of the shop is a Git repository. These five commands are the ones you will type every day.', 'Todo projeto da loja é um repositório Git. Estes cinco comandos são os que você vai digitar todo dia.'),
      what: L('<p><b>Git</b> keeps the history of a project as a series of <b>commits</b>, like photos of every version. A folder with that history is a <b>repository</b>.</p>',
        '<p>O <b>Git</b> guarda o histórico de um projeto como uma série de <b>commits</b>, como fotos de cada versão. Uma pasta com esse histórico é um <b>repositório</b>.</p>'),
      why: L('<p>With the history you can see who changed what and why, and go back when something breaks.</p>',
        '<p>Com o histórico você vê quem mudou o quê e por quê, e consegue voltar atrás quando algo quebra.</p>'),
      task: L('Match each command with what it does.', 'Ligue cada comando ao que ele faz.'),
      left: [c('git init'), c('git status'), c('git add cart.js'), c('git commit -m "feat: …"'), c('git log')],
      right: [L('shows the history of commits', 'mostra o histórico de commits'), L('chooses a file to go into the next commit', 'escolhe um arquivo para entrar no próximo commit'), L('creates a new repository in the folder', 'cria um repositório novo na pasta'),
        L('saves the chosen changes in the history', 'salva no histórico as mudanças escolhidas'), L('shows what changed and what is chosen', 'mostra o que mudou e o que está escolhido')],
      answer: [2, 4, 1, 3, 0],
      hints: [L('<code>add</code> chooses, <code>commit</code> saves, <code>log</code> looks back.', '<code>add</code> escolhe, <code>commit</code> salva, <code>log</code> olha para trás.')],
      ok: L('Right! init creates, status shows, add chooses, commit saves, log remembers.', 'Isso! init cria, status mostra, add escolhe, commit salva, log lembra.'),
    }),
    X(71, 15, {
      kind: 'order', title: L('The first commit of a project', 'O primeiro commit de um projeto'), tag: L('A new repository', 'Um repositório novo'),
      story: L('Bruxa Maria wants a little project for the shop’s newsletter. Let’s start it from zero.', 'A Bruxa Maria quer um projetinho para a newsletter da loja. Vamos começar do zero.'),
      what: L('<p>A repository starts with <code>git init</code> inside the project folder. Then each change goes through two steps: <code>git add</code> (choose) and <code>git commit</code> (save).</p>',
        '<p>Um repositório começa com <code>git init</code> dentro da pasta do projeto. Depois cada mudança passa por dois passos: <code>git add</code> (escolher) e <code>git commit</code> (salvar).</p>'),
      why: L('<p>Running <code>git init</code> in the wrong folder (like your whole Documents folder) is a classic beginner trap.</p>',
        '<p>Rodar <code>git init</code> na pasta errada (como a sua pasta Documentos inteira) é uma armadilha clássica de quem está começando.</p>'),
      task: L('Put the steps in order.', 'Coloque os passos em ordem.'),
      steps: [c('mkdir newsletter'), c('cd newsletter'), c('git init'), L('Create the file README.md', 'Criar o arquivo README.md'), c('git add README.md'), c('git commit -m "docs: add readme"')],
      start: [2, 4, 0, 5, 1, 3],
      hints: [L('First the folder exists, then you go inside it, then it becomes a repository.', 'Primeiro a pasta existe, depois você entra nela, depois ela vira um repositório.')],
      ok: L('Perfect: folder, enter, init, file, add, commit.', 'Perfeito: pasta, entrar, init, arquivo, add, commit.'),
    }),
    X(71, 20, {
      kind: 'predict', title: L('What goes into the commit?', 'O que entra no commit?'), tag: L('Staging area', 'Área de stage'),
      story: L('I changed two files but I only want to save one of them now. Let’s see what Git does.', 'Mudei dois arquivos, mas quero salvar só um agora. Vamos ver o que o Git faz.'),
      what: L('<p>Git has three places: your <b>working folder</b> (what you edit), the <b>stage</b> (what you chose with <code>git add</code>) and the <b>history</b> (what <code>git commit</code> saved). A commit takes only what is in the stage.</p>',
        '<p>O Git tem três lugares: a <b>pasta de trabalho</b> (o que você edita), o <b>stage</b> (o que você escolheu com <code>git add</code>) e o <b>histórico</b> (o que o <code>git commit</code> salvou). Um commit leva só o que está no stage.</p>'),
      why: L('<p>Choosing what goes into each commit keeps every commit about one thing, which makes review and history easy to read.</p>',
        '<p>Escolher o que entra em cada commit deixa cada commit sobre uma coisa só, o que facilita a revisão e a leitura do histórico.</p>'),
      task: L('Read what happened and answer.', 'Leia o que aconteceu e responda.'),
      data: '<pre class="lg-pseudo">' + L('1. edited  cart.js  and  styles.css\n2. git add cart.js\n3. git commit -m "fix: round the cart total"', '1. editou  cart.js  e  styles.css\n2. git add cart.js\n3. git commit -m "fix: round the cart total"') + '</pre>',
      questions: [
        { q: L('Which file goes into the commit?', 'Qual arquivo entra no commit?'), code: true, options: ['cart.js', 'styles.css', 'cart.js + styles.css'], answer: 0 },
        { q: L('After the commit, what does <code>git status</code> say about styles.css?', 'Depois do commit, o que o <code>git status</code> diz sobre styles.css?'), options: [L('Modified, not staged', 'Modificado, fora do stage'), L('Saved in the history', 'Salvo no histórico'), L('Deleted', 'Apagado')], answer: 0 },
        { q: L('Is the change in styles.css lost?', 'A mudança em styles.css se perdeu?'), options: [L('No: it is still in the folder, waiting for its own commit', 'Não: ela continua na pasta, esperando o próprio commit'), L('Yes: Git threw it away', 'Sim: o Git jogou fora')], answer: 0 },
      ],
      hints: [L('Only what went through <code>git add</code> goes into the commit.', 'Só entra no commit o que passou pelo <code>git add</code>.')],
      ok: L('Exactly: only cart.js; styles.css waits in the folder, still modified.', 'Exato: só cart.js; styles.css espera na pasta, ainda modificado.'),
    }),

    /* ---------- 72 · branches ---------- */
    X(72, 15, {
      kind: 'match', title: L('Which branch is which?', 'Cada branch para quê?'), tag: L('Branch flow', 'Fluxo de branches'),
      story: L('The board in my office shows main, develop and feature branches. What is each one for?', 'O quadro do meu escritório mostra as branches main, develop e feature. Para que serve cada uma?'),
      what: L('<p>A <b>branch</b> is a separate line of work. Many teams use <code>main</code> for what is live, <code>develop</code> to gather finished work, and one <code>feature/*</code> branch per task.</p>',
        '<p>Uma <b>branch</b> é uma linha de trabalho separada. Muitos times usam <code>main</code> para o que está no ar, <code>develop</code> para juntar o trabalho pronto, e uma branch <code>feature/*</code> para cada tarefa.</p>'),
      why: L('<p>Working on your own branch means you never break what customers are using while you experiment.</p>',
        '<p>Trabalhar na sua própria branch quer dizer que você nunca quebra o que as clientes estão usando enquanto experimenta.</p>'),
      task: L('Match each branch with its job.', 'Ligue cada branch ao trabalho dela.'),
      left: [c('main'), c('develop'), c('feature/123_coupon-rules'), c('hotfix/124_checkout-crash')],
      right: [L('one task, on its own', 'uma tarefa, sozinha'), L('an urgent fix of what is live', 'uma correção urgente do que está no ar'), L('the code that is live for customers', 'o código que está no ar para as clientes'), L('where finished features meet before going live', 'onde as features prontas se juntam antes de ir para o ar')],
      answer: [2, 3, 0, 1],
      hints: [L('“main” is the main one; “hotfix” is hot, it can’t wait.', '“main” é a principal; “hotfix” é quente, não pode esperar.')],
      ok: L('Right! main live, develop gathering, feature one task, hotfix urgent.', 'Isso! main no ar, develop juntando, feature uma tarefa, hotfix urgente.'),
    }),
    X(72, 15, {
      kind: 'pick', title: L('Good branch names', 'Bons nomes de branch'), tag: L('Naming', 'Nomes'),
      story: L('The shop’s rule: <code>feature/</code>, the ticket number, an underscore and a short description in English, in lower case with hyphens.', 'A regra da loja: <code>feature/</code>, o número do ticket, um underline e uma descrição curta em inglês, em minúsculas com hífens.'),
      what: L('<p>A naming rule lets anyone know, just from the name, what a branch is for and which ticket it belongs to.</p>',
        '<p>Uma regra de nomes faz qualquer pessoa saber, só pelo nome, para que serve a branch e de qual ticket ela é.</p>'),
      why: L('<p>Tools can also read the ticket number from the name and link the branch to the task automatically.</p>',
        '<p>Ferramentas também conseguem ler o número do ticket no nome e ligar a branch à tarefa automaticamente.</p>'),
      task: L('Mark the names that follow the rule.', 'Marque os nomes que seguem a regra.'),
      options: [c('feature/123_coupon-rules'), c('feature/124_sold-out-badge'), c('my-branch'), c('feature/coupon'), c('Feature/125 Coupon Rules')],
      correct: [true, true, false, false, false],
      hints: [L('Three of them miss something: a ticket number, the <code>feature/</code> part, or lower case and hyphens.', 'Três deles esquecem algo: o número do ticket, o <code>feature/</code>, ou as minúsculas e os hífens.')],
      ok: L('Exactly: only the two with feature/, number, underscore and lower case.', 'Exato: só os dois com feature/, número, underline e minúsculas.'),
    }),
    X(72, 20, {
      kind: 'order', title: L('A task from start to PR', 'Uma tarefa do começo ao PR'), tag: L('Feature flow', 'Fluxo de uma feature'),
      story: L('Ticket 123: “Coupons give 1% to 50% off”. Let’s go from the ticket to the pull request.', 'Ticket 123: “Cupons dão de 1% a 50% de desconto”. Vamos do ticket até o pull request.'),
      what: L('<p>Every task follows the same path: update your copy, open a branch, change, choose, save, send and ask for review.</p>',
        '<p>Toda tarefa segue o mesmo caminho: atualizar a sua cópia, abrir uma branch, mudar, escolher, salvar, enviar e pedir revisão.</p>'),
      why: L('<p>Skipping <code>git pull</code> at the start is how most conflicts are born.</p>',
        '<p>Pular o <code>git pull</code> no começo é como nasce a maioria dos conflitos.</p>'),
      task: L('Put the steps in order.', 'Coloque os passos em ordem.'),
      steps: [c('git pull'), c('git switch -c feature/123_coupon-rules'), L('Change the code and test it', 'Mudar o código e testar'), c('git add .'), c('git commit -m "feat: limit coupons to 1-50%"'), c('git push -u origin feature/123_coupon-rules'), L('Open the pull request on GitHub', 'Abrir o pull request no GitHub')],
      start: [4, 0, 6, 2, 5, 1, 3],
      hints: [L('It starts by getting the newest code and ends by asking someone to review it.', 'Começa pegando o código mais novo e termina pedindo para alguém revisar.')],
      ok: L('Perfect: pull, branch, change, add, commit, push, PR.', 'Perfeito: pull, branch, mudar, add, commit, push, PR.'),
    }),

    /* ---------- 73 · bringing work together ---------- */
    X(73, 15, {
      kind: 'match', title: L('Up and down with GitHub', 'Subindo e descendo com o GitHub'), tag: L('Remote', 'Remoto'),
      story: L('My computer and GitHub each keep a copy of the project. Which command moves things where?', 'O meu computador e o GitHub guardam cada um uma cópia do projeto. Qual comando leva o quê para onde?'),
      what: L('<p>The copy on GitHub is the <b>remote</b> (<code>origin</code>). Commands move commits between your computer and it, or between branches.</p>',
        '<p>A cópia no GitHub é o <b>remoto</b> (<code>origin</code>). Os comandos levam commits entre o seu computador e ele, ou entre branches.</p>'),
      why: L('<p>A commit that was never pushed exists only on your computer. If the laptop dies, the work dies with it.</p>',
        '<p>Um commit que nunca foi enviado existe só no seu computador. Se o notebook quebrar, o trabalho vai junto.</p>'),
      task: L('Match each command with what it does.', 'Ligue cada comando ao que ele faz.'),
      left: [c('git clone <url>'), c('git pull'), c('git push'), c('git merge develop')],
      right: [L('sends your commits to GitHub', 'envia os seus commits para o GitHub'), L('joins the develop branch into the current one', 'junta a branch develop na branch atual'), L('downloads the repository for the first time', 'baixa o repositório pela primeira vez'), L('brings the new commits from GitHub', 'traz os commits novos do GitHub')],
      answer: [2, 3, 0, 1],
      hints: [L('<code>pull</code> pulls towards you, <code>push</code> pushes away from you.', '<code>pull</code> puxa para você, <code>push</code> empurra para longe de você.')],
      ok: L('Right! clone the first time, pull to bring, push to send, merge to join.', 'Isso! clone na primeira vez, pull para trazer, push para enviar, merge para juntar.'),
    }),
    X(73, 20, {
      kind: 'bug', style: 'pseudo', title: L('Solve the conflict', 'Resolva o conflito'), tag: L('Merge conflict', 'Conflito de merge'),
      story: L('Two people changed the shipping rule at the same time, and Git stopped the merge. Which version breaks the shop’s rule?', 'Duas pessoas mudaram a regra do frete ao mesmo tempo, e o Git parou o merge. Qual versão quebra a regra da loja?'),
      what: L('<p>A <b>conflict</b> happens when two branches change the same lines. Git shows both versions between ' + c('<<<<<<<') + ', ' + c('=======') + ' and ' + c('>>>>>>>') + ', and a person decides.</p>',
        '<p>Um <b>conflito</b> acontece quando duas branches mudam as mesmas linhas. O Git mostra as duas versões entre ' + c('<<<<<<<') + ', ' + c('=======') + ' e ' + c('>>>>>>>') + ', e uma pessoa decide.</p>'),
      why: L('<p>Solving a conflict is not choosing “mine”: it is checking which version follows the rule. Here, BR-SHP-03: free shipping from €50, €50 included.</p>',
        '<p>Resolver um conflito não é escolher “o meu”: é conferir qual versão segue a regra. Aqui, a BR-SHP-03: frete grátis a partir de €50, com €50 incluído.</p>'),
      task: L('Click the line that breaks BR-SHP-03.', 'Clique na linha que quebra a BR-SHP-03.'),
      lines: [h('function shipping(total) {'), h('<<<<<<< HEAD'), h('  return total >= 50 ? 0 : 4.9;'), h('======='), h('  return total > 50 ? 0 : 4.9;'), h('>>>>>>> feature/123_shipping'), h('}')],
      answer: 4,
      hints: [L('With a total of exactly €50.00, which line still charges €4.90?', 'Com um total de exatamente €50,00, qual linha ainda cobra €4,90?')],
      ok: L('Found it! <code>&gt; 50</code> charges shipping at €50. Keep <code>&gt;= 50</code> and delete the markers.', 'Achou! <code>&gt; 50</code> cobra frete em €50. Fique com <code>&gt;= 50</code> e apague as marcas.'),
    }),
    X(73, 20, {
      kind: 'pick', title: L('A pull request people want to review', 'Um pull request que dá vontade de revisar'), tag: L('Pull request', 'Pull request'),
      story: L('Your branch is pushed. Before asking for review, let’s check the pull request.', 'A sua branch foi enviada. Antes de pedir revisão, vamos conferir o pull request.'),
      what: L('<p>A <b>pull request</b> (PR) asks to bring your branch into another one, with a review by someone from the team.</p>',
        '<p>Um <b>pull request</b> (PR) pede para levar a sua branch para outra, com a revisão de alguém do time.</p>'),
      why: L('<p>A small, clear PR is reviewed in minutes. A giant one waits for days and lets bugs slip through.</p>',
        '<p>Um PR pequeno e claro é revisado em minutos. Um gigante espera dias e deixa bugs passarem.</p>'),
      task: L('Mark what makes a good pull request.', 'Marque o que faz um bom pull request.'),
      options: [L('A title that says what changed', 'Um título que diz o que mudou'), L('Small: one task only', 'Pequeno: uma tarefa só'), L('The tests pass', 'Os testes passando'),
        L('40 files from three different tasks', '40 arquivos de três tarefas diferentes'), L('Commits called “stuff” and “fixes”', 'Commits chamados “coisas” e “ajustes”'), L('A link to the ticket', 'Um link para o ticket')],
      correct: [true, true, true, false, false, true],
      hints: [L('Think of the person reviewing it: what helps them understand fast?', 'Pense em quem vai revisar: o que ajuda essa pessoa a entender rápido?')],
      ok: L('Exactly: clear title, small, tests passing and the ticket link.', 'Exato: título claro, pequeno, testes passando e o link do ticket.'),
    }),
  ];
  return { module, ranks, git, levels, exercises };
}
