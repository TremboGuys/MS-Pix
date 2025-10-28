import axios from "axios";

class NotifyService {
    async updatePayment(transactionId) {
        const accessToken = process.env.MP_MODE == "sandbox" ? process.env.MP_ACCESS_TOKEN_TEST : process.env.MP_ACCESS_TOKEN_PROD;

        const transactionData = await axios.get(`https://api.mercadopago.com/v1/payments/${transactionId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        console.log(transactionData);

        switch(transactionData.data.status) {
            case "approved":
                await this.notification(transactionData.data.id, 2);
        };
    };

    async notification(transactionId, status) {
        await axios.patch(`http://localhost:8000/api/payments/notifications/?id_transaction=${transactionId}`, { status });
    };
};

export default new NotifyService();