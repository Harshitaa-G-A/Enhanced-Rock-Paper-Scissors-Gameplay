import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import './HomePage.css';
import LoginPage from './Loginpage';

const HomePage = ({getRecord}) => {
  const [helpPopupOpen, setHelpPopupOpen] = useState(false);
  const [loginPopupOpen, setLoginPopupOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const navigate = useNavigate();
  const openHelpPopup = () => {
    setHelpPopupOpen(true);
  };
  const navigateToUserProfile = () => {
    navigate('/user-profile'); // Use navigate to navigate to the UserProfilePage component
  };
  const openLoginPopup = () => {
    setLoginPopupOpen(true);
  };

  const closeHelpPopup = () => {
    setHelpPopupOpen(false);
  };

  const closePopup = () => {
    setLoginPopupOpen(false);
  };

  const handleLoginSuccess = (username) => {
    setLoggedInUser(username);
    setLoginPopupOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('gamerID');
    setLoggedInUser(null);
  };

  const handleSignUp = async () => {
    try {
      const response = await fetch('http://localhost:8080/auth/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: signUpUsername, password: signUpPassword }),
      });

      const data = await response.text();

      if (response.ok) {
        console.log('Sign-up successful:', data);
        setSignUpOpen(false);
        setSignUpUsername('');
        setSignUpPassword('');
      } else {
        console.log('Sign-up failed:', data);
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
    }
  };

  useEffect(() => {
    const storedGamerID = localStorage.getItem('gamerID');
    if (storedGamerID) {
      setLoggedInUser(storedGamerID);
    }
  }, []);

  return (
    
    <div className="wrapper">
      <div id='stars'></div>
      <div id='stars2'></div>
      <div id='stars3'></div>
      {loggedInUser ? (
        <>
          <div className="top-left-username">
            <p style={{ border: '2px solid #FF1493' }}>{loggedInUser}</p>
          </div>
          <button onClick={handleLogout} className="login-button bottom-left">
            Logout
          </button>
          
          <Link to="/user-profile" class="login-link" state={{ loggedInUser }}>
          <button class="login-button bottom-left-up">User Profile</button>
        </Link>
        </>
      ) : (
      <div className="bottom-left">
      <p className='beaconEffect'>Login to save progress</p>
    
        <button style={{bottom:'70px'}} onClick={() => setLoginPopupOpen(true)} className="login-button bottom-left">
          Login
        </button>
        </div>
        
      )}
      <button onClick={() => setSignUpOpen(true)} className="login-button bottom-left2">
  Sign up
</button>
      <div className='game-title'>
      <div className="title-div">
        <img src="/images/rps.jpg" alt="Rock Paper Scissors" className="title-image" />
      </div>
      </div>
      <div className="main-line">
        <div className="main-div main-div1">
          <h1>ROCK</h1>
        </div>
        <div className="main-div main-div2">
          <h1>PAPER</h1>
        </div>
        <div className="main-div main-div3">
          <h1>SCISSORS</h1>
        </div>
      </div>
      <div className='main'>
      <p>Shred, wrap, or cut your way to glory!</p>
      </div>
      <div className="button-line">
        <Link to="/avatar" class="login-link" state={{ loggedInUser }}>
          <button class="login-button">Play</button>
        </Link>
        <Link to="/battle" class="login-link" state={{ loggedInUser }}>
          <button class="login-button">Battle</button>
        </Link>
        <button className="help-button" onClick={openHelpPopup}>
          Help
        </button>
        
        
      {/* Help popup */}
      <Popup open={helpPopupOpen} modal nested onClose={closeHelpPopup}>
          {(close) => (
            <div className="modal">
              <div className="content"style={{ position: 'relative' }}>
                
                <h2>Rules</h2>
                <p style={{ fontSize: '25px' }}>Rock crushes Scissors</p>
                <p style={{ fontSize: '25px' }}>Scissors cuts Paper</p>
                <p style={{ fontSize: '25px' }}>Paper covers Rock</p>
                <p style={{ fontSize: '25px' }}>Collect Gems to level up</p>

                <img
                  src="/images/rule.png"
                  alt="Rules Icon"
                  style={{ width: '50px', height: '50px', position: 'absolute', top: '10px', left: '10px' }}
                />
                {/* Close button */}
                <button className="button2" onClick={close}>
                  Close
                </button>
              </div>
            </div>
          )}
        </Popup>
        <Popup open={loginPopupOpen} modal nested onClose={closePopup}>
        <LoginPage onLoginSuccess={handleLoginSuccess} onClose={closePopup} />
      </Popup>
      

      <Popup open={signUpOpen} modal nested onClose={() => setSignUpOpen(false)}>
  {(close) => (
    <div className="modal">
      <div className="content">
        <div className='logintitle'>
          <div className='beaconEffect' style={{ fontFamily: 'Monoton', color: '#5fa8d3', fontSize: '1.5rem', fontWeight: 'bold' }}>
            Create your ID</div>
        </div>
        <label className="login-label">
          Gamer ID
          <input
            type="text"
            value={signUpUsername}
            onChange={(e) => setSignUpUsername(e.target.value)}
            className="login-input"
          />
        </label>
        <br />
        <label className="login-label">
          Passcode
          <input
            type="password"
            value={signUpPassword}
            onChange={(e) => setSignUpPassword(e.target.value)}
            className="login-input"
          />
        </label>
        <br />
        <button onClick={handleSignUp} className="login-button" style={{ width: '104px' }}>
          Sign up
        </button>
        <div className="closebutton-line">
          <button onClick={close} className="login-button">
            Close
          </button>
        </div>
      </div>
    </div>
  )}
</Popup>

        
      </div>
    </div>
  );
};

export default HomePage;
