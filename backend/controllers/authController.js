const User = require('../models/user');
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');

const test = (req, res) => {
    res.json('test is working');
};

// Register endpoint
const registerUser = async (req, res) => {
    try {
        const { username, idNumber, accountNumber, password } = req.body;

        // Check required fields
        if (!username) return res.status(400).json({ error: 'Please enter username' });
        if (!idNumber) return res.status(400).json({ error: 'Please enter ID number' });
        if (!accountNumber) return res.status(400).json({ error: 'Please enter account number' });
        if (!password || password.length < 6) return res.status(400).json({ error: 'Password required and should be 6 characters long' });

        // Check for existing user
        const existingUser = await User.findOne({ $or: [{ username }, { idNumber }, { accountNumber }] });
        if (existingUser) return res.status(400).json({ error: 'Username, ID number, or account number is already used' });

        // Hash and create user
        const hashedPassword = await hashPassword(password);
        const user = await User.create({ username, idNumber, accountNumber, password: hashedPassword });

        return res.status(201).json({
            id: user._id,
            username: user.username,
            message: 'User registered successfully',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Login endpoint
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ error: 'No user found' });

        // Check if passwords match
        const match = await comparePassword(password, user.password);
        if (!match) return res.status(401).json({ error: 'Password incorrect' });

        // Sign JWT token with expiration
        const token = jwt.sign(
            { username: user.username, id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Set expiration time
        );

        // Set the secure cookie with proper flags for SSL
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // This should be true in production
            sameSite: 'strict',
        }).json({ user: { username: user.username, id: user._id }, message: 'Login successful' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Get profile endpoint
const getProfile = (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) return res.status(401).json({ error: 'Invalid token' });
            res.json(user); // Send user profile details
        });
    } else {
        res.json(null); // No token, no profile data
    }
};

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
};
