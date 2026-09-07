// ============================================================
//  ChemReact — Reactions Database
//  Format: reactants (sorted, comma-joined lowercase) → reaction
// ============================================================

const REACTIONS = [

  // ── Synthesis / Combination ──
  {
    id: "h2_o2",
    reactants: ["H2", "O2"],
    balanced: "2H₂ + O₂ → 2H₂O",
    type: "Synthesis",
    conditions: "Spark / Heat",
    energyType: "Exothermic",
    products: [
      { formula: "H₂O", name: "Water", state: "l", desc: "Essential liquid for all life; released as liquid water." }
    ]
  },
  {
    id: "n2_h2",
    reactants: ["N2", "H2"],
    balanced: "N₂ + 3H₂ → 2NH₃",
    type: "Synthesis",
    conditions: "450 °C, 200 atm (Haber Process)",
    energyType: "Exothermic",
    products: [
      { formula: "NH₃", name: "Ammonia", state: "g", desc: "Colorless gas with pungent odor; basis of fertilizers." }
    ]
  },
  {
    id: "na_cl2",
    reactants: ["Na", "Cl2"],
    balanced: "2Na + Cl₂ → 2NaCl",
    type: "Synthesis",
    conditions: "Room temperature",
    energyType: "Exothermic",
    products: [
      { formula: "NaCl", name: "Sodium Chloride (Table Salt)", state: "s", desc: "White ionic crystal; common table salt used in food and industry." }
    ]
  },
  {
    id: "mg_o2",
    reactants: ["Mg", "O2"],
    balanced: "2Mg + O₂ → 2MgO",
    type: "Synthesis",
    conditions: "Ignition",
    energyType: "Exothermic",
    products: [
      { formula: "MgO", name: "Magnesium Oxide", state: "s", desc: "White powder; formed with a brilliant white flame." }
    ]
  },
  {
    id: "c_o2",
    reactants: ["C", "O2"],
    balanced: "C + O₂ → CO₂",
    type: "Combustion",
    conditions: "Ignition / Heat",
    energyType: "Exothermic",
    products: [
      { formula: "CO₂", name: "Carbon Dioxide", state: "g", desc: "Greenhouse gas; byproduct of burning carbon-based fuels." }
    ]
  },
  {
    id: "s_o2",
    reactants: ["S", "O2"],
    balanced: "S + O₂ → SO₂",
    type: "Synthesis",
    conditions: "Ignition",
    energyType: "Exothermic",
    products: [
      { formula: "SO₂", name: "Sulfur Dioxide", state: "g", desc: "Pungent gas; major air pollutant from burning fossil fuels." }
    ]
  },

  // ── Acid-Base (Neutralization) ──
  {
    id: "naoh_hcl",
    reactants: ["NaOH", "HCl"],
    balanced: "NaOH + HCl → NaCl + H₂O",
    type: "Neutralization",
    conditions: "Aqueous solution",
    energyType: "Exothermic",
    products: [
      { formula: "NaCl", name: "Sodium Chloride", state: "aq", desc: "Salt formed by acid-base neutralization." },
      { formula: "H₂O", name: "Water", state: "l", desc: "Always produced in acid-base neutralization." }
    ]
  },
  {
    id: "naoh_h2so4",
    reactants: ["NaOH", "H2SO4"],
    balanced: "2NaOH + H₂SO₄ → Na₂SO₄ + 2H₂O",
    type: "Neutralization",
    conditions: "Aqueous solution",
    energyType: "Exothermic",
    products: [
      { formula: "Na₂SO₄", name: "Sodium Sulfate", state: "aq", desc: "White salt; used in detergents and paper manufacturing." },
      { formula: "H₂O", name: "Water", state: "l", desc: "Always produced in acid-base neutralization." }
    ]
  },
  {
    id: "koh_hno3",
    reactants: ["KOH", "HNO3"],
    balanced: "KOH + HNO₃ → KNO₃ + H₂O",
    type: "Neutralization",
    conditions: "Aqueous solution",
    energyType: "Exothermic",
    products: [
      { formula: "KNO₃", name: "Potassium Nitrate (Saltpeter)", state: "aq", desc: "Used in fertilizers and fireworks." },
      { formula: "H₂O", name: "Water", state: "l", desc: "Byproduct of neutralization." }
    ]
  },
  {
    id: "ca_oh_2_hcl",
    reactants: ["Ca(OH)2", "HCl"],
    balanced: "Ca(OH)₂ + 2HCl → CaCl₂ + 2H₂O",
    type: "Neutralization",
    conditions: "Aqueous solution",
    energyType: "Exothermic",
    products: [
      { formula: "CaCl₂", name: "Calcium Chloride", state: "aq", desc: "Used as a de-icing agent and desiccant." },
      { formula: "H₂O", name: "Water", state: "l", desc: "Byproduct of neutralization." }
    ]
  },

  // ── Decomposition ──
  {
    id: "h2o2",
    reactants: ["H2O2"],
    balanced: "2H₂O₂ → 2H₂O + O₂",
    type: "Decomposition",
    conditions: "MnO₂ catalyst / UV light",
    energyType: "Exothermic",
    products: [
      { formula: "H₂O", name: "Water", state: "l", desc: "Produced alongside oxygen gas." },
      { formula: "O₂",  name: "Oxygen Gas", state: "g", desc: "Released as bubbles; used in the 'elephant toothpaste' demo." }
    ]
  },
  {
    id: "caco3",
    reactants: ["CaCO3"],
    balanced: "CaCO₃ → CaO + CO₂",
    type: "Decomposition",
    conditions: "High heat (> 840 °C)",
    energyType: "Endothermic",
    products: [
      { formula: "CaO",  name: "Calcium Oxide (Quicklime)", state: "s", desc: "Used in cement and steelmaking." },
      { formula: "CO₂",  name: "Carbon Dioxide", state: "g", desc: "Greenhouse gas released during limestone heating." }
    ]
  },
  {
    id: "kclo3",
    reactants: ["KClO3"],
    balanced: "2KClO₃ → 2KCl + 3O₂",
    type: "Decomposition",
    conditions: "Heat + MnO₂ catalyst",
    energyType: "Exothermic",
    products: [
      { formula: "KCl", name: "Potassium Chloride", state: "s", desc: "White salt; used as a fertilizer." },
      { formula: "O₂",  name: "Oxygen Gas", state: "g", desc: "Common lab method for generating oxygen." }
    ]
  },
  {
    id: "h2o_electrolysis",
    reactants: ["H2O"],
    balanced: "2H₂O → 2H₂ + O₂",
    type: "Decomposition (Electrolysis)",
    conditions: "Electrolysis",
    energyType: "Endothermic",
    products: [
      { formula: "H₂", name: "Hydrogen Gas", state: "g", desc: "Clean fuel; produced at cathode during electrolysis." },
      { formula: "O₂", name: "Oxygen Gas", state: "g", desc: "Produced at anode during electrolysis." }
    ]
  },

  // ── Single Displacement ──
  {
    id: "zn_h2so4",
    reactants: ["Zn", "H2SO4"],
    balanced: "Zn + H₂SO₄ → ZnSO₄ + H₂",
    type: "Single Displacement",
    conditions: "Dilute acid, room temperature",
    energyType: "Exothermic",
    products: [
      { formula: "ZnSO₄", name: "Zinc Sulfate", state: "aq", desc: "Used in agriculture and pharmaceuticals." },
      { formula: "H₂",    name: "Hydrogen Gas", state: "g", desc: "Flammable gas; visible as bubbles on zinc surface." }
    ]
  },
  {
    id: "fe_cuso4",
    reactants: ["Fe", "CuSO4"],
    balanced: "Fe + CuSO₄ → FeSO₄ + Cu",
    type: "Single Displacement",
    conditions: "Aqueous solution",
    energyType: "Exothermic",
    products: [
      { formula: "FeSO₄", name: "Iron(II) Sulfate", state: "aq", desc: "Green salt in solution." },
      { formula: "Cu",    name: "Copper", state: "s", desc: "Deposited as reddish-brown solid on iron surface." }
    ]
  },
  {
    id: "mg_hcl",
    reactants: ["Mg", "HCl"],
    balanced: "Mg + 2HCl → MgCl₂ + H₂",
    type: "Single Displacement",
    conditions: "Room temperature",
    energyType: "Exothermic",
    products: [
      { formula: "MgCl₂", name: "Magnesium Chloride", state: "aq", desc: "Used in de-icing and pharmaceuticals." },
      { formula: "H₂",    name: "Hydrogen Gas", state: "g", desc: "Vigorous bubbling observed." }
    ]
  },

  // ── Double Displacement / Precipitation ──
  {
    id: "agno3_nacl",
    reactants: ["AgNO3", "NaCl"],
    balanced: "AgNO₃ + NaCl → AgCl↓ + NaNO₃",
    type: "Double Displacement (Precipitation)",
    conditions: "Aqueous solution",
    energyType: "Exothermic",
    products: [
      { formula: "AgCl",  name: "Silver Chloride", state: "s", desc: "White precipitate; used in photography and gravimetry." },
      { formula: "NaNO₃", name: "Sodium Nitrate", state: "aq", desc: "Remains dissolved in solution." }
    ]
  },
  {
    id: "bacl2_na2so4",
    reactants: ["BaCl2", "Na2SO4"],
    balanced: "BaCl₂ + Na₂SO₄ → BaSO₄↓ + 2NaCl",
    type: "Double Displacement (Precipitation)",
    conditions: "Aqueous solution",
    energyType: "Neutral",
    products: [
      { formula: "BaSO₄", name: "Barium Sulfate", state: "s", desc: "Heavy white precipitate; used in X-ray imaging." },
      { formula: "NaCl",  name: "Sodium Chloride", state: "aq", desc: "Remains dissolved in solution." }
    ]
  },
  {
    id: "pb_no3_2_ki",
    reactants: ["Pb(NO3)2", "KI"],
    balanced: "Pb(NO₃)₂ + 2KI → PbI₂↓ + 2KNO₃",
    type: "Double Displacement (Precipitation)",
    conditions: "Aqueous solution",
    energyType: "Neutral",
    products: [
      { formula: "PbI₂",  name: "Lead(II) Iodide", state: "s", desc: "Striking bright yellow precipitate; classic demo reaction." },
      { formula: "KNO₃",  name: "Potassium Nitrate", state: "aq", desc: "Remains dissolved in solution." }
    ]
  },

  // ── Combustion ──
  {
    id: "ch4_o2",
    reactants: ["CH4", "O2"],
    balanced: "CH₄ + 2O₂ → CO₂ + 2H₂O",
    type: "Combustion",
    conditions: "Flame / ignition",
    energyType: "Exothermic",
    products: [
      { formula: "CO₂", name: "Carbon Dioxide", state: "g", desc: "Greenhouse gas; main combustion product of hydrocarbons." },
      { formula: "H₂O", name: "Water", state: "g", desc: "Released as steam during combustion." }
    ]
  },
  {
    id: "c3h8_o2",
    reactants: ["C3H8", "O2"],
    balanced: "C₃H₈ + 5O₂ → 3CO₂ + 4H₂O",
    type: "Combustion",
    conditions: "Flame / ignition",
    energyType: "Exothermic",
    products: [
      { formula: "CO₂", name: "Carbon Dioxide", state: "g", desc: "Combustion byproduct of propane." },
      { formula: "H₂O", name: "Water", state: "g", desc: "Released as steam." }
    ]
  },
  {
    id: "c2h5oh_o2",
    reactants: ["C2H5OH", "O2"],
    balanced: "C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O",
    type: "Combustion",
    conditions: "Flame / ignition",
    energyType: "Exothermic",
    products: [
      { formula: "CO₂", name: "Carbon Dioxide", state: "g", desc: "Combustion product of ethanol." },
      { formula: "H₂O", name: "Water", state: "g", desc: "Released as steam." }
    ]
  },
  {
    id: "c6h12o6_o2",
    reactants: ["C6H12O6", "O2"],
    balanced: "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O",
    type: "Combustion",
    conditions: "Body temperature (cellular respiration) or ignition",
    energyType: "Exothermic",
    products: [
      { formula: "CO₂", name: "Carbon Dioxide", state: "g", desc: "Released during cellular respiration and exhaled by lungs." },
      { formula: "H₂O", name: "Water", state: "l", desc: "Metabolic water produced during cellular respiration." }
    ]
  },
  {
    id: "c12h22o11_o2",
    reactants: ["C12H22O11", "O2"],
    balanced: "C₁₂H₂₂O₁₁ + 12O₂ → 12CO₂ + 11H₂O",
    type: "Combustion",
    conditions: "Flame / ignition",
    energyType: "Exothermic",
    products: [
      { formula: "CO₂", name: "Carbon Dioxide", state: "g", desc: "Combustion product of sucrose (table sugar)." },
      { formula: "H₂O", name: "Water", state: "g", desc: "Released as steam." }
    ]
  },
  {
    id: "c8h18_o2",
    reactants: ["C8H18", "O2"],
    balanced: "2C₈H₁₈ + 25O₂ → 16CO₂ + 18H₂O",
    type: "Combustion",
    conditions: "Ignition (petrol engine)",
    energyType: "Exothermic",
    products: [
      { formula: "CO₂", name: "Carbon Dioxide", state: "g", desc: "Main exhaust gas from burning octane (gasoline)." },
      { formula: "H₂O", name: "Water", state: "g", desc: "Released as steam in engine exhaust." }
    ]
  },

  // ── Other Notable ──
  {
    id: "co2_h2o",
    reactants: ["CO2", "H2O"],
    balanced: "CO₂ + H₂O → H₂CO₃",
    type: "Synthesis",
    conditions: "Aqueous, dissolved CO₂",
    energyType: "Exothermic",
    products: [
      { formula: "H₂CO₃", name: "Carbonic Acid", state: "aq", desc: "Weak acid; responsible for the fizz in carbonated drinks." }
    ]
  },
  {
    id: "so3_h2o",
    reactants: ["SO3", "H2O"],
    balanced: "SO₃ + H₂O → H₂SO₄",
    type: "Synthesis",
    conditions: "Contact process",
    energyType: "Exothermic",
    products: [
      { formula: "H₂SO₄", name: "Sulfuric Acid", state: "l", desc: "Strong acid; one of the most industrially produced chemicals." }
    ]
  },
  {
    id: "fe_s",
    reactants: ["Fe", "S"],
    balanced: "Fe + S → FeS",
    type: "Synthesis",
    conditions: "Heat",
    energyType: "Exothermic",
    products: [
      { formula: "FeS", name: "Iron(II) Sulfide", state: "s", desc: "Black solid formed by heating iron and sulfur." }
    ]
  },
  {
    id: "na_h2o",
    reactants: ["Na", "H2O"],
    balanced: "2Na + 2H₂O → 2NaOH + H₂",
    type: "Single Displacement",
    conditions: "Room temperature",
    energyType: "Exothermic",
    products: [
      { formula: "NaOH", name: "Sodium Hydroxide (Lye)", state: "aq", desc: "Strong base; reacts vigorously — Na floats and fizzes." },
      { formula: "H₂",  name: "Hydrogen Gas", state: "g", desc: "Flammable; can ignite spontaneously from the reaction heat." }
    ]
  }
];

// Build lookup map: normalized key → reaction
const REACTION_MAP = {};

REACTIONS.forEach(rxn => {
  const key = buildKey(rxn.reactants);
  REACTION_MAP[key] = rxn;
});

function buildKey(reactantArr) {
  return reactantArr
    .map(r => r.replace(/\s+/g, "").toLowerCase())
    .sort()
    .join("|");
}

function lookupReaction(inputStr) {
  const parts = inputStr.split("+").map(s => s.trim()).filter(Boolean);
  const key = buildKey(parts);
  return REACTION_MAP[key] || null;
}
