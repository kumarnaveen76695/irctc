const Train = require('../models/train');

exports.addTrain = async (req, res) => {
  try {
    const { name, source, destination, totalSeats } = req.body;
    const train = await Train.create({ name, source, destination, totalSeats, availableSeats: totalSeats });
    res.status(201).json({ message: 'Train added', trainId: train.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTrains = async (req, res) => {
  try {
    const { source, destination } = req.query;
    const trains = await Train.findAll({ where: { source, destination } });
    res.status(200).json(trains);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
