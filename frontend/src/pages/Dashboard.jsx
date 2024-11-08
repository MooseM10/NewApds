import { useContext, useState } from "react";
import { UserContext } from '../context/userContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/Card";
import { Label } from "../components/ui/Label";
import { LogOut, User, DollarSign, CreditCard, Hash, FileText } from 'lucide-react';

export default function Dashboard() {
    const { user,isFetchingUser } = useContext(UserContext);
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
        <div className="min-h-screen bg-gradient-to-r from-purple-600 to-indigo-700 p-8">
            <Card className="max-w-2xl mx-auto">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold">Customer International Payment</CardTitle>
                    <CardDescription>
                        {user ? `Welcome, ${user.username}!` : 'Please log in to make a payment'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
    <form onSubmit={handlePayment} className="space-y-6">
    <table className="w-full bg-teal-500 rounded-lg shadow-md">
    <tbody>
        <tr>
            <td className="p-4 border-b border-gray-600 bg-teal-500 !important"> {/* Change bg-gray-700 to bg-teal-500 */}
                <Label htmlFor="amount" className="text-white">Amount</Label>
                <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" />
                    <Input
                        id="amount"
                        type="number"
                        placeholder="Enter amount"
                        value={paymentData.amount}
                        onChange={(e) => setPaymentData({ ...paymentData, amount: e.target.value })}
                        className="pl-10 bg-gray-800 text-white border border-gray-600 focus:ring focus:ring-purple-500 focus:outline-none" /* Dark input background */
                    />
                </div>
            </td>
            <td className="p-4 border-b border-gray-600 bg-teal-500 !important"> {/* Change bg-gray-700 to bg-teal-500 */}
                <Label htmlFor="currency" className="text-white">Currency</Label>
                <select
                    id="currency"
                    value={paymentData.currency}
                    onChange={(e) => setPaymentData({ ...paymentData, currency: e.target.value })}
                    className="w-full pl-10 pr-3 py-2 text-gray-900 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="ZAR">ZAR</option>
                </select>
            </td>
        </tr>
        <tr>
            <td className="p-4 border-b border-gray-600 bg-teal-500 !important"> {/* Change bg-gray-700 to bg-teal-500 */}
                <Label htmlFor="swiftCode" className="text-white">SWIFT Code</Label>
                <div className="relative">
                    <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" />
                    <Input
                        id="swiftCode"
                        type="text"
                        placeholder="Enter SWIFT code"
                        value={paymentData.swiftCode}
                        onChange={(e) => setPaymentData({ ...paymentData, swiftCode: e.target.value })}
                        className="pl-10 bg-gray-800 text-white border border-gray-600 focus:ring focus:ring-purple-500 focus:outline-none" /* Dark input background */
                    />
                </div>
            </td>
            <td className="p-4 border-b border-gray-600 bg-teal-500 !important"> {/* Change bg-gray-700 to bg-teal-500 */}
                <Label htmlFor="accountNumber" className="text-white">Account Number</Label>
                <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" />
                    <Input
                        id="accountNumber"
                        type="text"
                        placeholder="Enter account number"
                        value={paymentData.accountNumber}
                        onChange={(e) => setPaymentData({ ...paymentData, accountNumber: e.target.value })}
                        className="pl-10 bg-gray-800 text-white border border-gray-600 focus:ring focus:ring-purple-500 focus:outline-none" /* Dark input background */
                    />
                </div>
            </td>
        </tr>
        <tr>
            <td className="p-4 border-b border-gray-600 bg-teal-500 !important" colSpan="2"> {/* Change bg-gray-700 to bg-teal-500 */}
                <Label htmlFor="reference" className="text-white">Reference</Label>
                <div className="relative">
                    <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" />
                    <Input
                        id="reference"
                        type="text"
                        placeholder="Enter payment reference"
                        value={paymentData.reference}
                        onChange={(e) => setPaymentData({ ...paymentData, reference: e.target.value })}
                        className="pl-10 bg-gray-800 text-white border border-gray-600 focus:ring focus:ring-purple-500 focus:outline-none" /* Dark input background */
                    />
                </div>
            </td>
        </tr>
    </tbody>
</table>
        <Button type="submit" className="w-full">Save Payment</Button>
    </form>
</CardContent>
            </Card>
        </div>
    );
}
