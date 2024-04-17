import Location from "../../model/location.model.js";
import { successHandler, errorHandler } from "../../uitls/response.js";

// Create a new location
const LocationController = {
  // get lacaiton by id
  findOne: async (req, res) => {
    try {
      const userId = req.user;
      const location = await Location.findOne({
        where: {
          id: req.params.id,
          userId: userId,
        },
      });
      return successHandler(res, location);
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },

  // get loaction by id which is default
  findDefaultLocation: async (req, res) => {
    try {
      const userParmaID = parseInt(req.params.id);
      const userID = parseInt(req.user);


      if (userParmaID !== userID) {
        return errorHandler(res, "Unauthorized", 401);
      }
      
      const location = await Location.findOne({
        where: {
          userId: userID,
          isDefault: true,
        },
      });
      return successHandler(res, location);
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },

  // Create a new location
  create: async (req, res) => {
    try {
      const userId = req.user;

      // Check if the user has a default address
      const defaultAddress = await defultAddress(userId);

      // return successHandler(res, defaultAddress);

      if (req.body.isDefault === "true" && defaultAddress) {
        await Location.update(
          {
            isDefault: false,
          },
          {
            where: {
              id: defaultAddress.id,
            },
          }
        );
      }

      let defaultAddressStatus = false;
      if (req.body.isDefault === "true") {
        defaultAddressStatus = true;
      }

      // Create a new location
      const location = await Location.create({
        userId: userId,
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        city: req.body.city,
        country: req.body.country,
        type: req.body.type,
        isDefault: defaultAddressStatus,
      });
      return successHandler(res, location, 201);
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },
  // Get all locations by user id
  findAllByUserId: async (req, res) => {
    try {
      const userId = parseInt(req.user);
      const id = parseInt(req.params.id);
      if (userId !== id) {
        return errorHandler(res, "Unauthorized", 401);
      }
      const locations = await Location.findAll({
        where: {
          userId: userId,
        },
      });
      return successHandler(res, locations);
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },
  // Update a location by id
  update: async (req, res) => {
    try {
      const location = await Location.findByPk(req.params.id);
      if (!location) {
        return errorHandler(res, "Location not found", 404);
      }


      // Check if the user has a default address
      const defaultAddress = await defultAddress(location.userId);
      if (req.body.isDefault === true && defaultAddress) {
        await Location.update(
          {
            isDefault: false,
          },
          {
            where: {
              id: defaultAddress.id,
            },
          }
        );
      }

      await Location.update(
        {
          name: req.body.name,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          address: req.body.address,
          city: req.body.city,
          country: req.body.country,
          type: req.body.type,
          isDefault: req.body.isDefault,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      return successHandler(res, "Location updated successfully");
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },
  // Delete a location by id
  delete: async (req, res) => {
    try {
      const location = await Location.findByPk(req.params.id);
      if (!location) {
        return errorHandler(res, "Location not found", 404);
      }
      await Location.destroy({
        where: {
          id: req.params.id,
        },
      });
      return successHandler(res, "Location deleted successfully");
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },
};

export default LocationController;

function defultAddress(userId) {
  return Location.findOne({
    where: {
      userId: userId,
      isDefault: true,
    },
  });
}
