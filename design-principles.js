/* =====================================================================
   PRINCÍPIOS DE DESIGN DE CÓDIGO
   Recursos técnicos → Princípios de design de código (index.html#design)

   Só dados: a página (mapa, cartões e janela de status) fica no index.html.
   A ordem aqui é a ordem dos cartões no mapa: SOLID e DRY em cima, KISS e YAGNI embaixo.

   Cada princípio:
     id        identificador curto (vira o link #design/<id>)                    (obrigatório)
     name      a sigla, igual nas duas línguas                                    (obrigatório)
     full      o nome por extenso, em inglês (o nome original)                    (obrigatório)
     color     a cor do cartão e da janela                                        (obrigatório)
     image     a arte do cartão, em assets/design/                                (obrigatório)
     tracks    trilhas relacionadas: 'start', 'dev', 'qa', 'ai'                   (opcional)
     rules     regras da loja usadas nos exemplos, como 'BR-SHP-03'               (opcional)
     title     o nome em português                                                (obrigatório)
     summary   o princípio em 1 ou 2 frases                                       (obrigatório)
     why       por que ele importa                                                (obrigatório)
     smell     o sinal de alerta: como perceber que o código precisa dele         (obrigatório)
     before / after   exemplo da lojinha, JavaScript válido                       (obrigatório, menos no SOLID)
     parts     só no SOLID: as 5 letras, cada uma { letter, title, summary, rules?, before, after, en }
     en        a versão em inglês dos textos e do código                          (obrigatório)
   Os testes conferem os campos e se todo código é JavaScript válido:
     node --test "tests/*.test.mjs"
   ===================================================================== */

