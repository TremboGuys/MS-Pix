import { MercadoPagoConfig, Payment } from "mercadopago";
import "dotenv/config";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

class PaymentService {
    async createPayment(bodyPayment) {
        const accessToken = process.env.MP_MODE == "sandbox" ? process.env.MP_ACCESS_TOKEN_TEST : process.env.MP_ACCESS_TOKEN_PROD

        console.log(accessToken);

        const client = new MercadoPagoConfig({ accessToken });
        const payment = new Payment(client);

        const idempotencyKey = uuidv4();
        const requestPayment = await payment.create({
            body: bodyPayment,
        });

        const response = { id_transaction_mp: requestPayment.id, qr_code_base64: requestPayment.point_of_interaction.transaction_data.qr_code_base64, qr_code: requestPayment.point_of_interaction.transaction_data.qr_code }

        return response;
    };

    async syncPaymentWithBackend(payment) {
        await axios.post('https://eatly-backend-cbai.onrender.com/api/payments/', payment);
    };
};

export default new PaymentService();