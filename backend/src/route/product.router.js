import { Router } from "express";
import uploadFile from "../middlewares/uploadFile.middleware.js";

import ProductController from "../controller/product.controller.js";
import {postCartValidation} from "../validator/product.validator.js";

const productRouter = Router();

// get all products
// api/product/getAllProducts
productRouter.get("/getAllProducts", ProductController.getAllProducts);

// add new product
// api/product/addProduct
productRouter.post(
  "/addProduct",
  uploadFile(),
  postCartValidation(),
  ProductController.addProduct
);

// update product
// api/product/updateProduct/:id
productRouter.put("/updateProduct/:id", ProductController.updateProduct);

// delete product
// api/product/deleteProduct/:id
productRouter.delete("/deleteProduct/:id", ProductController.deleteProduct);

export default productRouter;
