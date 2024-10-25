// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const userSchema = new Schema({
//     username: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     idNumber: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     accountNumber: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     }
// });


// const UserModel = mongoose.model('User', userSchema);

// module.exports = UserModel;

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    idNumber: {
        type: String,
        required: true,
        unique: true
    },
    accountNumber: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true }); // Add timestamps

// Pre-save middleware to hash the password
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
