import Order from "../model/order.model.js";

import TCode from "../uitls/TCodeGenerate.js";
import Cart from "../model/cart.model.js";
import { errorHandler, successHandler } from "../uitls/response.js";

import { addOrderDetails } from "../controller/orderDetails.controller.js";

import { AddPayment } from "../controller/payment.controller.js";

import OrderDetails from "../model/orderDetails.model.js";
import Product from "../model/product.model.js";
import Image from "../model/image.model.js";
import Payment from "../model/payment.model.js";
import User from "../model/user.model.js";
import Location from "../model/location.model.js";

const OrderController = {
  // Get all orders
  async getAllOrders(req, res) {
    try {
      const orders = await Order.findAll({
        include: [
          {
            model: OrderDetails,
          
            include: [
              {
                model: Product,
                include: [
                  {
                    model: Image,
                    where: Product.id === Image.productId, // Adjust this condition as needed
                    required: false,
                  },
                ],
              },
            ],

          },
          {
            model:User,
            where:Order.userId === User.id,
            attributes: { exclude: ['password','refreshToken','emailVerified','status'] },
            required:false,

          },
          {
            model: Location,
            where: Order.locationId === Location.id,
          },
          {
            model: Payment,
            where: Order.id === Payment.orderId, // Adjust this condition as needed
            required: false,
          }
        ],
      });

      return successHandler(res, orders, 200);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // get order by userId
  async getOrderByUserId(req, res) {
    try {
      const userId = parseInt(req.user);
      const id = parseInt(req.params.id);
  
      if (userId !== id) {
        return errorHandler(res, "Unauthorized", 401);
      }
  
      const orders = await Order.findAll({
        where: {
          userId: userId,
        },
        include: [
          {
            model: OrderDetails,
            include: [
              {
                model: Product,
                include: [
                  {
                    model: Image,
                    where: Product.id === Image.productId, // Adjust this condition as needed
                    required: false,
                  },
                ],
              },
            ],
          },
        ],
      });
  
      console.log('Orders:', orders); // Add this line for logging
  
      if (!orders || orders.length === 0) {
        return errorHandler(res, "Order not found", 404);
      }
  
      return successHandler(res, orders, 200);
    } catch (error) {
      console.error('Error:', error); // Add this line for logging
      res.status(500).json({ error: error.message });
    }
  },
  

  // Get a single order by ID
  async addOrder(req, res) {
    try {
      const tCode = TCode();
      const userId = parseInt(req.user);
      const id = parseInt(req.params.id);

      if (userId !== id) {
        return errorHandler(res, "Unauthorized", 401);
      }

      const { paymentType, location } = req.body;




      const orderDetailsData = await Cart.findAll({
        where: {
          userId: userId,
        },
        include: Product,
      });

      if (orderDetailsData.length === 0) {
        return errorHandler(res, "Cart is empty", 400);
      }
      const shipping = 120;
      const tax = 0.13;
      let totalPrice = 0;
      for (const orderDetail of orderDetailsData) {
        totalPrice += orderDetail.quantity * orderDetail.Product.price;
      }
      totalPrice += totalPrice * tax;
      totalPrice += shipping;


      const newOrder = await Order.create({
        userId: userId,
        totalPrice: totalPrice,
        locationId:parseInt(location),
        tCode: tCode,
      });


      const orderId = newOrder.id;

      const orderdetils = await addOrderDetails(
        tCode,
        orderId,
        orderDetailsData
      );
      if (!orderdetils) {
        return errorHandler(res, "Order details not added", 400);
      }
      const addPayment = await AddPayment(
        userId,
        tCode,
        orderId,
        paymentType,
        totalPrice
      );
      if (!addPayment) {
        return errorHandler(res, "Payment not added", 400);
      }

      return successHandler(res, {newOrder,orderdetils,addPayment}, 201);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update a single order by ID
  async updateOrder(req, res) {
    try {
      const orderId = req.params.id;
      console.log("Received orderId:", req.params.id);

      const { status } = req.body;

      const order = await Order.findByPk(orderId);

      if (order) {
        await Order.update(
          {
            status: status,
          },
          {
            where: {
              id: orderId,
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

  // Get a single order by ID
  async getOrderById(req, res) {
    try {
      const orderId = req.params.id;
      console.log("Received orderId:", req.params.id);

      const order = await Order.findByPk(orderId);

      if (!order) {
        return errorHandler(res, "Order not found", 404);
      }

      const orderDetails = await OrderDetails.findAll({
        where: {
          orderId: orderId,
        },
      });

      const product = await Product.findAll({
        where: {
          id: orderDetails.productId,
        },
      });

      const orderdata = {
        order,
        orderDetails,
        product,
      };
      return successHandler(res, orderdata, 200);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete a single order by ID
  async deleteOrder(req, res) {
    try {
      const orderId = req.params.id;
      console.log("Received orderId:", req.params.id);

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
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default OrderController;
