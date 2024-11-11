import React from 'react';

export default function Home() {
  return (
    <div style={{
      backgroundColor: '#000', // black background
      color: '#FFD700', // yellow text color
      minHeight: '100vh',
      width: '100vw',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center',
      boxSizing: 'border-box'
    }}>
      <h1 style={{
        fontSize: '3rem',
        marginBottom: '1rem',
        color: '#FFD700'
      }}>
        WIKED PAYMENTS
      </h1>
      <p style={{
        maxWidth: '600px',
        fontSize: '1.2rem',
        lineHeight: '1.5',
        color: '#FFF'
      }}>
        Welcome to Wiked Payments – your secure and fast solution for managing payments. Experience a seamless platform designed to make transactions easy, safe, and efficient. Let’s empower your financial journey.
      </p>
      <div style={{
        marginTop: '2rem',
        display: 'flex',
        gap: '1rem'
      }}>
        <div>
          <button style={{
            padding: '0.8rem 1.5rem',
            fontSize: '1rem',
            fontWeight: 'bold',
            color: '#000',
            backgroundColor: '#FFD700',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}>
            Login
          </button>
        </div>
        <div>
          <button style={{
            padding: '0.8rem 1.5rem',
            fontSize: '1rem',
            fontWeight: 'bold',
            color: '#FFD700',
            backgroundColor: 'transparent',
            border: '2px solid #FFD700',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease, color 0.3s ease'
          }}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

