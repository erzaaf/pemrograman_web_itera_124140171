// Latihan 1 - Dasar JavaScript
const nama = 'Erza Farandi';
let umur = 20;
let kotaAsal = 'Bandar Lampung';

function cekKelulusan(nilai) {
  if (nilai >= 70) return 'Lulus';
  return 'Tidak Lulus';
}

function kategoriUmur(u) {
  if (u < 12) return 'anak';
  if (u <= 17) return 'remaja';
  if (u <= 59) return 'dewasa';
  return 'lansia';
}

function namaHari(angka) {
  switch (angka) {
    case 1: return 'Monday';
    case 2: return 'Tuesday';
    case 3: return 'Wednesday';
    case 4: return 'Thursday';
    case 5: return 'Friday';
    case 6: return 'Saturday';
    case 7: return 'Sunday';
    default: return 'Nomor hari tidak valid (1-7)';
  }
}

function gradeNilai(nilai) {
  return nilai >= 85 ? 'A'
    : nilai >= 70 ? 'B'
    : nilai >= 60 ? 'C'
    : nilai >= 50 ? 'D' : 'E';
}

document.getElementById('out-diri').textContent =
  `Nama: ${nama}, Umur: ${umur}, Kota: ${kotaAsal}`;

document.getElementById('btn-lulus').onclick = () => {
  const v = Number(document.getElementById('in-lulus').value);
  document.getElementById('out-lulus').textContent = cekKelulusan(v);
};
document.getElementById('btn-umur').onclick = () => {
  const v = Number(document.getElementById('in-umur').value);
  document.getElementById('out-umur').textContent = kategoriUmur(v);
};
document.getElementById('btn-hari').onclick = () => {
  const v = Number(document.getElementById('in-hari').value);
  document.getElementById('out-hari').textContent = namaHari(v);
};
document.getElementById('btn-grade').onclick = () => {
  const v = Number(document.getElementById('in-grade').value);
  document.getElementById('out-grade').textContent = gradeNilai(v);
};

console.log(cekKelulusan(75), kategoriUmur(20), namaHari(3), gradeNilai(90));
