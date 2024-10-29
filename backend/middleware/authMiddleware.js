// authMiddleware.js

const jwt = require('jsonwebtoken');

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(401).json({ error: 'Invalid token' });
            }
            req.user = user;  // Attach the user information to req
            next();
        });
    } else {
        return res.status(401).json({ error: 'Not authenticated' });
    }
};

// Middleware to check if user is an Employee
const isEmployee = (req, res, next) => {
    if (req.user && req.user.role === 'Employee') {
        return next();
    }
    return res.status(403).json({ error: 'Access restricted to employees only' });
};

module.exports = {
    isAuthenticated,
    isEmployee
};
