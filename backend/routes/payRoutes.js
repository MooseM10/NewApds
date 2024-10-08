const express = require('express');
const router = express.Router();
const { savePayment } = require('../controllers/paymentController');

router.post('/makePayment', savePayment);

module.exports = router;
