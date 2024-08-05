const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Train = require('./train');

const Booking = sequelize.define('Booking', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  trainId: {
    type: DataTypes.INTEGER,
    references: {
      model: Train,
      key: 'id',
    },
  },
});

module.exports = Booking;
