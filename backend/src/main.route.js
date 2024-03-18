import express from "express";

import adminRouter from "./route/admin.route.js"; // route for admin]
import borderRouter from "./route/border.route.js"; // route for border
import cartRouter from "./route/cart.route.js"; // route for cart
import categoryRouter from "./route/category.route.js"; // route for category
import customDesignRouter from "./route/customDesign.route.js"; // route for custom design
import designRouter from "./route/design.route.js"; // route for design
import orderRouter from "./route/order.route.js"; // route for order
import orderDetailRouter from "./route/orderDetails.route.js"; // route for orderDetail
import paymentRouter from "./route/payment.route.js"; // route for payment
import productRouter from "./route//product.router.js"; // route for product
import reviewRouter from "./route/review.route.js"; // route for review
import userRouter from "./route/user.route.js"; // route for user


import UserAuthController from "./controller/auth/auth.user.controller.js"; // user controller
import {postUserLoginValidation,postUserRegisterValidation} from"./validator/user.validator.js"; // user validation

import validatorResult from "./validator/validator.js"; // validation result


const mainRouter = express.Router({ mergeParams: true });

// route for login

mainRouter.post("/login", postUserLoginValidation(), validatorResult, UserAuthController.login);

// route for register
// api/register
mainRouter.post("/register",postUserRegisterValidation(),validatorResult, UserAuthController.register);

// route for logout
// api/logout
mainRouter.get("/logout", UserAuthController.logout);


// Add the user router as a sub-router under the main router
// route for admin
// api/admin
mainRouter.use("/admin", adminRouter);

// route for user
// api/user
mainRouter.use("/user", userRouter);

// router border
// api/border
mainRouter.use("/border", borderRouter);

//router for cart
// api/cart
mainRouter.use("/cart", cartRouter);

// router for category
// api/category
mainRouter.use("/category", categoryRouter);

//router for custom design
// api/customDesign
mainRouter.use("/customDesign", customDesignRouter);

// router for design
// api/design
mainRouter.use("/design", designRouter);

// router for order
// api/order
mainRouter.use("/order", orderRouter);

// router for ourderDetail
// api/orderDetail
mainRouter.use("/orderDetail", orderDetailRouter);

// router for payment
// api/payment
mainRouter.use("/payment", paymentRouter);

// router for product
// api/product
mainRouter.use("/product", productRouter);

// router for review
// api/review
mainRouter.use("/review", reviewRouter);





export default mainRouter;
 