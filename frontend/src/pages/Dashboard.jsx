import { useContext, useState } from "react";
import { UserContext } from '../../context/userContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';


export default function Dashboard() {
    const { user } = useContext(UserContext);
    const [paymentData, setPaymentData] = useState({
        amount: '',
        currency: 'USD', // Default currency
        swiftCode: '',
        reference: '',
        provider:'SWIFT',
        accountNumber: '',
    });

    const handlePayment = async (e) => {
        e.preventDefault();
        const { amount, currency, swiftCode, reference, accountNumber, provider} = paymentData;
        try {
            const { data } = await axios.post('api/payments/makePayment', {
                amount,
                currency,
                swiftCode,
                reference,
                accountNumber,
                provider,
                userId: user.id, // Send user ID for payment association
            });
            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success('Payment information saved successfully');
                setPaymentData({ amount: '', currency: 'USD', swiftCode: '',reference: '',accountNumber: '',provider:'SWIFT' });
            }
        } catch (error) {
            console.log(error);
            toast.error('Failed to save payment information');
        }
    };

    return (
        <div className="payment-container">
        <h1>Dashboard</h1>
        {!!user && <h2>Hi {user.username}!</h2>}
  
        {/* Payment form */}
        <form className="payment-form" onSubmit={handlePayment}>
          <div>
            <label>Amount</label>
            <input
              type='number'
              placeholder='Enter amount'
              value={paymentData.amount}
              onChange={(e) =>
                setPaymentData({ ...paymentData, amount: e.target.value })
              }
            />
          </div>
  
          <div>
            <label>Currency</label>
            <select
              value={paymentData.currency}
              onChange={(e) =>
                setPaymentData({ ...paymentData, currency: e.target.value })
              }
            >
              <option value='USD'>USD</option>
              <option value='EUR'>EUR</option>
              <option value='ZAR'>ZAR</option>
              {/* Add more currencies as needed */}
            </select>
          </div>
  
          <div>
            <label>SWIFT Code</label>
            <input
              type='text'
              placeholder='Enter SWIFT code'
              value={paymentData.swiftCode}
              onChange={(e) =>
                setPaymentData({ ...paymentData, swiftCode: e.target.value })
              }
            />
          </div>

          <div>
            <label>Account Number</label>
            <input
              type='text'
              placeholder='Enter account number'
              value={paymentData.accountNumber}
              onChange={(e) =>
                setPaymentData({ ...paymentData, accountNumber: e.target.value })
              }
            />
          </div>

          <div>
            <label>Reference</label>
            <input
              type='text'
              placeholder='Enter payment reference'
              value={paymentData.reference}
              onChange={(e) =>
                setPaymentData({ ...paymentData, reference: e.target.value })
              }
            />
          </div>


  
          <button type='submit'>Save Payment</button>
        </form>
      </div>
    );
}

