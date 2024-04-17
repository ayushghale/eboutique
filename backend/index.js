// Import necessary modules
import express from "express";
import cors from "cors";
import sequelize from "./src/config/sql.js"; // Assuming sequelize is properly configured in this file
import mainRouter from "./src/main.route.js"; // Assuming this file contains your main router

import Db from "./src/model/index.js";

// Initialize sequelize and database connection
// const db = sequelize;

Db.sequelize

// Create an Express application
const app = express();
const PORT = process.env.MYSQL_DB_PORT || 8080; // Use the provided PORT or default to 8080

// Middleware setup
app.use(express.json()); // Parse incoming request bodies in JSON format
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use("/api", mainRouter); // Mount main router at /api endpoint

// Start the Express server
app.listen(PORT, () => {
  console.log("Express server is running on port", PORT);
});
