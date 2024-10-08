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

module.exports = {
    savePayment
};

