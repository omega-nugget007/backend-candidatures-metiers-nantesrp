import express from "express";
import cors from "cors";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

const app = express();
app.use(cors());
app.use(express.json());

// Config Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDMqUM-3i5xENs-CuG2kGS95sORzoPScNw",
  authDomain: "candidatures-metiers-nantesrp.firebaseapp.com",
  databaseURL: "https://candidatures-metiers-nantesrp-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "candidatures-metiers-nantesrp",
  storageBucket: "candidatures-metiers-nantesrp.firebasestorage.app",
  messagingSenderId: "521450458200",
  appId: "1:521450458200:web:66445e8316047a8cc98e2d"
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

