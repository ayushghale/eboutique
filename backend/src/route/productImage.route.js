import { Router } from "express";

import ProductImageController from "../controller/productImage.controller";


const router = Router();

// Create a new product image
router.post("/", ProductImageController.create);

// Get all product images
router.get("/", ProductImageController.findAll);

// Get a single product image by id
router.get("/:id", ProductImageController.findOne);

// Update a product image by id
router.put("/:id", ProductImageController.update);

// Delete a product image by id
router.delete("/:id", ProductImageController.delete);

export default router;

