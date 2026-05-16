# Yag-go Burgers — Web (Node.js + Express)

App delivery completo em Node.js com as mesmas 5 telas do app Flutter.

## Stack

| Camada     | Tecnologia                        |
|------------|-----------------------------------|
| Runtime    | Node.js                           |
| Framework  | Express 4                         |
| Templates  | EJS                               |
| Sessões    | express-session (carrinho + pedidos em memória) |
| CSS/JS     | Vanilla (sem bundler)             |
| Fontes     | Google Fonts — Bebas Neue + DM Sans |

## Estrutura

```
yaggo-web/
├── server.js           # Entry point — Express + sessão
├── package.json
├── routes/
│   └── index.js        # Todas as rotas (GET + POST + AJAX)
├── data/
│   └── products.js     # Categorias e produtos (seed data)
├── views/              # Templates EJS
│   ├── partials/
│   │   ├── head.ejs
│   │   ├── header.ejs
│   │   └── footer.ejs
│   ├── home.ejs        # Homepage com carrossel
│   ├── menu.ejs        # Cardápio com filtro por categoria
│   ├── cart.ejs        # Carrinho com controles AJAX
│   ├── checkout.ejs    # Formulário + validação
│   ├── confirmation.ejs
│   ├── orders.ejs      # Histórico com barra de progresso
│   └── 404.ejs
└── public/
    ├── css/style.css   # Design system completo
    └── js/app.js       # Carousel + AJAX cart + snackbar
```

## Como rodar

```bash
# 1. Instalar dependências
npm install

# 2. Rodar em produção
npm start

# 3. Rodar em dev (com auto-reload)
npm run dev

# Acesse: http://localhost:3000
```

## Telas

| Rota                         | Tela              |
|------------------------------|-------------------|
| `GET /`                      | Homepage          |
| `GET /cardapio?cat=burgers`  | Cardápio          |
| `GET /carrinho`              | Carrinho          |
| `GET /checkout`              | Checkout          |
| `POST /checkout`             | Processa pedido   |
| `GET /pedidos/confirmacao/:id` | Confirmação     |
| `GET /pedidos`               | Meus Pedidos      |

## API AJAX (carrinho)

```
POST /cart/add     { productId }          → { count, subtotal }
POST /cart/update  { productId, action }  → { count, subtotal, total, empty }
  action: 'inc' | 'dec' | 'remove'
```

## Design

Cores, tipografia e componentes idênticos ao app Flutter:
- Fundo `#0C0C0C`, superfície `#141414`
- Amarelo `#F5C518`
- Fontes: **Bebas Neue** (display) + **DM Sans** (body)
- Totalmente responsivo (mobile-first)
