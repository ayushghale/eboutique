import { Router } from "express";

import OrderDetailsController from "../controller/orderDetails.controller.js";

const orderDetailsRouter = Router();

// get all orderDetails
// api/orderDetails/getAllOrderDetails
orderDetailsRouter.get("/getAllOrderDetails", OrderDetailsController.getAllOrderDetails);

// add new orderDetails
// api/orderDetails/addOrderDetails
// orderDetailsRouter.post("/addOrderDetails", OrderDetailsController.addOrderDetails);

// update orderDetails
// api/orderDetails/updateOrderDetails/:id
// orderDetailsRouter.put("/updateOrderDetails/:id", OrderDetailsController.updateOrderDetails);

// delete orderDetails
// api/orderDetails/deleteOrderDetails/:id
// orderDetailsRouter.delete("/deleteOrderDetails/:id", OrderDetailsController.deleteOrderDetails);

export default orderDetailsRouter;
