const express = require('express');
const { isAuthenticated, isEmployee } = require('../middleware/authMiddleware'); // Ensure this points to the correct file
const { getAllTransactions } = require('../controllers/employeeController'); // Ensure you have this controller
const router = express.Router();

// Ensure only authenticated employees can access this route
router.get('/transactions', isAuthenticated, isEmployee, getAllTransactions);

module.exports = router;