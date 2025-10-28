import express from "express";
import dotenv from "dotenv";
import { MercadoPagoConfig } from "mercadopago";
import { paymentRouter, notifyRouter } from "./routes/index.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/payment", paymentRouter);
app.use("/notify", notifyRouter);

app.get("/", (req, res) => {
  res.send("Servidor rodando! Use POST / para criar pagamentos.");
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
