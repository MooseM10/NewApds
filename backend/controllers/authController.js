const User = require('../models/user');
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');

const test = (req, res) => {
    res.json('test is working');
};

//CODE ATTRIUBTION: 
//https://auth0.com/docs/secure/tokens/json-web-tokens

// Register endpoint
const registerUser = async (req, res) => {
    try {
        const { username, idNumber, accountNumber, password } = req.body;
        
        console.log('Received registration data:', req.body); // Log the received data

        // Check required fields
        if (!username) return res.status(400).json({ error: 'Please enter username' });
        if (!idNumber) return res.status(400).json({ error: 'Please enter ID number' });
        if (!accountNumber) return res.status(400).json({ error: 'Please enter account number' });
        
        // Check for password length
        if (!password || password.length < 6) {
            return res.status(400).json({ error: 'Password required and should be at least 6 characters long' });
        }
        
        // Check if password contains at least one letter and one number
        const hasLetter = /[a-zA-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        console.log('Password validation:', { hasLetter, hasNumber }); // Log password validation results
        
        if (!hasLetter || !hasNumber) {
            return res.status(400).json({ error: 'Password must contain at least one letter and one number' });
        }

        // Check for existing user
        const existingUser = await User.findOne({ $or: [{ username }, { idNumber }, { accountNumber }] });
        if (existingUser) {
            return res.status(400).json({ error: 'Username, ID number, or account number is already used' });
        }
        console.log('Received password:', password);

        //CODE ATTRIBUTION 
        //https://supertokens.com/blog/password-hashing-salting#:~:text=It%20involves%20adding%20a%20unique,rainbow%20tables)%20to%20crack%20hashes.
        // Hash and create user
        const hashedPassword = await hashPassword(password);
        const user = await User.create({ username, idNumber, accountNumber, password: hashedPassword });

        return res.status(201).json({
            id: user._id,
            username: user.username,
            role: user.role,
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
            { username: user.username, id: user._id, role: user.role},
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Set expiration time
        );

        // Set the secure cookie with proper flags for SSL
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // This should be true in production
            sameSite: 'strict',
        }).json({ user: { username: user.username, id: user._id }, message: 'Login successful', token: token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Assuming Bearer token
    if (!token) return res.sendStatus(401); // Unauthorized

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden
        req.user = user; // Save user info for request
        next();
    });
};

// Get profile endpoint
const getProfile = (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer token

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) return res.status(401).json({ error: 'Invalid token' });
            res.json(user); // Send user profile details
        });
    } else {
        return res.status(401).json({ error: 'No token provided' });
    }
};

// Setup user endpoint
const setupUser = async (req, res) => {
    try {
        const { username, idNumber, accountNumber, password, role } = req.body;

        // Check required fields
        if (!username) return res.status(400).json({ error: 'Please enter username' });
        if (!idNumber) return res.status(400).json({ error: 'Please enter ID number' });
        if (!accountNumber) return res.status(400).json({ error: 'Please enter account number' });
        if (!password || password.length < 6) return res.status(400).json({ error: 'Password required and should be at least 6 characters long' });

        // Check if password contains at least one letter and one number
        const hasLetter = /[a-zA-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        if (!hasLetter || !hasNumber) {
            return res.status(400).json({ error: 'Password must contain at least one letter and one number' });
        }

        // Check for existing user
        const existingUser = await User.findOne({ $or: [{ username }, { idNumber }, { accountNumber }] });
        if (existingUser) {
            return res.status(400).json({ error: 'Username, ID number, or account number is already used' });
        }

        // Hash and create user
        const hashedPassword = await hashPassword(password);
        const user = await User.create({ username, idNumber, accountNumber, password: hashedPassword, role });

        return res.status(201).json({
            id: user._id,
            username: user.username,
            role: user.role,
            message: 'User setup successfully',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
    authenticateToken,
    setupUser
};
