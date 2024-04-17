import CustomDesign from "../model/customDesign.model.js";
import { errorHandler, successHandler } from "../uitls/response.js";

const CustomDesignController = {
  // get all customDesigns
  getAllCustomDesigns: async (req, res) => {
    try {
      const customDesigns = await CustomDesign.findAll();
      res.status(200).json(customDesigns);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // get customDesign by id
  getCustomDesignById: async (req, res) => {
    try {
      const customDesignId = req.params.id;

      const customDesign = await CustomDesign.findByPk(customDesignId);

      if (customDesign) {
        return successHandler(res, customDesign);
      } else {
        return errorHandler(res, "CustomDesign not found", 404);
      }
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },

  // search customDesign by  user id
  searchCustomDesignByUserId: async (req, res) => {
    try {
      const userId = req.user.id;

      const customDesigns = await CustomDesign.findAll({
        where: {
          userId: userId,
        },
      });

      if (customDesigns) {
        return successHandler(res, customDesigns);
      } else {
        return errorHandler(res, "CustomDesign not found", 404);
      }
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },

  // add new customDesign
  addCustomDesign: async (req, res) => {
    try {
        const userId = req.user.id;
      const { borderId, designId, color, name, image } = req.body;

      const newCustomDesign = await CustomDesign.create({
        userId: userId,
        borderId: borderId,
        designId: designId,
        color: color,
        name: name,
        image: image,
      });
      return successHandler(res, newCustomDesign, "CustomDesign added", 201);
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },

  // update customDesign
  updateCustomDesign: async (req, res) => {
    try {
      const customDesignId = req.params.id;

      const { borderId, designId, color, name, image } = req.body;

      // Find the user by ID
      const customDesign = await CustomDesign.findByPk(customDesignId);

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
  deleteCustomDesign: async (req, res) => {
    try {
      const customDesignId = req.params.id;

      // Find the user by ID
      const customDesign = await CustomDesign.findByPk(customDesignId);
      if (customDesign) {
        // Delete the user
        await CustomDesign.destroy({
          where: {
            id: customDesignId, // Condition to match the user ID
          },
        });

        return successHandler(res, null, "CustomDesign deleted", 204);
      } else {
        return errorHandler(res, "CustomDesign not found", 404);
      }
    } catch (error) {
        return errorHandler(res, error.message, 500);
    }
  },
};

export default CustomDesignController;
