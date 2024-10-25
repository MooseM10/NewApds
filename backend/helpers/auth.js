const bcrypt = require('bcrypt');

const hashPassword = (password) => {
    return new Promise((resolve, reject) =>{
        bcrypt.genSalt(12, (err, salt) => {
            if (err) {
                reject(err)
                
            }
            bcrypt.hash(password, salt, (err,hash) => {
                if (err) {
                    reject(err)
                    
                }
                resolve (hash)
            }) 
        })
    })
}

const comparePassword = (password, hashed) => {
    return bcrypt.compare(password, hashed)
}

module.exports = {
    hashPassword,
    comparePassword
}


// const bcrypt = require('bcrypt');

// /**
//  * Hashes a password using bcrypt with a configurable number of salt rounds.
//  * 
//  * @param {string} password - The plain text password to hash.
//  * @param {number} saltRounds - The number of salt rounds to use (default is 12).
//  * @returns {Promise<string>} - The hashed password.
//  */
// const hashPassword = async (password, saltRounds = 12) => {
//     try {
//         // Generate a salt
//         const salt = await bcrypt.genSalt(saltRounds);
//         // Hash the password
//         const hash = await bcrypt.hash(password, salt);
//         return hash;
//     } catch (error) {
//         console.error("Error hashing password:", error);
//         throw new Error("Could not hash password");
//     }
// };

// /**
//  * Compares a plain text password with a hashed password.
//  * 
//  * @param {string} password - The plain text password to compare.
//  * @param {string} hashed - The hashed password to compare against.
//  * @returns {Promise<boolean>} - Returns true if the passwords match, false otherwise.
//  */
// const comparePassword = async (password, hashed) => {
//     try {
//         const match = await bcrypt.compare(password, hashed);
//         return match;
//     } catch (error) {
//         console.error("Error comparing passwords:", error);
//         throw new Error("Could not compare passwords");
//     }
// };

// module.exports = {
//     hashPassword,
//     comparePassword,
// };
