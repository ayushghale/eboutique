import { Router } from "express";
import CartController from "../controller/cart.controller.js";
import UserMiddleware from "../middlewares/user.middleware.js";
import {postCartValidation} from "../validator/cart.validator.js";

const cartRouter = Router();

// get cart by user id
// api/cart/:id
cartRouter.get("/:id", CartController.getCartByUserId);

// add cart
// api/cart/add
cartRouter.post("/add", CartController.addCart);

// increase cart quantity
// api/cart/increase/:id
cartRouter.get("/increase/:id", CartController.increaseCartQuantity);

// decrease cart quantity
// api/cart/decrease/:id
cartRouter.get("/decrease/:id", CartController.decreaseCartQuantity);

// delete cart
// api/cart/delete/:id
cartRouter.delete("/delete/:id", CartController.deleteCart);


export default cartRouter; 