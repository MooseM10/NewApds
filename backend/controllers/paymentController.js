const Payment = require('../models/payment');

const savePayment = async (req, res) => {
      
    try{ 
   const { amount, currency, swiftCode, reference, userId , accountNumber,provider } = req.body;

   const newPayment = new Payment({
    amount, currency, swiftCode, reference, userId , accountNumber,provider});

    const CheckSwift = await Payment.findOne({swiftCode})
   
    if(CheckSwift){
        return res.json({
            error: 'Swift code has already been used'
        })
    }

    await newPayment.save();
    res.json({ message: 'Payment submitted', payment: newPayment });

} catch (error) {
    console.error(error.message);
    res.status(500).send('Error on Server' + error.message);
}

};


//     // Validate using backend RegEx (optional, but recommended for security)
//     const amountPattern = /^\d+(\.\d{1,2})?$/;
//     const swiftCodePattern = /^[A-Za-z0-9]{8,11}$/;


//     if (!amountPattern.test(amount)) {
//         return res.json({ error: 'Invalid amount format' });
//     }

//     if (!swiftCodePattern.test(swiftCode)) {
//         return res.json({ error: 'Invalid SWIFT code format' });
//     }

//     try {
//         const payment = await Payment.create({
//             amount,
//             currency,
//             swiftCode
//         });
//         res.json({ success: true, payment });
//     } catch (error) {
//         console.error(error);
//         res.json({ success: false, error: 'Failed to save payment' });
//     }
// };

module.exports = {
    savePayment
};

