import Border from "../model/border.model.js";
import { errorHandler, successHandler } from "../uitls/response.js";

const BorderController = {
  // Get all borders
  getAllBorders: async (req, res) => {
    try {
      const borders = await Border.findAll();
      return successHandler(res, borders);
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },

  // Get border by ID
  getBorder: async (req, res) => {
    try {
      const borderId = req.params.id;

      const border = await Border.findByPk(borderId);
      if (border) {
        return successHandler(res, border);
      } else {
        return errorHandler(res, "Border not found", 404);
      }
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },

  // Add new border
  addBorder: async (req, res) => {
    try {
      const { name, price } = req.body;
      const image = req.image;
      const newBorder = await Border.create({
        name: name,
        price: price,
        image: image,
      });
      return successHandler(res, newBorder, 201);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update border
  updateBorder: async (req, res) => {
    try {
      const borderId = req.params.id;
      const { name, price } = req.body;

      // Find the border by ID
      const border = await Border.findByPk(borderId);
      const image = req.image;


      if (border) {
        // Update the border
        await Border.update(
          {
            name: name,
            price: price,
            image: image || border.image,
          },
          {
            where: {
              id: borderId, // Condition to match the border ID
            },
          }
        );

        return successHandler(res, "Border updated successfully", 200);
      } else {
        return errorHandler(res, "Border not found", 404);
      }
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },

  // Delete border
  deleteBorder: async (req, res) => {
    try {
      const borderId = req.params.id;

      // Find the user by ID
      const border = await Border.findByPk(borderId);

      if (border) {
        // Delete the user
        await Border.destroy({
          where: {
            id: borderId, // Condition to match the user ID
          },
        });
        return successHandler(res, "Border deleted successfully", 200);
      } else {
        return errorHandler(res, "Border not found", 404);
      }
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },

  // Update border status (active/inactive)
  updateStatus: async (req, res) => {
    try {
      const borderId = parseInt(req.params.id);
      let status = "active";
      // Find the border by ID
      const border = await Border.findByPk(borderId);

      if (border.status === "active") {
        status = "inactive";
      }
      //   return successHandler(res, { border, status });

      if (border) {
        // Update the border
        await Border.update(
          {
            status: status,
          },
          {
            where: {
              id: borderId, // Condition to match the border ID
            },
          }
        );

        res.status(200).json("Border status updated successfully");
      } else {
        res.status(404).json("Border not found");
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default BorderController;
