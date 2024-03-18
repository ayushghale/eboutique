import Order from '../model/order.model.js';
import OrderDetails from '../model/orderDetails.model.js';

import TCode from '../uitls/TCodeGenerate.js'


const OrderController = {
    // Get all orders
    async getAllOrders(req, res) {
        try {
            const orders = await Order.findAll();
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get a single order by ID
    async addOrder(req, res) {
        
        
        try {
            const tCode = TCode();
            const { userId, totalPrice,orderDetailsData  } = req.body;

            const newOrder = await Order.create({
                userId: userId,
                totalPrice: totalPrice,
                tCode: TCode(),
                status: 'status'
            });

            const orderId = newOrder.id;

            res.status(200).json({
                success: true,
                message: "Orders added successfully",
                data: orderId,
              });


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


            console.log('Order created:', newOrder);
            res.status(201).json("Order added successfully" + newOrder);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Update a single order by ID
    async updateOrder(req, res) {
        try {
            const orderId = req.params.id;
            console.log('Received orderId:', req.params.id);

            const { newUserId, newPaymentId, newStatus, newTotal } = req.body; // Assuming you receive the user ID, new username, and new email in the request body

            // Find the user by ID
            const order = await Order.findByPk(orderId);

            console.log('Received order:', order);

            if (order) {
                // Update the user's username and email
                await Order.update(
                    {
                        userId: newUserId,
                        paymentId: newPaymentId,
                        status: newStatus,
                        total: newTotal
                        // Add other fields to update as needed...
                    },
                    {
                        where: {
                            id: orderId, // Condition to match the user ID
                        },
                    }
                );

                res.status(200).json("Order updated successfully");
            } else {
                res.status(404).json("Order not found");
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Delete a single order by ID
    async deleteOrder(req, res) {
        try {
            const orderId = req.params.id;
            console.log('Received orderId:', req.params.id);

            const order = await Order.findByPk(orderId);

            if (order) {
                await Order.destroy({
                    where: {
                        id: orderId,
                    },
                });

                res.status(200).json("Order deleted successfully");
            } else {
                res.status(404).json("Order not found");

            }

        }

        catch (error) {
            res.status(500).json({ error: error.message });
        }

    }



};

export default OrderController;