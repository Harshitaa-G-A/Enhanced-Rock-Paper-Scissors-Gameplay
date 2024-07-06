import React, { useEffect, useState } from 'react';
import './App1.css';
import Popup from 'reactjs-popup';
import ConfettiComponent from './ConfettiComponent';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const Battle = ({setGamesRecord,gamesRecord}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { loggedInUser } = state || {};
  const [battlesWon, setBattlesWon] = useState(0);
  const [rollButtonClicked, setRollButtonClicked] = useState(false);
  const [userChoice, setUserChoice] = useState('rock');
  const [computerChoice, setComputerChoice] = useState('rock');
  const [userPoints, setUserPoints] = useState(0);
  const [computerPoints, setComputerPoints] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [resultVisible, setResultVisible] = useState(false);
  const [choices] = useState(['rock', 'paper', 'scissors']);
  const [userPosition, setUserPosition] = useState(0);
  const [choiceMade, setChoiceMade] = useState(false);
  const [computerPosition, setComputerPosition] = useState(0);
  const [turnResult, setTurnResult] = useState(null);
  const [gridSize] = useState(5);
  const [userWon, setUserWon] = useState(false);
  const [diceRollValue, setDiceRollValue] = useState(3);
  const [diceRollValue2, setDiceRollValue2] = useState(3); 
  const [userRolling, setUserRolling] = useState(false);
  const [computerRolling, setComputerRolling] = useState(false);// New state to track if the user wins

  const handleClick = (value) => {
    setUserChoice(value);
    generateComputerChoice();
    setChoiceMade(true);
    setTimeout(() => {
      setChoiceMade(false);
     
    }, 500);
    setResultVisible(true);
  };

  const generateComputerChoice = () => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(randomChoice);
  };

  const rollDice = () => {
    return Math.floor(Math.random() * 6) + 1;
  };

  const moveUser = () => {
    const roll = rollDice();
    setDiceRollValue(roll);
    const newPosition = userPosition + roll;
    setUserRolling(false);
    if (newPosition<=25){
      setUserPosition(Math.min(newPosition, 25));
    }
    checkGameOver(newPosition,computerPosition);
   // Ensure userPosition does not exceed 25
  };
  const checkGameOver = (userPosition,computerPosition) => {
    if (userPosition >= 25) {
      setUserPosition(25);
      setGameOver(true);
    }
    else if (computerPosition >= 25) {
      setComputerPosition(25);
      setGameOver(true);
    }

  };
  const moveComputer = () => {
    const roll = rollDice();
    setDiceRollValue2(roll);
    const newPosition = computerPosition + roll;
    
    if (newPosition<=25){
    setComputerPosition(Math.min(newPosition, 25));
    }
    checkGameOver(userPosition,newPosition); // Ensure computerPosition does not exceed 25
  };

  const reset = () => { 
    // Reset all state variables to their initial values
    setUserChoice('rock');
    setComputerChoice('rock');
    setUserPoints(0);
    setComputerPoints(0);
    setGameOver(false);
    setResultVisible(false);
    setUserPosition(0);
    setComputerPosition(0);
    setTurnResult(null);
    setUserWon(false);
    setDiceRollValue(3);
    setDiceRollValue2(3);
    setUserRolling(false);
    setComputerRolling(false);
    setRollButtonClicked(false);
    setChoiceMade(false);
  
    // Reset any other game-specific state variables here
    
    
  };
  

  useEffect(() => {
    const comboMoves = userChoice + computerChoice;
    if (!gameOver) {
      if (comboMoves === 'scissorspaper' || comboMoves === 'rockscissors' || comboMoves === 'paperrock') {
        const updatedUserPoints = userPoints + 1;
        setUserPoints(updatedUserPoints);
        setUserWon(true); 
        setTurnResult('User +1');
        setTimeout(() => {
          setTurnResult(null);
          setResultVisible(false);
        }, 1000);// Set userWon to true if the user wins
        
      } else if (comboMoves === 'paperscissors' || comboMoves === 'scissorsrock' || comboMoves === 'rockpaper') {
        const updatedComputerPoints = computerPoints + 1;
        setComputerPoints(updatedComputerPoints);
        setTurnResult('Computer +1');
        setTimeout(() => {
          setTurnResult(null);
          setResultVisible(false);
        }, 1000);
        if (computerPosition<25) {
          setComputerRolling(true);
          
    setTimeout(() => {
      setComputerRolling(false);
     
    }, 500);
          moveComputer();
        }
      }

      if (userPosition===25 || computerPosition===25 ) {
        setGameOver(true);
      }
    }
  }, [computerChoice, userChoice, gameOver]);
