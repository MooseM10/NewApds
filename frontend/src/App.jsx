import React from 'react';
import { Routes, Route} from 'react-router-dom';
import { UserContextProvider } from './context/userContext';  // Import from context
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <UserContextProvider>  {/* Wrap app in UserContextProvider */}
            <Navbar />
            <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/transactions' element={<EmployeeDashboard />} />
            </Routes>
        </UserContextProvider>
    );
}

export default App;
