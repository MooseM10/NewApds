const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors'); 
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const https = require('https');
const helmet = require('helmet');
const ExpressBrute = require('express-brute');
const MemoryStore = require('express-brute').MemoryStore;
const { loginUser } = require('./controllers/authController');
const { isAuthenticated, isEmployee } = require('./middleware/authMiddleware'); 

const app = express();



// Database connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Database connected'))
    .catch((err) => console.log('Database not connected', err));

// CORS Options
const corsOptions = {
    origin: 'https://localhost:5173', // Allow requests from your frontend
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow cookies to be sent with requests
};

// Middleware
app.use(helmet()); 
app.use(cors(corsOptions)); // Set CORS options before any routes
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));


// Brute-force protection setup
const store = new MemoryStore(); // Use MemoryStore for simplicity
const bruteforce = new ExpressBrute(store, {
    freeRetries: 5, // Allow 5 free retries before blocking
    minWait: 5000, // Min wait time before blocking
    maxWait: 60000, // Max wait time before unblocking
    failCallback: (req, res, next, nextValidRequestDate) => {
        res.status(429).send('Too many requests, please try again later.');
    }
});

// Login route with brute-force protection
app.post('/login', bruteforce.prevent, loginUser);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

//Logout
app.post('/logout', (req, res) => {
    req.logout(); // This function may vary based on your authentication library
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ error: 'Logout failed' });
        }
        res.clearCookie('connect.sid'); // Clear session cookie if using sessions
        res.status(200).json({ message: 'Logout successful' });
    });
});

// Routes
app.use('/', require('./routes/authRoutes'));
app.use('/api/payments', require('./routes/payRoutes'));
// app.use('/api/employee', require('./routes/employeeRoutes'));
app.use('/api/employee', isAuthenticated, isEmployee, require('./routes/employeeRoutes'));


// SSL Configuration
const privateKey = fs.readFileSync('privatekey.pem', 'utf8');
const certificate = fs.readFileSync('certificate.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const port = 8000;
https.createServer(credentials, app).listen(port, () => {
    console.log(`Secure server is running on https://localhost:${port}`);
});
