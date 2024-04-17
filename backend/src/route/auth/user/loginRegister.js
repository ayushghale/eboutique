import { Router } from "express";

import UserAuthController from "../../../controller/auth/auth.user.controller.js";
import { AdminMiddleware } from "../../middlewares/admin.Middleware";

const userAuthRouter = Router();

// login admin
//api/admin/login
userAuthRouter.post("/login", UserAuthController.login);

userAuthRouter.post("/register", UserAuthController.register);

userAuthRouter.post("/forgot-password", UserAuthController.emailVerification);


export default userAuthRouter;
