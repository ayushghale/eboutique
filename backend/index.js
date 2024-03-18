import sequelize from "./src/config/sql.js";
import express from "express";
import cors from "cors";
// Import the main router
import mainRouter from "./src/main.route.js";

const db = sequelize;

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());
app.use("/api", mainRouter);

// Check the database connection

sequelize
  .sync()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Unable to connect to the database:", err);
  });

app.listen(PORT, async () => {
  console.log("express server is running", PORT);
  // console.log(await blogCategoryRelModel.find().populate(["blog", "category"]));
});