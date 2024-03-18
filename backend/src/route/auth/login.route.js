import { Router } from "express";

import AdminAuthController from "../../controller/auth/admin.controller";
import { AdminMiddleware } from "../../middlewares/admin.Middleware";

const adminAuthRouter = Router();

// login admin
//api/admin/login
adminAuthRouter.post("/login", AdminMiddleware(), AdminAuthController.login);


export default adminAuthRouter;
