import User from "../../model/user.model.js"; // Import the User model
import { successHandler, errorHandler } from "../../uitls/response.js";
import bcrypt from "bcrypt";

const UserController = {
  // Function to get all users
  async getAllUsers(req, res) {
    try {
      // Call the findAll function from the user controller
      const users = await User.findAll();
      return successHandler(res, { users }, "Users fetched successfully", 200);
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },

  // Function to get a user by ID
  async getUserById(req, res) {
    try {
      const userId = parseInt(req.user); // Assuming you receive the user ID in the request parameters
      const id = parseInt(req.params.id);

      if (userId !== id) {
        return errorHandler(res, "Unauthorized", 401);
      }

      // Find the user by ID
      const user = await User.findByPk(userId, {
        attributes: { exclude: ["password", "refreshToken"] },
      });

      if (user) {
        return successHandler(res, { user }, "User fetched successfully", 200);
      } else {
        return errorHandler(res, "User not found", 404);
      }
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },

  // Function to add a new user
  async addUser(req, res) {
    try {
      const { name, address, phoneNumber, passsword, email, image } = req.body;

      const newUser = await User.create({
        name: name,
        address: address,
        phoneNumber: phoneNumber,
        passsword: passsword,
        email: email,
      });
      return successHandler(res, "User created successfully", 201);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Function to update a user
  async updateUser(req, res) {
    try {
      const userId = parseInt(req.user); // Assuming you receive the user ID in the request parameters
      const id = parseInt(req.params.id);
      const image = req.image || null;

      if (userId !== id) {
        return errorHandler(res, "Unauthorized", 401);
      }
      const { name, email, phoneNumber, address } = req.body; // Assuming you receive the user ID, new username, and new email in the request body

      // Find the user by ID
      const user = await User.findByPk(userId);

      if (user) {
        // Update the user's username and email
        await User.update(
          {
            name: name,
            email: email,
            phoneNumber: phoneNumber,
            address: address,
            image: image,
          },
          {
            where: {
              id: userId, // Condition to match the user ID
            },
          }
        );

        return successHandler(res, "User updated successfully", 200);
      } else {
        return errorHandler(res, "User not found", 404);
      }
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },

  // Function to change a user's credentials(password)

  async changeCredentials(req, res) {
    try {
      const userId = parseInt(req.user); // Assuming you receive the user ID in the request parameters
      const id = parseInt(req.params.id);

      if (userId !== id) {
        return errorHandler(res, "Unauthorized", 401);
      }

      const { currentPassword, newPassword, conformPassword } = req.body; // Assuming you receive the user ID, new username, and new email in the request body

      if (newPassword !== conformPassword) {
        return errorHandler(res, "Password does not match", 400);
      }
      const user = await User.findByPk(userId);

      const passwordMatch = await bcrypt.compare(
        currentPassword,
        user.password
      );


      if (passwordMatch) {

        const hashPassword = await bcrypt.hash(newPassword, 10);

        await User.update(
          {
            password: hashPassword,
          },
          {
            where: {
              id: userId, // Condition to match the user ID
            },
          }
        );
        return successHandler(res, "Password updated successfully", 200);
      } else {
        return errorHandler(res, "Password does not match", 400);
      }
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },

  // Function to delete a user
  async deleteUser(req, res) {
    try {
      const { userId } = req.body; // Assuming you receive the user ID in the request body

      // Find the user by ID
      const user = await User.findByPk(userId);

      if (user) {
        // Delete the user
        await User.destroy({
          where: {
            id: userId, // Condition to match the user ID
          },
        });

        res.status(200).json("User deleted successfully");
      } else {
        res.status(404).json("User not found");
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
export default UserController;

export async function updateRefreshToken(userId, refreshToken) {
  try {
    // Find the user by ID
    const user = await User.findByPk(userId);

    if (user) {
      // Update the user's refresh token
      await User.update(
        {
          refreshToken: refreshToken,
        },
        {
          where: {
            id: userId, // Condition to match the user ID
          },
        }
      );

      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
