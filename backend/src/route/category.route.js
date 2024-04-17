import { Router } from "express";

import CategoryController from "../controller/category.controller.js";
import {postCategoryValidation} from "../validator/category.validator.js";
import uploadFile from "../middlewares/uploadFile.middleware.js";

const categoryFolder = "category";
//AdminMiddleware,
const categoryRouter = Router();

// get all categories
// api/category/getAllCategories
categoryRouter.get("/getAllCategories", CategoryController.getAllCategories);

// get category by id
// api/category/getCategory/:id
categoryRouter.get("/getCategory/:id", CategoryController.getCategoryById);


// add new category
// api/category/addCategory
categoryRouter.post("/add",
uploadFile("image", categoryFolder),
postCategoryValidation(), CategoryController.addCategory);

// update category
// api/category/updateCategory/:id
categoryRouter.post("/updateCategory/:id", postCategoryValidation(), CategoryController.updateCategory);

// delete category
// api/category/deleteCategory/:id
categoryRouter.get("/deleteCategory/:id",  CategoryController.deleteCategory);

// update Satatus
// api/category/updateStatus/:id
categoryRouter.get("/updateStatus/:id",  CategoryController.updateStatus);

export default categoryRouter;