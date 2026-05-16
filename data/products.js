'use strict';

const categories = [
  { id: 'burgers',  name: 'Hambúrgueres', subtitle: 'Clássicos, smash e especiais' },
  { id: 'combos',   name: 'Combos',        subtitle: 'Burger + fritas + bebida'     },
  { id: 'drinks',   name: 'Bebidas',        subtitle: 'Sucos e milkshakes'           },
  { id: 'desserts', name: 'Sobremesas',     subtitle: 'Brownies e sorvetes'          },
];

// image: nome descritivo do arquivo em public/images/
const products = [
  // ── Hambúrgueres ─────────────────────────────────────────────────────────
  { id: 'p1',  name: 'Smash Clássico',     desc: 'Blend 180g, queijo cheddar, alface, tomate e molho especial da casa.', price: 28.90, categoryId: 'burgers',  emoji: '🍔', popular: true,  image: 'smash_classico.png'     },
  { id: 'p2',  name: 'Double Smash',       desc: 'Dois blends 120g, bacon crocante, duplo cheddar e cebola crispy.',     price: 38.90, categoryId: 'burgers',  emoji: '🍔', popular: false, image: 'double_smash.png'       },
  { id: 'p3',  name: 'Urban Supremo',      desc: 'Blend 200g, brie, geleia de pimenta, rúcula e maionese trufada.',      price: 45.90, categoryId: 'burgers',  emoji: '🍔', popular: true,  image: 'urban_supremo.png'      },
  { id: 'p4',  name: 'Chicken Crispy',     desc: 'Frango empanado crocante, cheddar, picles e molho buffalo.',           price: 32.90, categoryId: 'burgers',  emoji: '🍗', popular: false, image: 'chicken_crispy.png'     },
  // ── Combos ───────────────────────────────────────────────────────────────
  { id: 'p5',  name: 'Combo Clássico',     desc: 'Smash Clássico + fritas M + refrigerante 350ml.',                     price: 44.90, categoryId: 'combos',   emoji: '🍟', popular: true,  image: 'combo_classico.png'     },
  { id: 'p6',  name: 'Combo Double',       desc: 'Double Smash + fritas G + refrigerante 350ml.',                       price: 54.90, categoryId: 'combos',   emoji: '🍟', popular: false, image: 'combo_double.png'       },
  { id: 'p7',  name: 'Combo Supremo',      desc: 'Urban Supremo + fritas G + suco natural 300ml.',                      price: 62.90, categoryId: 'combos',   emoji: '🍟', popular: false, image: 'combo_supremo.png'      },
  // ── Bebidas ──────────────────────────────────────────────────────────────
  { id: 'p8',  name: 'Milkshake Baunilha', desc: 'Milkshake cremoso de baunilha com chantilly e calda.',                price: 18.90, categoryId: 'drinks',   emoji: '🥤', popular: false, image: 'milkshake_baunilha.png' },
  { id: 'p9',  name: 'Suco de Laranja',    desc: 'Suco natural de laranja espremido na hora, 400ml.',                   price: 12.90, categoryId: 'drinks',   emoji: '🍊', popular: false, image: 'suco_laranja2.png'       },
  { id: 'p10', name: 'Refrigerante Lata',  desc: 'Lata 350ml — Coca-Cola, Guaraná ou Sprite.',                          price:  8.90, categoryId: 'drinks',   emoji: '🥫', popular: false, image: 'refrigerante_lata.png'  },
  // ── Sobremesas ───────────────────────────────────────────────────────────
  { id: 'p11', name: 'Brownie Quente',     desc: 'Brownie de chocolate belga com sorvete de creme e calda.',             price: 16.90, categoryId: 'desserts', emoji: '🍫', popular: true,  image: 'brownie_quente.png'     },
  { id: 'p12', name: 'Sorvete Artesanal',  desc: '2 bolas — chocolate, morango ou creme.',                               price: 14.90, categoryId: 'desserts', emoji: '🍨', popular: false, image: 'sorvete_artesanal.png'  },
];

module.exports = { categories, products };
