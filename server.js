// ============================================================
//  ChemReact — Backend Proxy Server
//  Supports Groq (primary, ultra-fast) + Gemini (fallback)
//  API keys stay on server — browser NEVER sees them.
// ============================================================

const express = require("express");
const path    = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const app      = express();
const PORT     = process.env.PORT || 3000;
const TIMEOUT  = 20000;

// ── Provider configs ──
const GROQ_URL   = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "groq/compound-mini";       // fastest available on this account

const GEMINI_MODEL = "gemini-3.5-flash-lite";
const GEMINI_URL   = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// ── Timed fetch helper ──
async function fetchWithTimeout(url, options) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timer);
    return res;
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
}

// ── Groq call (OpenAI-compatible) ──
async function callGroq(prompt) {
  const res = await fetchWithTimeout(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type":  "application/json",
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.1,
      max_tokens:  1024
    })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Groq error ${res.status}`);
  }
  const data = await res.json();
  return data.choices?.[0]?.message?.content || "";
}

// ── Gemini call ──
async function callGemini(prompt) {
  const res = await fetchWithTimeout(`${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.1, maxOutputTokens: 1024 }
    })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Gemini error ${res.status}`);
  }
  const data = await res.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
}

// ── /api/react endpoint ──
app.post("/api/react", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Missing prompt" });

  const useGroq   = !!process.env.GROQ_API_KEY;
  const useGemini = !!process.env.GEMINI_API_KEY;

  if (!useGroq && !useGemini) {
    return res.status(500).json({ error: "No AI API key set in .env file" });
  }

  try {
    let rawText;
    if (useGroq) {
      console.log(`🚀 Using Groq (${GROQ_MODEL})`);
      rawText = await callGroq(prompt);
    } else {
      console.log(`🔵 Using Gemini (${GEMINI_MODEL})`);
      rawText = await callGemini(prompt);
    }

    console.log("── AI raw response ──\n" + rawText + "\n────────────────────");
    return res.json({ text: rawText });

  } catch (err) {
    if (err.name === "AbortError") {
      return res.status(504).json({ error: "AI API timed out (20s). Please try again." });
    }
    console.error("AI error:", err.message);
    return res.status(500).json({ error: err.message });
  }
});

// Fallback route
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

app.listen(PORT, () => {
  const groq   = process.env.GROQ_API_KEY   ? "🟢 Groq (ultra-fast)"   : "⬜ Not set";
  const gemini = process.env.GEMINI_API_KEY ? "🟢 Gemini (fallback)"   : "⬜ Not set";
  const active = process.env.GROQ_API_KEY   ? "⚡ Active: Groq"        : process.env.GEMINI_API_KEY ? "⚡ Active: Gemini" : "🔴 NO KEY SET";
  console.log(`\n✅ ChemReact running at: http://localhost:${PORT}`);
  console.log(`   Groq:   ${groq}`);
  console.log(`   Gemini: ${gemini}`);
  console.log(`   ${active}\n`);
});
