import { Router } from "express";
import UserController from "../controller/user/user.controller.js";

const userRouter = Router();
// get all users
userRouter.get("/getAllUsers", UserController.getAllUsers);

// add new user
userRouter.post("/addUser", UserController.addUser);

// update user
userRouter.put("/updateUser/:id", UserController.updateUser);

// delete user
userRouter.delete("/deleteUser/:id", UserController.deleteUser);


export default userRouter;
