// Latihan 3 - form, localStorage, API, dark mode, pagination, todo
document.getElementById('btn-dark').onclick = () =>
  document.body.classList.toggle('dark');

const M_KEY = 'lat3_mahasiswa';
let mhs = JSON.parse(localStorage.getItem(M_KEY) || '[]');
const mList = document.getElementById('m-list');
const mError = document.getElementById('m-error');
function renderMhs() {
  mList.innerHTML = '';
  mhs.forEach((m) => {
    const li = document.createElement('li');
    li.textContent = `${m.nama} - ${m.nim} (${m.nilai})`;
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

let posts = [], page = 1;
const perPage = 5;
async function loadPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  posts = await res.json();
  renderPosts();
}
function renderPosts() {
  const q = document.getElementById('search').value.toLowerCase();
  const filtered = posts.filter((p) => p.title.toLowerCase().includes(q));
  const totalPage = Math.max(1, Math.ceil(filtered.length / perPage));
  if (page > totalPage) page = totalPage;
  const start = (page - 1) * perPage;
  const slice = filtered.slice(start, start + perPage);
  document.getElementById('posts').innerHTML =
    slice.map((p) => `<li><b>${p.id}.</b> ${p.title}</li>`).join('');
  document.getElementById('page-info').textContent = `Hal ${page}/${totalPage}`;
}
document.getElementById('search').oninput = () => { page = 1; renderPosts(); };
document.getElementById('prev').onclick = () => { if (page > 1) { page--; renderPosts(); } };
document.getElementById('next').onclick = () => { page++; renderPosts(); };
loadPosts().catch(() => {
  document.getElementById('posts').innerHTML = '<li>Gagal load API (offline).</li>';
});

const T_KEY = 'lat3_todos';
let todos = JSON.parse(localStorage.getItem(T_KEY) || '[]');
const tList = document.getElementById('t-list');
function renderTodos() {
  tList.innerHTML = '';
  todos.forEach((t, i) => {
    const li = document.createElement('li');
    if (t.done) li.classList.add('done');
    li.innerHTML = `<input type="checkbox" ${t.done ? 'checked' : ''} data-t="${i}" /> ${t.text} <button data-del="${i}">Hapus</button>`;
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
