import { DataTypes } from "sequelize";

import sequelize from "../config/sql.js";

const Category = sequelize.define("Category", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Category.sync()
  .then(() => {
    console.log("Category model synchronized with the database.");
  })
  .catch((error) => {
    console.error("Error synchronizing Category model:", error);
  });

export default Category;
