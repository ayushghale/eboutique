import { DataTypes } from "sequelize";

import sequelize from "../config/sql.js";

import Border from "./border.model.js";
import Design from "./design.model.js";
import User from "./user.model.js";

const CustomDesign = sequelize.define("CustomDesign", {
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
  borderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Border,
      key: "id",
    },
  },
  designId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Design,
      key: "id",
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

CustomDesign.belongsTo(Border, { foreignKey: "borderId" });
CustomDesign.belongsTo(Design, { foreignKey: "designId" });
CustomDesign.belongsTo(User, { foreignKey: "userId" });


// Define associations if needed



export default CustomDesign;
