const mongoose = require('mongoose');
const { Schema } = mongoose;

const paymentSchema = new Schema({
    
        userId: {type: mongoose.Schema.Types.ObjectId,ref:'User', required: true},
        amount: { type: Number, required: true},
        currency: { type: String, required: true},
        provider: { type: String, default: 'SWIFT'},
        accountNumber: { type: String, required: true},
        swiftCode: { type: String, required: true},
        reference: { type: String, required: true},
        status: { type: String, default: 'Pending'},
        createdAt: { type: Date, default: Date.now},

        });

const PaymentModel = mongoose.model('Payment', paymentSchema);

module.exports = PaymentModel;
