// // Import the required package
// import mysql from 'mysql';
// import dotenv from 'dotenv';
// // Load environment variables from .env
// dotenv.config();

// // Create the MySQL connection configuration
// const db = mysql.createConnection({
//   host: process.env.MYSQL_HOST,
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
//   database: process.env.MYSQL_DATABASE,
// });

// // Connect to MySQ
// export default async function connectToMYSQLDatabase() {
//   try {
//     await db.connect();
//     console.log(`Connected to MYSQL DB`);
//   } catch (e) { 
//     console.error("Failed to connect to DB:", e);
//   }
// }



import { Sequelize } from 'sequelize'; 
import dotenv from 'dotenv';

dotenv.config();

// Establish the connection to the MySQL database
const sequelize = new Sequelize({
  database: process.env.MYSQL_DB_DATABASE,
  username: process.env.MYSQL_DB_USER,
  password: process.env.MYSQL_DB_PASSWORD,
  host: process.env.MYSQL_DB_HOST,
  dialect: 'mysql', // Specifying the dialect (here, MySQL)
  
});

// Test the connection
(async () => {
  try {
    // await sequelize.authenticate();
    console.log('Connection to MySQL database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

export default sequelize;
