
import { Sequelize } from 'sequelize'; 
import dotenv from 'dotenv';

dotenv.config();

// Establish the connection to the MySQL database
const sequelize = new Sequelize({
  dialect: process.env.MYSQL_DB_CONNECTION, // type of database
  database: process.env.MYSQL_DB_DATABASE, // database name
  username: process.env.MYSQL_DB_USER, // database user
  password: process.env.MYSQL_DB_PASSWORD, // database password
  host: process.env.MYSQL_DB_HOST, // database host
   
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
