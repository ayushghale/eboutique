import Admin from '../../model/admin.model.js';
import TCode from '../../uitls/TCodeGenerate.js'

import { successHandler, errorHandler } from "../../uitls/response.js";


const AdminController = {

    // Get all admins
    async getAllAdmins(req, res) {
        try {
            const admins = await Admin.findAll();
            res.status(200).json(admins);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get admin by ID
    async getAdmin(req, res) {
        try {
            const adminId = req.params.id;
            console.log('Received adminId:', req.params.id);

            const admin = await Admin.findByPk(adminId);
            if (admin) {
                res.status(200).json(admin);
            } else {
                res.status(404).json("Admin not found");
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Add new admin
    async addAdmin(req, res) {
        try {
            const { name, email, password } = req.body;
            console.log('Received username:', name);
            const newAdmin = await Admin.create({
                name: name,
                email: email,
                password: Hash(password)
            });
            console.log('Admin created:', newAdmin);
            res.status(201).json("Admin added successfully" + newAdmin);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Update admin
    async updateAdmin(req, res) {
        try {
            const adminId = req.params.id;
            console.log('Received adminId:', req.params.id);

            const { name, email, password } = req.body; // Assuming you receive the user ID, new username, and new email in the request body

            
            // Find the user by ID
            const admin = await Admin.findByPk(adminId);

            console.log('Received admin:', admin);

            if (admin) {
                // Update the user's username and email
                await Admin.update(
                    {
                        name: name,
                        email: email,
                        password: password
                        // Add other fields to update as needed...
                    },
                    {
                        where: {
                            id: adminId, // Condition to match the user ID
                        },
                    }
                );

                res.status(200).json("Admin updated successfully" );
            } else {
                res.status(404).json("Admin not found");
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Delete admin
    async deleteAdmin(req, res) {
        try {
            const adminId = req.params.id;
            console.log('Received adminId:', req.params.id);

            // Find the user by ID
            const admin = await Admin.findByPk(adminId);

            console.log('Received admin:', admin);

            if (admin) {
                // Delete the user
                await Admin.destroy({
                    where: {
                        id: adminId, // Condition to match the user ID
                    },
                });

                res.status(200).json("Admin deleted successfully");
            }
            else {
                res.status(404).json("Admin not found");
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

export default AdminController;
