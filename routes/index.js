'use strict';

const express    = require('express');
const router     = express.Router();
const { categories, products } = require('../data/products');

const DELIVERY_FEE = 5.99;

function getCart(req) {
  if (!req.session.cart) req.session.cart = [];
  return req.session.cart;
}

function cartCount(req) {
  return getCart(req).reduce((s, i) => s + i.qty, 0);
}

function cartSubtotal(req) {
  return getCart(req).reduce((s, i) => s + i.price * i.qty, 0);
}

function findProduct(id) {
  return products.find(p => p.id === id);
}

// ── HOME ─────────────────────────────────────────────────────────────────────
router.get('/', (req, res) => {
  res.render('home', {
    title: 'Yag-go Burgers',
    categories,
    featured: products.filter(p => p.popular),
    cartCount: cartCount(req),
    active: 'home',
  });
});

// ── CARDÁPIO ─────────────────────────────────────────────────────────────────
router.get('/cardapio', (req, res) => {
  const catId    = req.query.cat || categories[0].id;
  const filtered = products.filter(p => p.categoryId === catId);
  const cart     = getCart(req);

  res.render('menu', {
    title: 'Cardápio — Yag-go',
    categories,
    products: filtered,
    selectedCat: catId,
    cartIds: cart.map(i => i.id),
    cartCount: cartCount(req),
    active: 'menu',
  });
});

router.post('/cart/add', (req, res) => {
  const { productId } = req.body;
  const product = findProduct(productId);
  if (!product) return res.status(404).json({ error: 'not found' });

  const cart = getCart(req);
  const idx  = cart.findIndex(i => i.id === productId);

  if (idx >= 0) {
    cart[idx].qty++;
  } else {
    cart.push({ id: product.id, name: product.name, emoji: product.emoji, image: product.image || null, price: product.price, qty: 1 });
  }

  req.session.cart = cart;
  res.json({ count: cartCount(req), subtotal: cartSubtotal(req).toFixed(2) });
});

router.post('/cart/update', (req, res) => {
  const { productId, action } = req.body;
  const cart = getCart(req);
  const idx  = cart.findIndex(i => i.id === productId);
  if (idx < 0) return res.json({ count: cartCount(req) });

  if (action === 'inc') {
    cart[idx].qty++;
  } else if (action === 'dec') {
    cart[idx].qty--;
    if (cart[idx].qty <= 0) cart.splice(idx, 1);
  } else if (action === 'remove') {
    cart.splice(idx, 1);
  }

  req.session.cart = cart;
  res.json({
    count:    cartCount(req),
    subtotal: cartSubtotal(req).toFixed(2),
    total:    (cartSubtotal(req) + DELIVERY_FEE).toFixed(2),
    empty:    cart.length === 0,
  });
});

// ── CARRINHO (page) ───────────────────────────────────────────────────────────
router.get('/carrinho', (req, res) => {
  const cart     = getCart(req);
  const subtotal = cartSubtotal(req);
  res.render('cart', {
    title: 'Carrinho — Yag-go',
    cart,
    subtotal:    subtotal.toFixed(2),
    deliveryFee: DELIVERY_FEE.toFixed(2),
    total:       (subtotal + DELIVERY_FEE).toFixed(2),
    hasItems:    cart.length > 0,
    cartCount:   cartCount(req),
    active:      'cart',
  });
});

// ── CHECKOUT ──────────────────────────────────────────────────────────────────
router.get('/checkout', (req, res) => {
  if (getCart(req).length === 0) return res.redirect('/carrinho');
  const subtotal = cartSubtotal(req);
  res.render('checkout', {
    title: 'Checkout — Yag-go',
    subtotal:    subtotal.toFixed(2),
    deliveryFee: DELIVERY_FEE.toFixed(2),
    total:       (subtotal + DELIVERY_FEE).toFixed(2),
    cartItems:   getCart(req),
    cartCount:   cartCount(req),
    active:      'checkout',
    errors:      {},
    form:        {},
  });
});

router.post('/checkout', (req, res) => {
  const { name, phone, address, complement, payment } = req.body;
  const errors = {};

  if (!name || name.trim() === '')    errors.name    = 'Informe seu nome';
  if (!phone || phone.trim() === '')  errors.phone   = 'Informe seu telefone';
  if (!address || address.trim() === '') errors.address = 'Informe o endereço';

  const subtotal = cartSubtotal(req);

  if (Object.keys(errors).length > 0) {
    return res.render('checkout', {
      title: 'Checkout — Yag-go',
      subtotal:    subtotal.toFixed(2),
      deliveryFee: DELIVERY_FEE.toFixed(2),
      total:       (subtotal + DELIVERY_FEE).toFixed(2),
      cartItems:   getCart(req),
      cartCount:   cartCount(req),
      active:      'checkout',
      errors,
      form: req.body,
    });
  }

  const orderId = 'YG' + Date.now().toString().slice(-6);
  const order   = {
    id:          orderId,
    items:       getCart(req),
    subtotal:    subtotal.toFixed(2),
    deliveryFee: DELIVERY_FEE.toFixed(2),
    total:       (subtotal + DELIVERY_FEE).toFixed(2),
    address:     address.trim(),
    name:        name.trim(),
    payment:     payment || 'card',
    placedAt:    new Date().toISOString(),
    status:      'preparing',
  };

  if (!req.session.orders) req.session.orders = [];
  req.session.orders.push(order);
  req.session.cart = [];

  res.redirect('/pedidos/confirmacao/' + orderId);
});

router.get('/pedidos/confirmacao/:id', (req, res) => {
  const orders = req.session.orders || [];
  const order  = orders.find(o => o.id === req.params.id);
  if (!order) return res.redirect('/');

  res.render('confirmation', {
    title: 'Pedido Confirmado — Yag-go',
    order,
    cartCount: 0,
    active: '',
  });
});

router.get('/pedidos', (req, res) => {
  const orders = (req.session.orders || []).slice().reverse();
  res.render('orders', {
    title: 'Meus Pedidos — Yag-go',
    orders,
    cartCount: cartCount(req),
    active: 'orders',
  });
});

module.exports = router;
