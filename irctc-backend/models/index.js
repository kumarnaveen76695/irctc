const sequelize = require('../config/database');
const User = require('./user');
const Train = require('./train');
const Booking = require('./booking');

User.hasMany(Booking);
Booking.belongsTo(User);

Train.hasMany(Booking);
Booking.belongsTo(Train);

sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  });

module.exports = {
  User,
  Train,
  Booking,
};
