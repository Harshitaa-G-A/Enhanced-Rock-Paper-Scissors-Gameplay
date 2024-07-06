import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import LevelDisplay from './LevelDisplay'; 
import Popup from 'reactjs-popup';
  // Import your CSS file for styling

const UserProfilePage = ({ getRecord }) => {
  const location = useLocation();
  const { state } = location;
  const { loggedInUser } = state || {};
  const [helpPopupOpen, setHelpPopupOpen] = useState(false);
  const openHelpPopup = () => {
    setHelpPopupOpen(true);
  };const closeHelpPopup = () => {
    setHelpPopupOpen(false);
  };
  const { played, won, gems } = getRecord;
  const [userGamesPlayed, setUserGamesPlayed] = useState(0);
  const [userGamesWon, setUserGamesWon] = useState(0);
  
  useEffect(() => {
    const storedGamesPlayed = localStorage.getItem(`${loggedInUser}_gamesPlayed`);
    const storedGamesWon = localStorage.getItem(`${loggedInUser}_gamesWon`);
  
    setUserGamesPlayed(storedGamesPlayed ? parseInt(storedGamesPlayed, 10) : 0);
    setUserGamesWon(storedGamesWon ? parseInt(storedGamesWon, 10) : 0);
  }, [loggedInUser]);
  const totalGames = played ;
  const winRatio = totalGames === 0 ? 0 : (won / totalGames) * 100;
  let level;
  if (gems >= 180  && won > 80) {
    level = 9;
  } else if (gems >= 160  && won > 60) {
    level = 8;
  }else if (gems >= 140  && won > 45) {
    level = 7;
  }else if (gems >= 120  && won > 25) {
    level = 6;
  } else if (gems >= 100  && won > 16) {
    level = 5;
  }  else if (gems > 80  && won > 8) {
    level = 4;
  } else if (gems > 40  && won > 4) {
    level = 3;
  } else if (gems > 20  && won > 2) {
    level = 2;
  } else {
    level = 1; // Default level
  }

  return (
    <div className="user-profile-container">
      <div id='stars'></div>
      <div id='stars2'></div>
      <div id='stars3'></div>
      <div className="user-profile-heading">
      <div className='beaconEffect'style={{ fontFamily:'Monoton',fontWeight:'bold' }}>Gamer Profile</div>
      </div>
      
      <div className='userprof'>
      <p className="user2-info">{loggedInUser}</p>
      </div>
      <div className="user-profile-content">
        <div className="info-box">
          <p className="info-label">Games Played</p>
          <p className="info-value">{getRecord.played}</p>
        </div>
        <div className="info-box">
          <p className="info-label">Games Won</p>
          <p className="info-value">{getRecord.won}</p>
        </div>
        <div className="info-box">
          <p className="info-label">Gems Collected</p>
          <p className="info-value">{getRecord.gems}</p>
        </div>
        <div className="level-info">
        <p className="user2-info" style={{fontSize:'1.3em',fontFamily:'Monoton',border:'2px solid #FF1493',borderRadius:'10px'}}>Game Level</p>
        <LevelDisplay currentLevel={level} />
        <div className="info-button">
        <button
            className="login2-button"
            style={{
              width: '40px',
              height: '40px',
              position: 'relative',
              overflow: 'hidden', // Ensure the button contains the absolute-positioned image
            }}
            onClick={openHelpPopup}>
            <img
              src="/images/rule.png"
              alt="Rules Icon"
              style={{
                width: '34px',
                height: '33px',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          </button>
        </div>
        <Popup open={helpPopupOpen} modal nested onClose={closeHelpPopup}>
          {(close) => (
            <div className="modal1">
              <div className="content1"style={{ position: 'relative' }}>
                
                <h2>Levels</h2>
                <p style={{ fontSize: '18px',color:'#ddd'}}>1  :Gems &lt;20 Games Won &lt;2</p>
                <p style={{ fontSize: '18px',color:'#ddd'}}>2  :Gems &gt;20 Games Won &gt;2</p>
                <p style={{ fontSize: '18px',color:'#ddd' }}>3  :Gems &gt;40 Games Won &gt;4</p>
                <p style={{ fontSize: '18px',color:'#ddd' }}>4  :Gems &gt;80 Games Won &gt;8</p>
                <p style={{ fontSize: '18px',color:'#ddd' }}>5  :Gems &gt;100 Games Won &gt;16</p>
                <p style={{ fontSize: '18px',color:'#ddd' }}>6  :Gems &gt;120 Games Won &gt;25</p>
                <p style={{ fontSize: '18px',color:'#ddd' }}>7  :Gems &gt;140 Games Won &gt;45</p>
                <p style={{ fontSize: '18px',color:'#ddd' }}>8  :Gems &gt;160 Games Won &gt;60</p>
                <p style={{ fontSize: '18px',color:'#ddd' }}>9  :Gems &gt;180 Games Won &gt;80</p>
                {/* Close button */}
                <img
                  src="/images/rule.png"
                  alt="Rules Icon"
                  style={{ width: '50px', height: '50px', position: 'absolute', top: '10px', left: '10px' }}
                />
                <button className="button2" onClick={close}>
                  Close
                </button>
              </div>
            </div>
          )}
        </Popup>
  </div>
  
      </div>
      <div className="button-line">
        <Link to="/" class="login-link">
          <button class="login-button">Back</button>
        </Link>
      </div>
      <div className="progress-container"style={{ border: '2px solid #00ffcc' }}>
        <div className="progress-bar" style={{ width: `${winRatio}%`,backgroundColor: '#00ffcc' }}></div>
      </div>
      
      {/* Progress Label */}
      <p className="progress-label"style={{ fontSize:'1.5em' }}>Games Won Progress: {winRatio.toFixed(2)}%</p>
    </div>
  );
};

export default UserProfilePage;
