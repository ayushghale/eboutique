import { Router } from "express";

import PaymentController from "../controller/payment.controller.js";

const paymentRouter = Router();

// get all payments
// api/payment/getAllPayments
paymentRouter.get("/getAllPayments", PaymentController.getAllPayments);

// get payment by userId
// api/payment/getPaymentByUserId
paymentRouter.get("/getPaymentByUserId/:id", PaymentController.getPaymentByUserId);

// get payment by tCode
// api/payment/getPaymentByTCode
paymentRouter.get("/getPaymentByTCode/:tCode", PaymentController.getPaymentByTCode);

// get payment by paymentMethod
// api/payment/getPaymentByMethod/:paymentMethod
paymentRouter.get("/getPaymentByMethod/:paymentMethod", PaymentController.getPaymentMethod);

// get payment by onlineTCode
// api/payment/getPaymentByOnlineTCode/:onlineTCode
paymentRouter.get("/getPaymentByOnlineTCode/:onlineTCode", PaymentController.getPaymentByOnlineTCode);

 // get payment by paymentStatus
// api/payment/getPaymentByStatus/:paymentStatus
paymentRouter.get("/getPaymentByStatus/:paymentStatus", PaymentController.getPaymentStatus);


export default paymentRouter;
