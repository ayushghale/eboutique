import { Router } from "express";

import PaymentController from "../controller/payment.controller.js";

const paymentRouter = Router();

// get all payments
// api/payment/getAllPayments
paymentRouter.get("/getAllPayments", PaymentController.getAllPayments);

// add new payment
// api/payment/addPayment
paymentRouter.post("/addPayment", PaymentController.addPayment);

// update payment
// api/payment/updatePayment/:id
paymentRouter.put("/updatePayment/:id", PaymentController.updatePayment);

// delete payment
// api/payment/deletePayment/:id
paymentRouter.delete("/deletePayment/:id", PaymentController.deletePayment);

export default paymentRouter;
