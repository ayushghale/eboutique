import { DataTypes } from "sequelize";
import sequelize from "../config/sql.js"; // Import the sequelize instance
import User from "./user.model.js";
import Product from "./product.model.js";

// Define the User model
const Favorite = sequelize.define("Favorite", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Favorite.belongsTo(User, { foreignKey: "userId" });
Favorite.belongsTo(Product, { foreignKey: "productId" });


// Create the table if it doesn't exist (with Sequelize.sync())

export default Favorite;
