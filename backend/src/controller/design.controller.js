import Design from "../model/design.model.js";
import { errorHandler, successHandler } from "../uitls/response.js";

const DesignController = {
  // get all designs
  getAllDesigns: async (req, res) => {
    try {
      const designs = await Design.findAll();
      return successHandler(res, designs);
    } catch (error) {
      return errorHandler(res, error);
    }
  },

  // get design by id
  getDesignById: async (req, res) => {
    try {
      const designId = req.params.id;

      const design = await Design.findByPk(designId);

      if (design) {
        return successHandler(res, design);
      } else {
        return errorHandler(res, "Design not found");
      }
    } catch (error) {
      return errorHandler(res, error);
    }
  },

  // add new design
  addDesign: async (req, res) => {
    try {
      const { name, price } = req.body;
      const image = req.image;

      const newDesign = await Design.create({
        name: name,
        price: price,
        image: image,
      });
      return successHandler(res, newDesign);
    } catch (error) {
      return errorHandler(res, error);
    }
  },

  // update design
  updateDesign: async (req, res) => {
    try {
      const designId = req.params.id;

      const { name, price } = req.body; // Assuming you receive the user ID, new username, and new email in the request body
      const image = req.image;
      // Find the user by ID
      const design = await Design.findByPk(designId);

      if (design) {
        // Update the user's username and email
        await Design.update(
          {
            name: name,
            image: image || design.image,
            price: price ,
          },
          {
            where: {
              id: designId, // Condition to match the user ID
            },
          }
        );
        return successHandler(res, "Design updated successfully");
      } else {
        return errorHandler(res, "Design not found");
      }
    } catch (error) {
      return errorHandler(res, error);
    }
  },

  // delete design
  deleteDesign: async (req, res) => {
    try {
      const designId = req.params.id;

      const design = await Design.findByPk(designId);

      if (design) {
        await Design.destroy({
          where: {
            id: designId,
          },
        });
        return successHandler(res, "Design deleted successfully");
      } else {
        return errorHandler(res, "Design not found");
      }
    } catch (error) {
      return errorHandler(res, error);
    }
  },

  updateStatus: async (req, res) => {
    try {
      const designId = parseInt(req.params.id);

      
      const status = "active";
      // Find the user by ID
      const design = await Design.findByPk(designId);

      if (design.status === "active") {
        status = "inactive";
      }

      if (design) {
        // Update the user's username and email
        await Design.update(
          {
            status: status,
          },
          {
            where: {
              id: designId, // Condition to match the user ID
            },
          }
        );
        return successHandler(res, "Design status updated successfully");
      } else {
        return errorHandler(res, "Design not found");
      }
    } catch (error) {
      return errorHandler(res, error);
    }
  },
};

export default DesignController;
