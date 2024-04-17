import { Router } from "express";
import multer from "multer";
import UserController from "../controller/user/user.controller.js";
import { postUserRegisterValidation } from "../validator/user.validator.js";
import AuthMiddleware from "../middlewares/authMiddleware.js";
import UserMiddleware from "../middlewares/user.middleware.js";
import LocationController from "../controller/user/location.controller.js";

import {LocationFormValidator} from "../validator/location.validator.js";
import validatorResult from "../validator/validator.js";
import CartController from "../controller/cart.controller.js";

import UserAuthController from "../controller/auth/auth.user.controller.js"; // user controller
import FavoriteController from "../controller/user/favorite.controller.js";
import uploadFile from "../middlewares/uploadFile.middleware.js";
import OrderController from "../controller/order.controller.js";


const upload = multer();
// AuthMiddleware,

const userRouter = Router();


// ======================================= user auth =================================================

// re-login user
// api/user/relogin
userRouter.post("/relogin", AuthMiddleware, UserAuthController.reLogin);

// get all users
//api/user/getAllUsers
userRouter.get("/getAllUsers",UserMiddleware, UserController.getAllUsers);

// get user by id
//api/user/getUserById/:id
userRouter.get("/getUserById/:id", UserMiddleware,UserController.getUserById);

// add new user
//api/user/addUser
userRouter.post(
  "/addUser",
  postUserRegisterValidation(),
  UserController.addUser
);

// update user
//api/user/updateUser/:id
userRouter.post(
  "/updateUser/:id",
  UserMiddleware,
  uploadFile("image", "user"),
  postUserRegisterValidation(),
  UserController.updateUser
);

// change credentials
//api/user/changeCredentials/:id
userRouter.post("/changeCredentials/:id", UserMiddleware, upload.none(), UserController.changeCredentials);

// delete user
//api/user/deleteUser/:id
userRouter.delete("/deleteUser/:id", UserController.deleteUser);


// ======================================= user Location  =================================================

//user location route
// Create a new location
// api/location
userRouter.post("/loaction/add",UserMiddleware,upload.none(), LocationController.create);

// get loaction by defualt
// api/location/user/:id
userRouter.get("/loaction/default/:id",UserMiddleware, LocationController.findDefaultLocation);

// find one location by id
// api/user/location/:id
userRouter.get("/loaction/edit/:id",UserMiddleware, LocationController.findOne);

// // Get all locations
// // api/location/user/:id
userRouter.get("/loaction/:id",UserMiddleware, LocationController.findAllByUserId);

// // Update a location by id
// // api/location/update/:id
userRouter.post("/loaction/update/:id",UserMiddleware,upload.none(), LocationController.update);

// // Delete a location by id
// // api/location/delete/:id
userRouter.delete("/loaction/delete/:id",UserMiddleware, LocationController.delete);


//  ============================================ user cart =================================================

// get cart by user id
// api/user/cart/:id
userRouter.get("/cart/:id",UserMiddleware, CartController.getCartByUserId);


// create a new cart
// api/user/cart/add
userRouter.post("/cart/add",UserMiddleware, upload.none(), CartController.addCart);

// increase cart quantity
// api/user/cart/increase/:id
userRouter.get("/cart/increase/:id",UserMiddleware, CartController.increaseCartQuantity);

// decrease cart quantity
// api/cart/decrease/:id
userRouter.get("/cart/decrease/:id",UserMiddleware, CartController.decreaseCartQuantity);

// delete cart
// api/cart/delete/:id
userRouter.get("/cart/delete/product/:id",UserMiddleware, CartController.deleteCart);



// ============================================ user Favorite =================================================

// get Favorite by user id
// api/user/Favorite/:id
userRouter.get("/favorite/:id",UserMiddleware, FavoriteController.findAllByUserId);

// create a new Favorite
// api/user/Favorite/add
userRouter.post("/favorite/add/:id",UserMiddleware, FavoriteController.create);

// remove a Favorite by id
// api/Favorite/delete/:id
userRouter.get("/favorite/delete/:id",UserMiddleware, FavoriteController.remove);

// ============================================ user order =================================================

// get order by user id
// api/user/order/:id
userRouter.get("/order/find/:id",UserMiddleware, OrderController.getOrderByUserId);

// add new order
// api/user/order/add
userRouter.post("/order/add/:id",UserMiddleware, upload.none(), OrderController.addOrder);



export default userRouter;
