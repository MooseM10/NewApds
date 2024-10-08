const express = require('express');
const dotenv = require('dotenv').config()
const cors = require('cors');
const helmet = require('helmet');
const ExpressBrute = require('express-brute'); 
const {mongoose} = require('mongoose');
const cookieParser = require('cookie-parser');



const app = express()

//database connections
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database connected'))
.catch((err) => console.log('Database not connected', err))

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}))
app.use(helmet());

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
  }));

app.use(express.json());

 
app.use('/', require('./routes/authRoutes'))

app.use('/api/payments', require('./routes/payRoutes'));


const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`))


