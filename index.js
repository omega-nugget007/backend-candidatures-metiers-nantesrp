import express from "express";
import cors from "cors";
import fetch from "node-fetch";



const app = express();
app.use(cors());
app.use(express.json());

// URLs de tes Apps Script (WebApp)
const STAFF_WEBHOOK = process.env.STAFF_WEBHOOK;
const METIERS_WEBHOOK = process.env.METIERS_WEBHOOK;

app.get("/health", (req, res) => res.json({ status: "ok" }));

// Endpoint STAFF
app.post("/staff", async (req, res) => {
  console.log("Envoi à Apps Script :", req.body); // ICI

  try {
    const response = await fetch(STAFF_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });

    const text = await response.text();
    return res.status(200).json({ ok: true, fromAppsScript: text });
  } catch (err) {
    console.error("Erreur STAFF → Apps Script:", err);
    return res.status(500).json({ ok: false, error: "Erreur côté serveur STAFF" });
  }
});


// Endpoint METIERS
app.post("/metiers", async (req, res) => {

  console.log("Envoi à Apps Script :", req.body); // ICI
  try {
    const response = await fetch(METIERS_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });

    const text = await response.text();
    return res.status(200).json({ ok: true, fromAppsScript: text });
  } catch (err) {
    console.error("Erreur METIERS → Apps Script:", err);
    return res.status(500).json({ ok: false, error: "Erreur côté serveur METIERS" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("API en écoute sur le port", PORT);
});

