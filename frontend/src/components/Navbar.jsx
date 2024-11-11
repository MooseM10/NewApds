import { Link } from 'react-router-dom';

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontWeight: 'bold',
  padding: '0.5rem 1rem',
  borderRadius: '4px',
  transition: 'background-color 0.3s ease'
};

export default function Navbar() {
  return (
    <nav style={{
      position: 'absolute', // keeps navbar fixed at the top of the screen
      top: '0',          // sets it at the top edge
      left: '0',         // aligns it with the left edge
      width: '100%',     // makes it span the full width of the page
      backgroundColor: '#333',
      padding: '1rem 2rem',
      display: 'flex',
      gap: '1.5rem',
      alignItems: 'center'
      
    }}>
      <Link to='/' style={linkStyle}>Home</Link>
      <Link to='/register' style={linkStyle}>Register</Link>
      <Link to='/login' style={linkStyle}>Login</Link>
      <Link to='/transactions' style={linkStyle}>Transactions</Link>
      <Link to='/dashboard' style={linkStyle}>Payment</Link>
    </nav>
  );
}

