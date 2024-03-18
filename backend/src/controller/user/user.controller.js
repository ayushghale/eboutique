import User from "../../model/user.model.js"; // Import the User model

const UserController = {
  // Function to get all users
  async getAllUsers(req, res) {
    try {
      // Call the findAll function from the user controller
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
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
        image: image,
      });
      console.log("User created:", newUser);
      res.status(201).json("User added successfully" + newUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Function to update a user
  async updateUser(req, res) {
    try {
      const userId = req.params.id;
      console.log("Received userId:", req.params.id);

      const { name, newEmail } = req.body; // Assuming you receive the user ID, new username, and new email in the request body

      // Find the user by ID
      const user = await User.findByPk(userId);

      console.log("Received user:", user);

      if (user) {
        // Update the user's username and email
        await User.update(
          {
            name: name,
            email: newEmail,
            // Add other fields to update as needed...
          },
          {
            where: {
              id: userId, // Condition to match the user ID
            },
          }
        );

        res.status(200).json("User updated successfully");
      } else {
        res.status(404).json("User not found");
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
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

  async updateRefreshToken(userId, refreshToken) {
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
