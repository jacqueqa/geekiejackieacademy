/* =====================================================================
   TRILHA QA · QA TRACK
   Organised by the work a beginner QA does, aligned with the concepts of the ISTQB Foundation syllabus
   (original texts, not copied from it). Each module is a level of the QA track:
     01 The QA Mindset                       → level 3101   (this file)
     02 Software Development & QA Lifecycle  → level 3102   (this file)
     03 Requirements & Static Testing        → level 3103   (next part)
     04 Test Design & Test Techniques        → level 32     (index.html: "Hunt the Bugs", kept for everyone's progress)
     05 Test Execution & Defect Management   → level 3105   (next part, with missions in the shop)
     06 Test Management & Quality Metrics    → level 3106   (next part)
     07 Testing Tools & Automation           → level 31     (index.html: the expect() exercises, kept)
     08 The QA Toolbox (DevTools, HTTP, JSON, SQL, logs, environments)  → level 3108 (next part)
   index.html puts the QA levels in this order (QA_LEVEL_ORDER).
   Exercises use the logic kinds of the Start Track (see the comment at the top of start-track.js).
   Run the tests after editing:  node --test "tests/*.test.mjs"
   ===================================================================== */
var QA_LEVEL_ORDER = [3101, 3102, 3103, 32, 3105, 3106, 31, 3108];

