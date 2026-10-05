// Mini POS - Prak 1
// Kompetensi: validasi form, kalkulator otomatis, localStorage
const STORAGE_KEY = 'minipos_cart_prak1';

const formBarang = document.getElementById('form-barang');
const inputNama = document.getElementById('nama');
const inputHarga = document.getElementById('harga');
const inputQty = document.getElementById('qty');
const inputPromo = document.getElementById('promo');
const inputBayar = document.getElementById('bayar');

const errNama = document.getElementById('err-nama');
const errHarga = document.getElementById('err-harga');
const errQty = document.getElementById('err-qty');
const errBayar = document.getElementById('err-bayar');

const tbody = document.getElementById('tbody-keranjang');
const cartEmpty = document.getElementById('cart-empty');
const elTotal = document.getElementById('total-belanja');
const elDiskon = document.getElementById('diskon');
const elTotalAkhir = document.getElementById('total-akhir');
const elKembalian = document.getElementById('kembalian');
const elWarning = document.getElementById('bayar-warning');
const promoInfo = document.getElementById('promo-info');

let cart = loadCart();
let promoApplied = false;

function formatRupiah(n) {
  return 'Rp ' + Number(n || 0).toLocaleString('id-ID');
}

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function saveCart() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

function clearError() {
  [errNama, errHarga, errQty].forEach((e) => (e.textContent = ''));
  [inputNama, inputHarga, inputQty].forEach((i) => i.classList.remove('invalid'));
}

function validateBarang(nama, harga, qty) {
  let valid = true;
  clearError();

  if (!nama || nama.trim().length < 3) {
    errNama.textContent = 'Nama barang wajib diisi, minimal 3 karakter.';
    inputNama.classList.add('invalid');
    valid = false;
  }
  if (!Number.isFinite(harga) || harga < 500) {
    errHarga.textContent = 'Harga wajib angka positif, minimal Rp 500.';
    inputHarga.classList.add('invalid');
    valid = false;
  }
  if (!Number.isInteger(qty) || qty < 1) {
    errQty.textContent = 'Qty wajib angka bulat minimal 1.';
    inputQty.classList.add('invalid');
    valid = false;
  }
  return valid;
}

function calcTotals() {
  const total = cart.reduce((sum, item) => sum + item.harga * item.qty, 0);
  const promoCode = inputPromo.value.trim().toUpperCase();
  const promoValid = promoApplied && promoCode === 'HEMAT10';
  const autoDiskon = total >= 50000;
  const dapatDiskon = autoDiskon || promoValid;
  const diskon = dapatDiskon ? Math.round(total * 0.1) : 0;
  const totalAkhir = total - diskon;

  if (promoValid) promoInfo.textContent = 'Kode HEMAT10 valid: diskon 10% aktif.';
  else if (promoApplied) promoInfo.textContent = 'Kode promo tidak valid. Gunakan HEMAT10.';
  else if (autoDiskon) promoInfo.textContent = 'Total ≥ Rp 50.000: diskon 10% otomatis aktif.';
  else promoInfo.textContent = 'Diskon 10% otomatis jika total ≥ Rp 50.000 atau kode HEMAT10 valid.';

  return { total, diskon, totalAkhir };
}

function calcKembalian(totalAkhir) {
  const bayarStr = inputBayar.value.trim();
  if (bayarStr === '') {
    elKembalian.textContent = formatRupiah(0);
    elWarning.classList.add('hidden');
    errBayar.textContent = '';
    return;
  }
  const bayar = Number(bayarStr);
  if (!Number.isFinite(bayar) || bayar < 0) {
    errBayar.textContent = 'Uang bayar harus berupa angka ≥ 0.';
    return;
  }
  errBayar.textContent = '';
  const kembali = bayar - totalAkhir;
  if (kembali < 0) {
    elKembalian.textContent = formatRupiah(0);
    elWarning.textContent = `Uang belum mencukupi. Kurang ${formatRupiah(Math.abs(kembali))}.`;
    elWarning.classList.remove('hidden');
  } else {
    elKembalian.textContent = formatRupiah(kembali);
    elWarning.classList.add('hidden');
  }
}

function renderCart() {
  tbody.innerHTML = '';
  cart.forEach((item, idx) => {
    const subtotal = item.harga * item.qty;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${idx + 1}</td>
      <td>${escapeHtml(item.nama)}</td>
      <td class="num">${formatRupiah(item.harga)}</td>
      <td class="num">${item.qty}</td>
      <td class="num">${formatRupiah(subtotal)}</td>
      <td><button data-idx="${idx}" class="btn danger btn-hapus">Hapus</button></td>
    `;
    tbody.appendChild(tr);
  });

  cartEmpty.style.display = cart.length === 0 ? 'block' : 'none';

  const { total, diskon, totalAkhir } = calcTotals();
  elTotal.textContent = formatRupiah(total);
  elDiskon.textContent = '- ' + formatRupiah(diskon);
  elTotalAkhir.textContent = formatRupiah(totalAkhir);
  calcKembalian(totalAkhir);
}

function escapeHtml(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

formBarang.addEventListener('submit', (e) => {
  e.preventDefault();
  const nama = inputNama.value;
  const harga = Number(inputHarga.value);
  const qty = Number(inputQty.value);

  if (!validateBarang(nama, harga, qty)) return;

  cart.push({ nama: nama.trim(), harga, qty });
  saveCart();
  renderCart();
  formBarang.reset();
  clearError();
  inputNama.focus();
});

tbody.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-hapus');
  if (!btn) return;
  const idx = Number(btn.dataset.idx);
  cart.splice(idx, 1);
  saveCart();
  renderCart();
});

document.getElementById('btn-reset').addEventListener('click', () => {
  cart = [];
  promoApplied = false;
  inputPromo.value = '';
  inputBayar.value = '';
  saveCart();
  renderCart();
});

document.getElementById('btn-promo').addEventListener('click', () => {
  promoApplied = true;
  renderCart();
});

inputPromo.addEventListener('input', () => {
  if (inputPromo.value.trim() === '') promoApplied = false;
  renderCart();
});

inputBayar.addEventListener('input', () => {
  const { totalAkhir } = calcTotals();
  calcKembalian(totalAkhir);
});

// init
renderCart();
