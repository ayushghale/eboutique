import { Router } from "express";

import AdminController from "../controller/admin/admin.controller.js";
import AdminAuthController from "../controller/auth/admin.controller.js";
import AdminMiddleware  from "../middlewares/admin.Middleware.js";

const adminRouter = Router();


// ======================== Admin Auth ========================
// login admin
//api/admin/login
adminRouter.post("/login", AdminAuthController.login);

// register admin
//api/admin/register
adminRouter.post("/register",AdminMiddleware, AdminAuthController.register);

// logout admin
//api/admin/logout
adminRouter.post("/logout", AdminMiddleware, AdminAuthController.logout);

// ======================== Admin auth end ========================

// ======================== Admin =================================
// get all admins
//api/admin/getAllAdmins
adminRouter.get("/getAllAdmins", AdminController.getAllAdmins);

// get admin by id
//api/admin/getAdmin/:id
adminRouter.get("/getAdmin/:id", AdminController.getAdmin);

// add new admin
//api/admin/addAdmin
adminRouter.post("/addAdmin", AdminController.addAdmin);

// update admin
//api/admin/updateAdmin/:id
adminRouter.put("/updateAdmin/:id", AdminController.updateAdmin);

// delete admin
//api/admin/deleteAdmin/:id
adminRouter.delete("/deleteAdmin/:id", AdminController.deleteAdmin);

export default adminRouter;

