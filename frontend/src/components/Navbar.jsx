import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{
      backgroundColor: '#333',
      padding: '1rem 2rem',
      display: 'flex',
      gap: '1.5rem',
      alignItems: 'center'
    }}>
      <Link to='/' style={{
        color: 'white',
        textDecoration: 'none',
        fontWeight: 'bold',
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        transition: 'background-color 0.3s ease'
      }}>Home</Link>
      <Link to='/login' style={{
        color: 'white',
        textDecoration: 'none',
        fontWeight: 'bold',
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        transition: 'background-color 0.3s ease'
      }}>Login</Link>
      <Link to='/transactions' style={{
        color: 'white',
        textDecoration: 'none',
        fontWeight: 'bold',
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        transition: 'background-color 0.3s ease'
      }}>Transactions</Link>
      <Link to='/dashboard' style={{
        color: 'white',
        textDecoration: 'none',
        fontWeight: 'bold',
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        transition: 'background-color 0.3s ease'
      }}>Payment</Link>
    </nav>
  );
}
