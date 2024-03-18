import { DataTypes } from "sequelize";

import sequelize from "../config/sql.js";

import Product from "./product.model.js";
import User from "./user.model.js";
import customDesign from "./customDesign.model.js";


const Cart = sequelize.define("Cart", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  customDesignId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: customDesign, // Assuming your product model is named 'Product'
      key: "id",
    },
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Product, // Assuming your product model is named 'Product'
      key: "id",
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, // Assuming your user model is named 'User'
      key: "id",
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1, // Default value for quantity
  },
});

// Define associations if needed
Cart.belongsTo(Product, { foreignKey: "productId" });
Cart.belongsTo(User, { foreignKey: "userId" });
Cart.belongsTo(customDesign, { foreignKey: "customDesignId" });

export default Cart;
