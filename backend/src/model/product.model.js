import { DataTypes } from "sequelize";

import sequelize from "../config/sql.js";

import Category from "./category.model.js";

// product
// id: int
// name : String
// price : int
// image : String
// description : String
// category_id : int foreign key category(id)

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Category, // Use the Category model reference
      key: "id",
    },
  },
});

// Define associations
Product.belongsTo(Category, { foreignKey: "categoryId" });

export default Product;
