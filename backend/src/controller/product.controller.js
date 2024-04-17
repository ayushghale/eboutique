import { request } from "express";
import Product from "../model/product.model.js";
import Category from "../model/category.model.js";
import Image from "../model/image.model.js";
import Review from "../model/review.model.js";
import { errorHandler, successHandler } from "../uitls/response.js";

import {addProductImages} from "../controller/productImage.controller.js";

const ProductController = {
  // get all products
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.findAll({
        include: [
          {
            model: Category,
            required: true // Inner join with Category table
          },
          {
            model: Image,
            where: Product.id === Image.productId,
            required:false
          },{
            model: Review,
            where: Product.id === Review.productId,
            required:false
          }
        ]
      });
      return successHandler(res, products, 200);
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },

  // get product by id
  getProductById: async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await Product.findByPk(productId, {
        include: [
          {
            model: Category,
            required: true // Inner join with Category table
          },
          {
            model: Image,
            where: Product.id === Image.productId,
            required:false
          },
          {
            model: Review,
            where: Product.id === Review.productId,
            required:false
          }
        ]
      });

      if (product) {
        return successHandler(res, product, 200);
      } else {
        return errorHandler(res, "Product not found", 404);
      }
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },

  // add new product
  addProduct: async (req, res) => {
    try {

      console.log("Request body:=====================", req.body);
      const { name, price, description, categoryId } = req.body;
      
      // Create product
      const product = await Product.create({
        name,
        price,
        description,
        categoryId,
      });
  
      console.log("Uploaded gallery:", req.galleryImages);

      const imageURls = req.galleryImages;
      const productId = product.id;

      const addImage = addProductImages( productId,imageURls);


      if (addImage) {

        const data = {
          product: product,
          image: imageURls,
        }
        return successHandler(res, data, 201);
      } else {
        return errorHandler(res, " Product is added but not images", 404);
      }
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },

  // update product
  updateProduct: async (req, res) => {
    try {
      const product = await Product.update(req.body, {
        where: { id: req.params.id },
      });
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async deleteProduct(req, res) {
    try {
      const product = await Product.destroy({ where: { id: req.params.id } });
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // get product by category
  getProductByCategory: async (req, res) => {
    try {
      const categoryId = req.params.categoryId;
      const products = await Product.findAll({
        where: { categoryId: categoryId },
        include: Category,
      });
      return successHandler(res, products, 200);
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },

  // get product by search
  getProductByName: async (req, res) => {
    try {
      const search = req.params.name;
      const products = await Product.findAll({
        where: {
          name: {
            [Op.like]: "%" + search + "%",
          },
        },
        include: Category,
      });
      return successHandler(res, products, 200);
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },
  // get product by status
  getProductByStatus: async (req, res) => {
    try {
      const status = req.params.status;
      const products = await Product.findAll({
        where: { status: status },
        include: Category,
      });
      return successHandler(res, products, 200);
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },
};

export default ProductController;
