const bcrypt = require('bcrypt');

/**
 * Hashes a password using bcrypt with a configurable number of salt rounds.
 * 
 * @param {string} password - The plain text password to hash.
 * @param {number} saltRounds - The number of salt rounds to use (default is 12).
 * @returns {Promise<string>} - The hashed password.
 */
const hashPassword = async (password, saltRounds = 12) => {
    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(saltRounds);
        // Hash the password
        return await bcrypt.hash(password, salt);
    } catch (error) {
        console.error("Error hashing password:", error);
        throw new Error("Could not hash password");
    }
};

/**
 * Compares a plain text password with a hashed password.
 * 
 * @param {string} password - The plain text password to compare.
 * @param {string} hashed - The hashed password to compare against.
 * @returns {Promise<boolean>} - Returns true if the passwords match, false otherwise.
 */
const comparePassword = async (password, hashed) => {
    try {
        return await bcrypt.compare(password, hashed);
    } catch (error) {
        console.error("Error comparing passwords:", error);
        throw new Error("Could not compare passwords");
    }
};

module.exports = {
    hashPassword,
    comparePassword
};
