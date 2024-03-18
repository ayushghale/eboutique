import { Router } from "express";

import UserAuthController from "../../../controller/auth/user.controller";
import { AdminMiddleware } from "../../middlewares/admin.Middleware";

const userAuthRouter = Router();

// login admin
//api/admin/login
userAuthRouter.post("/login", AdminMiddleware(), UserAuthController.login);


export default userAuthRouter;
