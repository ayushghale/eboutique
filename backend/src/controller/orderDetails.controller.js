import { json } from "sequelize";
import OrderDetails from "../model/orderDetails.model.js";
import { successHandler } from "../uitls/response.js";

const OrderDetailsController = {
  async getAllOrderDetails(req, res) {
    try {
      const orderDetails = await OrderDetails.findAll();
      res.status(200).json(orderDetails);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteOrderDetails(req, res) {
    try {
      const orderDetailsId = req.params.id;
      console.log("Received orderDetailsId:", req.params.id);

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
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default OrderDetailsController;

export async function addOrderDetails(tCode, orderId, orderDetailsData) {
  try {
    // Iterate over each order detail
    for (let i = 0; i < orderDetailsData.length; i++) {
      const { customDesignId, productId, quantity } = orderDetailsData[i];

      // Create order detail record in the database
      const newOrderDetail = await OrderDetails.create({
        orderId: orderId,
        customDesignId: customDesignId,
        productId: productId,
        quantity: quantity,
        tCode: tCode,
      });

      // Optionally, you can log the newly created order detail
      console.log('New Order Detail:', newOrderDetail);
    }

    // Return success if all order details are added successfully
    return { success: true, message: 'Order details added successfully' };
  } catch (error) {
    // Log and return error if any exception occurs
    console.error('Error adding order details:', error);
    return { success: false, message: 'Failed to add order details', error: error.message };
  }
}


