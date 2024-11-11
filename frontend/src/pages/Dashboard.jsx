import { useContext, useState } from "react";
import { useUserContext  } from '../context/userContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/Card";
import { Label } from "../components/ui/Label";
import { LogOut, User, DollarSign, CreditCard, Hash, FileText } from 'lucide-react';

export default function Dashboard() {
    const { user,isFetchingUser } = useUserContext();
    const [paymentData, setPaymentData] = useState({
        amount: '',
        currency: 'USD',
        swiftCode: '',
        reference: '',
        provider: 'SWIFT',
        accountNumber: '',
    });

    const handlePayment = async (e) => {
        e.preventDefault();


    if (isFetchingUser) {
        toast.error('Please wait while we load your user details...');
        return;
    }

        if (!user) {
            toast.error('You must be logged in to make a payment');
            return;
        }

        const { amount, currency, swiftCode, reference, accountNumber, provider } = paymentData;
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.post('https://localhost:8000/api/payments/makePayment', {
                amount,
                currency,
                swiftCode,
                reference,
                accountNumber,
                provider,
                userId: user.id,
            });
            
            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success('Payment information saved successfully');
                setPaymentData({ amount: '', currency: 'USD', swiftCode: '', reference: '', accountNumber: '', provider: 'SWIFT' });
            }
        } catch (error) {
            console.log(error.response ? error.response.data : error.message);
            toast.error('Failed to save payment information');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-black to-gray-800 p-8">
        <Card className="max-w-lg mx-auto bg-white text-gray-800 shadow-lg rounded-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-semibold text-gray-900">Customer International Payment</CardTitle>
            <CardDescription className="text-gray-500">
              {user ? `Welcome, ${user.username}!` : 'Please log in to make a payment'}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handlePayment} className="space-y-6">
              <div className="space-y-4">
                {/* Amount */}
                <div>
                  <Label htmlFor="amount" className="text-gray-700">Amount</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter amount"
                      value={paymentData.amount}
                      onChange={(e) => setPaymentData({ ...paymentData, amount: e.target.value })}
                      className="pl-10 w-full bg-gray-200 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600"
                    />
                  </div>
                </div>
  
                {/* Currency */}
                <div>
                  <Label htmlFor="currency" className="text-gray-700">Currency</Label>
                  <select
                    id="currency"
                    value={paymentData.currency}
                    onChange={(e) => setPaymentData({ ...paymentData, currency: e.target.value })}
                    className="w-full bg-gray-200 text-gray-900 border border-gray-300 rounded-lg pl-3 pr-3 py-2 focus:ring-2 focus:ring-green-600"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="ZAR">ZAR</option>
                  </select>
                </div>
  
                {/* SWIFT Code */}
                <div>
                  <Label htmlFor="swiftCode" className="text-gray-700">SWIFT Code</Label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      id="swiftCode"
                      type="text"
                      placeholder="Enter SWIFT code"
                      value={paymentData.swiftCode}
                      onChange={(e) => setPaymentData({ ...paymentData, swiftCode: e.target.value })}
                      className="pl-10 w-full bg-gray-200 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600"
                    />
                  </div>
                </div>
  
                {/* Account Number */}
                <div>
                  <Label htmlFor="accountNumber" className="text-gray-700">Account Number</Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      id="accountNumber"
                      type="text"
                      placeholder="Enter account number"
                      value={paymentData.accountNumber}
                      onChange={(e) => setPaymentData({ ...paymentData, accountNumber: e.target.value })}
                      className="pl-10 w-full bg-gray-200 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600"
                    />
                  </div>
                </div>
  
                {/* Reference */}
                <div>
                  <Label htmlFor="reference" className="text-gray-700">Reference</Label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      id="reference"
                      type="text"
                      placeholder="Enter payment reference"
                      value={paymentData.reference}
                      onChange={(e) => setPaymentData({ ...paymentData, reference: e.target.value })}
                      className="pl-10 w-full bg-gray-200 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600"
                    />
                  </div>
                </div>
              </div>
  
              {/* Submit Button */}
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg py-2 mt-4">
                Save Payment
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
}
