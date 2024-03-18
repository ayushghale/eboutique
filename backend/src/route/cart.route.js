import { Router } from "express";
import CartController from "../controller/cart.controller.js";

const cartRouter = Router();

// get all carts
// api/cart/getAllCarts
cartRouter.get("/getAllCarts", CartController.getAllCarts);

// add new cart
// api/cart/addCart
cartRouter.post("/addCart", CartController.addCart);

// update cart
// api/cart/updateCart/:id
cartRouter.put("/updateCart/:id", CartController.updateCart);

// delete cart
// api/cart/deleteCart/:id
// cartRouter.delete("/deleteCart/:id", CartController.deleteCart);

export default cartRouter;