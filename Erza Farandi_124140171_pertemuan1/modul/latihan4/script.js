// Latihan 4 - loop, faktorial, prima, BMI, FizzBuzz
document.getElementById('kali-btn').onclick = () => {
  const n = Number(document.getElementById('kali-angka').value);
  let hasil = '';
  for (let i = 1; i <= 10; i++) {
    hasil += `${n} x ${i} = ${n * i}\n`;
  }
  document.getElementById('kali-out').textContent = hasil;
};

function faktorial(n) {
  if (n < 0) return null;
  let hasil = 1;
  for (let i = 2; i <= n; i++) hasil *= i;
  return hasil;
}
document.getElementById('fak-btn').onclick = () => {
  const n = Number(document.getElementById('fak-angka').value);
  document.getElementById('fak-out').textContent = `${n}! = ${faktorial(n)}`;
};

function isPrima(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}
document.getElementById('prima-btn').onclick = () => {
  const n = Number(document.getElementById('prima-angka').value);
  document.getElementById('prima-out').textContent =
    isPrima(n) ? `${n} adalah bilangan prima.` : `${n} bukan bilangan prima.`;
};

function hitungBMI(bb, tbCm) {
  const tbM = tbCm / 100;
  return bb / (tbM * tbM);
}
function kategoriBMI(bmi) {
  if (bmi < 18.5) return 'Berat badan kurang';
  if (bmi < 25) return 'Normal';
  if (bmi < 30) return 'Overweight';
  return 'Obesitas';
}
document.getElementById('bmi-btn').onclick = () => {
  const bb = Number(document.getElementById('bmi-bb').value);
  const tb = Number(document.getElementById('bmi-tb').value);
  const err = document.getElementById('bmi-err');
  if (!(bb > 0 && tb > 0)) {
    err.textContent = 'Berat dan tinggi harus angka positif.';
    return;
  }
  err.textContent = '';
  const bmi = hitungBMI(bb, tb);
  document.getElementById('bmi-out').textContent =
    `BMI: ${bmi.toFixed(1)} (${kategoriBMI(bmi)})`;
};

document.getElementById('fb-btn').onclick = () => {
  let out = '';
  for (let i = 1; i <= 100; i++) {
    if (i % 15 === 0) out += 'FizzBuzz\n';
    else if (i % 3 === 0) out += 'Fizz\n';
    else if (i % 5 === 0) out += 'Buzz\n';
    else out += i + '\n';
  }
  document.getElementById('fb-out').textContent = out;
};
