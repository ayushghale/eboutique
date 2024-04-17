import { DataTypes } from "sequelize";

import sequelize from "../config/sql.js";

const Admin = sequelize.define("Admin", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role:{
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status : {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "active",
  },
});


export default Admin;
