import express from "express";
import dotenv from "dotenv";
import { MercadoPagoConfig, Payment } from "mercadopago";

dotenv.config();
const app = express();
const client = new MercadoPagoConfig({ accessToken: process.env.ML_ACCESS_TOKEN });

app.post("/", async (req, res) => {
  try {
    const payment = new Payment(client);
    const result = await payment.create({
      body: {
        transaction_amount: 100,
        description: "Teste de um haborgue",
        payment_method_id: "pix",
        payer: { email: "comprador@email.com" }
      }
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
});
app.get("/", (req, res) => {
  res.send("Servidor rodando! Use POST / para criar pagamentos.");
});


app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
