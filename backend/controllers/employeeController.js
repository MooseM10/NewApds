const PaymentModel = require('../models/payment');  // Import your Payment model

// Get all transactions
const getAllTransactions = async (req, res) => {
    try {
        // Fetch payments from the database
        const payments = await PaymentModel.find().populate('userId', 'username'); // Populate userId to get usernames

        // Send back the payments
        res.status(200).json(payments);
    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    getAllTransactions,
};
