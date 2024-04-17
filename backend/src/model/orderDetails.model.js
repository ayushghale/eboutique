import { DataTypes } from "sequelize";
import sequelize from "../config/sql.js";
import Product from "./product.model.js";
import Order from "./order.model.js";
import CustomDesign from "./customDesign.model.js";

const OrderDetail = sequelize.define("OrderDetail", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Order,
      key: "id",
    },
  },
  customDesignId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: CustomDesign,
      key: "id",
    },
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Product,
      key: "id",
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1, // Default value for quantity
  },
  tCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// Define associations if needed
OrderDetail.belongsTo(Order, { foreignKey: "orderId" });
OrderDetail.belongsTo(Product, { foreignKey: "productId" });
OrderDetail.belongsTo(CustomDesign, { foreignKey: "customDesignId" });

export default OrderDetail;
