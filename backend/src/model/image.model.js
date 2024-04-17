import { DataTypes } from "sequelize";
import sequelize from "../config/sql.js";
import Product from "./product.model.js";

const Image = sequelize.define("Image", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Product,
      key: "id",
    },
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "active",
  },
});

Image.belongsTo(Product, { foreignKey: "productId" });

Image.associations = () => {
  Image.belongsTo(Product, { foreignKey: "productId" });
};

export default Image;