import { DataTypes } from "sequelize";

import sequelize from "../config/sql.js";

import Border from "./border.model.js";
import Design from "./design.model.js";

const CustomDesign = sequelize.define('CustomDesign', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    borderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Border, // Assuming your border model is named 'Border'
        key: 'id',
      },
    },
    designId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Design, // Assuming your design model is named 'Design'
        key: 'id',
      },
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  
  // Define associations if needed
  CustomDesign.belongsTo(Border, { foreignKey: 'borderId' });
  CustomDesign.belongsTo(Design, { foreignKey: 'designId' });
  
  export default CustomDesign;