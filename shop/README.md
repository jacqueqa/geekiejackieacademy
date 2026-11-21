# 🔮 Lojinha da Bruxa Maria · mock e-commerce

🇧🇷 [Português](#-português) · 🇬🇧 [English](#-english)

---

## 🇧🇷 Português

Uma loja online de mentira, feita com os mesmos produtos e as mesmas regras (BR-*) da academia. Serve para treinar testes manuais, Cypress, WebdriverIO e testes de API sem instalar nada. Nenhum pagamento é de verdade.

### Como abrir

Abra `shop/index.html` no navegador, ou acesse `/shop/` no GitHub Pages. Os dados (carrinho, pedidos, estoque) ficam salvos no navegador. Para começar do zero, entre como admin e use **Painel da Bruxa → Reiniciar tudo**, ou rode `shopApi.reset()` no console. Isso também desbloqueia contas e desfaz todas as sessões.

### O que dá para fazer

| Página | Rota | O que tem |
|---|---|---|
| Loja | `#/` | Busca, filtro por categoria, ordenação, adicionar ao carrinho |
| Produto | `#/product/TAR-001` | Detalhes, quantidade, estoque |
| Carrinho | `#/cart` | Quantidades, cupom, subtotal, desconto, frete |
| Entrar | `#/login` | E-mail, senha com mostrar/ocultar, "Lembrar de mim", usuários de teste |
| Criar conta | `#/register` | Nome, e-mail, senha e confirmação |
| Esqueci a senha | `#/forgot` | Pede o e-mail e responde sempre a mesma coisa |
| Checkout 🔒 | `#/checkout` | Dados da cliente (já preenchidos pela conta), endereço, cartão |
| Meus pedidos 🔒 | `#/orders` e `#/orders/ord-1001` | Status, pagar de novo, cancelar, pedir reembolso |
| Painel da Bruxa 🔒👑 | `#/admin` | Pedidos de todo mundo, clientes (desbloquear conta), preço e estoque, reiniciar a loja |

🔒 exige login: quem não está logado vai para `#/login?next=...` e volta para a página depois de entrar. 👑 só para admin: uma cliente vê a página 403.

### Contas e login

**Usuários de teste** (também aparecem na tela de login, é só clicar):

| E-mail | Senha | O que é |
|---|---|---|
| `jane@example.com` | `Witch123!` | Cliente |
| `locked@example.com` | `Witch123!` | Conta bloqueada (`423 ACCOUNT_LOCKED`) |
| `maria@example.com` | `Bruxa123!` | Admin: abre o Painel da Bruxa |

**Regras** (também estão no Rulebook da academia):

| Regra | O que diz |
|---|---|
| BR-AUTH-01 | E-mail errado e senha errada recebem a mesma resposta: `401 INVALID_CREDENTIALS` |
| BR-AUTH-02 | 3 senhas erradas seguidas bloqueiam a conta (`423 ACCOUNT_LOCKED`), mesmo com a senha certa depois. Só o admin desbloqueia |
| BR-AUTH-03 | Um e-mail tem uma única conta, sem diferenciar maiúsculas: `409 EMAIL_TAKEN` |
| BR-AUTH-04 | Senha com pelo menos 8 caracteres, com letras e números |
| BR-AUTH-05 | A sessão termina depois de 30 minutos parada (`401 SESSION_EXPIRED`). Sem "Lembrar de mim", termina também ao fechar a aba |
| BR-AUTH-06 | Checkout e pedidos exigem login, e cada cliente só vê os próprios pedidos. Pedido de outra pessoa responde `404` |
| BR-AUTH-07 | Só o admin abre o painel, muda produtos e envia pedidos. Os outros recebem `403 FORBIDDEN` |

Outros comportamentos para testar: depois de um login errado o campo de senha volta vazio e o e-mail fica; a senha aparece mascarada até clicar no 👁; a confirmação de senha do cadastro é conferida só no navegador; o carrinho funciona sem login.

Ideias de casos que costumam cair em entrevista: login válido e inválido, campos vazios, conta bloqueada, bloqueio na 3ª tentativa, logout e botão voltar, acessar `#/orders` sem login, cliente acessando `#/admin` pela URL, sessão expirada, "Lembrar de mim" com nova aba, cadastro com e-mail repetido, cliente tentando abrir o pedido de outra pelo ID.

O botão **{ } Log da API**, no canto da tela, mostra cada requisição com método, status, body enviado e resposta.

### Dados para os testes

**Cartões**

| Número | Resultado |
|---|---|
| `4242 4242 4242 4242` | Aprovado |
| `4000 0000 0000 0002` | Recusado: `409 PAYMENT_FAILED`, o pedido continua `Pending` |
| `4000 0000 0000 0077` | Aprovado depois de 3 segundos (bom para treinar esperas) |

Qualquer outro número com 16 dígitos é aprovado. Com menos ou mais dígitos: `400 INVALID_CARD`.

**Cupons** (maiúsculas e minúsculas tanto faz)

| Código | Desconto | Situação |
|---|---|---|
| `FULLMOON` | 10% | Válido |
| `SAKURA` | 20% | Vence **hoje**: testa o limite de BR-CPN-01 |
| `NEWMOON` | 15% | Vencido em 2025-01-31 |
| `GREEDY` | 70% | Inválido: passa de 50% (BR-CPN-04) |

**Produtos para casos especiais**: `TAR-004` está esgotado, `CRY-003` tem só 1 unidade, `BAG-001` tem 2, `BOK-001` é digital (sem estoque e sem frete).

**Frete**: €4,90 para pedidos com produto físico abaixo de €50 depois do desconto. Grátis a partir de €50 (BR-SHP-03). Exemplo de limite exato: `LEN-001` × 1 + `CLO-001` × 2 = €50,00.

### Configurações pela URL

| Parâmetro | Exemplo | Para quê |
|---|---|---|
| `today` | `?today=2026-12-01` | Fixa a data da loja (validade dos cupons) |
| `latency` | `?latency=0` | Atraso da API em ms. O padrão é 400 |
| `session` | `?session=20` | A sessão expira depois de 20 segundos parada, em vez de 30 minutos |
| `bugs` | `?bugs=all` | Liga o modo de treino com bugs (veja abaixo) |

Os parâmetros vão antes do `#`: `shop/index.html?latency=0&today=2026-11-21#/cart`.

### Seletores para automação

Todo elemento que um teste precisa tem `data-test`. Os principais:

```
nav-login  user-greeting  logout-button  nav-admin  forbidden
login-form  email-input  password-input  password-toggle  remember-me  login-button  forgot-link  register-link  fill-user
register-form  name-input  confirm-input  register-button  forgot-form  send-link-button
email-error  password-error  confirm-error  error-message  success-message  info-message
admin-users  admin-user-row[data-id][data-email]  account-status[data-locked]  unlock-user
product-card[data-sku]  product-name  product-price[data-value]  stock-status[data-stock]  add-to-cart
search-input  sort-select  category-tarot … category-books  result-count
nav-cart  cart-count  cart-line[data-sku]  qty-input  qty-increase  qty-decrease  remove-item
coupon-input  apply-coupon  coupon-message[data-valid]
summary-subtotal  summary-discount  summary-total  summary-shipping  summary-amount-due   (todos com data-value)
checkout-button  name-input  email-input  address-input  card-input  place-order
name-error  email-error  address-error  card-error  error-message  success-message  toast
order-id  order-status[data-status]  order-item[data-sku]  pay-button  cancel-order  refund-order
order-row[data-id]  ship-order  deliver-order  admin-product-row[data-sku]  admin-price  admin-stock  admin-save  reset-shop
api-log-toggle  api-entry[data-method][data-status]
```

Use `data-value` para comparar valores: o texto muda com a língua (`€34,90` em português, `€34.90` em inglês).

Exemplo em Cypress:

```js
cy.visit('?latency=0#/login')
cy.get('[data-test=email-input]').type('jane@example.com')
cy.get('[data-test=password-input]').type('Witch123!')
cy.get('[data-test=login-button]').click()
cy.get('[data-test=user-greeting]').should('contain', 'Jane')
cy.get('[data-test=product-card][data-sku=TAR-001] [data-test=add-to-cart]').click()
cy.get('[data-test=cart-count]').should('have.text', '1')
```

Para não repetir o login pela tela em todo teste, dá para entrar pela API:

```js
cy.visit('?latency=0#/')
cy.window().then(win => win.shopApi.login('jane@example.com', 'Witch123!'))
```

### API de mentira

A loja não tem servidor: a "API" roda dentro da página. Dá para chamar pelo console do navegador ou por `cy.window()`:

As chamadas mandam sozinhas o token de quem está logado, no cabeçalho `Authorization: Bearer tok_...` (aparece no Log da API). Para testar sem token ou com um token inventado, use `shopApi.request`.

```js
await shopApi.login('jane@example.com', 'Witch123!')
await shopApi.get('/api/products')
await shopApi.request('GET', '/api/orders')                // sem token: 401 UNAUTHORIZED
await shopApi.request('GET', '/api/orders', null, 'tok_x') // token inventado: 401
await shopApi.post('/api/orders', {
  customer: { name: 'Jane Doe', email: 'jane@example.com' },
  shippingAddress: 'Rua das Flores 13',
  items: [{ sku: 'TAR-001', quantity: 1 }],
  couponCode: 'FULLMOON'
})
```

Acesso: 🌐 público · 🔒 precisa de login (sem token: `401 UNAUTHORIZED`; sessão vencida: `401 SESSION_EXPIRED`) · 👑 só admin (`403 FORBIDDEN`).

| Método | Rota | Acesso | Respostas |
|---|---|---|---|
| POST | `/api/auth/login` `{ email, password }` | 🌐 | 200 `{ token, user, expiresIn }`, 400 `VALIDATION_ERROR`, 401 `INVALID_CREDENTIALS`, 423 `ACCOUNT_LOCKED` |
| POST | `/api/auth/register` `{ name, email, password }` | 🌐 | 201 `{ token, user }`, 400 `VALIDATION_ERROR` (`REQUIRED`, `INVALID`, `WEAK`), 409 `EMAIL_TAKEN` |
| POST | `/api/auth/forgot-password` `{ email }` | 🌐 | 202 (a mesma resposta exista ou não a conta), 400 |
| POST | `/api/auth/logout` | 🔒 | 204 |
| GET | `/api/auth/me` | 🔒 | 200 `{ id, name, email, role }` |
| GET | `/api/products` (`?category=`, `?q=`) | 🌐 | 200 |
| GET | `/api/products/:sku` | 🌐 | 200, 404 `PRODUCT_NOT_FOUND` |
| PATCH | `/api/products/:sku` `{ price, stock }` | 👑 | 200, 400 `INVALID_PRICE` / `INVALID_STOCK` |
| GET | `/api/coupons/:code` | 🌐 | 200 (com `valid` e `reason`), 404 `COUPON_NOT_FOUND` |
| POST | `/api/orders` | 🔒 | 201, 400 `EMPTY_ORDER` / `INVALID_QUANTITY` / `VALIDATION_ERROR`, 404, 409 `OUT_OF_STOCK` |
| GET | `/api/orders` | 🔒 | 200, só os pedidos de quem está logado |
| GET | `/api/orders?all=1` | 👑 | 200, os pedidos de todo mundo |
| GET | `/api/orders/:id` | 🔒 | 200, 404 (também para pedido de outra pessoa) |
| POST | `/api/orders/:id/pay` `{ cardNumber }` | 🔒 | 200, 400 `INVALID_CARD`, 409 `PAYMENT_FAILED` / `ALREADY_PAID` / `OUT_OF_STOCK` |
| POST | `/api/orders/:id/cancel` | 🔒 | 200, 409 `ORDER_ALREADY_PAID` / `INVALID_TRANSITION` |
| POST | `/api/orders/:id/refund` | 🔒 | 200, 409 `INVALID_TRANSITION` |
| POST | `/api/orders/:id/ship`, `/deliver` | 👑 | 200, 409 `INVALID_TRANSITION` |
| GET | `/api/users` | 👑 | 200, com `locked` e `failedLogins` |
| POST | `/api/users/:id/unlock` | 👑 | 200, 404 |
| POST | `/api/reset` | 🌐 | 200 (apaga tudo e desfaz todas as sessões) |

Um pedido tem `subtotal`, `discount`, `total` (itens menos cupom, como em BR-ORD-04), `shipping` e `amountDue` (o que a cliente paga: `total + shipping`).

### Para instrutores: modo de treino com bugs

<details>
<summary>Spoiler: abra só se você for instrutor</summary>

Com `?bugs=all`, a loja liga 16 bugs, cada um quebrando uma regra do Rulebook. Dá para ligar só alguns: `?bugs=last-unit,coupon-expiry`. O modo de treino guarda os dados separados do modo normal. Nada na tela avisa que os bugs estão ligados.

| Bug | Regra quebrada | O que acontece |
|---|---|---|
| `last-unit` | BR-STK-01 | Não deixa comprar a última unidade (`CRY-003`) |
| `qty-zero` | BR-STK-01 | Aceita quantidade 0 ou negativa, e o total pode ficar negativo |
| `coupon-expiry` | BR-CPN-01 | O cupom já vale como vencido no próprio dia `expiresOn` (`SAKURA`) |
| `free-shipping` | BR-SHP-03 | Frete grátis calculado antes do desconto |
| `rounding` | BR-ORD-04 | Total truncado em vez de arredondado: `TAR-001` + `FULLMOON` dá €31,40 em vez de €31,41 |
| `stock-on-create` | BR-STK-03 | O estoque baixa ao criar o pedido, não ao pagar, e não volta no cancelamento |
| `price-snapshot` | BR-ORD-05 | Mudar o preço no painel muda o preço dos pedidos antigos |
| `cancel-paid` | BR-PAY-03 | Um pedido pago pode ser cancelado |
| `double-pay` | BR-PAY-01 | Um pedido pago pode ser pago de novo |
| `no-address` | BR-SHP-01 | Pedido com produto físico passa sem endereço |
| `login-enum` | BR-AUTH-01 | Mensagens diferentes para e-mail inexistente (`404 USER_NOT_FOUND`) e senha errada (`WRONG_PASSWORD`), também no "esqueci a senha". Deixa descobrir quem tem conta |
| `no-lockout` | BR-AUTH-02 | A conta nunca bloqueia, por mais senhas erradas que se tente |
| `weak-password` | BR-AUTH-04 | O cadastro aceita qualquer senha, até de 1 caractere |
| `email-case` | BR-AUTH-03 | `JANE@example.com` consegue criar uma segunda conta |
| `orders-idor` | BR-AUTH-06 | Trocando o ID na URL (`#/orders/ord-1001`), uma cliente vê, paga e cancela o pedido de outra |
| `admin-open` | BR-AUTH-07 | O link do painel some para clientes, mas `#/admin` abre e a API aceita as ações de admin |

Se os alunos têm acesso ao repositório, eles conseguem ler esta lista.

</details>

---

## 🇬🇧 English

A mock online shop built from the academy’s products and business rules (BR-*). Students use it to practise manual testing, Cypress, WebdriverIO and API checks with nothing to install. No payment is real.

**Open it**: `shop/index.html` in a browser, or `/shop/` on GitHub Pages. Data is saved in the browser; reset it from **Back office → Reset everything** or with `shopApi.reset()`.

**Pages**: shop `#/`, product `#/product/TAR-001`, cart `#/cart`, log in `#/login`, sign up `#/register`, forgot password `#/forgot`, checkout `#/checkout` 🔒, orders `#/orders` 🔒, back office `#/admin` 🔒 admin only. The **{ } API log** button shows every request and response, including the `Authorization` header.

**Test users**: `jane@example.com` / `Witch123!` customer · `locked@example.com` / `Witch123!` locked account · `maria@example.com` / `Bruxa123!` admin. Rules BR-AUTH-01 to 07: same message for a wrong email or password, lock after 3 wrong passwords, one account per email, passwords of 8+ characters with letters and numbers, session ends after 30 idle minutes, customers only see their own orders, only the admin opens the back office.

**Test cards**: `4242 4242 4242 4242` approved · `4000 0000 0000 0002` declined (`409 PAYMENT_FAILED`) · `4000 0000 0000 0077` approved after 3 s.

**Coupons**: `FULLMOON` 10% valid · `SAKURA` 20% expires today · `NEWMOON` 15% expired · `GREEDY` 70% invalid (over 50%).

**Shipping**: €4.90 below €50 after the discount, free from €50.

**URL settings** (before the `#`): `today=YYYY-MM-DD` fixes the shop date, `latency=0` sets the API delay in ms (default 400), `session=20` makes sessions expire after 20 idle seconds, `bugs=all` turns on training mode.

**Selectors**: every element a test needs has a `data-test` attribute; amounts also carry a `data-value` with the raw number. See the Portuguese section for the full list, the API routes and the instructor-only list of seeded bugs.
