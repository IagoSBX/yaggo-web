/* ── Yag-go client JS ────────────────────────────────────────────── */

// ── Snackbar ──────────────────────────────────────────────────────
function showSnack(msg) {
  let bar = document.getElementById('snackbar');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'snackbar';
    bar.className = 'snackbar';
    document.body.appendChild(bar);
  }
  bar.textContent = msg;
  bar.classList.add('show');
  clearTimeout(bar._t);
  bar._t = setTimeout(() => bar.classList.remove('show'), 2500);
}

function bumpBadge(newCount) {
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = newCount;
    const badge = el.closest('.cart-badge, .cart-btn')?.querySelector('.cart-badge') || el;
    badge.classList.remove('bump');
    void badge.offsetWidth; // reflow
    badge.classList.add('bump');
  });
}

// ── Add to cart (AJAX) ────────────────────────────────────────────
document.addEventListener('click', async (e) => {
  const btn = e.target.closest('[data-add]');
  if (!btn) return;

  const productId = btn.dataset.add;
  try {
    const res  = await fetch('/cart/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId }),
    });
    const data = await res.json();

    btn.textContent = '✓ Adicionado';
    btn.classList.add('added');

    bumpBadge(data.count);
    showSnack('Item adicionado ao carrinho!');
  } catch {
    showSnack('Erro ao adicionar item.');
  }
});

// ── Cart quantity controls (AJAX) ─────────────────────────────────
document.addEventListener('click', async (e) => {
  const btn = e.target.closest('[data-qty]');
  if (!btn) return;

  const { qty: action, id: productId } = btn.dataset;

  try {
    const res  = await fetch('/cart/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, action }),
    });
    const data = await res.json();

    // update badge
    bumpBadge(data.count);

    if (data.empty) {
      // reload to show empty state
      location.reload();
      return;
    }

    // update row qty display
    const row     = btn.closest('.cart-item');
    const qtyEl   = row?.querySelector('.qty-val');
    const subEl   = row?.querySelector('.cart-subtotal');
    const totEl   = document.getElementById('cart-total');
    const subTotEl= document.getElementById('cart-subtotal');

    if (action === 'remove') {
      row.classList.add('removing');
      setTimeout(() => { row.remove(); checkEmpty(); }, 200);
    } else if (action === 'dec' && qtyEl && parseInt(qtyEl.textContent) <= 1) {
      row.classList.add('removing');
      setTimeout(() => { row.remove(); checkEmpty(); }, 200);
    } else {
      if (qtyEl) {
        const cur = parseInt(qtyEl.textContent);
        qtyEl.textContent = action === 'inc' ? cur + 1 : cur - 1;
      }
    }

    // re-calc subtotal displayed in row
    if (subEl && qtyEl) {
      const unitText = row?.querySelector('.cart-item-price')?.textContent || '';
      const unitMatch= unitText.match(/[\d.,]+/);
      if (unitMatch) {
        const unit = parseFloat(unitMatch[0].replace(',', '.'));
        const qty  = parseInt(qtyEl.textContent);
        subEl.textContent = 'R$ ' + (unit * qty).toFixed(2);
      }
    }

    if (totEl)    totEl.textContent    = 'R$ ' + data.total;
    if (subTotEl) subTotEl.textContent = 'R$ ' + data.subtotal;

  } catch {
    showSnack('Erro ao atualizar carrinho.');
  }
});

function checkEmpty() {
  const items = document.querySelectorAll('.cart-item');
  if (items.length === 0) location.reload();
}

// ── Hero carousel ─────────────────────────────────────────────────
(function () {
  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.dot');
  if (!slides.length) return;

  let cur = 0;

  function go(n) {
    slides[cur].style.display = 'none';
    dots[cur]?.classList.remove('active');
    cur = (n + slides.length) % slides.length;
    slides[cur].style.display = '';
    dots[cur]?.classList.add('active');
  }

  // init
  slides.forEach((s, i) => { if (i !== 0) s.style.display = 'none'; });
  dots[0]?.classList.add('active');

  dots.forEach((d, i) => d.addEventListener('click', () => go(i)));

  // auto-advance
  setInterval(() => go(cur + 1), 4000);
})();

// ── Mobile nav toggle ─────────────────────────────────────────────
const toggle = document.getElementById('nav-toggle');
const nav    = document.getElementById('main-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    nav.classList.toggle('open');
  });
}

// ── Payment option highlight ──────────────────────────────────────
document.querySelectorAll('.pay-option').forEach(opt => {
  opt.addEventListener('click', () => {
    opt.querySelector('input[type="radio"]').checked = true;
  });
});