var DESIGN_PRINCIPLES = [
  {
    id: 'solid', name: 'SOLID', full: 'SOLID principles', color: '#7BD389', image: 'assets/design/solid.webp',
    tracks: ['dev', 'qa'],
    title: 'Cinco princípios para organizar classes e módulos',
    summary: 'SOLID junta cinco princípios, um para cada letra. Juntos, eles ajudam a dividir o código em partes que mudam sem quebrar as outras.',
    why: 'Sistemas crescem. Sem uma organização, cada regra nova da loja vira um remendo no meio de uma função gigante, e cada remendo quebra outra coisa.',
    smell: 'Uma classe que faz de tudo, um if/else que cresce a cada novidade, testes que precisam de banco de dados e relógio de verdade para rodar.',
    parts: [
      {
        letter: 'S', title: 'Responsabilidade única', full: 'Single Responsibility', rules: ['BR-ORD-02'],
        summary: 'Uma classe ou módulo tem um único motivo para mudar. Calcular, salvar e avisar o cliente são três motivos diferentes.',
        before: 'class OrderService {\n  create(order) {\n    order.total = order.items.reduce((s, i) => s + i.price * i.qty, 0);\n    db.insert("orders", order);\n    mailer.send(order.email, "Pedido recebido!");\n    return order;\n  }\n}',
        after: 'const pricing = { total: items => items.reduce((s, i) => s + i.price * i.qty, 0) };\nconst orders = { save: order => db.insert("orders", order) };\nconst notify = { orderReceived: order => mailer.send(order.email, "Pedido recebido!") };\n\nfunction createOrder(order) {\n  const saved = orders.save({ ...order, total: pricing.total(order.items) });\n  notify.orderReceived(saved);\n  return saved; // BR-ORD-02: 201 com o pedido novo\n}',
        en: {
          title: 'Single responsibility',
          summary: 'A class or module has one single reason to change. Doing the maths, saving and emailing the customer are three different reasons.',
          before: 'class OrderService {\n  create(order) {\n    order.total = order.items.reduce((s, i) => s + i.price * i.qty, 0);\n    db.insert("orders", order);\n    mailer.send(order.email, "Order received!");\n    return order;\n  }\n}',
          after: 'const pricing = { total: items => items.reduce((s, i) => s + i.price * i.qty, 0) };\nconst orders = { save: order => db.insert("orders", order) };\nconst notify = { orderReceived: order => mailer.send(order.email, "Order received!") };\n\nfunction createOrder(order) {\n  const saved = orders.save({ ...order, total: pricing.total(order.items) });\n  notify.orderReceived(saved);\n  return saved; // BR-ORD-02: 201 with the new order\n}',
        },
      },
      {
        letter: 'O', title: 'Aberto/fechado', full: 'Open/Closed', rules: ['BR-SHP-02', 'BR-SHP-03'],
        summary: 'Aberto para casos novos, fechado para alterações: você acrescenta um caso sem reescrever o que já funciona.',
        before: 'function shippingCost(order) {\n  if (order.type === "digital") return 0;\n  else if (order.type === "physical") return order.total >= 50 ? 0 : 4.9;\n  else if (order.type === "pickup") return 0;\n  // cada tipo novo = editar esta função\n}',
        after: 'const SHIPPING_RULES = {\n  digital: () => 0,                                 // BR-SHP-02\n  physical: order => (order.total >= 50 ? 0 : 4.9), // BR-SHP-03\n  pickup: () => 0,\n};\n// um tipo novo = uma linha nova na tabela, sem tocar nesta função\nfunction shippingCost(order) {\n  return SHIPPING_RULES[order.type](order);\n}',
        en: {
          title: 'Open/closed',
          summary: 'Open to new cases, closed to changes: you add a case without rewriting what already works.',
          before: 'function shippingCost(order) {\n  if (order.type === "digital") return 0;\n  else if (order.type === "physical") return order.total >= 50 ? 0 : 4.9;\n  else if (order.type === "pickup") return 0;\n  // every new type = editing this function\n}',
          after: 'const SHIPPING_RULES = {\n  digital: () => 0,                                 // BR-SHP-02\n  physical: order => (order.total >= 50 ? 0 : 4.9), // BR-SHP-03\n  pickup: () => 0,\n};\n// a new type = a new line in the table, without touching this function\nfunction shippingCost(order) {\n  return SHIPPING_RULES[order.type](order);\n}',
        },
      },
      {
        letter: 'L', title: 'Substituição de Liskov', full: 'Liskov Substitution', rules: ['BR-STK-01', 'BR-STK-05'],
        summary: 'Onde o código espera um tipo, qualquer variação dele funciona do mesmo jeito, sem surpresas. Se é um produto, se comporta como produto.',
        before: 'class Product {\n  canSell(qty) { return qty > 0 && this.stock >= qty; }\n}\nclass DigitalProduct extends Product {\n  canSell(qty) { throw new Error("digital has no stock"); } // quebra quem chama\n}',
        after: 'class Product {\n  canSell(qty) { return qty > 0 && this.stock >= qty; } // BR-STK-01\n}\nclass DigitalProduct extends Product {\n  // sem estoque, sempre disponível (BR-STK-05): mesma pergunta, resposta do mesmo tipo\n  canSell(qty) { return qty > 0; }\n}',
        en: {
          title: 'Liskov substitution',
          summary: 'Where the code expects a type, any variation of it works the same way, with no surprises. If it is a product, it behaves like a product.',
          before: 'class Product {\n  canSell(qty) { return qty > 0 && this.stock >= qty; }\n}\nclass DigitalProduct extends Product {\n  canSell(qty) { throw new Error("digital has no stock"); } // breaks the callers\n}',
          after: 'class Product {\n  canSell(qty) { return qty > 0 && this.stock >= qty; } // BR-STK-01\n}\nclass DigitalProduct extends Product {\n  // no stock, always available (BR-STK-05): same question, same kind of answer\n  canSell(qty) { return qty > 0; }\n}',
        },
      },
      {
        letter: 'I', title: 'Segregação de interfaces', full: 'Interface Segregation',
        summary: 'Ninguém deveria depender do que não usa. Em vez de pedir o objeto inteiro, a função pede só o que precisa.',
        before: 'function sendReceipt(customer) {\n  // precisa só do e-mail, mas recebe o cliente inteiro:\n  // endereço, senha, histórico, cartões...\n  return mailer.send(customer.email, "Seu recibo");\n}',
        after: 'function sendReceipt(email) {\n  return mailer.send(email, "Seu recibo");\n}\n// no teste: sendReceipt("jane@example.com"), sem montar um cliente inteiro',
        en: {
          title: 'Interface segregation',
          summary: 'Nobody should depend on what they don’t use. Instead of asking for the whole object, a function asks only for what it needs.',
          before: 'function sendReceipt(customer) {\n  // needs only the email, but gets the whole customer:\n  // address, password, history, cards...\n  return mailer.send(customer.email, "Your receipt");\n}',
          after: 'function sendReceipt(email) {\n  return mailer.send(email, "Your receipt");\n}\n// in a test: sendReceipt("jane@example.com"), without building a whole customer',
        },
      },
      {
        letter: 'D', title: 'Inversão de dependência', full: 'Dependency Inversion', rules: ['BR-CPN-01'],
        summary: 'A regra recebe de fora aquilo de que depende (a data de hoje, o banco, o pagamento), em vez de criar ou buscar sozinha. Assim o teste entrega uma data fixa.',
        before: 'function isCouponValid(coupon) {\n  const today = new Date().toISOString().slice(0, 10); // depende do relógio de verdade\n  return today <= coupon.expiresOn;\n}',
        after: '// BR-CPN-01: válido até o dia expiresOn, inclusive\nfunction isCouponValid(coupon, today) {\n  return today <= coupon.expiresOn;\n}\n// app:   isCouponValid(coupon, new Date().toISOString().slice(0, 10))\n// teste: isCouponValid({ expiresOn: "2026-12-31" }, "2026-12-31") === true',
        en: {
          title: 'Dependency inversion',
          summary: 'The rule receives from outside what it depends on (today’s date, the database, the payment), instead of creating or fetching it itself. Then a test passes a fixed date.',
          before: 'function isCouponValid(coupon) {\n  const today = new Date().toISOString().slice(0, 10); // depends on the real clock\n  return today <= coupon.expiresOn;\n}',
          after: '// BR-CPN-01: valid up to and including the expiresOn day\nfunction isCouponValid(coupon, today) {\n  return today <= coupon.expiresOn;\n}\n// app:  isCouponValid(coupon, new Date().toISOString().slice(0, 10))\n// test: isCouponValid({ expiresOn: "2026-12-31" }, "2026-12-31") === true',
        },
      },
    ],
    en: {
      title: 'Five principles to organise classes and modules',
      summary: 'SOLID puts together five principles, one for each letter. Together they help split code into parts that change without breaking the others.',
      why: 'Systems grow. Without some organisation, every new shop rule becomes a patch in the middle of a giant function, and every patch breaks something else.',
      smell: 'A class that does everything, an if/else that grows with every novelty, tests that need a real database and a real clock to run.',
    },
  },
  {
    id: 'dry', name: 'DRY', full: 'Don’t Repeat Yourself', color: '#8FA8FF', image: 'assets/design/dry.webp',
    tracks: ['dev', 'qa'], rules: ['BR-ORD-04'],
    title: 'Não se repita',
    summary: 'Cada regra mora num lugar só. Se a mesma lógica aparece duas vezes, ela vira uma função que as duas partes chamam.',
    why: 'Lógica copiada muda numa cópia e esquece a outra: aí o carrinho mostra um total e o pedido cobra outro.',
    smell: 'Você copiou e colou um bloco e mudou um detalhe; ou corrigiu um bug e precisou corrigir o mesmo bug em outro arquivo.',
    before: 'function cartTotal(cart) {\n  return Math.round(cart.reduce((s, i) => s + i.price * i.qty, 0) * 100) / 100;\n}\nfunction orderTotal(order) {\n  return Math.round(order.items.reduce((s, i) => s + i.price * i.qty, 0) * 100) / 100;\n}',
    after: 'function itemsTotal(items) {   // BR-ORD-04: um lugar só para a conta\n  return Math.round(items.reduce((s, i) => s + i.price * i.qty, 0) * 100) / 100;\n}\nconst cartTotal = cart => itemsTotal(cart);\nconst orderTotal = order => itemsTotal(order.items);',
    en: {
      title: 'Don’t repeat yourself',
      summary: 'Each rule lives in one place. If the same logic shows up twice, it becomes a function both parts call.',
      why: 'Copied logic changes in one copy and not in the other: then the cart shows one total and the order charges another.',
      smell: 'You copied and pasted a block and changed a detail; or you fixed a bug and had to fix the same bug in another file.',
      before: 'function cartTotal(cart) {\n  return Math.round(cart.reduce((s, i) => s + i.price * i.qty, 0) * 100) / 100;\n}\nfunction orderTotal(order) {\n  return Math.round(order.items.reduce((s, i) => s + i.price * i.qty, 0) * 100) / 100;\n}',
      after: 'function itemsTotal(items) {   // BR-ORD-04: one place for the maths\n  return Math.round(items.reduce((s, i) => s + i.price * i.qty, 0) * 100) / 100;\n}\nconst cartTotal = cart => itemsTotal(cart);\nconst orderTotal = order => itemsTotal(order.items);',
    },
  },
  {
    id: 'kiss', name: 'KISS', full: 'Keep It Simple, Stupid', color: '#F29B9B', image: 'assets/design/kiss.webp',
    tracks: ['start', 'dev'], rules: ['BR-STK-01'],
    title: 'Mantenha simples',
    summary: 'Entre duas soluções que funcionam, escolha a mais simples de entender. Esperteza demais custa caro para quem lê depois.',
    why: 'Código simples tem menos lugares para bugs se esconderem, e qualquer pessoa do time consegue mexer nele.',
    smell: 'Você precisa explicar a linha em voz alta para alguém entender; ou há truques, ternários aninhados e negações duplas.',
    before: 'function canSell(product, qty) {\n  return !(!(qty > 0) || !(product.stock >= qty)) ? true : false;\n}',
    after: 'function canSell(product, qty) {\n  return qty > 0 && product.stock >= qty; // BR-STK-01\n}',
    en: {
      title: 'Keep it simple',
      summary: 'Between two solutions that work, pick the one that is easier to understand. Too much cleverness is expensive for whoever reads it next.',
      why: 'Simple code has fewer places for bugs to hide, and anyone on the team can change it.',
      smell: 'You have to explain the line out loud for someone to get it; or there are tricks, nested ternaries and double negatives.',
      before: 'function canSell(product, qty) {\n  return !(!(qty > 0) || !(product.stock >= qty)) ? true : false;\n}',
      after: 'function canSell(product, qty) {\n  return qty > 0 && product.stock >= qty; // BR-STK-01\n}',
    },
  },
  {
    id: 'yagni', name: 'YAGNI', full: 'You Aren’t Gonna Need It', color: '#C9A8F0', image: 'assets/design/yagni.webp',
    tracks: ['dev', 'ai'], rules: ['BR-CPN-03'],
    title: 'Você não vai precisar disso',
    summary: 'Escreva o que a regra pede hoje, não o que talvez peça um dia. Recursos "para o futuro" quase sempre ficam errados ou sem uso.',
    why: 'Todo código precisa ser lido, testado e mantido. Código sem uso custa tudo isso e não entrega nada.',
    smell: 'Parâmetros que ninguém passa, opções "caso precise", camadas genéricas para um único caso.',
    before: 'function applyCoupons(total, coupons = [], options = { stack: false, maxStack: 3, mode: "percent" }) {\n  // ...suporte a vários cupons, que a loja não permite\n}',
    after: '// A loja aceita um cupom por pedido (BR-CPN-03)\nfunction applyCoupon(total, coupon) {\n  return coupon ? total * (1 - coupon.percent / 100) : total;\n}',
    en: {
      title: 'You aren’t gonna need it',
      summary: 'Write what the rule asks for today, not what it may ask for one day. Features "for the future" are almost always wrong or unused.',
      why: 'All code has to be read, tested and maintained. Unused code costs all that and delivers nothing.',
      smell: 'Parameters nobody passes, options "just in case", generic layers for a single case.',
      before: 'function applyCoupons(total, coupons = [], options = { stack: false, maxStack: 3, mode: "percent" }) {\n  // ...support for several coupons, which the shop doesn’t allow\n}',
      after: '// The shop takes one coupon per order (BR-CPN-03)\nfunction applyCoupon(total, coupon) {\n  return coupon ? total * (1 - coupon.percent / 100) : total;\n}',
    },
  },
];
