import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={{
      background: '#2c3e50',
      color: 'white',
      padding: '2rem 1rem',
      textAlign: 'center',
      fontFamily: '"Inter", sans-serif',
      marginTop: 'auto',
      width: '100%',
      position: 'relative',
      bottom: 0
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '1.8rem',
          fontWeight: 700,
          marginBottom: '0.5rem'
        }}>TrendScope</h2>
        <nav style={{
          display: 'flex',
          gap: '1.5rem'
        }}>
          <Link to="/" style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '1rem',
            transition: 'color 0.3s ease',
            '&:hover': {
              color: '#f1c40f'
            }
          }}>Home</Link>
          <Link to="/trends" style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '1rem',
            transition: 'color 0.3s ease',
            '&:hover': {
              color: '#f1c40f'
            }
          }}>Current trends</Link>
          <Link to="/categories" style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '1rem',
            transition: 'color 0.3s ease',
            '&:hover': {
              color: '#f1c40f'
            }
          }}>Categories</Link>
          <Link to="/favorites" style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '1rem',
            transition: 'color 0.3s ease',
            '&:hover': {
              color: '#f1c40f'
            }
          }}>Favorites</Link>
        </nav>
      </div>
      <p style={{
        marginTop: '1rem',
        fontSize: '0.9rem',
        opacity: 0.7
      }}>© 2025 TrendScope</p>
    </footer>
  );
}
