const express = require('express');
const { isAuthenticated, isEmployee } = require('../middleware/authMiddleware');
const { getAllTransactions } = require('../controllers/employeeController');
const router = express.Router();

// Ensure only authenticated employees can access this route
router.get('/transactions', isAuthenticated, isEmployee, getAllTransactions);

module.exports = router;
