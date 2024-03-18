import { request } from "express";
import Product from "../model/product.model.js";
import { json } from "sequelize";

const ProductController = {
  // get all products
  async getAllProducts(req, res) {
    try {
      const products = await Product.findAll();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // get product by id
  async getProductById(req, res) {
    try {
      const productId = req.params.id;
      const product = await Product.findByPk(productId);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json("Product not found");
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
// add new product
  async addProduct(req, res) {
    try {
      console.log(req.body);
      const { productName, price,  description, categoryId } = req.body;
      const image = req.image;
      const product = await Product.create(
        {
          name: productName,
          price: price,
          image: image,
          description: description,
          categoryId: categoryId,
        }
      );
      res.status(201).json("Product added successfully" + product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // update product
  async updateProduct(req, res) {
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
};

export default ProductController;