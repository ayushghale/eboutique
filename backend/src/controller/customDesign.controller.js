import CustomDesign from '../model/customDesign.model.js';

const CustomDesignController = {

    // get all customDesigns
    async getAllCustomDesigns(req, res) {
        try {
            const customDesigns = await CustomDesign.findAll();
            res.status(200).json(customDesigns);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // get customDesign by id
    async getCustomDesignById(req, res) {
        try {
            const customDesignId = req.params.id;
            console.log('Received customDesignId:', req.params.id);

            const customDesign = await CustomDesign.findByPk(customDesignId);

            console.log('Received customDesign:', customDesign);

            if (customDesign) {
                res.status(200).json(customDesign);
            } else {
                res.status(404).json("CustomDesign not found");
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // add new customDesign
    async addCustomDesign(req, res) {
        try {
            const { borderId, designId, color,name,image } = req.body;
    
            const newCustomDesign = await CustomDesign.create({
                borderId: borderId,
                designId: designId,
                color: color,
                name: name,
                image: image,
            });
            console.log('CustomDesign created:', newCustomDesign);
            res.status(201).json("CustomDesign added successfully" + newCustomDesign);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // update customDesign
    async updateCustomDesign(req, res) {
        try {
            const customDesignId = req.params.id;
            console.log('Received customDesignId:', req.params.id);

            const { borderId, designId, color,name,image } = req.body;

            // Find the user by ID
            const customDesign = await CustomDesign.findByPk(customDesignId);

            console.log('Received customDesign:', customDesign);

            if (customDesign) {
                // Update the user's username and email
                await CustomDesign.update(
                    {
                        borderId: borderId,
                        designId: designId,
                        color: color,
                        name: name,
                        image: image,
                    },
                    {
                        where: {
                            id: customDesignId, // Condition to match the user ID
                        },
                    }
                );

                res.status(200).json("CustomDesign updated successfully");
            } else {
                res.status(404).json("CustomDesign not found");
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // delete customDesign
    async deleteCustomDesign(req, res) {
        try {
            const customDesignId = req.params.id;
            console.log('Received customDesignId:', req.params.id);

            // Find the user by ID
            const customDesign = await CustomDesign.findByPk(customDesignId);

            console.log('Received customDesign:', customDesign);

            if (customDesign) {
                // Delete the user
                await CustomDesign.destroy({
                    where: {
                        id: customDesignId, // Condition to match the user ID
                    },
                });

                res.status(200).json("CustomDesign deleted successfully");

            }
            else {
                res.status(404).json("CustomDesign not found");
            }

        }



        catch (error) {
            res.status(500).json({ error: error.message });
        }

    }
};

export default CustomDesignController;