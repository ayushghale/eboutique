import e from "express";
import Favorite from "../../model/favorite.model.js";
import { successHandler, errorHandler } from "../../uitls/response.js";
import Category from "../../model/category.model.js";
import Review from "../../model/review.model.js";
import Product from "../../model/product.model.js";
import Image from "../../model/image.model.js";

const FavoriteController = {
  // Get all favorites
  create: async (req, res) => {
    try {
      const userID = req.user;
      const productID = parseInt(req.params.id);

      // Create a new favorite
      const favorite = await Favorite.create({
        userId: userID,
        productId: productID,
      });

      return successHandler(res, favorite, 201);
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },

  // Get all favorites
  findAllByUserId: async (req, res) => {
    try {
      const userParmaID = parseInt(req.params.id);
      const userID = parseInt(req.user);

      if (userParmaID !== userID) {
        return errorHandler(res, "Unauthorized", 401);
      }

      const favorites = await Favorite.findAll({
        where: {
          userID: userID,
        },
        include: [
          {
            model: Product,
            required: true,
            include: [
              {
                model: Category,
                required: true,
              },
              {
                model: Image,
                where: Product.id === Image.productId,
                required: false,
              },
            ],
          },
        ],
      });

      if (favorites.length === 0) {
        return errorHandler(res, "No favorites found", 404);
      }
      return successHandler(res, favorites);
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },

  // Delete a favorite by id
  remove: async (req, res) => {
    try {
      const userID = req.user;
      const favoriteID = req.params.id;

      const deletedFavorite = await Favorite.destroy({
        where: {
          id: favoriteID,
          userId: userID,
        },
      });

      if (deletedFavorite === 0) {
        return errorHandler(res, "Favorite not found", 404);
      }
      return successHandler(res, "Favorite deleted successfully");
     
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },
};

export default FavoriteController;
