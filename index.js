import express from "express";
import cors from "cors";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

const app = express();
app.use(cors());
app.use(express.json());

// Config Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBM3qoHPjaQGEMNem_dMf9c0OgtDBW7pD0",
  authDomain: "candidatures-nantesrp.firebaseapp.com",
  projectId: "candidatures-nantesrp",
  storageBucket: "candidatures-nantesrp.firebasestorage.app",
  messagingSenderId: "224090316450",
  appId: "1:224090316450:web:cbe053f80d363bfed481fb"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// POST : ajouter une candidature
app.post("/api/candidatures", async (req, res) => {
  try {
    const { discord, age, metier, motivation, email } = req.body;

    await addDoc(collection(db, "candidatures"), {
      discord,
      age,
      metier,
      motivation,
      email,
      createdAt: Date.now()
    });

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




