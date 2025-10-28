import express from "express";
import { PaymentService } from "../services/index.js";

export const paymentRouter = express.Router();

paymentRouter.post('/', async (req, res) => {
    try {
        const payment = await PaymentService.createPayment(req.body.mp);
        res.status(200).send(payment);

        console.log({...req.body.backend, ...payment});

        await PaymentService.syncPaymentWithBackend({...req.body.backend, ...payment}).catch((error) => {
            console.error(error);
        });
    } catch (error) {
        console.error(error);
        res.status(400).send({ error: error.message || error });
    }
});