const express = require('express');
const { addTrain, getTrains } = require('../controllers/trainController');
const { authenticate } = require('../middlewares/authMiddleware');
const { verifyApiKey } = require('../middlewares/apiKeyMiddleware');
const router = express.Router();

router.post('/add', verifyApiKey, addTrain);
router.get('/availability', authenticate, getTrains);

module.exports = router;
