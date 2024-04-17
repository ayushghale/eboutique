import sequelize from "../config/sql.js"; // Assuming sequelize is properly configured in this file

import Admin from "./admin.model.js";
import User from "./user.model.js";
import Product from "./product.model.js";
import Order from "./order.model.js";
import OrderDetails from "./orderDetails.model.js";
import Review from "./review.model.js";
import Cart from "./cart.model.js";
import Category from "./category.model.js";
import CustomDesign from "./customDesign.model.js";
import Border from "./border.model.js";
import Design from "./design.model.js";
import Favorite from "./favorite.model.js";
import Location from "./location.model.js";
import Image from "./image.model.js";
import UserVerification from "./userVerification.model.js";
import Payment from "./payment.model.js";

const db = {};

db.sequelize = sequelize;
db.Admin = Admin;
db.User = User;
db.Category = Category;
db.Product = Product;
db.Border = Border;
db.Design = Design;
db.Order = Order;
db.OrderDetails = OrderDetails;
db.Review = Review;
db.Cart = Cart;
db.CustomDesign = CustomDesign;
db.Favorite = Favorite;
db.Location = Location;
db.Image = Image;
db.UserVerification = UserVerification;

// Define associations
// category has many products
Category.hasMany(Product, {
  foreignKey: "categoryId",
});
Product.belongsTo(Category, {
  foreignKey: "categoryId",
});

// product has many images
Product.hasMany(Image, {
  foreignKey: "productId",
});
Image.belongsTo(Product, {
  foreignKey: "productId",
});

// product has many reviews
Product.hasMany(Review, {
  foreignKey: "productId",
});
Review.belongsTo(Product, {
  foreignKey: "productId",
});

// oreder and location 
Order.belongsTo(Location, {
  foreignKey: "locationId",
});
Location.hasMany(Order, {
  foreignKey: "locationId",
});

// product has many orders
Product.hasMany(OrderDetails, {
  foreignKey: "productId",
});
OrderDetails.belongsTo(Product, {
  foreignKey: "productId",
});

// order has many order details
Order.hasMany(OrderDetails, {
  foreignKey: "orderId",
});
OrderDetails.belongsTo(Order, {
  foreignKey: "orderId",
});

// order one  payments
Order.hasOne(Payment, {
  foreignKey: "orderId",
});
Payment.belongsTo(Order, {
  foreignKey: "orderId",
});

// user has many orders
User.hasMany(Order, {
  foreignKey: "userId",
});

Order.belongsTo(User, {
  foreignKey: "userId",
});

// user has many user verifications
User.hasMany(UserVerification, {
  foreignKey: "userId",
});
UserVerification.belongsTo(User, {
  foreignKey: "userId",
});

// user has many reviews
User.hasMany(Review, {
  foreignKey: "userId",
});
Review.belongsTo(User, {
  foreignKey: "userId",
});

// user has many carts
User.hasMany(Cart, {
  foreignKey: "userId",
});
Cart.belongsTo(User, {
  foreignKey: "userId",
});

// user has many favorites
User.hasMany(Favorite, {
  foreignKey: "userId",
});
Favorite.belongsTo(User, {
  foreignKey: "userId",
});

// user has many locations
User.hasMany(Location, {
  foreignKey: "userId",
});

Location.belongsTo(User, {
  foreignKey: "userId",
});

// user has many custom designs
User.hasMany(CustomDesign, {
  foreignKey: "userId",
});
CustomDesign.belongsTo(User, {
  foreignKey: "userId",
});

// custom design has many borders
CustomDesign.hasMany(Border, {
  foreignKey: "customDesignId",
});
Border.belongsTo(CustomDesign, {
  foreignKey: "customDesignId",
});

// custom design has many designs
CustomDesign.hasMany(Design, {
  foreignKey: "customDesignId",
});

Design.belongsTo(CustomDesign, {
  foreignKey: "customDesignId",
});





sequelize
  .sync()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err); // Changed to console.error for better indication of errors
    process.exit(1); // Terminate the application if unable to connect to the database
  });
export default db;
