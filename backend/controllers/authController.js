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

        // Check if username is provided
        if (!username) {
            return res.json({ error: 'Please enter username' });
        }

        // Check if ID number is provided
        if (!idNumber) {
            return res.json({ error: 'Please enter ID number' });
        }

        // Check if account number is provided
        if (!accountNumber) {
            return res.json({ error: 'Please enter account number' });
        }

        // Check password
        if (!password || password.length < 6) {
            return res.json({ error: 'Password required and should be 6 characters long' });
        }

        // Check if username, ID number, or account number is already used
        const existingUser = await User.findOne({
            $or: [{ username }, { idNumber }, { accountNumber }]
        });

        if (existingUser) {
            return res.json({ error: 'Username, ID number, or account number is already used' });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Create user in database
        const user = await User.create({
            username,
            idNumber,
            accountNumber,
            password: hashedPassword,
        });

        return res.json(user);
    } catch (error) {
        console.log(error);
    }
};

// Login endpoint
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.json({ error: 'No user found' });
        }

        // Check if passwords match
        const match = await comparePassword(password, user.password);
        if (match) {
            jwt.sign(
                { username: user.username, id: user._id },//Accont number to login?
                process.env.JWT_SECRET,
                {},
                (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token).json(user);
                }
            );
        } else {
            res.json({ error: 'Password incorrect' });
        }
    } catch (error) {
        console.log(error);
    }
};

// Get profile endpoint
const getProfile = (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) throw err;
            res.json(user);
        });
    } else {
        res.json(null);
    }
};






module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
    
};
