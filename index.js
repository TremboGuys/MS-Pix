import express from "express";
import dotenv from "dotenv";
import { MercadoPagoConfig, Payment } from "mercadopago";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors()); // Permite requisições para o frontend
app.use(express.json());

const client = new MercadoPagoConfig({ accessToken: process.env.ML_ACCESS_TOKEN });

app.post("/", async (req, res) => {
  try {
    const payment = new Payment(client);
    const result = await payment.create({
      body: req.body,
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message || error });
  }
});

app.get("/", (req, res) => {
  res.send("Servidor rodando! Use POST / para criar pagamentos.");
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
