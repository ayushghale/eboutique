import Design from '../model/design.model.js';

const DesignController = {
    // get all designs
    async getAllDesigns(req, res) {
        try {
            const designs = await Design.findAll();
            res.status(200).json(designs);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // get design by id
    async getDesignById(req, res) {
        try {
            const designId = req.params.id;
            console.log('Received designId:', req.params.id);

            const design = await Design.findByPk(designId);

            console.log('Received design:', design);

            if (design) {
                res.status(200).json(design);
            } else {
                res.status(404).json("Design not found");
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // add new design
    async addDesign(req, res) {
        try {
            const { name, price, image, description } = req.body;
            console.log('Received name:', name);
            const newDesign = await Design.create({
                name: name,
                price: price,
                image: image,
                description: description
            });
            console.log('Design created:', newDesign);
            res.status(201).json("Design added successfully" + newDesign);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // update design
    async updateDesign(req, res) {
        try {
            const designId = req.params.id;
            console.log('Received designId:', req.params.id);

            const { name, image, } = req.body; // Assuming you receive the user ID, new username, and new email in the request body

            // Find the user by ID
            const design = await Design.findByPk(designId);

            console.log('Received design:', design);

            if (design) {
                // Update the user's username and email
                await Design.update(
                    {
                        name: name,
                        image: image,
                        // Add other fields to update as needed...
                    },
                    {
                        where: {
                            id: designId, // Condition to match the user ID
                        },
                    }
                );

                res.status(200).json("Design updated successfully");
            } else {
                res.status(404).json("Design not found");
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // delete design
    async deleteDesign(req, res) {
        try {
            const designId = req.params.id;
            console.log('Received designId:', req.params.id);

            const design = await Design.findByPk(designId);

            console.log('Received design:', design);

            if (design) {
                await Design.destroy({
                    where: {
                        id: designId,
                    },
                });

                res.status(200).json("Design deleted successfully");

            }
            else {
                res.status(404).json("Design not found");
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

export default DesignController;