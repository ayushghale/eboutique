import { Router } from "express";

import OrderController from "../controller/order.controller.js";

const orderRouter = Router();

// get all orders
// api/order/getAllOrders
orderRouter.get("/getAllOrders", OrderController.getAllOrders);

// add new order
// api/order/addOrder 
orderRouter.post("/addOrder", OrderController.addOrder);

// update order
// api/order/updateOrder/:id
orderRouter.put("/updateOrder/:id", OrderController.updateOrder);

// delete order
// api/order/deleteOrder/:id
// orderRouter.delete("/deleteOrder/:id", OrderController.deleteOrder);

export default orderRouter;