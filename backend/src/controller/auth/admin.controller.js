import Admin from "../../model/admin.model.js";
import { generateAccessToken } from "../../uitls/jwt.utils.js";
import { successHandler, errorHandler } from "../../uitls/response.js";


const AdminController = {
  // admin login
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const admin = await Admin.findOne({ where: { email: email } });

      if (!admin) {
        return errorHandler(res, "Admin not found", 404);
      }

      if (admin.password == password) {
        const vToken = generateAccessToken(admin._id, admin.email);

        return successHandler(res, { vToken }, "Login successfully", 200);
      }
      else {
        return errorHandler(res, "Invalid password", 400);
      }
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },

  //admin register
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      const admin = await Admin.findOne({ where: { email: email } });

      if (admin) {
        return errorHandler(res, "Admin already exists", 400);
      }

      const newAdmin = await Admin.create({
        name: name,
        email: email,
        password: password,
      });

      const vToken = generateToken(newAdmin._id, newAdmin.email);

      return successHandler(res, { vToken }, "Admin added successfully", 201);
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },

  // log out admin
  async logout(req, res) {
    try {
      const { admin } = req;

      admin.tokens = admin.tokens.filter((token) => {
        return token.token !== req.token;
      });

      await admin.save();

      return successHandler(res, {}, "Logout successfully", 200);
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },
};

export default AdminController;
