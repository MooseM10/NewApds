const express = require('express');
const router = express.Router();
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { test, registerUser, loginUser, getProfile } = require('../controllers/authController')


//middleware

router.use(
    cors({
        credentials:true,
        origin: 'https://localhost:5173'
    })
);

// Configure the rate limiter for login
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login attempts per window
    message: 'Too many login attempts, please try again later.',
});

// Configure the rate limiter for registration
const registerLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 registration attempts per window
    message: 'Too many registration attempts, please try again later.',
});

router.get('/', test)
router.post('/register',registerLimiter, registerUser)
router.post('/login',loginLimiter, loginUser)
router.get('/profile', getProfile)



module.exports = router