const Booking = require('../models/booking');
const Train = require('../models/train');

exports.bookSeat = async (req, res) => {
  const transaction = await Train.sequelize.transaction();
  try {
    const { trainId } = req.body;
    const train = await Train.findByPk(trainId, { lock: transaction.LOCK.UPDATE, transaction });

    if (train.availableSeats <= 0) {
      await transaction.rollback();
      return res.status(400).json({ error: 'No seats available' });
    }

    await train.update({ availableSeats: train.availableSeats - 1 }, { transaction });

    const booking = await Booking.create(
      { userId: req.user.id, trainId },
      { transaction }
    );

    await transaction.commit();
    res.status(201).json({ message: 'Seat booked', bookingId: booking.id });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ error: error.message });
  }
};

exports.getBookingDetails = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await Booking.findByPk(bookingId);
    if (!booking || booking.userId !== req.user.id) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
