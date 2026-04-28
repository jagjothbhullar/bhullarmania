// =============== ROSTER ===============
// nickname + card are dummy placeholders — swap to real values when ready.
const ROSTER = [
  { name: "Anmol Thiara", size: "L",   nickname: "El Tigre Negro",   card: { rank: "K",  suit: "♠" } },
  { name: "Anmol D",      size: "L",   nickname: "El Diablo Dorado", card: { rank: "Q",  suit: "♥" } },
  { name: "Navkaran",     size: "XL",  nickname: "La Tormenta",      card: { rank: "A",  suit: "♣" } },
  { name: "Supreet",      size: "L",   nickname: "El Rey del Ring",  card: { rank: "J",  suit: "♦" } },
  { name: "Jimmy",        size: "XL",  nickname: "El Misterio",      card: { rank: "10", suit: "♠" } },
  { name: "Ricky",        size: "XL",  nickname: "El Relámpago",     card: { rank: "9",  suit: "♥" } },
  { name: "Bicky",        size: "M",   nickname: "El Niño Bonito",   card: { rank: "8",  suit: "♣" } },
  { name: "Ajay",         size: "2XL", nickname: "El Coloso",        card: { rank: "7",  suit: "♦" } },
  { name: "Sundeep",      size: "3XL", nickname: "El Toro Salvaje",  card: { rank: "K",  suit: "♥" } },
  { name: "Sunny D",      size: "L",   nickname: "El Sol Dorado",    card: { rank: "Q",  suit: "♣" } },
  { name: "Noor",         size: "XL",  nickname: "La Luz",           card: { rank: "A",  suit: "♦" } },
  { name: "Anand",        size: "2XL", nickname: "El Gigante",       card: { rank: "J",  suit: "♠" } },
  { name: "Varinder",     size: "L",   nickname: "El Cazador",       card: { rank: "10", suit: "♥" } },
  { name: "Gurjot",       size: "L",   nickname: "El Espíritu",      card: { rank: "9",  suit: "♣" } },
  { name: "Joth",         size: "XL",  nickname: "El Jefe",          card: { rank: "A",  suit: "♠" } },
  { name: "Pritpal",      size: "XL",  nickname: "El Patrón",        card: { rank: "K",  suit: "♦" } },
  { name: "Armaan",       size: "L",   nickname: "El Soñador",       card: { rank: "Q",  suit: "♠" } },
];

function isRedSuit(suit) { return suit === "♥" || suit === "♦"; }

function playingCardSVG({ rank, suit }) {
  const red = isRedSuit(suit);
  const color = red ? "#c8102e" : "#0a0a0a";
  return `
  <svg class="play-card" viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg" aria-label="${rank} of ${suit}">
    <rect x="4" y="4" width="192" height="272" rx="14" ry="14"
          fill="#fffdf7" stroke="#0a0a0a" stroke-width="3" />
    <rect x="10" y="10" width="180" height="260" rx="10" ry="10"
          fill="none" stroke="${color}" stroke-width="1" opacity="0.35" />
    <g fill="${color}" font-family="Georgia, 'Times New Roman', serif" font-weight="700">
      <text x="22" y="40" font-size="32" text-anchor="middle">${rank}</text>
      <text x="22" y="68" font-size="26" text-anchor="middle">${suit}</text>
      <text x="178" y="252" font-size="32" text-anchor="middle" transform="rotate(180 178 244)">${rank}</text>
      <text x="178" y="224" font-size="26" text-anchor="middle" transform="rotate(180 178 216)">${suit}</text>
      <text x="100" y="170" font-size="120" text-anchor="middle">${suit}</text>
    </g>
  </svg>`;
}

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
  rmodalContent.innerHTML = `
    <div class="rmodal-tag">№ ${num} · ${w.size}</div>
    <h3 class="rmodal-name">${w.name}</h3>
    <div class="rmodal-nick">"${w.nickname}"</div>
    <div class="rmodal-card-wrap">
      ${playingCardSVG(w.card)}
    </div>
    <p class="rmodal-foot">Photo & playing card to be replaced with the real drop.</p>
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
