import { Router } from "express";

import AdminController from "../controller/admin/admin.controller.js";
import AdminAuthController from "../controller/auth/admin.controller.js";
import { adminRole, isAdmin } from "../middlewares/admin.Middleware.js";

import {
  addNewAdminValidator,
  loginAdminValidator,
} from "../validator/admin.validator.js";
import OrderController from "../controller/order.controller.js";
import BorderController from "../controller/border.controller.js";
import DesignController from "../controller/design.controller.js";
import uploadFile from "../middlewares/uploadFile.middleware.js";
import CategoryController from "../controller/category.controller.js";
import ReportController from "../controller/report.controller.js";

const adminRouter = Router();

// ======================== Admin Auth ========================
// isAdmin(), isStaff(), isSuperAdmin()
// login admin
//api/admin/login
adminRouter.post("/login", loginAdminValidator(), AdminAuthController.login);

// register admin
//api/admin/register
adminRouter.post(
  "/register",
  addNewAdminValidator(),
  AdminAuthController.register
);

// logout admin
//api/admin/logout
adminRouter.post("/logout", isAdmin(), AdminAuthController.logout);

// ======================== Admin auth end ========================

// ======================== Admin =================================
// get all admins
//api/admin/getAllAdmins
adminRouter.get("/getAllAdmins", isAdmin(), AdminController.getAllAdmins);

// get admin by id
//api/admin/getAdmin/:id
adminRouter.get("/getAdmin/:id", isAdmin(), AdminController.getAdmin);

// add new admin
//api/admin/addAdmin
adminRouter.post("/addAdmin", isAdmin(), AdminController.addAdmin);

// update admin
//api/admin/updateAdmin/:id
adminRouter.put("/updateAdmin/:id", isAdmin(), AdminController.updateAdmin);

// delete admin
//api/admin/deleteAdmin/:id
adminRouter.delete("/deleteAdmin/:id", isAdmin(), AdminController.deleteAdmin);

// update admin status to active
//api/admin/updateStatus/:id
adminRouter.put("/updateStatus/:id", isAdmin(), AdminController.updateStatus);

// ======================== Admin border ========================
// get all borders
//api/admin/getAllBorders
adminRouter.get("/border/all", BorderController.getAllBorders);

// add new border
//api/admin/addBorder
adminRouter.post(
  "/border/add",
  uploadFile("image", "border"),
  BorderController.addBorder
);

// get border by id
//api/admin/getBorder/:id
adminRouter.get("/border/:id", BorderController.getBorder);

// update border
//api/admin/updateBorder/:id
adminRouter.post(
  "/border/update/:id",
  uploadFile("image", "border"),
  BorderController.updateBorder
);

// update status border
//api/admin/updateStatus/:id
adminRouter.get("/border/updateStatus/:id", BorderController.updateStatus);

// delete border
//api/admin/deleteBorder/:id
adminRouter.delete("/border/delete/:id", BorderController.deleteBorder);

// ======================== Admin border end ========================

// ======================== Admin category ========================

const categoryFolder = "category";

// add new category
//api/admin/addCategory
adminRouter.post(
  "/category/add",
  uploadFile("image", categoryFolder),
  CategoryController.addCategory
);

// get category by id
//api/admin/getCategory/:id
adminRouter.get("/category/:id", CategoryController.getCategoryById);

// update category
//api/admin/updateCategory/:id
adminRouter.post(
  "/category/update/:id",
  uploadFile("image", categoryFolder),
  CategoryController.updateCategory
);

// update status category
//api/admin/updateStatus/:id
adminRouter.get("/category/updateStatus/:id", CategoryController.updateStatus);

// delete category
//api/admin/deleteCategory/:id
adminRouter.delete("/category/delete/:id", CategoryController.deleteCategory);

// ======================== Admin design ========================

// get all designs
//api/admin/getAllDesigns
adminRouter.get("/design/all", DesignController.getAllDesigns);

// add new design
//api/admin/design/add
adminRouter.post(
  "/design/add",
  uploadFile("image", "design"),
  DesignController.addDesign
);

// get design by id
//api/admin/design/:id
adminRouter.get("/design/:id", DesignController.getDesignById);

// update design
//api/admin/design/update/:id
adminRouter.post(
  "/design/update/:id",
  uploadFile("image", "design"),
  DesignController.updateDesign
);

// update status design
//api/admin/design/updateStatus/:id
adminRouter.get("/design/updateStatus/:id", DesignController.updateStatus);

// delete design
//api/admin/design/delete/:id
adminRouter.delete("/design/delete/:id", DesignController.deleteDesign);

// ======================== Admin dashboard ========================

// get all users
//api/admin/getAllUsers
adminRouter.get("/getAllUsers", AdminController.getAllUsers);

// get total sales
//api/admin/getTotalSales
adminRouter.get("/order/getTotalSales", AdminController.getTotalSales);

// get total orders
//api/admin/getTotalOrders
adminRouter.get("/order/getTotalOrders", AdminController.getTotalOrders);

// get total products sold
//api/admin/getTotalProductsSold
adminRouter.get(
  "/order/getTotalProductsSold",
  AdminController.getTotalProductsSold
);

// ========================  order ========================
// get all orders
//api/admin/getAllOrders
adminRouter.get("/order/getAllOrders", OrderController.getAllOrders);

// get daily orders
//api/admin/report/getDailyOrders
adminRouter.get("/report/getDailyOrders", ReportController.getDailyOrders);

// get monthly orders
//api/admin/report/getMonthlyOrders
adminRouter.get("/report/getMonthlyOrders", ReportController.getMonthlyOrders);

// get yearly orders
//api/admin/report/getYearlyOrders
adminRouter.get("/report/getYearlyOrders", ReportController.getYearlyOrders);

// ========================  report ========================


// ========================  report of sales ========================
// get daily sales report
//api/admin/report/getDailySales
adminRouter.get("/report/getDailySales", ReportController.getDailySales);

// get monthly sales report
//api/admin/report/getMonthlySales
adminRouter.get("/report/getMonthlySales", ReportController.getMonthlySales);

// get yearly sales report of each month
//api/admin/report/getYearlySales
adminRouter.get("/report/getYearlySales", ReportController.getYearlySales);

// ========================  report of sales end ========================

// ========================  report of product ========================
// get product with lowest sales
//api/admin/report/getLowestProducts
adminRouter.get(
  "/report/getLowestProducts",
  ReportController.getLowestProducts
);

// get product with highest sales
//api/admin/report/getHighestProducts
adminRouter.get(
  "/report/getHighestProducts",
  ReportController.getHighestProducts
);


// ========================  report of product end ========================

// ========================  report of payment  ========================
// get payment report
//api/admin/report/getPaymentReport
adminRouter.get("/report/getPaymentReport", ReportController.getPaymentReport);

export default adminRouter;
