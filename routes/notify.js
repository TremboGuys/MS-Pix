import express from "express";
import { NotifyService } from "../services/index.js";

export const notifyRouter = express.Router();

notifyRouter.post('/', async (req, res) => {
    res.sendStatus(200);
    switch(req.body.action) {
        case "payment.updated":
            try {
                console.log('Chegou no case');
                await NotifyService.updatePayment(req.body.data.id);
            } catch(error) {
                console.error('Error in update payment: ', error);
            }
    }
})