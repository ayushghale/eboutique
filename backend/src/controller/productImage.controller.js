import Image from "../model/image.model.js";
import { errorHandler, successHandler } from '../uitls/response.js';


const ProductImageController = {
  // Create a new product image
  create: async (req, res) => {
    try {
      // Create a new product image
      const Image = await Image.create(req.body);
      return successHandler(res, Image);
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },
  // Get all product images
  findAll: async (req, res) => {
    try {
      // Find all product images
      const Image = await Image.findAll();
      return successHandler(res, Image);
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },
  // Get a single product image by id
  findOne: async (req, res) => {
    try {
      // Find the product image by id
      const productImage = await Image.findByPk(req.params.id);
      // If the product image is not found, send a 404 error
      if (!productImage) {
        return errorHandler(res, `Product image with id ${req.params.id} not found`, 404);
      }
      return successHandler(res, productImage);
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },
  // Update a product image by id
  update: async (req, res) => {
    try {
      // Find the product image by id
      const Image = await Image.findByPk(req.params.id);
      // If the product image is not found, send a 404 error
      if (!Image) {
        return errorHandler(res, `Product image with id ${req.params.id} not found`, 404);
      }
      // Update the product image
      await Image.update(req.body);
      return successHandler(res, "Product image updated successfully");
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },
  // Delete a product image by id
  delete: async (req, res) => {
    try {
      // Find the product image by id
      const Image = await Image.findByPk(req.params.id);
      // If the product image is not found, send a 404 error
      if (!Image) {
        return errorHandler(res, `Product image with id ${req.params.id} not found`, 404);
      }
      // Delete the product image
      await Image.destroy();
      return successHandler(res, "Product image deleted successfully");
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },
};

export default ProductImageController;


export async function addProductImages(productId, imageUrls) {
  try {
    // Map image URLs to objects with productId
    const images = imageUrls.map((imageUrl) => ({
      productId,
      url:imageUrl,
    }));

    // Bulk create images in the database
    const createdImages = await Image.bulkCreate(images);
    return createdImages;
  } catch (error) {
    // Handle error
    console.error("Error adding product images:", error);
    throw error; // Optional: Throw error for handling in caller function
  }
}