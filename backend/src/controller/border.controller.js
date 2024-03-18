import Border from '../model/border.model.js';

const BorderController = {
    // Get all borders
    async getAllBorders(req, res) {
        try {
            const borders = await Border.findAll();
            res.status(200).json(borders);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get border by ID
    async getBorder(req, res) {
        try {
            const borderId = req.params.id;
            console.log('Received borderId:', req.params.id);

            const border = await Border.findByPk(borderId);
            if (border) {
                res.status(200).json(border);
            } else {
                res.status(404).json("Border not found");
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Add new border
    async addBorder(req, res) {
        try {
            const { name, price, image, description } = req.body;
            console.log('Received name:', name);
            const newBorder = await Border.create({
                name: name,
                price: price,
                image: image,
                description: description
            });
            console.log('Border created:', newBorder);
            res.status(201).json("Border added successfully" + newBorder);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Update border
    async updateBorder(req, res) {
        try {
            const borderId = req.params.id;
            console.log('Received borderId:', req.params.id);

            const { name, image } = req.body; // Assuming you receive the user ID, new username, and new email in the request body

            // Find the user by ID
            const border = await Border.findByPk(borderId);

            console.log('Received border:', border);

            if (border) {
                // Update the user's username and email
                await Border.update(
                    {
                        name: name,
                        image: image,
                        // Add other fields to update as needed...
                    },
                    {
                        where: {
                            id: borderId, // Condition to match the user ID
                        },
                    }
                );

                res.status(200).json("Border updated successfully");
            } else {
                res.status(404).json("Border not found");
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Delete border
    async deleteBorder(req, res) {
        try {
            const borderId = req.params.id;
            console.log('Received borderId:', req.params.id);

            // Find the user by ID
            const border = await Border.findByPk(borderId);

            console.log('Received border:', border);

            if (border) {
                // Delete the user
                await Border.destroy({
                    where: {
                        id: borderId, // Condition to match the user ID
                    },
                });

                res.status(200).json("Border deleted successfully");
            }
            else {
                res.status(404).json("Border not found");
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

export default BorderController;