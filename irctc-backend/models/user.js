const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust path as needed

const User = sequelize.define('User', {
  // Define your model attributes here
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = User;