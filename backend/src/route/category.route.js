import { Router } from "express";

import CategoryController from "../controller/category.controller.js";

const categoryRouter = Router();

// get all categories
// api/category/getAllCategories
categoryRouter.get("/getAllCategories", CategoryController.getAllCategories);

// get category by id
// api/category/getCategoryById/:id
categoryRouter.get("/getCategoryById/:id", CategoryController.getCategoryById);

// add new category
// api/category/addCategory
categoryRouter.post("/addCategory", CategoryController.addCategory);

// update category
// api/category/updateCategory/:id
categoryRouter.put("/updateCategory/:id", CategoryController.updateCategory);

// delete category
// api/category/deleteCategory/:id
// categoryRouter.delete("/deleteCategory/:id", CategoryController.deleteCategory);

export default categoryRouter;