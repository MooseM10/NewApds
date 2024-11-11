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
        <div style={{
            minHeight: '80vh',
            padding: '200px',
            backgroundColor: '#f8f9fa',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <h1 style={{
              marginBottom: '20px',
              color: '#4a4a4a',
              fontSize: '2.5em',
              fontWeight: 'bold',
            }}>Employee Dashboard</h1>
            
            <div style={{
              width: '150%',
              maxWidth: '1200px',
              overflowX: 'auto', // Ensure table is scrollable on small screens
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
              }}>
                <thead>
                  <tr style={{ backgroundColor: '#007bff', color: '#fff' }}>
                    <th style={{ padding: '12px', textAlign: 'left' }}>User</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Amount</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Currency</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Provider</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Account Number</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map(transaction => (
                    <tr key={transaction._id} style={{
                      backgroundColor: '#f8f9fa',
                      borderBottom: '1px solid #e1e1e1',
                    }}>
                      <td style={{ padding: '12px', color: '#4a4a4a' }}>{transaction.userId.username}</td>
                      <td style={{ padding: '12px', color: '#4a4a4a' }}>{transaction.amount}</td>
                      <td style={{ padding: '12px', color: '#4a4a4a' }}>{transaction.currency}</td>
                      <td style={{ padding: '12px', color: '#4a4a4a' }}>{transaction.provider}</td>
                      <td style={{ padding: '12px', color: '#4a4a4a' }}>{transaction.accountNumber}</td>
                      <td style={{
                        padding: '12px',
                        color: transaction.status === 'Completed' ? 'green' : 'red',
                      }}>{transaction.status}</td>
                      <td style={{ padding: '12px', color: '#4a4a4a' }}>{new Date(transaction.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
    );
};

export default EmployeeDashboard;
