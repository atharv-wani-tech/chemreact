// ── DOM refs ──
const input        = document.getElementById("reactant-input");
const reactBtn     = document.getElementById("react-btn");
const clearBtn     = document.getElementById("clear-btn");
const resultSec    = document.getElementById("result-section");
const aiLoadingSec = document.getElementById("ai-loading");
const noMatchSec   = document.getElementById("no-match");
const eqBox        = document.getElementById("equation-box");
const typeTag      = document.getElementById("reaction-type-tag");
const sourceBadge  = document.getElementById("source-badge");
const detailsGrid  = document.getElementById("details-grid");
const productCards = document.getElementById("product-cards");
const safetyBox    = document.getElementById("safety-box");
const safetyText   = document.getElementById("safety-text");
const exGrid       = document.getElementById("examples-grid");


(function spawnParticles() {
  const container = document.getElementById("particles");
  const symbols = ["H", "O", "C", "N", "Na", "Cl", "Fe", "⚗", "🧪", "⚛", "↔", "→", "+", "Mg", "Ca", "K", "Zn", "Cu"];
  for (let i = 0; i < 28; i++) {
    const el = document.createElement("div");
    el.className = "particle";
    const size = Math.random() * 30 + 14;
    el.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%; bottom:-60px;
      font-size:${size * 0.7}px;
      animation-duration:${Math.random() * 22 + 14}s;
      animation-delay:${Math.random() * 18}s;
      display:flex; align-items:center; justify-content:center;
      color: #94A3B8;
      font-family:'Fira Code',monospace; font-weight:700;
      border-radius:50%;
    `;
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    container.appendChild(el);
  }
})();

// ── Populate Example Cards ──
const EXAMPLES = [
  { input: "H2 + O2",       label: "Water formation" },
  { input: "NaOH + HCl",   label: "Acid-Base neutralization" },
  { input: "CH4 + O2",     label: "Methane combustion" },
  { input: "N2 + H2",      label: "Haber Process (Ammonia)" },
  { input: "H2O2",         label: "Hydrogen Peroxide decomposition" },
  { input: "Fe + CuSO4",   label: "Iron displaces copper" },
  { input: "Na + H2O",     label: "Sodium in water" },
  { input: "AgNO3 + NaCl", label: "Silver chloride precipitation" },
  { input: "CaCO3",        label: "Limestone decomposition" },
  { input: "Pb(NO3)2 + KI",label: "Golden rain reaction" },
];

EXAMPLES.forEach(ex => {
  const rxn  = lookupReaction(ex.input);
  if (!rxn) return;
  const card = document.createElement("div");
  card.className = "example-card";
  card.innerHTML = `
    <div class="example-formula">${ex.input}</div>
    <div class="example-name">${ex.label}</div>
    <span class="example-type">${rxn.type}</span>
  `;
  card.addEventListener("click", () => {
    input.value = ex.input;
    runReaction();
    document.getElementById("app").scrollIntoView({ behavior: "smooth", block: "center" });
  });
  exGrid.appendChild(card);
});

// ── State Badge ──
function stateBadge(state) {
  const labels = { g: "Gas (g)", l: "Liquid (l)", s: "Solid (s)", aq: "Aqueous (aq)" };
  return `<span class="product-state state-${state}">${labels[state] || state}</span>`;
}

// ── Format Equation with coloring ──
function formatEquation(eq) {
  const [left, right] = eq.split("→");
  if (!right) return `<span class="eq-reactant">${eq}</span>`;
  function colorizeSide(side, cls) {
    return side.trim().split("+")
      .map(s => `<span class="${cls}">${s.trim()}</span>`)
      .join('<span style="color:var(--muted);margin:0 8px">+</span>');
  }
  return `${colorizeSide(left, "eq-reactant")}<span class="eq-arrow">→</span>${colorizeSide(right, "eq-product")}`;
}

// ── Render Result (works for both DB and AI results) ──
function renderResult(rxn, source = "db") {
  typeTag.textContent = rxn.type;

  // Source badge
  sourceBadge.textContent = source === "ai" ? "🤖 AI Generated" : "✅ Database";
  sourceBadge.className   = "source-badge " + (source === "ai" ? "ai-badge" : "db-badge");

  eqBox.innerHTML = formatEquation(rxn.balanced);

  detailsGrid.innerHTML = `
    <div class="detail-item">
      <div class="detail-label">Conditions</div>
      <div class="detail-value">${rxn.conditions}</div>
    </div>
    <div class="detail-item">
      <div class="detail-label">Energy</div>
      <div class="detail-value" style="color:${rxn.energyType === 'Exothermic' ? 'var(--success)' : rxn.energyType === 'Endothermic' ? 'var(--danger)' : 'var(--muted)'}">
        ${rxn.energyType === "Exothermic" ? "🔥 " : rxn.energyType === "Endothermic" ? "❄️ " : "⚖️ "}${rxn.energyType}
      </div>
    </div>
    <div class="detail-item">
      <div class="detail-label">Products Count</div>
      <div class="detail-value">${rxn.products.length} compound${rxn.products.length > 1 ? "s" : ""}</div>
    </div>
    <div class="detail-item">
      <div class="detail-label">Reaction Class</div>
      <div class="detail-value">${rxn.type.split(" ")[0]}</div>
    </div>
  `;

  productCards.innerHTML = rxn.products.map((p, i) => `
    <div class="product-card" style="animation-delay:${i * 0.08}s">
      <div class="product-formula">${p.formula}</div>
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.desc}</div>
      </div>
      ${stateBadge(p.state)}
    </div>
  `).join("");

  // Safety note
  if (source === "ai" && rxn.safety) {
    safetyText.textContent = rxn.safety;
    safetyBox.style.display = "flex";
  } else {
    safetyBox.style.display = "none";
  }

  hideAll();
  resultSec.style.display = "block";
}

// ── Hide all response sections ──
function hideAll() {
  resultSec.style.display    = "none";
  aiLoadingSec.style.display = "none";
  noMatchSec.style.display   = "none";
}

// ── Show Error / No Match ──
function showError(icon, title, hint, extraHTML = "") {
  hideAll();
  document.getElementById("no-match-icon").textContent  = icon;
  document.getElementById("no-match-title").textContent = title;
  document.getElementById("no-match-hint").textContent  = hint;
  document.getElementById("no-match-extra").innerHTML   = extraHTML;
  noMatchSec.style.display = "block";
}

// ── Main Reaction Handler ──
async function runReaction() {
  const val = input.value.trim();
  if (!val) return;

  setBtnLoading(true);

  // 1. Try local DB first (instant, no network call)
  const localRxn = lookupReaction(val);
  if (localRxn) {
    setBtnLoading(false);
    renderResult(localRxn, "db");
    return;
  }

  // 2. Unknown reaction → ask AI via backend proxy (Groq or Gemini)
  hideAll();
  aiLoadingSec.style.display = "block";

  try {
    const aiResult = await askAI(val);
    setBtnLoading(false);
    aiLoadingSec.style.display = "none";

    if (!aiResult.valid) {
      showError(
        "🧪",
        "These compounds don't react",
        aiResult.reason || "No known reaction between these substances under standard conditions."
      );
      return;
    }

    renderResult(aiResult, "ai");

  } catch (err) {
    setBtnLoading(false);
    aiLoadingSec.style.display = "none";

    if (err.message === "BAD_KEY") {
      showError("❌", "Invalid API key on server", "Check your .env file and restart the server.");
    } else if (err.message === "PARSE_ERROR") {
      showError("⚠️", "Unexpected AI response", "AI returned an unexpected format. Please try again.");
    } else {
      showError("📡", "Connection error", err.message);
    }
  }
}


function setBtnLoading(on) {
  if (on) {
    reactBtn.classList.add("loading");
    reactBtn.querySelector(".btn-icon").textContent = "⟳";
  } else {
    reactBtn.classList.remove("loading");
    reactBtn.querySelector(".btn-icon").textContent = "🔬";
  }
}

// ── Events ──
reactBtn.addEventListener("click", runReaction);
input.addEventListener("keydown", e => { if (e.key === "Enter") runReaction(); });
clearBtn.addEventListener("click", () => {
  input.value = "";
  hideAll();
  input.focus();
});

// ── Build Full Database Table ──
(function buildDatabaseTable() {
  const tbody       = document.getElementById("db-tbody");
  const dbSearch    = document.getElementById("db-search");
  const typeFilters = document.getElementById("db-type-filters");
  const dbEmpty     = document.getElementById("db-empty");
  const rxnCount    = document.getElementById("rxn-count");

  rxnCount.textContent = REACTIONS.length;

  const types = ["All", ...new Set(REACTIONS.map(r => r.type.split(" ")[0]))];
  let activeType = "All";

  types.forEach(t => {
    const pill = document.createElement("button");
    pill.className = "type-pill" + (t === "All" ? " active" : "");
    pill.textContent = t;
    pill.addEventListener("click", () => {
      activeType = t;
      document.querySelectorAll(".type-pill").forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      filterTable();
    });
    typeFilters.appendChild(pill);
  });

  function renderRows(list) {
    tbody.innerHTML = "";
    if (list.length === 0) { dbEmpty.style.display = "block"; return; }
    dbEmpty.style.display = "none";

    list.forEach(rxn => {
      const tr = document.createElement("tr");
      const energyClass = rxn.energyType === "Exothermic" ? "energy-exo"
                        : rxn.energyType === "Endothermic" ? "energy-endo" : "energy-neutral";
      const energyIcon  = rxn.energyType === "Exothermic" ? "🔥"
                        : rxn.energyType === "Endothermic" ? "❄️" : "⚖️";

      tr.innerHTML = `
        <td class="td-reactants">${rxn.reactants.join(" + ")}</td>
        <td class="td-equation">${rxn.balanced}</td>
        <td class="td-type"><span class="td-type-badge">${rxn.type}</span></td>
        <td class="td-products">${rxn.products.map(p => p.formula).join(", ")}</td>
        <td class="td-energy ${energyClass}">${energyIcon} ${rxn.energyType}</td>
      `;
      tr.title = "Click to try this reaction";
      tr.addEventListener("click", () => {
        input.value = rxn.reactants.join(" + ");
        runReaction();
        document.getElementById("app").scrollIntoView({ behavior: "smooth", block: "center" });
      });
      tbody.appendChild(tr);
    });
  }

  function filterTable() {
    const q = dbSearch.value.trim().toLowerCase();
    let list = REACTIONS;
    if (activeType !== "All") list = list.filter(r => r.type.split(" ")[0] === activeType);
    if (q) list = list.filter(r =>
      r.reactants.join(" ").toLowerCase().includes(q) ||
      r.balanced.toLowerCase().includes(q) ||
      r.type.toLowerCase().includes(q) ||
      r.products.some(p => p.name.toLowerCase().includes(q) || p.formula.toLowerCase().includes(q))
    );
    renderRows(list);
  }

  dbSearch.addEventListener("input", filterTable);
  renderRows(REACTIONS);

  // ── Accordion Toggle Functionality ──
  const toggleBtn = document.getElementById("db-toggle-btn");
  const collapseContent = document.getElementById("db-collapse-content");

  if (toggleBtn && collapseContent) {
    toggleBtn.addEventListener("click", () => {
      const isClosed = collapseContent.style.display === "none";
      if (isClosed) {
        collapseContent.style.display = "block";
        toggleBtn.classList.add("open");
        toggleBtn.setAttribute("aria-expanded", "true");
        // Focus search input slightly after opening
        setTimeout(() => dbSearch && dbSearch.focus(), 150);
      } else {
        collapseContent.style.display = "none";
        toggleBtn.classList.remove("open");
        toggleBtn.setAttribute("aria-expanded", "false");
      }
    });
  }
})();

// Focus input on load
window.addEventListener("DOMContentLoaded", () => input.focus());
