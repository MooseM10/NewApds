import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EmployeeDashboard.css'; // Import your CSS file

const EmployeeDashboard = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('https://localhost:8000/api/employee/transactions', {
                    withCredentials: true
                });
                setTransactions(response.data);
            } catch (error) {
                console.error("Error fetching transactions:", error.message || error);
            }
        };

        fetchTransactions();
    }, []);

    return (
        <div className="container">
            <h1>Employee Dashboard</h1>
            <table>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Amount</th>
                        <th>Currency</th>
                        <th>Provider</th>
                        <th>Account Number</th>
                        <th>Status</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(transaction => (
                        <tr key={transaction._id}>
                            <td>{transaction.userId.username}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.currency}</td>
                            <td>{transaction.provider}</td>
                            <td>{transaction.accountNumber}</td>
                            <td>{transaction.status}</td>
                            <td>{new Date(transaction.createdAt).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeDashboard;
