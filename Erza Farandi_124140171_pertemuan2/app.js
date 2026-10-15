/* =====================================================================
 * ErzaBoard — Personal Dashboard Mahasiswa
 * Erza Farandi • 124140171 • Praktikum PAW Pertemuan 2
 * Pola: OOP modern (TaskItem + DashboardApp), state immutable,
 * localStorage, async/await fetch API publik.
 * ===================================================================== */

// ---------- Konstanta & helper (const / let dipakai tepat) ----------
const STORAGE_KEYS = {
  tasks: "erzaboard_tasks_v1",
  schedules: "erzaboard_schedules_v1",
  notes: "erzaboard_notes_v1",
  theme: "erzaboard_theme_v1",
};

const DAY_ORDER = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
const PRIORITY_WEIGHT = { tinggi: 3, sedang: 2, rendah: 1 };

const $ = (id) => document.getElementById(id); // arrow function #1
const esc = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); // arrow #2
const uid = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`; // arrow #3
const fmtDate = (iso) => {
  if (!iso) return "-";
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
};
const daysUntil = (iso) => {
  if (!iso) return Infinity;
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const t = new Date(`${iso}T00:00:00`);
  return Math.round((t - today) / 86400000);
};
const showToast = (msg) => {
  const el = $("toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => el.classList.remove("show"), 2200);
};

// ---------- Class: model data setiap item ----------

/** Model satu tugas: struktur data + logika turunan. */
class TaskItem {
  constructor({ id = uid(), title, course, deadline, priority = "sedang", description = "", done = false, createdAt = Date.now() } = {}) {
    this.id = id;
    this.title = title;
    this.course = course;
    this.deadline = deadline;
    this.priority = priority;
    this.description = description;
    this.done = done;
    this.createdAt = createdAt;
  }
  toggle() { this.done = !this.done; return this; } // method class
  get remaining() { return daysUntil(this.deadline); } // getter class
  get isOverdue() { return !this.done && this.remaining < 0; }
  get badge() {
    if (this.done) return "✅ Selesai";
    if (this.isOverdue) return `⏰ Terlambat ${Math.abs(this.remaining)} hari`;
    if (this.remaining === 0) return "🔥 Hari ini!";
    return `H-${this.remaining}`;
  }
}

/** Model satu jadwal kuliah. */
class ScheduleItem {
  constructor({ id = uid(), day, course, start, end, room = "", lecturer = "" } = {}) {
    this.id = id; this.day = day; this.course = course;
    this.start = start; this.end = end; this.room = room; this.lecturer = lecturer;
  }
}

/** Model satu catatan cepat. */
class NoteItem {
  constructor({ id = uid(), title, body, pinned = false, createdAt = Date.now() } = {}) {
    this.id = id; this.title = title; this.body = body; this.pinned = pinned; this.createdAt = createdAt;
  }
}

// ---------- Class utama: state, storage, fetch, render ----------

class DashboardApp {
  constructor() {
    // let/const: state array dideklarasi const referensinya, isinya diganti immutable
    this.tasks = this.load(STORAGE_KEYS.tasks, []);
    this.schedules = this.load(STORAGE_KEYS.schedules, this.defaultSchedules());
    this.notes = this.load(STORAGE_KEYS.notes, []);
    // Bersihkan sisa data contoh lama (JSONPlaceholder) agar awal tampil kosong
    if (this.tasks.some((t) => (t.description || "").includes("JSONPlaceholder"))) {
      this.tasks = this.tasks.filter((t) => !(t.description || "").includes("JSONPlaceholder"));
      localStorage.removeItem("erzaboard_seeded");
      this.save();
    }
    this.editingTaskId = null;
    this.editingScheduleId = null;
    this.editingNoteId = null;
    this.cacheElements();
    this.bindEvents();
    this.applyTheme(this.load(STORAGE_KEYS.theme, "light"));
    this.tickClock();
    setInterval(() => this.tickClock(), 1000);
    this.renderAll();
    // Operasi asinkron: 3 fetch API publik dijalankan paralel
    this.loadExternalData();
  }

  // ----- storage -----
  load(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch { return fallback; }
  }
  save() {
    localStorage.setItem(STORAGE_KEYS.tasks, JSON.stringify(this.tasks));
    localStorage.setItem(STORAGE_KEYS.schedules, JSON.stringify(this.schedules));
    localStorage.setItem(STORAGE_KEYS.notes, JSON.stringify(this.notes));
  }

  defaultSchedules() {
    return [
      new ScheduleItem({ day: "Senin", course: "Praktikum PAW", start: "10:00", end: "12:30", room: "Lab 2", lecturer: "Tim PAW" }),
      new ScheduleItem({ day: "Selasa", course: "Basis Data", start: "08:00", end: "10:30", room: "GKU 3.5", lecturer: "-" }),
    ];
  }

  cacheElements() {
    this.el = {
      clock: $("clock"), dateLine: $("dateLine"), greeting: $("greeting"),
      quoteBox: $("quoteBox"), quoteAuthor: $("quoteAuthor"),
      weatherBox: $("weatherBox"),
      statTotal: $("statTotal"), statDone: $("statDone"), statUrgent: $("statUrgent"), statToday: $("statToday"),
      progressBar: $("progressBar"), progressLabel: $("progressLabel"),
      taskForm: $("taskForm"), taskList: $("taskList"),
      scheduleForm: $("scheduleForm"), scheduleList: $("scheduleList"), todayBadge: $("todayBadge"),
      noteForm: $("noteForm"), noteList: $("noteList"),
    };
  }

  bindEvents() {
    this.el.taskForm.addEventListener("submit", (e) => this.handleTaskSubmit(e)); // arrow #4
    ["searchTask", "filterTask", "sortTask"].forEach((id) =>
      $(id).addEventListener("input", () => this.renderTasks())); // arrow #5
    $("taskCancel").addEventListener("click", () => this.resetTaskForm());
    this.el.scheduleForm.addEventListener("submit", (e) => this.handleScheduleSubmit(e));
    $("schCancel").addEventListener("click", () => this.resetScheduleForm());
    this.el.noteForm.addEventListener("submit", (e) => this.handleNoteSubmit(e));
    $("noteCancel").addEventListener("click", () => this.resetNoteForm());
    // Event delegation: 1 listener untuk semua tombol aksi di 3 list
    document.addEventListener("click", (e) => this.handleActionClick(e)); // arrow #6
    $("quoteBtn").addEventListener("click", () => this.fetchQuote());
    $("weatherBtn").addEventListener("click", () => this.fetchWeather());
    $("themeBtn").addEventListener("click", () => this.toggleTheme());
    $("resetBtn").addEventListener("click", () => this.resetAll());
  }

  // ================= ASYNC: data eksternal (async/await + Promise.all) =================
  async loadExternalData() {
    await Promise.allSettled([this.fetchQuote(), this.fetchWeather()]);
  }

  /** Kutipan motivasi acak — DummyJSON */
  async fetchQuote() {
    try {
      const res = await fetch("https://dummyjson.com/quotes/random");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const { quote, author } = await res.json(); // destructuring parameter/objek
      this.el.quoteBox.textContent = `“${quote}”`;
      this.el.quoteAuthor.textContent = `— ${author}`;
    } catch (err) {
      const fallback = [
        ["Kerjakan yang sulit dulu, yang mudah akan mengikuti.", "Mahasiswa ITERA"],
        ["Sedikit progres tiap hari lebih baik dari rencana sempurna.", "ErzaBoard"],
      ];
      const [q, a] = fallback[Math.floor(Math.random() * fallback.length)]; // destructuring array
      this.el.quoteBox.textContent = `“${q}”`;
      this.el.quoteAuthor.textContent = `— ${a} (offline)`;
    }
  }

  /** Cuaca real-time kampus ITERA — Open-Meteo (tanpa API key) */
  async fetchWeather() {
    try {
      const url = "https://api.open-meteo.com/v1/forecast?latitude=-5.36&longitude=105.31&current_weather=true";
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const { current_weather: w } = await res.json(); // destructuring + rename
      const desc = this.weatherCodeToLabel(w.weathercode);
      this.el.weatherBox.innerHTML = `
        <div class="weather-grid">
          <p class="weather-big">${w.temperature}°C</p>
          <div><strong>${desc}</strong><br />
          <span class="muted small">Angin ${w.windspeed} km/h • ${w.is_day ? "☀️ Siang" : "🌙 Malam"}</span></div>
        </div>`; // template literal dinamis #1
    } catch {
      this.el.weatherBox.innerHTML = `<p class="muted">Tidak dapat memuat cuaca (offline). Cek koneksi lalu tekan Refresh.</p>`;
    }
  }

  weatherCodeToLabel(code) {
    const map = { 0: "☀️ Cerah", 1: "🌤️ Cerah Berawan", 2: "⛅ Berawan", 3: "☁️ Mendung", 45: "🌫️ Berkabut", 51: "🌦️ Gerimis", 61: "🌧️ Hujan Ringan", 71: "🌨️ Salju Ringan", 80: "🌧️ Hujan", 95: "⛈️ Badai Petir" };
    return map[code] ?? `Cuaca kode ${code}`;
  }

  // ================= TUGAS: tambah / edit / hapus =================
  handleTaskSubmit(e) {
    e.preventDefault();
    const title = $("taskTitle").value.trim();
    const course = $("taskCourse").value.trim();
    const deadline = $("taskDeadline").value;
    const priority = $("taskPriority").value;
    const description = $("taskDesc").value.trim();
    if (!title || !course || !deadline) return showToast("Lengkapi judul, matkul & deadline");

    if (this.editingTaskId) {
      this.tasks = this.tasks.map((t) => // spread untuk update immutable
        t.id === this.editingTaskId ? { ...t, title, course, deadline, priority, description } : t);
      showToast("Tugas diperbarui ✏️");
    } else {
      const item = new TaskItem({ title, course, deadline, priority, description });
      this.tasks = [...this.tasks, item];
      showToast("Tugas ditambahkan ✅");
    }
    this.save(); this.resetTaskForm(); this.renderTasks(); this.renderStats();
  }

  resetTaskForm() {
    this.el.taskForm.reset();
    this.editingTaskId = null;
    $("taskSubmit").textContent = "+ Tambah Tugas";
    $("taskCancel").classList.add("hidden");
  }

  getFilteredTasks() {
    const q = $("searchTask").value.toLowerCase();
    const f = $("filterTask").value;
    const s = $("sortTask").value;
    let list = this.tasks.map((t) => new TaskItem(t));
    if (q) list = list.filter(({ title, course }) => // destructuring di parameter
      `${title} ${course}`.toLowerCase().includes(q));
    if (f === "active") list = list.filter((t) => !t.done);
    if (f === "done") list = list.filter((t) => t.done);
    if (f === "overdue") list = list.filter((t) => t.isOverdue);
    const by = {
      deadline: (a, b) => a.deadline.localeCompare(b.deadline),
      priority: (a, b) => PRIORITY_WEIGHT[b.priority] - PRIORITY_WEIGHT[a.priority],
      newest: (a, b) => b.createdAt - a.createdAt,
    };
    return [...list].sort(by[s]);
  }

  renderTasks() {
    const list = this.getFilteredTasks();
    if (!list.length) {
      this.el.taskList.innerHTML = `<div class="empty">Belum ada tugas. Tambahkan lewat form di atas ⬆️</div>`;
      return;
    }
    this.el.taskList.innerHTML = list.map((t) => `
      <div class="item ${t.done ? "done" : ""}">
        <input type="checkbox" data-action="toggle-task" data-id="${t.id}" ${t.done ? "checked" : ""} title="Tandai selesai" />
        <div class="item-main">
          <p class="title">${esc(t.title)}</p>
          <div class="meta">
            <span class="pill">${esc(t.course)}</span>
            <span class="pill ${t.priority}">${t.priority}</span>
            <span class="pill">📅 ${fmtDate(t.deadline)}</span>
            <span class="pill ${t.isOverdue ? "overdue" : ""}">${t.badge}</span>
          </div>
          ${t.description ? `<p class="desc">${esc(t.description)}</p>` : ""}
        </div>
        <div class="item-actions">
          <button class="icon-btn" data-action="edit-task" data-id="${t.id}" title="Edit">✏️</button>
          <button class="icon-btn" data-action="delete-task" data-id="${t.id}" title="Hapus">🗑️</button>
        </div>
      </div>`).join(""); // template literal dinamis #2 + arrow di map/join
  }

  // ================= JADWAL =================
  handleScheduleSubmit(e) {
    e.preventDefault();
    const day = $("schDay").value;
    const course = $("schCourse").value.trim();
    const start = $("schStart").value;
    const end = $("schEnd").value;
    const room = $("schRoom").value.trim();
    const lecturer = $("schLecturer").value.trim();
    if (!course || !start || !end) return showToast("Lengkapi matkul & jam");

    if (this.editingScheduleId) {
      this.schedules = this.schedules.map((s) =>
        s.id === this.editingScheduleId ? { ...s, day, course, start, end, room, lecturer } : s);
      showToast("Jadwal diperbarui ✏️");
    } else {
      this.schedules = [...this.schedules, new ScheduleItem({ day, course, start, end, room, lecturer })];
      showToast("Jadwal ditambahkan 📅");
    }
    this.save(); this.resetScheduleForm(); this.renderSchedules(); this.renderStats();
  }

  resetScheduleForm() {
    this.el.scheduleForm.reset();
    this.editingScheduleId = null;
    $("schSubmit").textContent = "+ Tambah Jadwal";
    $("schCancel").classList.add("hidden");
  }

  renderSchedules() {
    const todayID = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"][new Date().getDay()];
    this.el.todayBadge.textContent = `Hari ini: ${todayID}`;
    const sorted = [...this.schedules].sort((a, b) =>
      DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day) || a.start.localeCompare(b.start));
    if (!sorted.length) {
      this.el.scheduleList.innerHTML = `<div class="empty">Belum ada jadwal kuliah.</div>`;
      return;
    }
    let html = "";
    let lastDay = "";
    for (const s of sorted) {
      if (s.day !== lastDay) { html += `<p class="day-title">${s.day}</p>`; lastDay = s.day; }
      html += `
      <div class="item">
        <div class="item-main">
          <p class="title">${esc(s.course)} ${s.day === todayID ? '<span class="pill today">HARI INI</span>' : ""}</p>
          <div class="meta">
            <span class="pill">🕗 ${esc(s.start)}–${esc(s.end)}</span>
            ${s.room ? `<span class="pill">📍 ${esc(s.room)}</span>` : ""}
          </div>
          ${s.lecturer ? `<p class="desc">👨‍🏫 ${esc(s.lecturer)}</p>` : ""}
        </div>
        <div class="item-actions">
          <button class="icon-btn" data-action="edit-sch" data-id="${s.id}">✏️</button>
          <button class="icon-btn" data-action="delete-sch" data-id="${s.id}">🗑️</button>
        </div>
      </div>`; // template literal dinamis #3
    }
    this.el.scheduleList.innerHTML = html;
  }

  // ================= CATATAN =================
  handleNoteSubmit(e) {
    e.preventDefault();
    const title = $("noteTitle").value.trim();
    const body = $("noteBody").value.trim();
    if (!title || !body) return showToast("Lengkapi judul & isi catatan");

    if (this.editingNoteId) {
      this.notes = this.notes.map((n) => (n.id === this.editingNoteId ? { ...n, title, body } : n));
      showToast("Catatan diperbarui ✏️");
    } else {
      this.notes = [new NoteItem({ title, body }), ...this.notes];
      showToast("Catatan disimpan 📝");
    }
    this.save(); this.resetNoteForm(); this.renderNotes();
  }

  resetNoteForm() {
    this.el.noteForm.reset();
    this.editingNoteId = null;
    $("noteSubmit").textContent = "+ Simpan Catatan";
    $("noteCancel").classList.add("hidden");
  }

  renderNotes() {
    if (!this.notes.length) {
      this.el.noteList.innerHTML = `<div class="empty">Belum ada catatan.</div>`;
      return;
    }
    const sorted = [...this.notes].sort((a, b) => (b.pinned - a.pinned) || (b.createdAt - a.createdAt));
    this.el.noteList.innerHTML = sorted.map(({ id, title, body, pinned, createdAt }) => `
      <div class="item ${pinned ? "note-pinned" : ""}">
        <div class="item-main">
          <p class="title">${pinned ? "📌 " : ""}${esc(title)}</p>
          <p class="desc">${esc(body)}</p>
          <p class="desc">${new Date(createdAt).toLocaleString("id-ID")}</p>
        </div>
        <div class="item-actions">
          <button class="icon-btn" data-action="pin-note" data-id="${id}" title="Pin">📌</button>
          <button class="icon-btn" data-action="edit-note" data-id="${id}">✏️</button>
          <button class="icon-btn" data-action="delete-note" data-id="${id}">🗑️</button>
        </div>
      </div>`).join(""); // destructuring + template literal dinamis #4
  }

  // ================= Aksi global (delegation) =================
  handleActionClick(e) {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    const { action, id } = btn.dataset; // destructuring
    if (action === "toggle-task") {
      this.tasks = this.tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
      this.save(); this.renderTasks(); this.renderStats();
    }
    if (action === "edit-task") {
      const t = this.tasks.find((x) => x.id === id);
      if (!t) return;
      $("taskTitle").value = t.title; $("taskCourse").value = t.course;
      $("taskDeadline").value = t.deadline; $("taskPriority").value = t.priority;
      $("taskDesc").value = t.description || "";
      this.editingTaskId = id;
      $("taskSubmit").textContent = "💾 Simpan Perubahan";
      $("taskCancel").classList.remove("hidden");
      $("taskTitle").focus();
    }
    if (action === "delete-task") {
      if (!confirm("Hapus tugas ini?")) return;
      this.tasks = this.tasks.filter((t) => t.id !== id);
      this.save(); this.renderTasks(); this.renderStats();
      showToast("Tugas dihapus 🗑️");
    }
    if (action === "edit-sch") {
      const s = this.schedules.find((x) => x.id === id);
      if (!s) return;
      $("schDay").value = s.day; $("schCourse").value = s.course;
      $("schStart").value = s.start; $("schEnd").value = s.end;
      $("schRoom").value = s.room || ""; $("schLecturer").value = s.lecturer || "";
      this.editingScheduleId = id;
      $("schSubmit").textContent = "💾 Simpan Perubahan";
      $("schCancel").classList.remove("hidden");
    }
    if (action === "delete-sch") {
      if (!confirm("Hapus jadwal ini?")) return;
      this.schedules = this.schedules.filter((s) => s.id !== id);
      this.save(); this.renderSchedules(); this.renderStats();
    }
    if (action === "edit-note") {
      const n = this.notes.find((x) => x.id === id);
      if (!n) return;
      $("noteTitle").value = n.title; $("noteBody").value = n.body;
      this.editingNoteId = id;
      $("noteSubmit").textContent = "💾 Simpan Perubahan";
      $("noteCancel").classList.remove("hidden");
    }
    if (action === "delete-note") {
      if (!confirm("Hapus catatan ini?")) return;
      this.notes = this.notes.filter((n) => n.id !== id);
      this.save(); this.renderNotes();
    }
    if (action === "pin-note") {
      this.notes = this.notes.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n));
      this.save(); this.renderNotes();
    }
  }

  // ================= Header: jam, statistik, tema =================
  tickClock() {
    const now = new Date();
    const hour = now.getHours();
    this.el.clock.textContent = now.toLocaleTimeString("id-ID");
    this.el.dateLine.textContent = now.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    this.el.greeting.textContent = hour < 11 ? "Selamat pagi! ☀️" : hour < 15 ? "Selamat siang! 🌤️" : hour < 19 ? "Selamat sore! 🌇" : "Selamat malam! 🌙";
  }

  renderStats() {
    const total = this.tasks.length;
    const done = this.tasks.filter((t) => t.done).length;
    const urgent = this.tasks.filter((t) => { const d = daysUntil(t.deadline); return !t.done && d >= 0 && d <= 3; }).length;
    const todayID = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"][new Date().getDay()];
    const today = this.schedules.filter((s) => s.day === todayID).length;
    this.el.statTotal.textContent = total;
    this.el.statDone.textContent = done;
    this.el.statUrgent.textContent = urgent;
    this.el.statToday.textContent = today;
    const pct = total ? Math.round((done / total) * 100) : 0;
    this.el.progressBar.style.width = `${pct}%`;
    this.el.progressLabel.textContent = `${pct}% selesai`;
  }

  renderAll() { this.renderTasks(); this.renderSchedules(); this.renderNotes(); this.renderStats(); }

  toggleTheme() {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    this.applyTheme(next);
  }
  applyTheme(mode) {
    document.documentElement.dataset.theme = mode;
    localStorage.setItem(STORAGE_KEYS.theme, mode);
    $("themeBtn").textContent = mode === "dark" ? "☀️" : "🌙";
  }

  resetAll() {
    if (!confirm("Reset SEMUA data dashboard?")) return;
    localStorage.removeItem(STORAGE_KEYS.tasks);
    localStorage.removeItem(STORAGE_KEYS.schedules);
    localStorage.removeItem(STORAGE_KEYS.notes);
    this.tasks = []; this.schedules = this.defaultSchedules(); this.notes = [];
    this.save(); this.renderAll();
    showToast("Semua data direset");
  }
}

// Inisialisasi aplikasi
document.addEventListener("DOMContentLoaded", () => {
  window.app = new DashboardApp(); // const/let: instance global untuk debug
});
