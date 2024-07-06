import { useState, useEffect } from 'react';
import './App.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import ConfettiComponent from './ConfettiComponent';
import { useLocation, Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const RockPaperScissorsGame = ({setGamesRecord,gamesRecord}) => {
  
  const [userMove, setUserMove] = useState('rock');
  const [turnResult, setTurnResult] = useState(null);
  const [userPoints, setUserPoints] = useState(0);
  const [computerPoints, setComputerPoints] = useState(0);
  const [ties, setTies] = useState(0);
  const [round, setRound] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [finalResult, setFinalResult] = useState(null);
  const [computerMove, setComputerMove] = useState('rock');
  const [userBalls, setUserBalls] = useState([]);
  const [computerBalls, setComputerBalls] = useState([]);
  const [resultVisible, setResultVisible] = useState(false);
  const [choiceMade, setChoiceMade] = useState(true);
  const [gamesPlayed, setGamesPlayed] = useState(0);  // Add this line
  const [gamesWon, setGamesWon] = useState(0); 
  const {avatar} =useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  // Update selectedAvatar to use the 'avatar' parameter
  const selectedAvatar = avatar || searchParams.get('avatar');
  const { state } = location;
  const { loggedInUser } = state || {};

  const [localGamesPlayed, setLocalGamesPlayed] = useState(0);
  const [localGamesWon, setLocalGamesWon] = useState(0);
  const [gameInProgress, setGameInProgress] = useState(false);
  const [showResumePopup, setShowResumePopup] = useState(false);
  
  useEffect(() => {
    const savedGameState = localStorage.getItem('rockPaperScissorsGameState');
    if (savedGameState) {
      const { round: savedRound, gameOver: savedGameOver } = JSON.parse(savedGameState);

      if (savedRound > 0 && savedRound < 10 && !savedGameOver) {
        // If there's a game in progress, set the flag
        setGameInProgress(true);
      }
    }
  }, []);

  const handleResumeGame = () => {
    setShowResumePopup(false); // Close the popup
    setGameInProgress(true); // Set the game in progress
  };

  const handleResetGame = () => {
    setShowResumePopup(false); // Close the popup
    resetGame(); // Reset the game
  };
  const handleMove = (move) => {
    if (round < 10 && !gameOver) {
      setUserMove(move);
      setRound((prevRound) => prevRound + 1);
      setResultVisible(true);
      setChoiceMade(true);
  
      setTimeout(() => {
        setChoiceMade(false);
       
      }, 1000); // Adjust the duration as needed
    }
    setLocalGamesPlayed((prevGamesPlayed) => prevGamesPlayed + 1);
  };
  
 useEffect(() => {
    const savedGameState = localStorage.getItem('rockPaperScissorsGameState');
    if (savedGameState) {
      const {
        userMove: savedUserMove,
        turnResult: savedTurnResult,
        userPoints: savedUserPoints,
        computerPoints: savedComputerPoints,
        ties: savedTies,
        round: savedRound,
        gameOver: savedGameOver,
        finalResult: savedFinalResult,
        computerMove: savedComputerMove,
        userBalls: savedUserBalls,
        computerBalls: savedComputerBalls,
        resultVisible: savedResultVisible,
        choiceMade: savedChoiceMade,
        gamesPlayed: savedGamesPlayed,
        gamesWon: savedGamesWon,
      } = JSON.parse(savedGameState);
      
      setUserMove(savedUserMove);
      setTurnResult(savedTurnResult);
      setUserPoints(savedUserPoints);
      setComputerPoints(savedComputerPoints);
      setTies(savedTies);
      setRound(savedRound);
      setGameOver(savedGameOver);
      setFinalResult(savedFinalResult);
      setComputerMove(savedComputerMove);
      setUserBalls(savedUserBalls);
      setComputerBalls(savedComputerBalls);
      setResultVisible(savedResultVisible);
      setChoiceMade(savedChoiceMade);
      setGamesPlayed(savedGamesPlayed);
      setGamesWon(savedGamesWon);
    }
  }, []);
  useEffect(() => {
    const savedGameState = localStorage.getItem('rockPaperScissorsGameState');
    if (savedGameState) {
      const {
        round: savedRound,
        gameOver: savedGameOver,
      } = JSON.parse(savedGameState);
  
      if (savedRound > 0 && savedRound < 10 && !savedGameOver) {
        setShowResumePopup(true);
        // If there's a game in progress, set the flag
        setGameInProgress(true);
      }
    }
  }, []);
  
  // Handle resuming the game

  
  // Save game state to localStorage whenever it changes
  useEffect(() => {
    const gameState = {
      userMove,
      turnResult,
      userPoints,
      computerPoints,
      ties,
      round,
      gameOver,
      finalResult,
      computerMove,
      userBalls,
      computerBalls,
      resultVisible,
      choiceMade,
      gamesPlayed,
      gamesWon,
    };
    localStorage.setItem('rockPaperScissorsGameState', JSON.stringify(gameState));
  }, [userMove, turnResult, userPoints, computerPoints, ties, round, gameOver, finalResult, computerMove, userBalls, computerBalls, resultVisible, choiceMade, gamesPlayed, gamesWon]);

  const resetGame = () => {
    setUserMove('rock');
    setTurnResult(null);
    setRound(0);
    setGameOver(false);
    setUserPoints(0);
    setComputerPoints(0);
    setComputerMove('rock');
    setUserBalls([]);
    setFinalResult(null);
    setComputerBalls([]);
    setResultVisible(false);

    fetch('http://localhost:8080/reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.status);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const createNeonBall = (isUser) => {
    const ball = (
      <div key={Math.random()} className={`neon-ball ${isUser ? 'user' : 'computer'}`} />
    );

    if (isUser) {
      setUserBalls((prevBalls) => [...prevBalls, ball]);
      
    } else {
      setComputerBalls((prevBalls) => [...prevBalls, ball]);
    }
  };
  useEffect(() => {
    // Set choiceMade to false after a delay to simulate a choice animation at the start
    const initialChoiceTimeout = setTimeout(() => {
      setChoiceMade(false);
    }, 1000); // Adjust the duration as needed

    // Cleanup the timeout on component unmount
    return () => clearTimeout(initialChoiceTimeout);
  }, []);
  useEffect(() => {
    // Load games played and games won from local storage
    const storedGamesPlayed = localStorage.getItem('gamesPlayed');
  const storedGamesWon = localStorage.getItem('gamesWon');

    setLocalGamesPlayed(storedGamesPlayed ? parseInt(storedGamesPlayed, 10) : 0);
    setLocalGamesWon(storedGamesWon ? parseInt(storedGamesWon, 10) : 0);
  }, []);
  
  useEffect(() => {
    if (round > 0 && round <= 10) {
      fetch('http://localhost:8080/play', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userMove }),
      })
        .then((response) => response.json())
        .then((data) => {
          setTurnResult(data);

          if (data.result === 'User +1') {
            setUserPoints((prevPoints) => prevPoints + 1);
            createNeonBall(true);
          } else if (data.result === 'Computer +1') {
            setComputerPoints((prevPoints) => prevPoints + 1);
            createNeonBall(false);
          } else {
            setTies((prevTies) => prevTies + 1);
          }

          setComputerMove(data.computerMove);

          setTimeout(() => {
            setTurnResult(null);
            setResultVisible(false);
          }, 1000);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [userMove, round]);

  useEffect(() => {
    if (round === 10 && loggedInUser) {
      setGameOver(true);
      fetch('http://localhost:8080/result')
        .then((response) => response.json())
        .then((data) => {
          setTurnResult(null);
          setFinalResult(data.finalResult);
  
          // Increment gamesPlayed and gamesWon
          setGamesRecord((prevGamesRecord) => ({
            ...prevGamesRecord,
            played: prevGamesRecord.played + 1,
            won: data.finalResult === 'User wins the game!' ? prevGamesRecord.won + 1 : prevGamesRecord.won,
          }));
  
          // Save gamesPlayed and gamesWon to local storage
          localStorage.setItem(`${loggedInUser}_gamesPlayed`, gamesRecord.played + 1);
          localStorage.setItem(`${loggedInUser}_gamesWon`, gamesRecord.won);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [round, loggedInUser]);
useEffect(() => {
  if (round === 10) {
    setGameOver(true);
    fetch('http://localhost:8080/result')
      .then((response) => response.json())
      .then((data) => {
        setTurnResult(null);
        setFinalResult(data.finalResult);

        // Increment gamesPlayed
        // setGamesPlayed((prevGamesPlayed) => prevGamesPlayed + 1);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}, [round]); 
  
useEffect(() => {
  if (userBalls.length > 0 || computerBalls.length > 0) {
    const timeoutId = setTimeout(() => {
      setUserBalls([]);
      setComputerBalls([]);
      // Update gems in gamesRecord correctly
      setGamesRecord((prevGamesRecord) => ({
        ...prevGamesRecord,
        gems: prevGamesRecord.gems + userBalls.length,
      }));
    }, 2000);
    return () => clearTimeout(timeoutId);
  }
}, [userBalls, computerBalls, setGamesRecord, userPoints]);
  return (
    <div className="App">
      <div id='stars'></div>
      <div id='stars2'></div>
      <div id='stars3'></div>
      <a>ROCK PAPER SCISSORS</a>
      <div className="round">
        <p>Round: {round}/10</p>
      </div>

      <div className="score">
        <p className={userBalls.length > 0 ? 'beacon' : ''}>USER: {userPoints}</p>
        {turnResult && (
          <div className={`result ${userBalls.length > 0 ? 'beacon' : ''} ${resultVisible ? 'fadeOutDown' : ''}`}>
            <p>{turnResult.result}</p>
          </div>
        )}
        <p className={computerBalls.length > 0 ? 'beacon' : ''}>COMPUTER: {computerPoints}</p>
      </div>
      <div className="choice-images">
        <div className={`choice-user ${choiceMade ? '' : 'rotate'}`}>
          {userMove && choiceMade && <img className="user-hand" src={`../images/${userMove}.png`} alt="User choice" />}
          {userMove && !choiceMade && <img className="user-hand" src={`../images/rock.png`} alt="User choice" />}
        </div>
        <div className={`choice-computer ${choiceMade ? '' : 'rotate'}`}>
          {computerMove && choiceMade && <img className="computer-hand" src={`../images/${computerMove}.png`} alt="Computer choice" />}
          {computerMove && !choiceMade && <img className="computer-hand" src={`../images/rock.png`} alt="Computer choice" />}
        </div>
      </div>
      <div className="choice">
        <button onClick={() => handleMove('rock')} disabled={gameOver} className="button-beacon">
          Rock
        </button>
        <button onClick={() => handleMove('paper')} disabled={gameOver} className="button-beacon">
          Paper
        </button>
        <button onClick={() => handleMove('scissors')} disabled={gameOver} className="button-beacon">
          Scissors
        </button>
      </div>
      <div className="neon-balls">
  {userBalls.map((ball, index) => (
    <div key={index} className="neon-ball user"></div>
  ))}
  {computerBalls.map((ball, index) => (
    <div key={index} className="neon-ball computer"></div>
  ))}
</div>
      <div className="balls-collected">
      <p className="balls-collected user-info">{loggedInUser}</p>
      <img className="avatar small-avatar" src={selectedAvatar} alt=""></img>
        <p>Gems:{userPoints}</p>
      </div>
      <div className="button-line">
        <Link to="/" class="login-link">
          <button class="login-button">Home</button>
        </Link>
      </div>
      <Popup open={gameOver && finalResult !== null} modal nested>
        {(close) => (
          <div className="modal">
            <div className="content">
              <p className="gameOverText">GAME OVER</p>
              <p className={`finalResultText ${finalResult ? 'beaconEffect' : ''}`}>{finalResult}</p>
              {loggedInUser && (
                <p className="gemsCollectedText">Gems Collected: {userPoints}</p>
              )}
              {loggedInUser && (
                <div className="game-results">
                  <p>Games Played: {gamesRecord.played}</p>
                  <p>Games Won: {gamesRecord.won}</p>
                </div>
              )}
              {finalResult === 'User wins the game!' && <ConfettiComponent />}
              <div className="choice2">
                <button className="button2-beacon" onClick={() => { close(); resetGame(); }}>
                  <img
                    src="/images/retry.png"
                    alt="Retry Icon"
                    style={{ width: '50px', height: '50px', marginLeft: '-5px', marginRight: '5px' }}
                  />
                </button>
              </div>
            </div>
          </div>
        )}
      </Popup>
      <Popup open={showResumePopup && !gameOver} modal nested>
  {(close) => (
    <div className="modal">
      <div className="content" style={{ paddingTop: '20px' }}>
        <p>Do you want to resume the game?</p>
        <div className="choice3" style={{ paddingTop: '50px' }}>
          <button className="button-beacon" onClick={handleResumeGame}>
            Resume
          </button>
          <button className="button-beacon" onClick={handleResetGame}>
            Reset
          </button>
        </div>
      </div>
    </div>
  )}
</Popup>

    </div>
  );
};

export default RockPaperScissorsGame;