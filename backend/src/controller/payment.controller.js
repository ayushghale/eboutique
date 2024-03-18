import Payment from '../model/payment.model.js';

const PaymentController = {
    async getAllPayments(req, res) {
        try {
            const payments = await Payment.findAll();
            res.status(200).json(payments);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async addPayment(req, res) {
        try {
            const { userId, orderId, status, total } = req.body;
            console.log('Received userId:', userId);
            const newPayment = await Payment.create({
                userId: userId,
                orderId: orderId,
                status: status,
                total: total
            });
            console.log('Payment created:', newPayment);
            res.status(201).json("Payment added successfully" + newPayment);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updatePayment(req, res) {
        try {
            const paymentId = req.params.id;
            console.log('Received paymentId:', req.params.id);

            const { newUserId, newOrderId, newStatus, newTotal } = req.body; // Assuming you receive the user ID, new username, and new email in the request body

            // Find the user by ID
            const payment = await Payment.findByPk(paymentId);

            console.log('Received payment:', payment);

            if (payment) {
                // Update the user's username and email
                await Payment.update(
                    {
                        userId: newUserId,
                        orderId: newOrderId,
                        status: newStatus,
                        total: newTotal
                        // Add other fields to update as needed...
                    },
                    {
                        where: {
                            id: paymentId, // Condition to match the user ID
                        },
                    }
                );

                res.status(200).json("Payment updated successfully");
            } else {
                res.status(404).json("Payment not found");
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async deletePayment(req, res) {
        try {
            const paymentId = req.params.id;
            console.log('Received paymentId:', req.params.id);

            const payment = await Payment.findByPk(paymentId);

            if (payment) {
                await Payment.destroy({
                    where: {
                        id: paymentId,
                    },
                });
                res.status(200).json("Payment deleted successfully");
            } else {
                res.status(404).json("Payment not found");
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

export default PaymentController;