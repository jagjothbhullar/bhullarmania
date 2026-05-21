// =============== ROSTER ===============
const ROSTER = [
  { name: "Anmol Thiara", size: "L",   nickname: "El Tigre Negro",   tagline: "The Groomsman",            card: "anmol-thiara.jpg" },
  { name: "Anmol D",      size: "L",   nickname: "El Diablo Dorado", tagline: "Designated Driver",        card: "anmol-d.jpg" },
  { name: "Navkaran",     size: "XL",  nickname: "La Tormenta",      tagline: "The Groomsman",            card: "navkaran.jpg" },
  { name: "Supreet",      size: "L",   nickname: "El Rey del Ring",  tagline: "The Beast Friend",         card: "supreet.jpg" },
  { name: "Jimmy",        size: "XL",  nickname: "El Misterio",      tagline: "The Groomsman",            card: "jimmy.jpg" },
  { name: "Ricky",        size: "XL",  nickname: "El Relámpago",     tagline: "The Groomsman",            card: "ricky.jpg" },
  { name: "Bicky",        size: "M",   nickname: "El Niño Bonito",   tagline: "The Groomsman",            card: "bicky.jpg" },
  { name: "Ajay",         size: "2XL", nickname: "El Coloso",        tagline: "The Groomsman",            card: "ajay.jpg" },
  { name: "Sundeep",      size: "3XL", nickname: "El Toro Salvaje",  tagline: "The Raiders' Fan",         card: "sundeep.jpg" },
  { name: "Sunny D",      size: "L",   nickname: "El Sol Dorado",    tagline: "",                         card: "sunny-d.jpg" },
  { name: "Noor",         size: "XL",  nickname: "La Luz",           tagline: "The Ultimate Vibe Master", card: "noor.jpg" },
  { name: "Anand",        size: "2XL", nickname: "El Gigante",       tagline: "The Groomsman",            card: "anand.jpg" },
  { name: "Varinder",     size: "L",   nickname: "El Cazador",       tagline: "The Groomsman",            card: "varinder.jpg" },
  { name: "Gurjot",       size: "L",   nickname: "El Espíritu",      tagline: "The Groomsman",            card: "gurjot.jpg" },
  { name: "Joth",         size: "XL",  nickname: "El Jefe",          tagline: "Groomsman",                card: "joth.png" },
  { name: "Pritpal",      size: "XL",  nickname: "El Novio",         tagline: "The Groom",                card: "pritpal.png" },
  { name: "Armaan",       size: "L",   nickname: "El Soñador",       tagline: "The Groomsman",            card: "armaan.jpg" },
];

const grid = document.getElementById("roster-grid");
if (grid) {
  ROSTER.forEach((w, i) => {
    const num = String(i + 1).padStart(2, "0");
    const el = document.createElement("button");
    el.className = "wrestler";
    el.type = "button";
    el.dataset.idx = i;
    el.innerHTML = `
      <div class="wrestler-num">№ ${num}</div>
      <div class="wrestler-photo"><img src="photos/cards/${w.card}" alt="${w.name} — ${w.nickname}" loading="lazy" /></div>
      <h3 class="wrestler-name">${w.name}</h3>
      <span class="wrestler-class">${w.size}</span>
      <span class="wrestler-status">✓ Booked · Tap →</span>
    `;
    grid.appendChild(el);
  });
}

// =============== ROSTER MODAL ===============
const rmodal = document.getElementById("rmodal");
const rmodalContent = rmodal?.querySelector(".rmodal-content");

function openRosterModal(idx) {
  const w = ROSTER[idx];
  if (!w || !rmodalContent) return;
  const num = String(idx + 1).padStart(2, "0");
  const altText = `${w.name} — "${w.nickname}"${w.tagline ? ` · ${w.tagline}` : ''}`;
  rmodalContent.innerHTML = `
    <div class="rmodal-tag">№ ${num} · Size ${w.size}</div>
    <a class="rmodal-card-wrap" href="photos/cards/${w.card}" target="_blank" rel="noopener" aria-label="Open ${w.name}'s card full size">
      <img class="rmodal-trading-card" src="photos/cards/${w.card}" alt="${altText}" />
    </a>
    <p class="rmodal-foot">Tap card for full size ↗</p>
  `;
  rmodal.classList.add("open");
  rmodal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeRosterModal() {
  if (!rmodal) return;
  rmodal.classList.remove("open");
  rmodal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

if (grid) {
  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".wrestler");
    if (!card) return;
    openRosterModal(Number(card.dataset.idx));
  });
}
if (rmodal) {
  rmodal.addEventListener("click", (e) => {
    if (e.target.matches("[data-close]")) closeRosterModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeRosterModal();
  });
}

// =============== COUNTDOWN ===============
// SFO → CDMX, Delta 8039, Thursday May 21 2026 at 23:55 PT.
// 23:55 PT during PDT (UTC-7) = 06:55 UTC on May 22.
const TAKEOFF = new Date("2026-05-22T06:55:00Z");

function tick() {
  const now = new Date();
  let diff = Math.max(0, TAKEOFF - now);

  const sec = 1000, min = 60 * sec, hr = 60 * min, day = 24 * hr;
  const days  = Math.floor(diff / day);  diff -= days  * day;
  const hours = Math.floor(diff / hr);   diff -= hours * hr;
  const mins  = Math.floor(diff / min);  diff -= mins  * min;
  const secs  = Math.floor(diff / sec);

  set("days", days);
  set("hours", hours);
  set("mins", mins);
  set("secs", secs);
}
function set(key, val) {
  const el = document.querySelector(`[data-cd="${key}"]`);
  if (el) el.textContent = String(val).padStart(2, "0");
}
tick();
setInterval(tick, 1000);

// =============== TOP NAV ===============
const navLinks = document.querySelectorAll(".topnav-links a");
const linkById = new Map();
navLinks.forEach(a => {
  const id = a.getAttribute("href").slice(1);
  if (id) linkById.set(id, a);
});

const sectionsToWatch = [...linkById.keys()]
  .map(id => document.getElementById(id))
  .filter(Boolean);

if ("IntersectionObserver" in window && sectionsToWatch.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => a.classList.remove("active"));
        const link = linkById.get(entry.target.id);
        if (link) link.classList.add("active");
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px", threshold: 0 });
  sectionsToWatch.forEach(s => io.observe(s));
}

// mobile menu
const navToggle = document.querySelector(".topnav-toggle");
const navList = document.querySelector(".topnav-links");
if (navToggle && navList) {
  navToggle.addEventListener("click", () => {
    const open = navList.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
  navList.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navList.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

// =============== TABS ===============
// Each `.tabs` block controls the immediately-following `.tab-panels`.
document.querySelectorAll(".tabs").forEach((tabsEl) => {
  const panelsEl = tabsEl.nextElementSibling;
  if (!panelsEl) return;
  tabsEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".tab");
    if (!btn) return;
    const key = btn.dataset.tab;
    tabsEl.querySelectorAll(".tab").forEach(t => t.classList.toggle("active", t === btn));
    panelsEl.querySelectorAll(".tab-panel").forEach(p => {
      p.classList.toggle("active", p.dataset.panel === key);
    });
  });
});
