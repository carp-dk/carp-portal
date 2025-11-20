import logoDefault from '@Assets/images/logo-carp-flat.png';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';

const LoadingLandingPage: React.FC = () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#003F6E',
      }}
    >
      <img src={logoDefault} alt="spinning circle" />
      <CircularProgress
        thickness={4}
        size={60}
        data-testid="spinner"
        style={{ margin: 40, color: '#fff' }}
      />
      <p style={{ color: '#fff', fontSize: 24 }}>Welcome back!</p>
    </div>
  );
};

export default LoadingLandingPage;
