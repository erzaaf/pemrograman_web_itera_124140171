// Latihan 2 - Array objek mahasiswa + CRUD
const dataAwal = [
  { nama: 'Erza Farandi', nim: '124140171', jurusan: 'Teknik Informatika', nilai: 85 },
  { nama: 'Arfa Raditya', nim: '124140015', jurusan: 'Sistem Informasi', nilai: 70 },
  { nama: 'Jeremi Pison', nim: '124140195', jurusan: 'Teknik Elektro', nilai: 92 },
  { nama: 'Dimas Alhamdy', nim: '124140165', jurusan: 'Teknik Informatika', nilai: 60 },
  { nama: 'Irfan Ramadhan', nim: '124140159', jurusan: 'Teknik Informatika', nilai: 78 },
];
let mahasiswa = [...dataAwal];
let editIndex = -1;
const tbody = document.getElementById('tbody');
const info = document.getElementById('info');

function render(data = mahasiswa) {
  tbody.innerHTML = '';
  data.forEach((m) => {
    const i = mahasiswa.indexOf(m);
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${i + 1}</td><td>${m.nama}</td><td>${m.nim}</td><td>${m.jurusan}</td><td>${m.nilai}</td>
      <td><button class="btn btn-edit" data-edit="${i}">Edit</button> <button class="btn btn-del" data-hapus="${i}">Hapus</button></td>`;
    tbody.appendChild(tr);
  });
}

document.getElementById('btn-tertinggi').onclick = () => {
  const top = mahasiswa.reduce((a, b) => (b.nilai > a.nilai ? b : a), mahasiswa[0]);
  info.textContent = `Nilai tertinggi: ${top.nama} (${top.nilai})`;
};

document.getElementById('btn-diatas-rata').onclick = () => {
  const rata = mahasiswa.reduce((s, m) => s + m.nilai, 0) / mahasiswa.length;
  const atas = mahasiswa.filter((m) => m.nilai > rata);
  info.textContent = `Rata-rata: ${rata.toFixed(1)}. Di atas rata-rata: ${atas.map((m) => m.nama).join(', ')}`;
  render(atas);
};

document.getElementById('btn-sort-asc').onclick = () => {
  mahasiswa.sort((a, b) => a.nama.localeCompare(b.nama));
  render();
};
document.getElementById('btn-sort-desc').onclick = () => {
  mahasiswa.sort((a, b) => b.nama.localeCompare(a.nama));
  render();
};
document.getElementById('btn-reset').onclick = () => {
  mahasiswa = [...dataAwal]; info.textContent = ''; render();
};

document.getElementById('btn-simpan').onclick = () => {
  const m = {
    nama: document.getElementById('f-nama').value.trim(),
    nim: document.getElementById('f-nim').value.trim(),
    jurusan: document.getElementById('f-jurusan').value.trim(),
    nilai: Number(document.getElementById('f-nilai').value),
  };
  if (!m.nama || !m.nim) { alert('Nama & NIM wajib diisi'); return; }
  if (editIndex >= 0) { mahasiswa[editIndex] = m; editIndex = -1; }
  else mahasiswa.push(m);
  render();
};

tbody.onclick = (e) => {
  if (e.target.textContent === 'Edit' && e.target.dataset.edit !== undefined) {
    const i = Number(e.target.dataset.edit);
    const m = mahasiswa[i];
    document.getElementById('f-nama').value = m.nama;
    document.getElementById('f-nim').value = m.nim;
    document.getElementById('f-jurusan').value = m.jurusan;
    document.getElementById('f-nilai').value = m.nilai;
    editIndex = i;
  }
  if (e.target.textContent === 'Hapus' && e.target.dataset.hapus !== undefined) {
    mahasiswa.splice(Number(e.target.dataset.hapus), 1);
    render();
  }
};

render();
