// authMiddleware.js

const jwt = require('jsonwebtoken');

// Middleware to check if user is authenticated
// const isAuthenticated = (req, res, next) => {
//     const token = req.cookies.token;
//     if (token) {
//         jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//             if (err) {
//                 return res.status(401).json({ error: 'Invalid token' });
//             }
//             req.user = user;  // Attach the user information to req
//             next();
//         });
//     } else {
//         return res.status(401).json({ error: 'Not authenticated' });
//     }
// };

const isAuthenticated = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(403).json({ error: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error("Token verification error:", err); // Log the error
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = decoded; // Assuming the user data is stored in the token
        console.log("Authenticated User:", req.user); // Log the decoded user data
        next();
    });
};

// const isAuthenticated = (req, res, next) => {
//     const token = req.cookies.token || req.headers['authorization']?.split(' ')[1]; // Check both cookies and Authorization header
//     if (token) {
//         jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//             if (err) {
//                 return res.status(401).json({ error: 'Invalid token' });
//             }
//             req.user = user;  // Attach the user information to req
//             next();
//         });
//     } else {
//         return res.status(401).json({ error: 'Not authenticated' });
//     }
// };

// Middleware to check if user is an Employee
// const isEmployee = (req, res, next) => {
//     if (req.user && (req.user.role === 'Employee'|| req.user.role === 'Admin')) {
//         return next();
//     }
//     return res.status(403).json({ error: 'Access restricted to employees only' });
// };
// const isEmployee = (req, res, next) => {
//     // const userRole = req.user.role; // or however you store user roles
//     // if (userRole === 'employee' || userRole === 'Admin'|| userRole === 'Employee' || userRole === 'admin') {
//     //     return next(); // Allow access
//     // }
//     // return res.status(403).json({ error: 'Access restricted to employees only' });
//       if (req.user) { // If user is authenticated
//         return next(); // Proceed to the controller
//     }
//     return res.sendStatus(403); // Not allowed
// };

const isEmployee = (req, res, next) => {
    console.log('Authenticated User:', req.user); // Debugging log
    if (req.user && (req.user.role === 'Employee' || req.user.role === 'Admin')) {
        return next();
    }
    return res.status(403).json({ error: 'Access restricted to employees only' });
};

module.exports = {
    isAuthenticated,
    isEmployee
};
