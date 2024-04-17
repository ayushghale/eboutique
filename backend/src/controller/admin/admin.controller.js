import Admin from "../../model/admin.model.js";
import TCode from "../../uitls/TCodeGenerate.js";
import User from "../../model/user.model.js";
import Order from "../../model/order.model.js";
import OrderDetails from "../../model/orderDetails.model.js";

import { successHandler, errorHandler } from "../../uitls/response.js";

const AdminController = {
  // Get all admins
  async getAllAdmins(req, res) {
    try {
      const admins = await Admin.where({ role: "admin" }).findAll();
      return successHandler(
        res,
        { admins },
        "Admins fetched successfully",
        200
      );
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },

  // Get staff
  async getStaff(req, res) {
    try {
      const staff = await Admin.where({ role: "staff" }).findAll();
      return successHandler(res, { staff }, "Staff fetched successfully", 200);
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },

  // Get admin by ID
  async getAdmin(req, res) {
    try {
      const adminId = req.admin.id;

      const admin = await Admin.findByPk(adminId);
      if (admin) {
        return successHandler(
          res,
          { admin },
          "Admin fetched successfully",
          200
        );
      } else {
        return errorHandler(res, "Admin not found", 404);
      }
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },

  // Add new admin
  async addAdmin(req, res) {
    try {
      const { name, email, password } = req.body;
      console.log("Received username:", name);
      const newAdmin = await Admin.create({
        name: name,
        email: email,
        password: Hash(password),
      });
      return successHandler(res, { newAdmin }, "Admin added successfully", 201);
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },

  // Update admin
  async updateAdmin(req, res) {
    try {
      const adminId = req.admin.id;
      const { name, email, password } = req.body;
      // Find the user by ID
      const admin = await Admin.findByPk(adminId);

      if (admin) {
        await Admin.update(
          {
            name: name,
            email: email,
            password: password,
            // Add other fields to update as needed...
          },
          {
            where: {
              id: adminId, // Condition to match the user ID
            },
          }
        );
        return successHandler(res, "Admin updated successfully", 200);
      } else {
        return errorHandler(res, "Admin not found", 404);
      }
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },

  // Delete admin
  async deleteAdmin(req, res) {
    try {
      const adminId = req.admin.id;
      // Find the user by ID
      const admin = await Admin.findByPk(adminId); // find the admin by ID

      if (admin) {
        await Admin.destroy({
          where: {
            id: adminId, // Condition to match the user ID
          },
        });

        return successHandler(res, "Admin deleted successfully", 200);
      } else {
        return errorHandler(res, "Admin not found", 404);
      }
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },

  // update stataus
  async updateStatus(req, res) {
    try {
      const adminId = req.params.id;
      const status ="active";
      const admin = await Admin.findByPk(adminId);
      if (admin.status == "active") {
        status = "inactive";
      } else if (admin.status == "inactive") {
        status = "active";
      }
      await Admin.update(
        {
          status: status,
        },
        {
          where: {
            id: adminId,
          },
        }
      );
      return successHandler(res, "Admin status updated to active", 200);
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },

  // Get all users
  async getAllUsers(req, res) {
    try {
      const users = await User.findAll(
        {attributes: {exclude: ['password']} }
      );
      return successHandler(res,  users , "Users fetched successfully", 200);
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },

  // Get total sales
  async getTotalSales(req, res) {
    try {
      const totalSales = await Order.sum("totalPrice");
      return successHandler(res, totalSales, "Total sales fetched successfully", 200);
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },

  // get total orders
  async getTotalOrders(req, res) {
    try {
      const totalOrders = await Order.count();
      return successHandler(res, totalOrders, "Total orders fetched successfully", 200);
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },

  // get total products sold
  async getTotalProductsSold(req, res) {
    try {
      const totalProductsSold = await OrderDetails.sum("quantity");
      return successHandler(res, totalProductsSold, "Total products sold fetched successfully", 200);
    } catch (error) {
      return errorHandler(res, error.message, 500);
    }
  },


};

export default AdminController;
