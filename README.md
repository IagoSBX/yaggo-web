# Yag-go Burgers — Delivery Full Stack (Web + Mobile)

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-black?logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white)
![Sequelize](https://img.shields.io/badge/ORM-Sequelize-52B0E7?logo=sequelize&logoColor=white)
![Flutter](https://img.shields.io/badge/Mobile-Flutter-02569B?logo=flutter&logoColor=white)

## Sobre o projeto

O **Yag-go Burgers** é um sistema de delivery construído do zero, cobrindo as duas frentes mais comuns em vagas de desenvolvimento: **back-end web com banco relacional** e **aplicativo mobile**. A ideia foi reproduzir os desafios reais de um e-commerce — sessão de usuário, carrinho que persiste entre visitas, cálculo de subtotal em tempo real e fluxo completo de pedido — sem depender de frameworks prontos de e-commerce.

## Funcionalidades

- Catálogo de produtos por categoria (Hambúrgueres, Combos, Bebidas, Sobremesas)
- Carrinho de compras persistente por sessão, com atualização via AJAX (sem reload de página)
- Usuários anônimos identificados automaticamente por `session_id`
- Checkout e histórico de pedidos, com snapshot dos itens no momento da compra
- Views SQL dedicadas para resumo de carrinho e relatório de pedidos
- App mobile em Flutter com a mesma proposta visual e de produto

## Stack técnica

**Back-end / Web**
- Node.js + Express
- MySQL / MariaDB com Sequelize (ORM)
- EJS para renderização de views
- `express-session` + `connect-session-sequelize` (sessão persistida no banco)
- `bcryptjs`, `uuid`, `node-fetch`

**Mobile**
- Flutter (Dart, SDK ^3.3.0)
- Provider para gerenciamento de estado
- Google Fonts

## Estrutura do projeto

```
yaggo/
├── server.js          # Entry point do Express
├── package.json
│
├── db/
│   ├── schema.sql      # DDL — banco, tabelas e views
│   ├── seed.sql / seed.js  # Dados iniciais (categorias e produtos)
│   ├── connection.js   # Conexão Sequelize
│   └── models.js       # Modelos (Categoria, Produto, Pedido...)
│
├── middleware/
│   └── usuario.js      # Resolve/cria usuário anônimo por sessão
│
├── routes/
│   └── index.js        # Rotas GET/POST + API AJAX do carrinho
│
├── views/              # Templates EJS (home, menu, cart, checkout...)
├── public/             # CSS, JS e imagens dos produtos
│
├── lib/                # Código-fonte do app Flutter
├── android/            # Projeto Android do app Flutter
└── test/               # Testes do app Flutter
```

## Modelo de dados

| Tabela | Descrição |
|---|---|
| `categorias` | Hambúrgueres, Combos, Bebidas, Sobremesas |
| `produtos` | 12 produtos com preço, imagem e categoria |
| `usuarios` | Usuários anônimos identificados por `session_id` |
| `carrinho` | Itens no carrinho por usuário (persiste entre sessões) |
| `pedidos` | Pedidos finalizados com status |
| `itens_pedido` | Snapshot dos itens no momento da compra |

**Views:** `v_carrinho_resumo` (subtotal do carrinho) e `v_pedidos_completos` (pedidos com contagem de itens).

## Como rodar localmente

**Pré-requisitos:** Node.js 18+, MySQL 8+ ou MariaDB 10.6+, Flutter 3.3+ (opcional, apenas para o app mobile)

**Web app**
```bash
# 1. Instalar dependências
npm install

# 2. Criar o banco de dados
mysql -u root -p < db/schema.sql

# 3. Configurar credenciais
cp .env.example .env
# edite o .env com usuário/senha do seu MySQL

# 4. Popular o banco com dados iniciais
npm run seed

# 5. Rodar o servidor
npm start    # produção
npm run dev  # desenvolvimento (auto-reload com nodemon)
```
Acesse: http://localhost:3000

**App mobile**
```bash
cd android/.. # raiz do projeto Flutter
flutter pub get
flutter run
```

## API do carrinho (AJAX)

- `POST /cart/add` `{ productId }` → `{ count, subtotal }`
- `POST /cart/update` `{ productId, action }` → `{ count, subtotal, total, empty }` (`action`: `'inc'` | `'dec'` | `'remove'`)

## Roadmap

- [ ] Autenticação real de usuários (login/cadastro)
- [ ] Painel administrativo para gestão de produtos e pedidos
- [ ] Integração de pagamento
- [ ] Testes automatizados no back-end

## Autores

Feito por **Iago Santos** em colaboração com **Yago Ribeiro**

[![GitHub](https://img.shields.io/badge/GitHub-IagoSBX-181717?logo=github)](https://github.com/IagoSBX)
