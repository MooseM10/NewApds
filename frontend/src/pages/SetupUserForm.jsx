// SetupUserForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const SetupUserForm = () => {
    const [username, setUsername] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('employee'); // Default role
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            const response = await axios.post('https://localhost:8000/setup', {
                username,
                idNumber,
                accountNumber,
                password,
                role,
            }, { withCredentials: true }); // Include credentials for cookie authentication

            setSuccessMessage(response.data.message);
            // Clear the form after success
            setUsername('');
            setIdNumber('');
            setAccountNumber('');
            setPassword('');
        } catch (err) {
            setError(err.response.data.error || 'Failed to set up user');
        }
    };

    return (
        <div>
            <h2>Setup User</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>ID Number:</label>
                    <input
                        type="text"
                        value={idNumber}
                        onChange={(e) => setIdNumber(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Account Number:</label>
                    <input
                        type="text"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Role:</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="employee">Employee</option>
                        <option value="admin">Admin</option>
                        {/* Add more roles as needed */}
                    </select>
                </div>
                <button type="submit">Setup User</button>
            </form>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
        </div>
    );
};

export default SetupUserForm;
