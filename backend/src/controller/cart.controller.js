import Cart from '../model/cart.model.js';

const CartController = {
    async getAllCarts(req, res) {
        try {
            const carts = await Cart.findAll();
            res.status(200).json(carts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async addCart(req, res) {
        try {
            const { userId, productId, quantity } = req.body;
            console.log('Received userId:', userId);
            const newCart = await Cart.create({
                userId: userId,
                productId: productId,
                quantity: quantity
            });
            console.log('Cart created:', newCart);
            res.status(201).json("Cart added successfully" + newCart);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateCart(req, res) {
        try {
            const cartId = req.params.id;
            console.log('Received cartId:', req.params.id);

            const { newUserId, newProductId, newQuantity } = req.body; // Assuming you receive the user ID, new username, and new email in the request body

            // Find the user by ID
            const cart = await Cart.findByPk(cartId);

            console.log('Received cart:', cart);

            if (cart) {
                // Update the user's username and email
                await Cart.update(
                    {
                        userId: newUserId,
                        productId: newProductId,
                        quantity: newQuantity
                        // Add other fields to update as needed...
                    },
                    {
                        where: {
                            id: cartId, // Condition to match the user ID
                        },
                    }
                );

                res.status(200).json("Cart updated successfully");
            } else {
                res.status(404).json("Cart not found");
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async deleteCart(req, res) {
        try {
            const cartId = req.params.id;
            console.log('Received cartId:', req.params.id);

            // Find the user by ID
            const cart = await Cart.findByPk(cartId);

            console.log('Received cart:', cart);

            if (cart) {
                // Delete the user
                await Cart.destroy({
                    where: {
                        id: cartId, // Condition to match the user ID
                    },
                });

                res.status(200).json("Cart deleted successfully");
            }
            else {
                res.status(404).json("Cart not found");
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

export default CartController;