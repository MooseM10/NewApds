import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



export default function Register() {
  const navigate = useNavigate();
  
  // Update state to include the new fields
  const [data, setData] = useState({
    username: '',
    idNumber: '',
    accountNumber: '',
    password: '',
  });

  const validateInputs = () => {
    const usernamePattern = /^[a-zA-Z0-9]{3,15}$/; //3-15 characters
    const idNumberPattern = /^\d{13}$/; 
    const accountNumberPattern = /^\d{6,20}$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!usernamePattern.test(data.username)) {
      toast.error('Username must be 3-15 characters long and contain only letters and numbers.');
      return false;
    }
    if (!idNumberPattern.test(data.idNumber)) {
      toast.error('ID Number must be exactly 13 digits.');
      return false;
    }
    if (!accountNumberPattern.test(data.accountNumber)) {
      toast.error('Account Number must be between 6-20 digits.');
      return false;
    }
    if (!passwordPattern.test(data.password)) {
      toast.error('Password must be at least 6 characters long and contain at least one letter and one number.');
      return false;
    }
    return true;
  };

  const registerUser = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;  // Stop the registration if validation fails
    }

    setLoading(true);

    const { username, idNumber, accountNumber, password } = data;

    try {
      const { data: response } = await axios.post('/register', {
        username, idNumber, accountNumber, password
      });
      if (response.error) {
        toast.error(response.error);
      } else {
        setData({
          username: '',
          idNumber: '',
          accountNumber: '',
          password: ''
        });
        toast.success('Registration Successful');
        navigate('/login');
      }
    } catch (error) {
      toast.error('Registration failed. Please try again later.');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="register-container">
    <form className="register-form" onSubmit={registerUser}>
      <label>Username</label>
      <input
        type='text'
        placeholder='Enter username'
        value={data.username}
        onChange={(e) => setData({ ...data, username: e.target.value })}
      />
      <label>ID Number</label>
      <input
        type='text'
        placeholder='Enter ID number'
        value={data.idNumber}
        onChange={(e) => setData({ ...data, idNumber: e.target.value })}
      />
      <label>Account Number</label>
      <input
        type='text'
        placeholder='Enter account number'
        value={data.accountNumber}
        onChange={(e) => setData({ ...data, accountNumber: e.target.value })}
      />
      <label>Password</label>
      <input
        type='password'
        placeholder='Enter password'
        value={data.password}
        onChange={(e) => setData({ ...data, password: e.target.value })}
      />
      <button type='submit'>Submit</button>
    </form>
  </div>
  );
}

