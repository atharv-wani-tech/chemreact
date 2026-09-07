// ============================================================
//  ChemReact — Gemini AI Client (talks to LOCAL backend proxy)
//  The real API key lives in .env on the server — NEVER in browser
// ============================================================

// ── No API key logic needed in the browser anymore ──
function getApiKey()  { return "server-side"; }  // kept for compatibility
function saveApiKey() {}
function hasApiKey()  { return true; }            // always true; server holds the key

// ── Build the prompt ──
function buildPrompt(reactantsInput) {
  return `You are an expert chemistry assistant. The user has entered these reactants: "${reactantsInput}"

Your task:
1. Identify if this is a valid chemical reaction.
2. If valid, provide the balanced equation and detailed product information.
3. Return ONLY a JSON object — no markdown, no explanation, no code fences.

Return this exact JSON structure:
{
  "valid": true,
  "reactants": ["formula1", "formula2"],
  "balanced": "2H₂ + O₂ → 2H₂O",
  "type": "Synthesis",
  "conditions": "Spark / Heat",
  "energyType": "Exothermic",
  "safety": "Hydrogen gas is flammable. Handle with care.",
  "products": [
    {
      "formula": "H₂O",
      "name": "Water",
      "state": "l",
      "desc": "Essential liquid; product of hydrogen combustion."
    }
  ]
}

Rules:
- Use unicode subscripts in formulas: H₂O not H2O, CO₂ not CO2, etc.
- "state" must be one of: "s", "l", "g", "aq"
- "energyType" must be one of: "Exothermic", "Endothermic", "Neutral"
- "type" must be one of: "Synthesis", "Decomposition", "Combustion", "Neutralization", "Single Displacement", "Double Displacement", "Redox", "Precipitation", "Other"
- If the input is not a valid chemical reaction or compounds don't react, return: { "valid": false, "reason": "explanation here" }
- Do NOT include any text outside the JSON object.`;
}

// ── Call our backend proxy (Groq or Gemini via server) ──
async function askAI(reactantsInput) {
  const res = await fetch("/api/react", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reactants: reactantsInput, prompt: buildPrompt(reactantsInput) })
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const msg = err?.error || `HTTP ${res.status}`;
    if (res.status === 500 && msg.includes("API key")) throw new Error("BAD_KEY");
    throw new Error(msg);
  }

  const data = await res.json();
  if (data.error) throw new Error(data.error);

  const rawText = data.text || "";

  // Strategy 1: strip markdown fences then parse
  // Strategy 2: extract the first {...} JSON object from the text (handles extra prose)
  let parsed;
  const attempts = [
    () => JSON.parse(rawText.replace(/```json|```/gi, "").trim()),
    () => {
      const match = rawText.match(/\{[\s\S]*\}/);
      if (!match) throw new Error("no json found");
      return JSON.parse(match[0]);
    },
    () => {
      // Remove everything before the first { and after the last }
      const start = rawText.indexOf("{");
      const end   = rawText.lastIndexOf("}");
      if (start === -1 || end === -1) throw new Error("no braces");
      return JSON.parse(rawText.slice(start, end + 1));
    }
  ];

  for (const attempt of attempts) {
    try { parsed = attempt(); break; } catch { /* try next */ }
  }

  if (!parsed) throw new Error("PARSE_ERROR");

  return parsed;
}

const askGemini = askAI;
