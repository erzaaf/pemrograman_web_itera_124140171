// Latihan 3 - form, localStorage, todo
const M_KEY = 'lat3_mahasiswa';
let mhs = JSON.parse(localStorage.getItem(M_KEY) || '[]');
const mList = document.getElementById('m-list');
const mError = document.getElementById('m-error');
function renderMhs() {
  mList.innerHTML = '';
  mhs.forEach((m, i) => {
    const li = document.createElement('li');
    li.className = 'card-item';
    li.innerHTML = `<span>${m.nama} - ${m.nim} (${m.nilai})</span> <button class="btn btn-del" data-mdel="${i}">Hapus</button>`;
    mList.appendChild(li);
  });
}
document.getElementById('m-simpan').onclick = () => {
  const nama = document.getElementById('m-nama').value.trim();
  const nim = document.getElementById('m-nim').value.trim();
  const nilai = Number(document.getElementById('m-nilai').value);
  if (nama.length < 3) { mError.textContent = 'Nama minimal 3 karakter.'; return; }
  if (!nim) { mError.textContent = 'NIM wajib diisi.'; return; }
  if (!(nilai >= 0 && nilai <= 100)) { mError.textContent = 'Nilai 0-100.'; return; }
  mError.textContent = '';
  mhs.push({ nama, nim, nilai });
  localStorage.setItem(M_KEY, JSON.stringify(mhs));
  renderMhs();
};
renderMhs();

// Hapus satu / hapus semua (biar data duplikat seperti di screenshot gampang dibersihkan)
mList.onclick = (e) => {
  if (e.target.dataset.mdel !== undefined) {
    mhs.splice(Number(e.target.dataset.mdel), 1);
    localStorage.setItem(M_KEY, JSON.stringify(mhs));
    renderMhs();
  }
};
document.getElementById('m-clear').onclick = () => {
  mhs = [];
  localStorage.setItem(M_KEY, JSON.stringify(mhs));
  renderMhs();
};

// Search + pagination tetap jalan (tanpa menampilkan daftar tulisan)
let posts = [], page = 1;
const perPage = 5;
async function loadPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  posts = await res.json();
  renderPageInfo();
}
function renderPageInfo() {
  const q = document.getElementById('search').value.toLowerCase();
  const filtered = posts.filter((p) => p.title.toLowerCase().includes(q));
  const totalPage = Math.max(1, Math.ceil(filtered.length / perPage));
  if (page > totalPage) page = totalPage;
  document.getElementById('page-info').textContent = `Hal ${page}/${totalPage}`;
}
document.getElementById('search').oninput = () => { page = 1; renderPageInfo(); };
document.getElementById('prev').onclick = () => { if (page > 1) { page--; renderPageInfo(); } };
document.getElementById('next').onclick = () => { page++; renderPageInfo(); };
loadPosts().catch(() => {
  document.getElementById('page-info').textContent = 'Hal -/- (offline)';
});

const T_KEY = 'lat3_todos';
let todos = JSON.parse(localStorage.getItem(T_KEY) || '[]');
const tList = document.getElementById('t-list');
function renderTodos() {
  tList.innerHTML = '';
  todos.forEach((t, i) => {
    const li = document.createElement('li');
    li.className = 'card-item';
    if (t.done) li.classList.add('done');
    li.innerHTML = `<span><input type="checkbox" ${t.done ? 'checked' : ''} data-t="${i}" /> ${t.text}</span> <button class="btn btn-del" data-del="${i}">Hapus</button>`;
    tList.appendChild(li);
  });
}
document.getElementById('t-add').onclick = () => {
  const v = document.getElementById('t-input').value.trim();
  if (!v) return;
  todos.push({ text: v, done: false });
  localStorage.setItem(T_KEY, JSON.stringify(todos));
  document.getElementById('t-input').value = '';
  renderTodos();
};
tList.onclick = (e) => {
  if (e.target.dataset.t !== undefined && e.target.type === 'checkbox') {
    todos[Number(e.target.dataset.t)].done = e.target.checked;
    localStorage.setItem(T_KEY, JSON.stringify(todos));
    renderTodos();
  }
  if (e.target.dataset.del !== undefined) {
    todos.splice(Number(e.target.dataset.del), 1);
    localStorage.setItem(T_KEY, JSON.stringify(todos));
    renderTodos();
  }
};
renderTodos();
