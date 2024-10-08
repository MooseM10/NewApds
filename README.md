APDS PART TWO
GROUP MEMBERS:
SIYA MSWELI ST10083465
MATHEW SCRUSE ST10083471
SALMAAN MALL ST10154889
SIPHELELISILE MBAMBO ST10145327

Video link:https://youtu.be/1lY8LyHw0dQ

# User Registration and Login System

This is a user registration and login system built with React, Express, Node.js, and MongoDB. The system allows users to register with a username, ID number, account number, and password, which are validated using regex patterns. It also implements secure authentication and stores data in a MongoDB database.

## Features

- **User Registration**: Users can register with a unique username, ID number, account number, and password. Input validation is enforced using regex patterns.
- **Login**: Registered users can log in using their username and password.
- **Form Validation**: Client-side validation using regex ensures that all input fields conform to required formats.
- **Secure Passwords**: Passwords are hashed before being stored in the database.
- **Session Management**: User sessions are securely managed, allowing access to certain pages only after logging in.
- **Basic Security**: Helmet is used to improve app security by setting various HTTP headers, and Express-Brute prevents brute force login attempts.

## Technologies Used

- **Frontend**: React
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Regex patterns
- **Security**: Helmet, Express-Brute, dotenv, express, Cors

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/yourproject.git
   cd yourproject
   ```

2. Install dependencies for both the frontend and backend:

   For the backend:
   ```bash
   cd backend
   npm install
   ```

   For the frontend:
   ```bash
   cd frontend
   npm install
   ```

3. Create a `.env` file in the `backend/` directory and add the following environment variables:

   ```
   MONGO_URI=mongodb://localhost:27017/yourdbname
   JWT_SECRET=your_jwt_secret
   ```

4. Start the backend server:

   ```bash
   cd backend
   npm run dev
   ```

5. Start the frontend server:

   ```bash
   cd frontend
   npm start
   ```

6. Open your browser and go to:

   ```
   http://localhost:5173
   ```

## API Endpoints

### Register

- **Endpoint**: `/register`
- **Method**: POST
- **Description**: Register a new user with username, ID number, account number, and password.
- **Request Body**:
  ```json
  {
    "username": "exampleuser",
    "idNumber": "1234567890123",
    "accountNumber": "12345678",
    "password": "password123"
  }
  ```

### Login

- **Endpoint**: `/login`
- **Method**: POST
- **Description**: Log in a user using their username and password.
- **Request Body**:
  ```json
  {
    "username": "exampleuser",
    "password": "password123"
  }
  ```

### Protected Routes

Access to certain routes is restricted to authenticated users. Users need to log in to access the dashboard or perform other actions.

## Input Validation

The following regex patterns are used for input validation:

- **Username**: Alphanumeric, 3-15 characters
  ```regex
  /^[a-zA-Z0-9]{3,15}$/
  ```
- **ID Number**: 13 digits
  ```regex
  /^\d{13}$/
  ```
- **Account Number**: 6-20 digits
  ```regex
  /^\d{6,20}$/
  ```
- **Password**: At least 6 characters, containing at least one letter and one number
  ```regex
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
  ```

## Security Features

- **Helmet**: Helmet is used to secure Express apps by setting various HTTP headers.
- **Express-Brute**: Protects against brute-force login attempts by limiting the number of requests to the login endpoint.



