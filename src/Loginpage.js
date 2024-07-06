import React, { useState } from 'react';

const LoginPage = ({ onLoginSuccess, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: username, password }),
      });
  
      console.log('Server Response:', response);
  
      if (response.ok) {
        // Check if the response body is not empty
        const responseBody = await response.text();
        const data = responseBody ? JSON.parse(responseBody) : null;
  
        if (data) {
          console.log('Login successful:', data);
          localStorage.setItem('gamerID', username);
          onLoginSuccess(username);
        } else {
          console.log('Login failed: Empty response body');
        }
      } else {
        console.log('Login failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <body style={{ margin: 0, padding: 0 }}>
      <div className="login-popup">
        <div className="modal">
          <div className="content">
            <div className='logintitle'>
              <div className='beaconEffect' style={{ fontFamily: 'Monoton', color: '#5fa8d3', fontSize: '1.5rem', fontWeight: 'bold' }}>Enter Gamer ID</div>
            </div>
            <label className="login-label">
              Gamer ID
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="login-input"
              />
            </label>
            <br />
            <label className="login-label">
              Passcode
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
              />
            </label>
            <br />
            <button onClick={handleLogin} className="login-button">
              Login
            </button>
            <div className="closebutton-line">
              <button onClick={onClose} className="login-button">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default LoginPage;
