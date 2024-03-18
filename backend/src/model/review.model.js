import { DataTypes } from "sequelize";

import sequelize from "../config/sql.js";

import User from "./user.model.js";
import Product from "./product.model.js";

const Review = sequelize.define("Review", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, // Use the actual User Sequelize model reference
      key: "id",
    },
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product, // Use the actual Product Sequelize model reference
      key: "id",
    },
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  review: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define associations
Review.belongsTo(User, { foreignKey: "userId" });
Review.belongsTo(Product, { foreignKey: "productId" });


export default Review;
