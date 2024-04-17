import { Router } from "express";
import uploadFile from "../middlewares/uploadFile.middleware.js";

import ProductController from "../controller/product.controller.js";
import { postCartValidation } from "../validator/product.validator.js";

const productImageFolder = "product";

const productRouter = Router();

// get all products
// api/product/getAllProducts
productRouter.get("/getAllProducts", ProductController.getAllProducts);

// get product by id
// api/product/getProductById/:id
productRouter.get("/getProductById/:id", ProductController.getProductById);

// add new product
// api/product/addProduct
productRouter.post(
  "/addProduct",
  uploadFile("gallery", productImageFolder),
  postCartValidation(),
  ProductController.addProduct
);

// update product
// api/product/updateProduct/:id
productRouter.post(
  "/updateProduct/:id",
  uploadFile("gallery", productImageFolder),
  postCartValidation(),
  ProductController.updateProduct
);


// delete product
// api/product/deleteProduct/:id
productRouter.delete("/deleteProduct/:id", ProductController.deleteProduct);

// get product by category
// api/product/getProductByCategory/:categoryId
productRouter.get(
  "/getProductByCategory/:categoryId",
  ProductController.getProductByCategory
);

// get product by status
// api/product/getProductByStatus/:status
productRouter.get(
  "/getProductByStatus/:status",
  ProductController.getProductByStatus
);

// get product by name
// api/product/getProductByName/:name
productRouter.get(
  "/getProductByName/:name",
  ProductController.getProductByName
);

export default productRouter;
