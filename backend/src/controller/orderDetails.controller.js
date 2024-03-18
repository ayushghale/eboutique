import OrderDetails from '../model/orderDetails.model.js';

const OrderDetailsController = {
    async getAllOrderDetails(req, res) {
        try {
            const orderDetails = await OrderDetails.findAll();
            res.status(200).json(orderDetails);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async addOrderDetails(req, res) {
        try {
            const tCode = TCode();
            const { orderDetailsData  } = req.body;  

            for (const orderDetail of orderDetailsData.orderDetails) {
                await OrderDetail.create({
                  orderId: orderId,
                  customDesignId: orderDetail.customDesignId,
                  productId: orderDetail.productId,
                  quantity: orderDetail.quantity,
                  tCode: tCode,
                });
              }
          
              res.status(200).json({
                success: true,
                message: "Orders added successfully",
                data: {
                  tCode,
                  orderDetails: orderDetailsData.orderDetails,
                },
              });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateOrderDetails(req, res) {
        try {
            const orderDetailsId = req.params.id;
            console.log('Received orderDetailsId:', req.params.id);

            const { newOrderId, newProductId, newQuantity } = req.body; // Assuming you receive the user ID, new username, and new email in the request body

            // Find the user by ID
            const orderDetails = await OrderDetails.findByPk(orderDetailsId);

            console.log('Received orderDetails:', orderDetails);

            if (orderDetails) {
                // Update the user's username and email
                await OrderDetails.update(
                    {
                        orderId: newOrderId,
                        productId: newProductId,
                        quantity: newQuantity
                        // Add other fields to update as needed...
                    },
                    {
                        where: {
                            id: orderDetailsId, // Condition to match the user ID
                        },
                    }
                );

                res.status(200).json("OrderDetails updated successfully");
            } else {
                res.status(404).json("OrderDetails not found");
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async deleteOrderDetails(req, res) {
        try {
            const orderDetailsId = req.params.id;
            console.log('Received orderDetailsId:', req.params.id);

            const orderDetails = await OrderDetails.findByPk(orderDetailsId);

            if (orderDetails) {
                await OrderDetails.destroy({
                    where: {
                        id: orderDetailsId,
                    },
                });
                res.status(200).json("OrderDetails deleted successfully");

            } else {

                res.status(404).json("OrderDetails not found");

            }

        }
            
            catch (error) {
                res.status(500).json({ error: error.message });
            }

    }

};

export default OrderDetailsController;