import Order from "../model/order.model.js";
import OrderDetail from "../model/orderDetails.model.js";
import OrderDetails from "../model/orderDetails.model.js";
import { Op, Sequelize } from "sequelize";

import { errorHandler, successHandler } from "../uitls/response.js";
import Category from "../model/category.model.js";
import Product from "../model/product.model.js";
import Paymnet from "../model/payment.model.js";
import { get } from "mongoose";

const ReportController = {
  //===================================== product report =====================================
  // getTopProducts
  //api/admin/report/getTopProducts
  // top 5 products with highest sales
  getHighestProducts: async (req, res) => {
    try {
      const topProducts = await OrderDetail.findAll({
        include: [
          {
            model: Product,
            required: true,
            attributes: ["name", "price"], // Include product name and price
          },
        ],
        attributes: [
          "productId",
          [Sequelize.fn("sum", Sequelize.col("quantity")), "totalQuantity"],
        ],
        group: ["productId"],
        order: [[Sequelize.literal("totalQuantity"), "DESC"]],
        limit: 5,
      });

      if (!topProducts || topProducts.length === 0) {
        return errorHandler(res, "No products found", 404);
      }

      // Transform topProducts to a consistent response format
      const formattedProducts = topProducts.map((product) => ({
        productId: product.productId,
        productName: product.Product.name, // Access product name from included Product model
        productPrice: product.Product.price, // Access product price from included Product model
        totalQuantity: parseInt(product.getDataValue("totalQuantity")), // Access totalQuantity value
      }));

      return successHandler(res, formattedProducts, 200);
    } catch (error) {
      return errorHandler(res, error.message || "An error occurred", 400);
    }
  },

  // get product with lowest sales
  //api/admin/report/getLowestProducts
  getLowestProducts: async (req, res) => {
    try {
      const lowestProducts = await OrderDetail.findAll({
        include: [
          {
            model: Product,
            required: true,
            attributes: ["name", "price"], // Include product name and price
          },
        ],
        attributes: [
          "productId",
          [Sequelize.fn("sum", Sequelize.col("quantity")), "totalQuantity"],
        ],
        group: ["productId"],
        order: [[Sequelize.literal("totalQuantity"), "ASC"]],
        limit: 5,
      });

      if (!lowestProducts || lowestProducts.length === 0) {
        return errorHandler(res, "No products found", 404);
      }

      // Transform topProducts to a consistent response format
      const formattedProducts = lowestProducts.map((product) => ({
        productId: product.productId,
        productName: product.Product.name, // Access product name from included Product model
        productPrice: product.Product.price, // Access product price from included Product model
        totalQuantity: parseInt(product.getDataValue("totalQuantity")), // Access totalQuantity value
      }));

      return successHandler(res, formattedProducts, 200);
    } catch (error) {
      return errorHandler(res, error.message || "An error occurred", 400);
    }
  },

  // getTopCategories
  //api/admin/report/getTopCategories
  getTopCategories: async (req, res) => {
    try {
      const topCategories = await OrderDetails.findAll({
        include: {
          model: Product,
          include: Category,
        },
        attributes: [
          "Product.Category.id",
          [sequelize.fn("sum", sequelize.col("quantity")), "totalQuantity"],
        ],
        group: ["Product.Category.id"],
        order: [[sequelize.literal("totalQuantity"), "DESC"]],
        limit: 5,
      });

      if (!topCategories) {
        return errorHandler(res, "No categories found", 404);
      }
      return successHandler(res, topCategories, 200);
    } catch (error) {
      // Handle errors
      return errorHandler(res, error, 400);
    }
  },

  //===================================== sales report =====================================
  // get yearly sales of each month of the year
  //api/admin/report/getYearlySales
  getYearlySales: async (req, res) => {
    const today = new Date(); // Get current date and time
    try {
      const orders = await Order.findAll({
        where: {
          createdAt: {
            [Op.lte]: today, // Get orders within the current year
          },
        },
      });

      if (!orders) {
        return errorHandler(res, "No orders found", 404);
      }
      // Calculate yearly sales
      const yearlySales = [];
      for (let i = 0; i <= today.getMonth(); i++) {
        const date = new Date(today.getFullYear(), i, 1);
        const total = orders.reduce((acc, order) => {
          const orderDate = new Date(order.createdAt);
          if (
            orderDate.getMonth() === date.getMonth() &&
            orderDate.getFullYear() === date.getFullYear()
          ) {
            return acc + order.totalPrice;
          }
          return acc;
        }, 0);
        yearlySales.push({
          date: date.toLocaleString("default", {
            month: "long",
            year: "numeric",
          }),
          total,
        });
      }
      return successHandler(res, yearlySales, 200);
    } catch (error) {
      // Handle errors
      return errorHandler(res, error, 400);
    }
  },

  // getMonthlySales
  //api/admin/report/getMonthlySales
  getMonthlySales: async (req, res) => {
    const today = new Date(); // Get current date and time
    try {
      const orders = await Order.findAll({
        where: {
          createdAt: {
            [Op.between]: [
              new Date(today.getFullYear(), today.getMonth(), 1),
              today,
            ], // Get orders within the current month
          },
        },
      });

      if (!orders) {
        return errorHandler(res, "No orders found", 404);
      }
      // Calculate monthly sales
      const monthlySales = [];
      for (let i = 1; i <= today.getDate(); i++) {
        const date = new Date(today.getFullYear(), today.getMonth(), i);
        const total = orders.reduce((acc, order) => {
          const orderDate = new Date(order.createdAt);
          if (
            orderDate.getDate() === date.getDate() &&
            orderDate.getMonth() === date.getMonth() &&
            orderDate.getFullYear() === date.getFullYear()
          ) {
            return acc + order.totalPrice;
          }
          return acc;
        }, 0);
        monthlySales.push({
          date: date.toLocaleString("default", {
            month: "long",
            day: "numeric",
          }),
          total,
        });
      }
      return successHandler(res, monthlySales, 200);
    } catch (error) {
      // Handle errors
      return errorHandler(res, error, 400);
    }
  },

  // getDailySales of past 7 days
  //api/admin/report/getDailySales
  getDailySales: async (req, res) => {
    const today = new Date(); // Get current date and time
    const sevenDaysAgo = new Date(today); // Create a copy of the current date
    sevenDaysAgo.setDate(today.getDate() - 7);
    try {
      const orders = await Order.findAll({
        where: {
          createdAt: {
            [Op.between]: [sevenDaysAgo, today], // Get orders within the past 7 days
          },
        },
      });

      if (!orders) {
        return errorHandler(res, "No orders found", 404);
      }
      // Calculate daily sales
      // shwo even of no sales
      const dailySales = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const total = orders.reduce((acc, order) => {
          const orderDate = new Date(order.createdAt);
          if (
            orderDate.getDate() === date.getDate() &&
            orderDate.getMonth() === date.getMonth() &&
            orderDate.getFullYear() === date.getFullYear()
          ) {
            return acc + order.totalPrice;
          }
          return acc;
        }, 0);
        dailySales.push({
          date: date.toDateString(),
          total,
        });
      }
      return successHandler(res, dailySales.reverse(), 200);
    } catch (error) {
      // Handle errors
      return errorHandler(res, error, 400);
    }
  },

  //===================================== sales report end =====================================

  //===================================== payment report  =====================================

  // get payment report
  //api/admin/report/getPaymentReport
  // get total number by payment method fom payment table
  getPaymentReport: async (req, res) => {
    try {
      const paymentData = await Paymnet.findAll();

      const totalPaymentCount = paymentData.length;

      const paymentReport = await Paymnet.findAll({
        attributes: [
          "paymentMethod",
          [Sequelize.fn("count", Sequelize.col("paymentMethod")), "total"],
        ],
        group: ["paymentMethod"],
      });

      if (!paymentReport) {
        return errorHandler(res, "No payment found", 404);
      }
      return successHandler(res, paymentReport, 200);
    } catch (error) {
      // Handle errors
      return errorHandler(res, error, 400);
    }
  },

  //===================================== order report  =====================================
  //get daily orderof past 7 days
  //api/admin/report/getDailyOrders
  // get ony (Apr 16) mpnth and day 
  getDailyOrders: async (req, res) => {
    const today = new Date(); // Get current date and time
    const sevenDaysAgo = new Date(today); // Create a copy of the current date
    sevenDaysAgo.setDate(today.getDate() - 7);
    try {
      const orders = await Order.findAll({
        where: {
          createdAt: {
            [Op.between]: [sevenDaysAgo, today], // Get orders within the past 7 days
          },
        },
      });

      if (!orders) {
        return errorHandler(res, "No orders found", 404);
      }
      // Calculate daily sales
      // shwo even of no sales
      const dailyOrders = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const total = orders.reduce((acc, order) => {
          const orderDate = new Date(order.createdAt);
          if (
            orderDate.getDate() === date.getDate() &&
            orderDate.getMonth() === date.getMonth() &&
            orderDate.getFullYear() === date.getFullYear()
          ) {
            return acc + 1;
          }
          return acc;
        }, 0);
        dailyOrders.push({
          date: date.toDateString(),
          total,
        });
      }
      return successHandler(res, dailyOrders.reverse(), 200);
    } catch (error) {
      // Handle errors
      return errorHandler(res, error, 400);
    }
  },

  // get monthly orders
  //api/admin/report/getMonthlyOrders
  getMonthlyOrders: async (req, res) => {
    const today = new Date(); // Get current date and time
    try {
      const orders = await Order.findAll({
        where: {
          createdAt: {
            [Op.between]: [
              new Date(today.getFullYear(), today.getMonth(), 1),
              today,
            ], // Get orders within the current month
          },
        },
      });

      if (!orders) {
        return errorHandler(res, "No orders found", 404);
      }
      // Calculate monthly sales
      const monthlyOrders = [];
      for (let i = 1; i <= today.getDate(); i++) {
        const date = new Date(today.getFullYear(), today.getMonth(), i);
        const total = orders.reduce((acc, order) => {
          const orderDate = new Date(order.createdAt);
          if (
            orderDate.getDate() === date.getDate() &&
            orderDate.getMonth() === date.getMonth() &&
            orderDate.getFullYear() === date.getFullYear()
          ) {
            return acc + 1;
          }
          return acc;
        }, 0);
        monthlyOrders.push({
          date: date.toLocaleString("default", {
            month: "long",
            day: "numeric",
          }),
          total,
        });
      }
      return successHandler(res, monthlyOrders, 200);
    } catch (error) {
      // Handle errors
      return errorHandler(res, error, 400);
    }
  },

  // get yearly orders of each month of the year
  //api/admin/report/getYearlyOrders
  getYearlyOrders: async (req, res) => {
    const today = new Date(); // Get current date and time
    try {
      const orders = await Order.findAll({
        where: {
          createdAt: {
            [Op.lte]: today, // Get orders within the current year
          },
        },
      });

      if (!orders) {
        return errorHandler(res, "No orders found", 404);
      }
      // Calculate yearly sales
      const yearlyOrders = [];
      for (let i = 0; i <= today.getMonth(); i++) {
        const date = new Date(today.getFullYear(), i, 1);
        const total = orders.reduce((acc, order) => {
          const orderDate = new Date(order.createdAt);
          if (
            orderDate.getMonth() === date.getMonth() &&
            orderDate.getFullYear() === date.getFullYear()
          ) {
            return acc + 1;
          }
          return acc;
        }, 0);
        yearlyOrders.push({
          date: date.toLocaleString("default", {
            month: "long",
            year: "numeric",
          }),
          total,
        });
      }
      return successHandler(res, yearlyOrders, 200);
    } catch (error) {
      // Handle errors
      return errorHandler(res, error, 400);
    }
  },
};
export default ReportController;
