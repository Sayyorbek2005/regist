import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";


dotenv.config();

const app = express();

// 1️⃣ JSON body parser
app.use(express.json());

// 2️⃣ CORS middleware – shu yerga yozamiz
app.use(cors()); // <<< Mana shu 3️⃣

// Bot token va chat_id
const TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.CHAT_ID;
const URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

// POST endpoint
app.post("/send", async (req, res) => {
  const { name, phone, course } = req.body;

  if (!name || !phone || !course) {
    return res.status(400).json({ success: false, error: "Maydonlar to‘liq emas!" });
  }

  const message = `
📩 Yangi ariza:
👤 Ism: ${name}
📞 Telefon: ${phone}
📚 Kurs: ${course}
`;

  try {
    await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
      }),
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Xato:", err);
    res.status(500).json({ success: false, error: "Botga yuborilmadi!" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server ${PORT} portda ishlayapti...`));
