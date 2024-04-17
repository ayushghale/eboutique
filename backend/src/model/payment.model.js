import { DataTypes } from "sequelize";

import sequelize from "../config/sql.js"; // Import the Sequelize instance
import User from "./user.model.js"; // Import the User model
import Order from "./order.model.js"; // Import the Order model

const Payment = sequelize.define("Payment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Order, // Assuming your order model is named 'Order'
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
  totalPrice: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paymentStatus: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "pending",
  },
  onlineTCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  
});

// Define associations if needed
Payment.belongsTo(Order, { foreignKey: "orderId" });
Payment.belongsTo(User, { foreignKey: "userId" });


export default Payment;
