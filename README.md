APDS PART 3
GROUP MEMBERS:
SIYA MSWELI ST10083465
MATHEW SCRUSE ST10083471
SALMAAN MALL ST10154889
SIPHELELISILE MBAMBO ST10145327

Video link:___________________


# Comprehensive International Payments Portal

## Overview
This project is a secure international payments portal with a focus on both customer and employee access, ensuring robust data security and meeting specified business requirements.

## Features

### Customer International Payments Portal
- **User Registration & Login**: 
  - Allows registration with username, ID number, account number, and password.
  - Input validation enforced through regex patterns.
  - Secure authentication using JWT (JSON Web Tokens).
- **Payment Processing**:
  - Customers can input payment details, select currency and provider, and enter SWIFT codes.
- **Form Validation**:
  - Enforced via client-side validation to ensure data accuracy and integrity.
- **Secure Passwords**:
  - Passwords are hashed and salted before storage.
- **Session Management**:
  - User sessions are securely handled.
- **Security Measures**:
  - Helmet and Express-Brute are used for enhanced security.
  -Self Signed Certificate for SSL 
  - Protection against threats like session hijacking, clickjacking, SQL injection, XSS, MitM attacks, and DDoS.

### Employee International Payments Portal
- **No Registration Required**:
  - Employees do not register; they access the portal using pre-configured credentials.
- **Password Security**:
  - Enforced with hashing and salting mechanisms.
- **RegEx-Based Input Whitelisting**:
  - All user input is validated using defined regular expressions.
- **Secure Traffic**:
  - All communication is encrypted using SSL.
- **Security Against Web Attacks**:
  - Comprehensive protection measures, as described above.
- **CI/CD Integration**:
  - GitHub repository integration with CircleCI pipeline for continuous SonarQube scans, identifying hotspots and code smells.

## Installation & Setup

### Prerequisites
- Node.js
- MongoDB

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/MooseM10/NewApds.git
   cd NewApds
   ```
2. Install dependencies for both frontend and backend:
   - **Backend**:
     ```bash
     cd backend
     npm install
     ```
   - **Frontend**:
     ```bash
     cd frontend
     npm install
     ```
3. Set up environment variables by creating a `.env` file:
   ```plaintext
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
6. Open `http://localhost:5173` to access the portal.

## API Endpoints

### Register
- **Endpoint**: `/register`
- **Method**: POST
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
- **Request Body**:
  ```json
  {
    "username": "exampleuser",
    "password": "password123"
  }
  ```
  
### Protected Routes
Access to certain routes is restricted to authenticated users. Users need to log in to access the dashboard or perform other actions.

### Input Validation
The following regex patterns are used for input validation:

Username: Alphanumeric, 3-15 characters
/^[a-zA-Z0-9]{3,15}$/
ID Number: 13 digits
/^\d{13}$/
Account Number: 6-20 digits
/^\d{6,20}$/
Password: At least 6 characters, containing at least one letter and one number
/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/

## Security Testing and CI/CD
- **SonarQube**: Integrated via CircleCI to continuously analyze code for potential issues and code smells.
- **MobSF and ScoutSuite**: Used for testing security aspects of the mobile app and cloud environment.
- **NewMan Testing**: Used to validate the pipeline for the various api end points in this project. 

