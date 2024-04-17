import Cart from "../model/cart.model.js";
import Image from "../model/image.model.js";
import Category from "../model/category.model.js";
import CustomDesign from "../model/customDesign.model.js";
import Product from "../model/product.model.js";
import { successHandler, errorHandler } from "../uitls/response.js";

const CartController = {
  // getcart by user id
  getCartByUserId: async (req, res) => {
    try {
      const userId = req.user;

      const carts = await Cart.findAll({
        where: {
          userId: userId,
        },
        include: [
          {
            model: Product,
            required: false,
            include: [
              {
                model: Category,
                required: false,
              },
              {
                model:Image,
                required:false
              }
            ],
          },
          {
            model: CustomDesign,
            required: false,
          },
        ],
      });


      if (carts) {
        return successHandler(res, carts);
      }
      return errorHandler(res, "Cart not found", 404);
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },

  // get all carts
  addCart: async (req, res) => {
    try {
      const userId = req.user;

      if (req.body.customDesignId) {
        const { customDesignId } = req.body;
        const newCart = await Cart.create({
          userId: userId,
          customDesignId: customDesignId,
          quantity: 1,
        });

        return successHandler(res, newCart);
      } else {
        const { productId, quantity } = req.body;

        if (!productId || !quantity) {
          return errorHandler(res, "productId and quantity are required", 400);
        }

        const ProductExistInCart = await Cart.findOne({
          where: {
            userId: userId,
            productId: productId,
          },
        });

        if (ProductExistInCart) {

          const newQuantity = parseInt(ProductExistInCart.quantity) + parseInt(quantity);

          await Cart.update(
            { quantity: newQuantity },
            {
              where: {
                userId: userId,
                productId: productId,
              },
            }
          );
          return successHandler(res, "Cart updated successfully", 200);
        }
        const newCart = await Cart.create({
          userId: userId,
          productId: productId,
          quantity: quantity,
        });

        return successHandler(res, newCart);
      }
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },

  // get : increase cart quantity
  increaseCartQuantity: async (req, res) => {
    try {
      const cartId = req.params.id;
      const userId = req.user;

      if (!cartId) {
        return errorHandler(res, "Cart ID is required", 400);
      }

      if (!userId) {
        return errorHandler(res, "User ID is required", 400);
      }

      const cart = await Cart.findByPk(cartId);

      const newQuantity = cart.quantity + 1;

      if (cart) {
        // Update the user's username and email
        await Cart.update(
          { quantity: newQuantity },
          {
            where: {
              id: cartId, // Condition to match the user ID
            },
          }
        );

        const carts = await Cart.findAll({
          where: {
            userId: userId,
          },
          include: [
            {
              model: Product,
              required: false,
              include: [
                {
                  model: Category,
                  required: false,
                },
                {
                  model:Image,
                  required:false
                }
              ],
            },
            {
              model: CustomDesign,
              required: false,
            },
          ],
        });
        
        if (carts) {
          return successHandler(res, carts);
        }
        return errorHandler(res, "Cart not found", 404);
      } else {
        return errorHandler(res, "Cart not found", 404);
      }
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },
  // Get : decrease cart quantity
  decreaseCartQuantity: async (req, res) => {
    try {
      const cartId = req.params.id;
      const userId = req.user;

      if (!cartId) {
        return errorHandler(res, "Cart ID is required", 400);
      }

      if (!userId) {
        return errorHandler(res, "User ID is required", 400);
      }

      const cart = await Cart.findByPk(cartId);

      if (cart.quantity === 1) {
        return errorHandler(res, "Cart quantity cannot be less than 1", 400);
      }

      const newQuantity = cart.quantity - 1;

      if (cart) {
        // Update the user's username and email
        await Cart.update(
          { quantity: newQuantity },
          {
            where: {
              id: cartId, // Condition to match the user ID
            },
          }
        );
        const carts = await Cart.findAll({
          where: {
            userId: userId,
          },
          include: [
            {
              model: Product,
              required: false,
              include: [
                {
                  model: Category,
                  required: false,
                },
                {
                  model:Image,
                  required:false
                }
              ],
            },
            {
              model: CustomDesign,
              required: false,
            },
          ],
        });

        if (carts) {
          return successHandler(res, carts);
        }
        return errorHandler(res, "Cart not found", 404);
      } else {
        return errorHandler(res, "Cart not found", 404);
      }
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },

  // delete cart
  deleteCart: async (req, res) => {
    try {
      const cartId = req.params.id;
      const userId = req.user;


      // Find the user by ID
      const cart = await Cart.findByPk(cartId);

      console.log("Received cart:", cart);

      if (cart) {
        // Delete the user
        await Cart.destroy({
          where: {
            id: cartId, // Condition to match the user ID
          },
        });
        const carts = await Cart.findAll({
          where: {
            userId: userId,
          },
          include: [
            {
              model: Product,
              required: false,
              include: [
                {
                  model: Category,
                  required: false,
                },
                {
                  model:Image,
                  required:false
                }
              ],
            },
            {
              model: CustomDesign,
              required: false,
            },
          ],
        });
        
        if (carts) {
          return successHandler(res, carts);
        }
        return errorHandler(res, "Cart not found", 404);

      } else {
        return errorHandler(res, "Cart not found", 404);
      }
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },
};

export default CartController;

async function cartData(userID) {
  const carts = await Cart.findAll({
    where: {
      userId: userID,
    },
    include: [
      {
        model: Product,
        required: false,
        include: [
          {
            model: Category,
            required: false,
          },
          {
            model:Image,
            required:false
          }
        ],
      },
      {
        model: CustomDesign,
        required: false,
      },
    ],
  });

  return carts;
}
