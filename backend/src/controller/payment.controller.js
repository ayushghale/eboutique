import Payment from "../model/payment.model.js";
import { errorHandler, successHandler } from "../uitls/response.js";

const PaymentController = {
  getAllPayments: async (req, res) => {
    try {
      const payments = await Payment.findAll();
      res.status(200).json(payments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // get payment by userId
  getPaymentByUserId: async (req, res) => {
    try {
      const userId = req.params.id;
      const payments = await Payment.findAll({
        where: {
          userId: userId,
        },
      });
      if (payments.length === 0) {
        return res.status(404).json("Payment not found");
      }
      const userData = await User.findOne({
        where: {
          id: userId,
        },
      });

      const data = {
        payments,
        userData,
      };

      return successHandler(res, data, 200);
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },

  // finf payment by  tCode
  getPaymentByTCode: async (req, res) => {
    try {
      const tCode = req.params.tCode;
      const payment = await Payment.findOne({
        where: {
          tCode: tCode,
        },
      });

      if (payment) {
        const userData = await User.findOne({
          where: {
            id: payment.userId,
          },
        });
        const order = await Order.findOne({
          where: {
            id: payment.orderId,
          },
        });
        const orderDetails = await OrderDetails.findAll({
          where: {
            orderId: payment.orderId,
          },
        });
        const data = {
          payment,
          userData,
          order,
          orderDetails,
        };

        return successHandler(res, data, 200);
      }
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },
  // finf payment by  tCode
  getPaymentByOnlineTCode: async (req, res) => {
    try {
      const tCode = req.params.onlineTCode;
      const payment = await Payment.findOne({
        where: {
          onlineTCode: onlineTCode,
        },
      });

      if (payment) {
        const userData = await User.findOne({
          where: {
            id: payment.userId,
          },
        });
        const order = await Order.findOne({
          where: {
            id: payment.orderId,
          },
        });
        const orderDetails = await OrderDetails.findAll({
          where: {
            orderId: payment.orderId,
          },
        });
        const data = {
          payment,
          userData,
          order,
          orderDetails,
        };

        return successHandler(res, data, 200);
      }
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },

  // get payment by paymentMethod
  getPaymentMethod: async (req, res) => {
    try {
      const paymentMethod = req.params.paymentMethod;
      const payments = await Payment.findAll({
        where: {
          paymentMethod: paymentMethod,
        },
      });
      if (payments.length === 0) {
        return res.status(404).json("Payment not found");
      }
      return res.status(200).json(payments);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // get payment by paymentStatus
  getPaymentStatus: async (req, res) => {
    try {
      const paymentstatus = req.params.paymentStatus;
      const payments = await Payment.findAll({
        where: {
          paymentStatus: "pending",
        },
      });
      if (payments.length === 0) {
        return res.status(404).json("Payment not found");
      }
      return res.status(200).json(payments);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

export default PaymentController;

export async function AddPayment(
    userId,
    tCode,
    orderId,
    paymentType,
    totalPrice
  ) {


    console.log("Payment Type:", paymentType);
    console.log("Total Price:", totalPrice);
    console.log("Order Id:", orderId);
    console.log("User Id:", userId);
    console.log("T Code:", tCode);
    
    try {
      // Check if paymentType is null or undefined
      if (!paymentType) {
        throw new Error("Payment method cannot be null or undefined");
      }
  
      // Create a new payment record
      const newPayment = await Payment.create({
        orderId,
        userId,
        totalPrice,
        paymentMethod: paymentType,
        tCode,
      });
  
      // Return the newly created payment record
      return newPayment;
    } catch (error) {
      // Return the error if any exception occurs
      return error;
    }
  }
  
