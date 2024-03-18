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
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
Admin.sync()
  .then(() => {
    console.log("Admin model synchronized with the database.");
  })
  .catch((error) => {
    console.error("Error synchronizing Admin model:", error);
  });
export default Admin;
