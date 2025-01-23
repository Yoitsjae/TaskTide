const { Sequelize } = require('sequelize');

// Load environment variables
require('dotenv').config();

// Database connection
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false, // Disable logging; set to true for debugging
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to the database successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
    process.exit(1); // Exit the application if database connection fails
  }
};

module.exports = sequelize;
module.exports.connectDB = connectDB;