function buildQaTrack(L) {
  let n = 0;
  const id = () => 'qa' + String(++n).padStart(2, '0');
  const X = (level, xp, d) => Object.assign({ id: id(), level, xp, type: 'logic', conceptTag: d.tag, hints: [],
    action: { method: 'ASSERT', path: d.tag, label: L('Concept', 'Conceito') } }, d);

  const levels = [
    { id: 3101, module: 'qa', name: L('The QA Mindset', 'A Mentalidade de QA'), topic: L('Quality, QA × QC × testing, principles', 'Qualidade, QA × QC × teste, princípios'), badge: '🧠' },
    { id: 3102, module: 'qa', name: L('Software Development & QA Lifecycle', 'Ciclo de Vida do Software e de QA'), topic: 'SDLC, STLC, Agile, Scrum, Kanban', badge: '↻' },
  ];

  const exercises = [
    /* ---------- 01 · The QA Mindset ---------- */
    X(3101, 15, {
      kind: 'match', title: L('QA, QC, testing or debugging?', 'QA, QC, teste ou depuração?'), tag: L('QA × QC × testing', 'QA × QC × teste'),
      story: L('On my first day I heard QA, QC, testing and debugging as if they were the same thing. They aren’t! Help me sort them out.', 'No meu primeiro dia ouvi QA, QC, teste e depuração como se fossem a mesma coisa. Não são! Me ajuda a separar.'),
      what: L('<p><b>Quality Assurance (QA)</b> looks at the <b>process</b>, to prevent defects. <b>Quality Control (QC)</b> looks at the <b>product</b>, to find them. <b>Testing</b> is the main activity of QC. <b>Debugging</b> is the developer finding and fixing the cause.</p>',
        '<p><b>Garantia de Qualidade (QA)</b> olha o <b>processo</b>, para prevenir defeitos. <b>Controle de Qualidade (QC)</b> olha o <b>produto</b>, para encontrar defeitos. <b>Teste</b> é a principal atividade do QC. <b>Depuração</b> é quem desenvolve achando e corrigindo a causa.</p>'),
      why: L('<p>A QA professional does more than run tests: they help the whole team build quality from the start.</p>',
        '<p>Quem trabalha com QA faz mais do que rodar testes: ajuda o time inteiro a construir qualidade desde o começo.</p>'),
      task: L('Match each name with what it is.', 'Ligue cada nome ao que ele é.'),
      left: ['Quality Assurance (QA)', 'Quality Control (QC)', L('Testing', 'Teste'), L('Debugging', 'Depuração')],
      right: [L('Running the software to find failures and give information about quality', 'Executar o software para encontrar falhas e dar informação sobre a qualidade'), L('The developer finds the cause of a failure and fixes it', 'Quem desenvolve encontra a causa de uma falha e corrige'),
        L('Improving the process so defects aren’t made', 'Melhorar o processo para que defeitos não sejam criados'), L('Checking the product to find defects before customers do', 'Verificar o produto para achar defeitos antes das clientes')],
      answer: [2, 3, 0, 1],
      hints: [L('Assurance prevents (process); control finds (product).', 'Garantia previne (processo); controle encontra (produto).')],
      ok: L('Right! QA prevents, QC finds, testing is how QC finds, debugging fixes.', 'Isso! QA previne, QC encontra, teste é como o QC encontra, depuração corrige.'),
    }),
    X(3101, 15, {
      kind: 'predict', title: L('Error, defect or failure?', 'Erro, defeito ou falha?'), tag: L('Error → defect → failure', 'Erro → defeito → falha'),
      story: L('A customer paid shipping on a €50.00 order, but BR-SHP-03 says shipping is free from €50. Let’s name each part of what happened.', 'Uma cliente pagou frete num pedido de €50,00, mas a BR-SHP-03 diz que o frete é grátis a partir de €50. Vamos dar nome a cada parte do que aconteceu.'),
      what: L('<p>A person makes an <b>error</b> (a mistake). The error leaves a <b>defect</b> (bug) in the code or the document. When the defective code runs, it may cause a <b>failure</b>: what the user sees go wrong.</p>',
        '<p>Uma pessoa comete um <b>erro</b> (um engano). O erro deixa um <b>defeito</b> (bug) no código ou no documento. Quando o código com defeito roda, ele pode causar uma <b>falha</b>: o que a usuária vê dar errado.</p>'),
      why: L('<p>Naming things precisely makes bug reports clear. And the earlier a defect is found, the cheaper it is to fix.</p>',
        '<p>Dar o nome certo às coisas deixa os bug reports claros. E quanto mais cedo um defeito é encontrado, mais barato é corrigir.</p>'),
      task: L('Read the story and answer.', 'Leia a história e responda.'),
      data: '<pre class="lg-pseudo">' + L('1. A developer misread the rule and typed  >  instead of  >=\n2. The code says:  return total > 50 ? 0 : 4.9;\n3. Jane Doe ordered exactly €50.00 and was charged €4.90',
        '1. Uma pessoa desenvolvedora leu a regra errado e digitou  >  no lugar de  >=\n2. O código diz:  return total > 50 ? 0 : 4.9;\n3. A Jane Doe pediu exatamente €50,00 e pagou €4,90 de frete') + '</pre>',
      questions: [
        { q: L('Which is the <b>error</b>?', 'Qual é o <b>erro</b>?'), options: [L('Misreading the rule', 'Ler a regra errado'), L('The line with >', 'A linha com >'), L('Jane paying shipping', 'A Jane pagar frete')], answer: 0 },
        { q: L('Which is the <b>defect</b>?', 'Qual é o <b>defeito</b>?'), options: [L('Misreading the rule', 'Ler a regra errado'), L('The line with >', 'A linha com >'), L('Jane paying shipping', 'A Jane pagar frete')], answer: 1 },
        { q: L('Which is the <b>failure</b>?', 'Qual é a <b>falha</b>?'), options: [L('Misreading the rule', 'Ler a regra errado'), L('The line with >', 'A linha com >'), L('Jane paying shipping', 'A Jane pagar frete')], answer: 2 },
        { q: L('When would this defect have been cheapest to fix?', 'Quando esse defeito teria sido mais barato de corrigir?'), options: [L('In production, after complaints', 'Em produção, depois das reclamações'), L('In the test phase', 'Na fase de teste'), L('While reviewing the rule, before any code', 'Na revisão da regra, antes de qualquer código')], answer: 2 },
      ],
      hints: [L('Person → code → what the customer sees.', 'Pessoa → código → o que a cliente vê.')],
      ok: L('Exactly: error (person), defect (code), failure (what Jane saw). And reviewing early is cheapest.', 'Exato: erro (pessoa), defeito (código), falha (o que a Jane viu). E revisar cedo é o mais barato.'),
    }),
    X(3101, 20, {
      kind: 'match', title: L('The principles of testing', 'Os princípios de teste'), tag: L('Testing principles', 'Princípios de teste'),
      story: L('Each of these things happened in the shop. Which principle of testing explains it?', 'Cada uma destas coisas aconteceu na loja. Qual princípio de teste explica?'),
      what: L('<p>Testing has a few <b>principles</b> that hold everywhere. For example: testing shows that defects exist, but can’t prove there are none; testing everything is impossible; defects cluster in a few places.</p>',
        '<p>Teste tem alguns <b>princípios</b> que valem em qualquer lugar. Por exemplo: o teste mostra que existem defeitos, mas não prova que não existe nenhum; testar tudo é impossível; defeitos se concentram em poucos lugares.</p>'),
      why: L('<p>The principles help you explain your choices: why you test some things more, why you change old tests, why “no bugs found” isn’t “no bugs”.</p>',
        '<p>Os princípios ajudam a explicar as suas escolhas: por que testar umas coisas mais, por que mudar testes antigos, por que “nenhum bug encontrado” não é “nenhum bug”.</p>'),
      task: L('Match each situation with the principle that explains it.', 'Ligue cada situação ao princípio que a explica.'),
      left: [L('200 tests passed, and a customer still found a coupon bug', 'Passaram 200 testes, e mesmo assim uma cliente achou um bug no cupom'), L('Nobody can test every price between €0 and €10,000', 'Ninguém consegue testar todos os preços entre €0 e €10.000'),
        L('Most of the bugs are in the checkout', 'A maioria dos bugs está no checkout'), L('The same old tests stopped finding bugs', 'Os mesmos testes de sempre pararam de achar bugs'),
        L('No bugs, but customers can’t find the “Buy” button', 'Nenhum bug, mas as clientes não acham o botão “Comprar”')],
      right: [L('Defects cluster together', 'Defeitos se agrupam'), L('Absence-of-errors is a fallacy: it must also be useful', 'A ausência de erros é uma ilusão: também precisa ser útil'), L('Testing shows the presence of defects, not their absence', 'O teste mostra a presença de defeitos, não a ausência'),
        L('Tests wear out (pesticide paradox): change them', 'Testes se desgastam (paradoxo do pesticida): renove-os'), L('Exhaustive testing is impossible', 'Teste exaustivo é impossível')],
      answer: [2, 4, 0, 3, 1],
      hints: [L('Pesticide: bugs get “used to” the same tests. Fallacy: working isn’t the same as being useful.', 'Pesticida: os bugs “se acostumam” com os mesmos testes. Ilusão: funcionar não é o mesmo que ser útil.')],
      ok: L('Perfect! Five principles you will use to explain your test choices.', 'Perfeito! Cinco princípios que você vai usar para explicar as suas escolhas de teste.'),
    }),
    X(3101, 15, {
      kind: 'pick', title: L('How a QA thinks', 'Como um QA pensa'), tag: L('Critical thinking', 'Pensamento crítico'),
      story: L('The new story says: “The customer can use a coupon at checkout.” Which questions would a good QA ask?', 'A história nova diz: “A cliente pode usar um cupom no checkout.” Que perguntas um bom QA faria?'),
      what: L('<p><b>Critical thinking</b> is questioning what is written: what is missing, what happens at the limits, what happens when something goes wrong.</p>',
        '<p><b>Pensamento crítico</b> é questionar o que está escrito: o que falta, o que acontece nos limites, o que acontece quando algo dá errado.</p>'),
      why: L('<p>A question asked before coding costs a minute. The same doubt found in production costs a refund, an apology and a fix in a hurry.</p>',
        '<p>Uma pergunta feita antes do código custa um minuto. A mesma dúvida descoberta em produção custa reembolso, pedido de desculpas e correção às pressas.</p>'),
      task: L('Mark the questions that help test the coupon.', 'Marque as perguntas que ajudam a testar o cupom.'),
      options: [L('What is the biggest discount a coupon can give?', 'Qual o maior desconto que um cupom pode dar?'), L('Is a coupon still valid on its last day?', 'Um cupom ainda vale no último dia?'), L('Can two coupons be used in the same order?', 'Dá para usar dois cupons no mesmo pedido?'),
        L('What happens with an invalid coupon: error or full price?', 'O que acontece com um cupom inválido: erro ou preço cheio?'), L('Why does the shop sell tarot decks?', 'Por que a loja vende baralhos de tarot?')],
      correct: [true, true, true, true, false],
      hints: [L('Four of them have answers in the Rulebook (BR-CPN-01 to 04). One has nothing to do with testing the coupon.', 'Quatro delas têm resposta nas Regras da Loja (BR-CPN-01 a 04). Uma não tem nada a ver com testar o cupom.')],
      ok: L('Exactly! Limits, dates, combinations and errors: the four questions of a QA.', 'Exato! Limites, datas, combinações e erros: as quatro perguntas de um QA.'),
    }),
    X(3101, 15, {
      kind: 'pick', title: L('Habits of a good QA', 'Hábitos de um bom QA'), tag: L('The QA role', 'O papel do QA'),
      story: L('Bruxa Maria is choosing who joins the team as QA. Which habits would you look for?', 'A Bruxa Maria está escolhendo quem entra no time como QA. Que hábitos você procuraria?'),
      what: L('<p>A QA helps the team deliver quality: understands the product, reads requirements early, tests beyond the happy path, and reports problems clearly and kindly.</p>',
        '<p>Um QA ajuda o time a entregar qualidade: entende o produto, lê os requisitos cedo, testa além do caminho feliz, e relata problemas com clareza e gentileza.</p>'),
      why: L('<p>QA is a team role. Hiding problems or treating bugs as personal attacks makes quality worse, not better.</p>',
        '<p>QA é um papel de time. Esconder problemas ou tratar bug como ataque pessoal piora a qualidade em vez de melhorar.</p>'),
      task: L('Mark the good habits.', 'Marque os bons hábitos.'),
      options: [L('Reads the requirements before there is code', 'Lê os requisitos antes de ter código'), L('Tests only the happy path', 'Testa só o caminho feliz'), L('Talks to dev and product when something is unclear', 'Conversa com dev e produto quando algo não está claro'),
        L('Hides a small bug so the sprint isn’t delayed', 'Esconde um bug pequeno para não atrasar a sprint'), L('Thinks of every user: customer, admin, screen reader users', 'Pensa em todas as pessoas usuárias: cliente, admin, quem usa leitor de tela'), L('Writes bug reports about the problem, never about the person', 'Escreve bug reports sobre o problema, nunca sobre a pessoa')],
      correct: [true, false, true, false, true, true],
      hints: [L('Two of them make quality worse.', 'Duas delas pioram a qualidade.')],
      ok: L('Right! Early, curious, collaborative and respectful.', 'Isso! Cedo, curioso, colaborativo e respeitoso.'),
    }),

    /* ---------- 02 · Software Development & QA Lifecycle ---------- */
    X(3102, 15, {
      kind: 'match', title: L('Four ways of working', 'Quatro jeitos de trabalhar'), tag: L('Development models', 'Modelos de desenvolvimento'),
      story: L('Before the shop went online, Bruxa Maria read about how teams organise their work. Let’s compare the models.', 'Antes da loja ir para a internet, a Bruxa Maria leu sobre como os times organizam o trabalho. Vamos comparar os modelos.'),
      what: L('<p>The <b>SDLC</b> (software development lifecycle) is the path from idea to software in use. Teams walk it in different ways: in sequence, in short cycles, or as a continuous flow.</p>',
        '<p>O <b>SDLC</b> (ciclo de vida do desenvolvimento de software) é o caminho da ideia até o software em uso. Os times percorrem esse caminho de jeitos diferentes: em sequência, em ciclos curtos, ou como um fluxo contínuo.</p>'),
      why: L('<p>The model changes when and how QA tests: at the end, every sprint, or all the time.</p>',
        '<p>O modelo muda quando e como o QA testa: no fim, a cada sprint, ou o tempo todo.</p>'),
      task: L('Match each model with how it works.', 'Ligue cada modelo ao jeito como ele funciona.'),
      left: ['Waterfall', L('V-Model', 'Modelo V'), 'Scrum', 'Kanban'],
      right: [L('Short sprints, each one delivering something usable', 'Sprints curtas, cada uma entregando algo que dá para usar'), L('A continuous flow, with a limit of tasks in progress (WIP)', 'Um fluxo contínuo, com limite de tarefas em andamento (WIP)'),
        L('Phases in sequence; testing comes near the end', 'Fases em sequência; o teste vem perto do fim'), L('Each development phase has a matching test level', 'Cada fase de desenvolvimento tem um nível de teste correspondente')],
      answer: [2, 3, 0, 1],
      hints: [L('Waterfall falls one step at a time. The V pairs the left side (build) with the right side (test).', 'A cascata cai um degrau de cada vez. O V faz par do lado esquerdo (construir) com o direito (testar).')],
      ok: L('Right! Waterfall in sequence, V in pairs, Scrum in sprints, Kanban as a flow.', 'Isso! Cascata em sequência, V em pares, Scrum em sprints, Kanban em fluxo.'),
    }),
    X(3102, 15, {
      kind: 'order', title: L('The testing lifecycle', 'O ciclo de vida dos testes'), tag: 'STLC',
      story: L('Ticket 123 (coupons from 1% to 50%) came in. Put the testing work in the right order.', 'Chegou o ticket 123 (cupons de 1% a 50%). Coloque o trabalho de teste na ordem certa.'),
      what: L('<p>The <b>STLC</b> (software testing lifecycle) is the testing side of the work: understand what to test, plan, design the tests, prepare, run and close.</p>',
        '<p>O <b>STLC</b> (ciclo de vida dos testes) é o lado do teste no trabalho: entender o que testar, planejar, desenhar os testes, preparar, executar e encerrar.</p>'),
      why: L('<p>Jumping straight to running tests means testing without knowing what “right” looks like.</p>',
        '<p>Pular direto para a execução é testar sem saber como é o “certo”.</p>'),
      task: L('Put the steps in order.', 'Coloque os passos em ordem.'),
      steps: [L('Analyse the requirement and the acceptance criteria', 'Analisar o requisito e os critérios de aceite'), L('Plan: scope, risks, what to test and when', 'Planejar: escopo, riscos, o que testar e quando'),
        L('Design the test cases (1%, 50%, 0%, 51%…)', 'Desenhar os casos de teste (1%, 50%, 0%, 51%…)'), L('Prepare the environment and the test data', 'Preparar o ambiente e os dados de teste'),
        L('Execute the tests and report the bugs', 'Executar os testes e reportar os bugs'), L('Close: summary report and lessons learned', 'Encerrar: relatório final e lições aprendidas')],
      start: [4, 1, 5, 0, 3, 2],
      hints: [L('It starts by understanding and ends by reporting what was learned.', 'Começa entendendo e termina relatando o que foi aprendido.')],
      ok: L('Perfect: analyse, plan, design, prepare, execute, close.', 'Perfeito: analisar, planejar, desenhar, preparar, executar, encerrar.'),
    }),
    X(3102, 15, {
      kind: 'match', title: L('The Scrum ceremonies', 'As cerimônias do Scrum'), tag: 'Scrum',
      story: L('The shop’s team works in two-week sprints. Each meeting has a purpose, and the QA has something to bring to every one.', 'O time da loja trabalha em sprints de duas semanas. Cada reunião tem um objetivo, e o QA tem algo a levar para todas.'),
      what: L('<p>In <b>Scrum</b>, the work happens in <b>sprints</b>, with a few fixed meetings (ceremonies) to plan, sync, show and improve.</p>',
        '<p>No <b>Scrum</b>, o trabalho acontece em <b>sprints</b>, com algumas reuniões fixas (cerimônias) para planejar, sincronizar, mostrar e melhorar.</p>'),
      why: L('<p>A QA who joins the ceremonies hears about problems early and helps decide what “done” means.</p>',
        '<p>Um QA que participa das cerimônias fica sabendo dos problemas cedo e ajuda a decidir o que é “pronto”.</p>'),
      task: L('Match each ceremony with its purpose.', 'Ligue cada cerimônia ao objetivo dela.'),
      left: ['Refinement', 'Sprint Planning', 'Daily', 'Sprint Review', L('Retrospective', 'Retrospectiva')],
      right: [L('Show what is done to the people who asked for it', 'Mostrar o que ficou pronto para quem pediu'), L('Understand and detail the stories before the sprint (a great moment to point out ambiguities)', 'Entender e detalhar as histórias antes da sprint (ótimo momento para apontar ambiguidades)'),
        L('Improve the way the team works', 'Melhorar o jeito de o time trabalhar'), L('Choose what goes into the sprint and how it will be tested', 'Escolher o que entra na sprint e como vai ser testado'), L('15 minutes: what I did, what I will do, what blocks me', '15 minutos: o que fiz, o que vou fazer, o que me bloqueia')],
      answer: [1, 3, 4, 0, 2],
      hints: [L('Review looks at the product; retrospective looks at the team.', 'A review olha para o produto; a retrospectiva olha para o time.')],
      ok: L('Right! Refine, plan, sync every day, show, improve.', 'Isso! Refinar, planejar, sincronizar todo dia, mostrar, melhorar.'),
    }),
    X(3102, 20, {
      kind: 'predict', title: L('Where does QA come in?', 'Onde o QA entra?'), tag: L('QA in the sprint', 'O QA na sprint'),
      story: L('Let’s follow the coupon story through a sprint and see where QA helps the most.', 'Vamos seguir a história do cupom por uma sprint e ver onde o QA ajuda mais.'),
      what: L('<p>In agile teams, QA works <b>along the whole sprint</b>, not only at the end. Testing early (“shift left”) and agreeing on a <b>Definition of Done</b> keep surprises small.</p>',
        '<p>Em times ágeis, o QA trabalha <b>ao longo da sprint toda</b>, não só no fim. Testar cedo (“shift left”) e combinar uma <b>Definition of Done</b> deixam as surpresas pequenas.</p>'),
      why: L('<p>When QA only receives the work on the last day, there is no time left to fix what is found.</p>',
        '<p>Quando o QA só recebe o trabalho no último dia, não sobra tempo para corrigir o que for encontrado.</p>'),
      task: L('Answer about the sprint.', 'Responda sobre a sprint.'),
      questions: [
        { q: L('In refinement, the coupon story has no limit for the discount. What does the QA do?', 'Na refinement, a história do cupom não tem limite de desconto. O que o QA faz?'), options: [L('Points it out, so a criterion is added (1% to 50%)', 'Aponta isso, para entrar um critério (1% a 50%)'), L('Waits for the code to see what happens', 'Espera o código para ver o que acontece'), L('Decides the limit alone', 'Decide o limite sozinho')], answer: 0 },
        { q: L('The developer finishes on day 9 of a 10-day sprint. What is the risk?', 'O dev termina no dia 9 de uma sprint de 10 dias. Qual é o risco?'), options: [L('No risk: QA tests fast', 'Nenhum: o QA testa rápido'), L('Little time to test and fix: the story may not be done', 'Pouco tempo para testar e corrigir: a história pode não ficar pronta')], answer: 1 },
        { q: L('What belongs in the Definition of Done?', 'O que faz parte da Definition of Done?'), options: [L('The code was written', 'O código foi escrito'), L('Acceptance criteria checked and tests passing', 'Critérios de aceite verificados e testes passando'), L('The developer said it works', 'O dev disse que funciona')], answer: 1 },
      ],
      hints: [L('QA adds the most value early: in refinement and while the code is being written.', 'O QA agrega mais valor cedo: na refinement e enquanto o código está sendo escrito.')],
      ok: L('Exactly: point out gaps early, test along the sprint, and agree on what “done” means.', 'Exato: apontar lacunas cedo, testar ao longo da sprint e combinar o que é “pronto”.'),
    }),
    X(3102, 15, {
      kind: 'pick', title: L('QA, Dev and Product together', 'QA, Dev e Produto juntos'), tag: L('Collaboration', 'Colaboração'),
      story: L('The team wants fewer bugs and less back-and-forth. Which practices help QA, developers and product work together?', 'O time quer menos bugs e menos vai e volta. Que práticas ajudam QA, devs e produto a trabalharem juntos?'),
      what: L('<p>Quality is the whole team’s job. <b>Product</b> decides what the shop needs, <b>developers</b> build it, and <b>QA</b> helps everyone see the risks. The “Three Amigos” is a short talk among the three before a story starts.</p>',
        '<p>Qualidade é trabalho do time inteiro. <b>Produto</b> decide o que a loja precisa, <b>devs</b> constroem, e o <b>QA</b> ajuda todo mundo a enxergar os riscos. Os “Três Amigos” é uma conversa curta entre os três antes de uma história começar.</p>'),
      why: L('<p>Most bugs are misunderstandings. Talking early is the cheapest test there is.</p>',
        '<p>A maioria dos bugs é desentendimento. Conversar cedo é o teste mais barato que existe.</p>'),
      task: L('Mark the practices that help.', 'Marque as práticas que ajudam.'),
      options: [L('A Three Amigos talk before the story starts', 'Uma conversa dos Três Amigos antes de a história começar'), L('QA only gets the task when it is “finished”', 'O QA só recebe a tarefa quando está “pronta”'),
        L('Bugs discussed with the developer, with evidence', 'Bugs conversados com o dev, com evidência'), L('QA decides the business rules alone', 'O QA decide sozinho as regras de negócio'),
        L('Developers write unit tests; QA thinks of end-to-end scenarios', 'Devs escrevem testes de unidade; o QA pensa nos cenários de ponta a ponta')],
      correct: [true, false, true, false, true],
      hints: [L('Business rules belong to product; QA asks the questions that make them clear.', 'As regras de negócio são do produto; o QA faz as perguntas que deixam as regras claras.')],
      ok: L('Right! Talk early, share evidence, and split the testing work wisely.', 'Isso! Conversar cedo, mostrar evidências e dividir bem o trabalho de teste.'),
    }),
  ];
  return { levels, exercises };
}
