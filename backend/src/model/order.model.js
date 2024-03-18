import { DataTypes } from "sequelize";

import sequelize from "../config/sql.js";
import User from "./user.model.js"; // Import the User model

const Order = sequelize.define("Order", {
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
  totalPrice: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Pending'
  },
});

// Define associations if needed
Order.belongsTo(User, { foreignKey: "userId" });

export default Order;
