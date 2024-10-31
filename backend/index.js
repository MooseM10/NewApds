const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors'); 
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const https = require('https');
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
app.use(cors(corsOptions)); // Set CORS options before any routes
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
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
