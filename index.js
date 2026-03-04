import express from "express";
import cors from "cors";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

const app = express();
app.use(cors());
app.use(express.json());

// Config Firebase
const firebaseConfig = {
  apiKey: "TA_CLE",
  authDomain: "TON_PROJET.firebaseapp.com",
  projectId: "TON_PROJET",
  storageBucket: "TON_PROJET.appspot.com",
  messagingSenderId: "ID",
  appId: "APP_ID"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// POST : ajouter une candidature
app.post("/api/candidatures", async (req, res) => {
  try {
    await addDoc(collection(db, "candidatures"), req.body);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET : récupérer toutes les candidatures
app.get("/api/candidatures", async (req, res) => {
  try {
    const snapshot = await getDocs(collection(db, "candidatures"));
    const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("API running"));
