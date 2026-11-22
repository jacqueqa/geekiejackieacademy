/* =====================================================================
   TRILHA IA · AI TRACK — AI Literacy & Practical Intelligence
   From the first conversation with an AI to building real solutions with it. Each module is a level:
     01 Understanding AI                         → level 4101  (this file)
     02 Prompt Engineering & Context Design      → level 41    (index.html "Ask the Oracle", kept for progress, + this file)
     03 AI Quality Control — Fighting AI Slop    → level 42    (index.html "Spot the Hallucination", kept; next part)
     04 AI in Daily Workflows                    → level 4104  (next part)
     05 AI Tools & Agents                        → level 4105  (next part)
     06 Responsible AI & Security                → level 4106  (next part)
     07 Building with AI                         → level 4107  (next part)
   index.html puts the AI levels in this order (AI_LEVEL_ORDER). Exercises added here to an existing level
   come before that level's old exercises (concepts first, then practice).
   Exercises use the logic kinds of the Start Track (see the comment at the top of start-track.js).
   Run the tests after editing:  node --test "tests/*.test.mjs"
   ===================================================================== */
var AI_LEVEL_ORDER = [4101, 41, 42, 4104, 4105, 4106, 4107];

function buildAiTrack(L) {
  const h = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  let n = 0;
  const id = () => 'ai' + String(++n).padStart(2, '0');
  const X = (level, xp, d) => Object.assign({ id: id(), level, xp, type: 'logic', conceptTag: d.tag, hints: [],
    action: { method: 'API', path: d.tag, label: L('Concept', 'Conceito') } }, d);

  const levels = [
    { id: 4101, module: 'ai', name: L('Understanding AI', 'Entendendo a IA'), topic: L('AI, LLMs, tokens, context and limits', 'IA, LLMs, tokens, contexto e limites'), badge: '🤖' },
  ];

  const exercises = [
    /* ---------- 01 · Understanding AI ---------- */
    X(4101, 15, {
      kind: 'match', title: L('AI, machine learning, LLM, generative AI', 'IA, machine learning, LLM, IA generativa'), tag: L('What AI is', 'O que é IA'),
      story: L('Everyone in the shop says “AI” for everything. Let’s put a name on each thing.', 'Todo mundo na loja fala “IA” para tudo. Vamos dar nome a cada coisa.'),
      what: L('<p><b>Artificial intelligence</b> is the big field. <b>Machine learning</b> is the part where systems learn patterns from data. An <b>LLM</b> (large language model) is a machine learning model trained on huge amounts of text. <b>Generative AI</b> creates new content: text, images, code.</p>',
        '<p><b>Inteligência artificial</b> é o campo inteiro. <b>Machine learning</b> é a parte em que sistemas aprendem padrões a partir de dados. Um <b>LLM</b> (grande modelo de linguagem) é um modelo de machine learning treinado com muito, muito texto. <b>IA generativa</b> cria conteúdo novo: texto, imagens, código.</p>'),
      why: L('<p>Knowing the words helps you choose the right tool and explain to a client what an AI can and can’t do.</p>',
        '<p>Conhecer as palavras ajuda a escolher a ferramenta certa e a explicar para uma cliente o que uma IA consegue e não consegue fazer.</p>'),
      task: L('Match each name with what it is.', 'Ligue cada nome ao que ele é.'),
      left: [L('Artificial intelligence', 'Inteligência artificial'), 'Machine learning', 'LLM', L('Generative AI', 'IA generativa')],
      right: [L('A model trained on huge amounts of text that predicts the next words', 'Um modelo treinado com muito texto que prevê as próximas palavras'), L('AI that creates new content: text, images, code', 'IA que cria conteúdo novo: texto, imagens, código'),
        L('The whole field of making computers do tasks that look intelligent', 'O campo inteiro de fazer computadores realizarem tarefas que parecem inteligentes'), L('Systems that learn patterns from data instead of following written rules', 'Sistemas que aprendem padrões com dados em vez de seguir regras escritas')],
      answer: [2, 3, 0, 1],
      hints: [L('They go from the widest to the most specific: AI ⊃ machine learning ⊃ LLM.', 'Elas vão do mais amplo ao mais específico: IA ⊃ machine learning ⊃ LLM.')],
      ok: L('Right! AI is the field, machine learning learns from data, an LLM is a text model, generative AI creates.', 'Isso! IA é o campo, machine learning aprende com dados, LLM é um modelo de texto, IA generativa cria.'),
    }),
    X(4101, 20, {
      kind: 'predict', title: L('How a language model answers', 'Como um modelo de linguagem responde'), tag: L('Next token', 'Próximo token'),
      story: L('I asked the oracle the same question twice and got two different answers. Is it broken?', 'Fiz a mesma pergunta duas vezes para o oráculo e recebi duas respostas diferentes. Ele está quebrado?'),
      what: L('<p>An LLM writes one <b>token</b> at a time (a token is a piece of a word). For each one, it calculates which tokens are likely to come next and picks one. It learned those likelihoods from text, not from a list of right answers.</p>',
        '<p>Um LLM escreve um <b>token</b> de cada vez (um token é um pedaço de palavra). Para cada um, ele calcula quais tokens têm chance de vir a seguir e escolhe um. Ele aprendeu essas chances a partir de textos, não de uma lista de respostas certas.</p>'),
      why: L('<p>That is why answers vary, sound confident even when wrong, and need checking.</p>',
        '<p>É por isso que as respostas variam, soam confiantes mesmo quando erradas, e precisam ser conferidas.</p>'),
      task: L('Answer the questions.', 'Responda às perguntas.'),
      questions: [
        { q: L('How does an LLM build its answer?', 'Como um LLM monta a resposta?'), options: [L('It predicts the next token, again and again', 'Ele prevê o próximo token, de novo e de novo'), L('It looks the answer up in a database of right answers', 'Ele procura a resposta num banco de respostas certas'), L('It always searches the internet', 'Ele sempre pesquisa na internet')], answer: 0 },
        { q: L('Why can the same question get two different answers?', 'Por que a mesma pergunta pode ter duas respostas diferentes?'), options: [L('The model is broken', 'O modelo está quebrado'), L('It picks among likely tokens, with some randomness', 'Ele escolhe entre tokens prováveis, com um pouco de sorteio'), L('Someone edits the answers by hand', 'Alguém edita as respostas à mão')], answer: 1 },
        { q: L('An answer that sounds very confident is…', 'Uma resposta que soa muito confiante é…'), options: [L('always right', 'sempre certa'), L('not necessarily right: confidence is just style', 'não necessariamente certa: confiança é só estilo')], answer: 1 },
      ],
      hints: [L('Think of a very good autocomplete, not of an encyclopedia.', 'Pense num autocompletar muito bom, não numa enciclopédia.')],
      ok: L('Exactly: next-token prediction, a bit of randomness, and confidence that proves nothing.', 'Exato: previsão do próximo token, um pouco de sorteio, e uma confiança que não prova nada.'),
    }),
    X(4101, 15, {
      kind: 'pick', title: L('Tokens and the context window', 'Tokens e a janela de contexto'), tag: L('Context window', 'Janela de contexto'),
      story: L('I pasted the whole catalog, the Rulebook and a long chat into the oracle, and it “forgot” the first instructions. Why?', 'Colei o catálogo inteiro, as Regras da Loja e uma conversa longa no oráculo, e ele “esqueceu” as primeiras instruções. Por quê?'),
      what: L('<p>The <b>context window</b> is how much text (in tokens) the model can take into account at once: your instructions, the files, the whole conversation and its own answer. Everything counts.</p>',
        '<p>A <b>janela de contexto</b> é quanto texto (em tokens) o modelo consegue considerar de uma vez: as suas instruções, os arquivos, a conversa inteira e a própria resposta. Tudo conta.</p>'),
      why: L('<p>Knowing the limit helps you send only what matters, and start a fresh conversation when the old one gets too long.</p>',
        '<p>Conhecer o limite ajuda a mandar só o que importa, e a começar uma conversa nova quando a antiga fica longa demais.</p>'),
      task: L('Mark the statements that are true.', 'Marque as afirmações verdadeiras.'),
      options: [L('The context window is how much text the model considers at once', 'A janela de contexto é quanto texto o modelo considera de uma vez'), L('The whole conversation history uses tokens too', 'O histórico inteiro da conversa também usa tokens'),
        L('A token is always one whole word', 'Um token é sempre uma palavra inteira'), L('In very long contexts, some parts may be cut or weigh less', 'Em contextos muito longos, algumas partes podem ficar de fora ou pesar menos'),
        L('The model remembers what other people told it yesterday', 'O modelo lembra o que outras pessoas disseram para ele ontem')],
      correct: [true, true, false, true, false],
      hints: [L('“Tarot” may be one token, “Lenormand” may be two or three.', '“Tarot” pode ser um token, “Lenormand” pode ser dois ou três.')],
      ok: L('Right! Everything in the conversation counts, and a token is a piece of a word.', 'Isso! Tudo na conversa conta, e um token é um pedaço de palavra.'),
    }),
    X(4101, 15, {
      kind: 'match', title: L('The limits of AI', 'Os limites da IA'), tag: L('Limitations', 'Limitações'),
      story: L('These things happened with the shop’s AI assistant. Which limitation explains each one?', 'Estas coisas aconteceram com o assistente de IA da loja. Qual limitação explica cada uma?'),
      what: L('<p>LLMs <b>hallucinate</b> (invent things that sound real), have a <b>knowledge cut-off</b> (they don’t know what happened after training), may repeat <b>biases</b> from their training text, and sound <b>confident</b> even when wrong.</p>',
        '<p>LLMs <b>alucinam</b> (inventam coisas que parecem reais), têm uma <b>data de corte</b> (não sabem o que aconteceu depois do treino), podem repetir <b>vieses</b> dos textos do treino, e soam <b>confiantes</b> mesmo quando erram.</p>'),
      why: L('<p>Naming the limitation tells you how to protect against it: check facts, give fresh data, review for bias.</p>',
        '<p>Dar nome à limitação diz como se proteger dela: conferir fatos, dar dados atualizados, revisar vieses.</p>'),
      task: L('Match each situation with its limitation.', 'Ligue cada situação à sua limitação.'),
      left: [L('It recommends product TAR-777, which doesn’t exist', 'Recomenda o produto TAR-777, que não existe'), L('It doesn’t know about yesterday’s new promotion', 'Não sabe da promoção nova de ontem'),
        L('It always describes the “ideal customer” the same way, leaving people out', 'Descreve a “cliente ideal” sempre do mesmo jeito, deixando gente de fora'), L('It gives a wrong price with total certainty', 'Dá um preço errado com toda a certeza')],
      right: [L('Bias', 'Viés'), L('Overconfidence', 'Excesso de confiança'), L('Hallucination', 'Alucinação'), L('Knowledge cut-off', 'Data de corte')],
      answer: [2, 3, 0, 1],
      hints: [L('Inventing is hallucinating; not knowing what is new is the cut-off.', 'Inventar é alucinar; não saber o que é novo é a data de corte.')],
      ok: L('Perfect: hallucination, cut-off, bias and overconfidence.', 'Perfeito: alucinação, data de corte, viés e excesso de confiança.'),
    }),
    X(4101, 15, {
      kind: 'pick', title: L('What AI knows and what it doesn’t', 'O que a IA sabe e o que não sabe'), tag: L('Knowledge and data', 'Conhecimento e dados'),
      story: L('Before trusting the oracle with the shop, let’s list what it can do well on its own, with no access to our data or tools.', 'Antes de confiar a loja ao oráculo, vamos listar o que ele faz bem sozinho, sem acesso aos nossos dados nem a ferramentas.'),
      what: L('<p>A model alone knows general things from its training. It doesn’t see your systems, files or today’s numbers unless you give them to it (in the prompt, or through tools).</p>',
        '<p>Um modelo sozinho sabe coisas gerais do treino. Ele não vê os seus sistemas, arquivos ou os números de hoje, a não ser que você entregue isso (no prompt, ou por ferramentas).</p>'),
      why: L('<p>Asking for something it can’t know is the fastest way to get a confident invention.</p>',
        '<p>Pedir algo que ele não tem como saber é o jeito mais rápido de receber uma invenção confiante.</p>'),
      task: L('Mark what the model does well with no access to the shop’s data.', 'Marque o que o modelo faz bem sem acesso aos dados da loja.'),
      options: [L('Explain what a loop is', 'Explicar o que é um loop'), L('Summarise a text you pasted', 'Resumir um texto que você colou'), L('Tell today’s stock of the Moon candle', 'Dizer o estoque de hoje da Moon candle'),
        L('Suggest names for a new candle', 'Sugerir nomes para uma vela nova'), L('Know how many orders came in this morning', 'Saber quantos pedidos chegaram hoje de manhã')],
      correct: [true, true, false, true, false],
      hints: [L('Stock and orders live in the shop’s database, which the model can’t see by itself.', 'Estoque e pedidos moram no banco de dados da loja, que o modelo não enxerga sozinho.')],
      ok: L('Exactly: general knowledge and what you give it, yes; the shop’s live data, no.', 'Exato: conhecimento geral e o que você entrega, sim; os dados vivos da loja, não.'),
    }),

    /* ---------- 02 · Prompt Engineering & Context Design (level 41) ---------- */
    X(41, 15, {
      kind: 'match', title: L('The CRAFT framework', 'O framework CRAFT'), tag: 'CRAFT',
      story: L('I want an AI description for the Moon candle. Instead of memorising a hundred ready prompts, let’s learn one model we can reuse forever.', 'Quero uma descrição por IA para a Moon candle. Em vez de decorar cem prompts prontos, vamos aprender um modelo que dá para reutilizar sempre.'),
      what: L('<p>The academy uses <b>CRAFT</b> to build prompts:</p><ul><li><b>C · Context</b>: what is the scenario? What does the AI need to know?</li><li><b>R · Role</b>: which perspective or expertise should it take?</li><li><b>A · Action</b>: what exactly must it do?</li><li><b>F · Format</b>: how should the answer look?</li><li><b>T · Target &amp; Constraints</b>: what result do we expect, and what are the limits?</li></ul>',
        '<p>A academia usa o <b>CRAFT</b> para montar prompts:</p><ul><li><b>C · Context (contexto)</b>: qual é o cenário? O que a IA precisa saber?</li><li><b>R · Role (papel)</b>: que perspectiva ou especialidade ela deve assumir?</li><li><b>A · Action (ação)</b>: o que exatamente ela precisa fazer?</li><li><b>F · Format (formato)</b>: como a resposta deve ser apresentada?</li><li><b>T · Target &amp; Constraints (alvo e restrições)</b>: qual resultado esperamos e quais são os limites?</li></ul>'),
      why: L('<p>Most bad answers come from a prompt that skipped a letter, so the model had to guess. CRAFT is a checklist you can run in your head.</p>',
        '<p>A maioria das respostas ruins vem de um prompt que pulou uma letra, e aí o modelo precisou adivinhar. O CRAFT é um checklist que dá para rodar de cabeça.</p>'),
      task: L('Match each piece of the prompt with its CRAFT letter.', 'Ligue cada pedaço do prompt à sua letra do CRAFT.'),
      left: [L('“Bruxa Maria’s tarot shop sells to beginner customers; the Moon candle costs €8.50.”', '“A lojinha de tarot da Bruxa Maria vende para clientes iniciantes; a Moon candle custa €8,50.”'),
        L('“You are a copywriter who knows tarot and writes simply.”', '“Você é redatora, entende de tarot e escreve de forma simples.”'),
        L('“Write the product description of the Moon candle.”', '“Escreva a descrição do produto Moon candle.”'),
        L('“Return only the text, on one line.”', '“Devolva só o texto, em uma linha.”'),
        L('“Up to 200 characters, with the product name, no magic promises (BR-AI-02).”', '“Até 200 caracteres, com o nome do produto, sem promessas mágicas (BR-AI-02).”')],
      right: [L('F · Format', 'F · Format (formato)'), L('A · Action', 'A · Action (ação)'), L('T · Target & Constraints', 'T · Target & Constraints (alvo e restrições)'), L('C · Context', 'C · Context (contexto)'), L('R · Role', 'R · Role (papel)')],
      answer: [3, 4, 1, 0, 2],
      hints: [L('C says the scenario, R who the AI should be, A the verb, F the shape, T the limits.', 'C diz o cenário, R quem a IA deve ser, A o verbo, F o formato, T os limites.')],
      ok: L('Right! Context, Role, Action, Format, Target & Constraints: CRAFT.', 'Isso! Context, Role, Action, Format, Target & Constraints: CRAFT.'),
    }),
    X(41, 15, {
      kind: 'pick', title: L('Which letters are missing?', 'Quais letras estão faltando?'), tag: 'CRAFT',
      story: L('Someone sent the oracle only this: “Make test cases for the coupon.” The answer was generic. Which CRAFT letters did the prompt skip?', 'Alguém mandou para o oráculo só isto: “Faça casos de teste para o cupom.” A resposta veio genérica. Quais letras do CRAFT o prompt pulou?'),
      what: L('<p>Checking a prompt against CRAFT is the fastest way to see why an answer came out generic.</p>',
        '<p>Conferir um prompt com o CRAFT é o jeito mais rápido de ver por que uma resposta veio genérica.</p>'),
      why: L('<p>“Make test cases” is only the Action. Without the rest, the model invents the coupon rules, the format and the size of the answer.</p>',
        '<p>“Faça casos de teste” é só a Ação. Sem o resto, o modelo inventa as regras do cupom, o formato e o tamanho da resposta.</p>'),
      task: L('Mark the letters the prompt is missing.', 'Marque as letras que faltam no prompt.'),
      options: [L('C · Context (the coupon rules BR-CPN-01 to 04)', 'C · Context (as regras do cupom BR-CPN-01 a 04)'), L('R · Role (an experienced QA)', 'R · Role (uma QA experiente)'), L('A · Action (make test cases)', 'A · Action (fazer casos de teste)'),
        L('F · Format (a table: input, expected result)', 'F · Format (uma tabela: entrada, resultado esperado)'), L('T · Target & Constraints (8 cases, covering the limits)', 'T · Target & Constraints (8 casos, cobrindo os limites)')],
      correct: [true, true, false, true, true],
      hints: [L('Only one letter is there: the verb.', 'Só uma letra está lá: o verbo.')],
      ok: L('Exactly: only the Action was there. C, R, F and T were missing.', 'Exato: só a Ação estava lá. Faltavam C, R, F e T.'),
    }),
    X(41, 15, {
      kind: 'predict', title: L('Which prompt works better?', 'Qual prompt funciona melhor?'), tag: L('Clear prompts', 'Prompts claros'),
      story: L('Two people on the team wrote prompts for the same task. Which one would you send?', 'Duas pessoas do time escreveram prompts para a mesma tarefa. Qual você mandaria?'),
      what: L('<p>A clear prompt says what you want, for whom, with which rules and in which format. A vague one leaves the model guessing.</p>',
        '<p>Um prompt claro diz o que você quer, para quem, com quais regras e em qual formato. Um vago deixa o modelo adivinhando.</p>'),
      why: L('<p>The time spent writing a clear prompt is saved many times over in fewer retries and fixes.</p>',
        '<p>O tempo gasto escrevendo um prompt claro volta muitas vezes em menos tentativas e correções.</p>'),
      task: L('Choose the better prompt for each task.', 'Escolha o melhor prompt para cada tarefa.'),
      questions: [
        { q: L('A description for the Lenormand deck', 'Uma descrição para o baralho Lenormand'), options: [L('“Describe the Lenormand deck.”', '“Descreva o baralho Lenormand.”'), L('“For a tarot shop with beginner customers, describe the Lenormand deck (36 cards) in up to 200 characters, mentioning its name. Return only the text.”', '“Para uma loja de tarot com clientes iniciantes, descreva o baralho Lenormand (36 cartas) em até 200 caracteres, citando o nome. Devolva só o texto.”')], answer: 1 },
        { q: L('Test ideas for the coupon', 'Ideias de teste para o cupom'), options: [L('“You are a QA. List 5 test cases for a coupon that gives 1% to 50% off and is valid until its expiry day included, as a table: input, expected result.”', '“Você é QA. Liste 5 casos de teste para um cupom que dá de 1% a 50% de desconto e vale até o dia de vencimento inclusive, numa tabela: entrada, resultado esperado.”'), L('“Test the coupon.”', '“Teste o cupom.”')], answer: 0 },
      ],
      hints: [L('Pick the one where the model doesn’t have to guess anything.', 'Escolha aquele em que o modelo não precisa adivinhar nada.')],
      ok: L('Exactly: context, rules and format make the difference.', 'Exato: contexto, regras e formato fazem a diferença.'),
    }),
    X(41, 20, {
      kind: 'match', title: L('Four prompting techniques', 'Quatro técnicas de prompt'), tag: L('Prompting techniques', 'Técnicas de prompt'),
      story: L('The team collected a few prompting tricks. Which technique is each one?', 'O time juntou alguns truques de prompt. Qual técnica é cada um?'),
      what: L('<p><b>Role prompting</b> gives the model a role. <b>Few-shot</b> shows examples of what you want. <b>Prompt chaining</b> splits a big task into steps, each prompt using the last answer. Asking for <b>verifiable steps</b> makes the model show the work you can check.</p>',
        '<p><b>Role prompting</b> dá um papel ao modelo. <b>Few-shot</b> mostra exemplos do que você quer. <b>Prompt chaining</b> divide uma tarefa grande em etapas, cada prompt usando a resposta anterior. Pedir <b>etapas verificáveis</b> faz o modelo mostrar o trabalho para você conferir.</p>'),
      why: L('<p>Each technique fixes a different problem: wrong tone, wrong format, too much at once, or answers you can’t check.</p>',
        '<p>Cada técnica resolve um problema diferente: tom errado, formato errado, coisa demais de uma vez, ou respostas que não dá para conferir.</p>'),
      task: L('Match each prompt with its technique.', 'Ligue cada prompt à sua técnica.'),
      left: [L('“You are an experienced QA reviewing a pull request…”', '“Você é uma QA experiente revisando um pull request…”'), L('“TAR-001 → Classic 78-card deck. LEN-001 → 36-card deck. Now: CAN-001 →”', '“TAR-001 → Baralho clássico de 78 cartas. LEN-001 → Baralho de 36 cartas. Agora: CAN-001 →”'),
        L('“Step 1: list the risks of the checkout. (next prompt) Step 2: with this list, write the test cases.”', '“Etapa 1: liste os riscos do checkout. (próximo prompt) Etapa 2: com essa lista, escreva os casos de teste.”'), L('“Show the calculation step by step, with the values you used, so I can check it.”', '“Mostre a conta passo a passo, com os valores usados, para eu conferir.”')],
      right: [L('Asking for verifiable steps', 'Pedir etapas verificáveis'), 'Few-shot prompting', 'Role prompting', 'Prompt chaining'],
      answer: [2, 1, 3, 0],
      hints: [L('Few-shot = a few shots (examples). Chaining = a chain of prompts.', 'Few-shot = alguns exemplos. Chaining = uma corrente de prompts.')],
      ok: L('Right! Role, examples, a chain of steps and work you can check.', 'Isso! Papel, exemplos, uma corrente de etapas e um trabalho que dá para conferir.'),
    }),
    X(41, 15, {
      kind: 'pick', title: L('Explanations you can check', 'Explicações que dá para conferir'), tag: L('Verifiable reasoning', 'Raciocínio verificável'),
      story: L('The oracle calculated an order total for me. How do I make sure it’s right?', 'O oráculo calculou o total de um pedido para mim. Como eu garanto que está certo?'),
      what: L('<p>Asking the model to “think step by step” helps, but the steps it writes are still generated text. What matters is getting <b>steps and values you can check</b> yourself, not trusting a hidden reasoning.</p>',
        '<p>Pedir para o modelo “pensar passo a passo” ajuda, mas os passos que ele escreve ainda são texto gerado. O que importa é receber <b>etapas e valores que você consegue conferir</b>, e não confiar num raciocínio escondido.</p>'),
      why: L('<p>A wrong total with a nice explanation is still a wrong total. Verification is your job, not the model’s.</p>',
        '<p>Um total errado com uma explicação bonita continua sendo um total errado. Conferir é trabalho seu, não do modelo.</p>'),
      task: L('Mark the good ways to check the total.', 'Marque os bons jeitos de conferir o total.'),
      options: [L('Ask for the steps and the values used, then check them', 'Pedir as etapas e os valores usados, e conferir'), L('Recalculate it yourself with the order data', 'Refazer a conta você mesma com os dados do pedido'),
        L('Trust it because the model “thought about it”', 'Confiar porque o modelo “pensou”'), L('Ask the model to say it is sure', 'Pedir para o modelo dizer que tem certeza'), L('Compare with the rule BR-ORD-04 (price × quantity, minus a valid coupon, rounded)', 'Comparar com a regra BR-ORD-04 (preço × quantidade, menos cupom válido, arredondado)')],
      correct: [true, true, false, false, true],
      hints: [L('“I’m sure” is more generated text. Checking needs data and the rule.', '“Tenho certeza” é mais texto gerado. Conferir precisa de dados e da regra.')],
      ok: L('Exactly: visible steps, your own check and the rule. Never trust alone.', 'Exato: etapas visíveis, a sua própria conferência e a regra. Nunca confie sozinha.'),
    }),
    X(41, 20, {
      kind: 'order', title: L('Never accept the first answer', 'Nunca aceite a primeira resposta'), tag: L('Ask → Own', 'Ask → Own'),
      story: L('The academy’s lab has one rule: you can’t simply accept the first answer. Put the lab flow in order.', 'O laboratório da academia tem uma regra: não dá para simplesmente aceitar a primeira resposta. Coloque o fluxo do laboratório em ordem.'),
      what: L('<p>The lab flow: <b>Ask</b> (bring a real problem), <b>Evaluate</b> (what is right, what is missing?), <b>Challenge</b> (question the premises, ask for evidence), <b>Refine</b> (adjust the context and instructions), <b>Validate</b> (test the result outside the conversation) and <b>Own</b> (take responsibility for what you deliver).</p>',
        '<p>O fluxo do laboratório: <b>Ask</b> (perguntar: trazer um problema real), <b>Evaluate</b> (avaliar: o que está certo, o que falta?), <b>Challenge</b> (questionar as premissas e pedir evidências), <b>Refine</b> (refinar o contexto e as instruções), <b>Validate</b> (validar o resultado fora da conversa) e <b>Own</b> (assumir a responsabilidade pela entrega).</p>'),
      why: L('<p>The last step is the most important: AI can help build it, but the responsibility for the result belongs to whoever uses it.</p>',
        '<p>O último passo é o mais importante: a IA pode ajudar a construir, mas a responsabilidade pelo resultado continua sendo de quem a utiliza.</p>'),
      task: L('Put the steps in order.', 'Coloque os passos em ordem.'),
      steps: [L('Ask: give the AI a real problem of the shop', 'Ask: apresentar um problema real da loja para a IA'), L('Evaluate: what is right in the answer? What is missing?', 'Evaluate: o que está certo na resposta? O que está faltando?'),
        L('Challenge: question the premises and ask for evidence', 'Challenge: questionar as premissas e pedir justificativas ou evidências'), L('Refine: adjust the context and the instructions', 'Refine: ajustar o contexto e as instruções'),
        L('Validate: test the result outside the conversation (run the code, check the rule)', 'Validate: testar o resultado fora da conversa (rodar o código, conferir a regra)'), L('Own: take responsibility for the final delivery', 'Own: assumir a responsabilidade pela entrega final')],
      start: [3, 0, 5, 2, 1, 4],
      hints: [L('You can only validate after refining, and you only own what you validated.', 'Só dá para validar depois de refinar, e você só assume o que validou.')],
      ok: L('Perfect: Ask, Evaluate, Challenge, Refine, Validate, Own. The delivery is yours.', 'Perfeito: Ask, Evaluate, Challenge, Refine, Validate, Own. A entrega é sua.'),
    }),
  ];
  return { levels, exercises };
}
