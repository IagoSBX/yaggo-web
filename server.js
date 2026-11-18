'use strict';

const express = require('express');
const session = require('express-session');
const path    = require('path');
const ejs     = require('ejs');

const app  = express();
const PORT = process.env.PORT || 3000;

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || require("crypto").randomBytes(32).toString("hex"),
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 },
}));

app.use('/', require('./routes/index'));

app.use((req, res) => {
  res.status(404).render('404', { title: '404 — Yag-go', cartCount: 0, active: '' });
});


app.listen(PORT, () => {
  console.log(`🍔 Yaggo rodando em http://localhost:${PORT} - server.js:33`);
});