useEffect(() => {
  const storedBattlesWon = localStorage.getItem(`${loggedInUser}_battlesWon`);
  setBattlesWon(storedBattlesWon ? parseInt(storedBattlesWon, 10) : 0);
}, [loggedInUser]);

  const handleRollDice = () => {
    moveUser(); // Roll the dice for the user
    setUserWon(false); 
    setRollButtonClicked(true);
    setChoiceMade(false);
    setUserRolling(true);
    setTimeout(() => {
      setUserRolling(false);
     
    }, 500);
    

    // Reset userWon state after rolling the dice
  };


  return (
    <div className="App">
      <div id='stars'></div>
      <div id='stars2'></div>
      <div id='stars3'></div>
      <a>Battleship</a>
      <div className='score'>
        
  <p  style={{ border: '2px solid #00ffcc',borderRadius:'10px'}}>User: {userPoints}</p>
  {turnResult && (
  <div className={`result ${resultVisible ? 'fadeOutDown' : ''}`}>
    <p>{turnResult}</p>
  </div>
)}
  <p style={{ border: '2px solid #00ffcc',borderRadius:'10px'}}>Computer: {computerPoints}</p>
</div>
<div className="top-left-username" style={{ top:'220px'}}>
<p style={{ border: '2px solid #FF1493'}} className="user2-info">{loggedInUser}</p>
</div>
<div className="button-div">
        <button className={`login-button ${userWon ? 'buttonx-beacon' : ''}`} onClick={userWon ? handleRollDice : undefined}>Roll</button>
</div>
  <div className='choice' style={{marginTop:'-5px'}}>
    {choices.map((choice, index) =>
      <button className="button-beacon" key={index} onClick={() => handleClick(choice)} disabled={gameOver}>
        {choice} 
      </button>
    )}
  </div>

  <div className="hands-and-grid-container">
    <div className="hands-container">
      <div className={`choice-user ${choiceMade ? '' : 'rotate'}`}>
      {userChoice && choiceMade && <img className="user-hand" src={`../images/${userChoice}.png`} alt="Computer choice" />}
          {userChoice && !choiceMade && <img className="user-hand" src={`../images/rock.png`} alt="Computer choice" />}
  
      </div>
      <div style={{ display: 'inline-block', border: '2px solid black', borderRadius: '10px', padding: '2px' }}>
  <img 
    className={`user-hand ${userRolling ? 'rotate-dice' : ''}`} 
    src={`../images/dice${diceRollValue}.png`} 
    style={{
      width:'50px',
      height:'50px',
      borderRadius: '10px', // This makes the image itself slightly rounded
    }} 
    alt='' 
  />
</div>


      
        
      <div className="grid-container">
        
      <div className="level-display" style={{marginTop:'-45px'}}>
        {[0, 1, 2, 3, 4].map((row) => (
          <div key={row} className="level-row">
            {[0, 1, 2, 3, 4].map((col) => (
              <div
                key={col}
                className={`level-box ${row * gridSize + col + 1 <= Math.max(userPosition, computerPosition) ? 'active' : ''}`}
                style={{
                  backgroundColor: row * gridSize + col + 1 <= Math.max(userPosition, computerPosition) ? 'black' : 'black',
                  border: `1px solid ${row * gridSize + col + 1 <= Math.max(userPosition, computerPosition) ? '#FF1493' : '#FF1493'}`,
                  color: row * gridSize + col + 1 <= Math.max(userPosition, computerPosition) ? '#FF1493' : '#FF1493',
                }}
              >
                {row * gridSize + col + 1}
                {row * gridSize + col + 1 === userPosition && <span style={{ color: 'white', fontSize: '24px' }}>●</span>}
{row * gridSize + col + 1 === computerPosition && <span style={{ color: 'blue', fontSize: '24px' }}>●</span>}

              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
    
    <div style={{ display: 'inline-block', border: '2px solid black', borderRadius: '10px', padding: '2px' }}> 
     <img className={`user-hand ${computerRolling ? 'rotate-dice' : ''}`} src={`../images/dice${diceRollValue2}.png`}  style={{
      width:'50px',
      height:'50px',
      borderRadius: '10px', // This makes the image itself slightly rounded
    }} 
    alt='' 
  />
</div>

      <div className={`choice-computer ${choiceMade ? '' : 'rotate'}`}>
      
          {computerChoice && choiceMade && <img className="computer-hand" src={`../images/${computerChoice}.png`} alt="Computer choice" />}
          {computerChoice && !choiceMade && <img className="computer-hand" src={`../images/rock.png`} alt="Computer choice" />}
        </div>
        
      
    </div>

  </div>
  <Popup open={gameOver} modal nested onClose={reset}>
        {(close) => (
          <div className="modal">
            <div className="content" style={{ position: 'relative' }}>
            <p className="gameOverText">GAME OVER</p>
              <h2>{userPosition >= 25 ? 'You won the battle!': 'Computer won the battle!'}</h2>
              {userPosition >= 25 && <ConfettiComponent/>}
              <p>Would you like to reset the game?</p>
              <div>
                <button className="button2" onClick={reset}>Reset</button>
                <button className="button2" onClick={close}>Close</button>
              </div>
            </div>
          </div>
        )}
      </Popup>
 
      <div className="button-line">
        <Link to="/" class="login-link">
          <button class="login-button">Home</button>
        </Link>
      </div>
  
</div>
  );
}

export default Battle;
