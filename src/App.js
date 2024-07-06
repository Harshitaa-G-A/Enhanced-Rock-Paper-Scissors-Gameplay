// App.js
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import RockPaperScissorsGame from './RockPaperScissorsGame';
import AvatarPage from './AvatarPage';
import UserProfilePage from './UserProfilePage'; // Corrected the import statement
import Battle from './Battle';

const App = () => {
  const [gamesRecord,setGamesRecord] = useState({played:0,won:0,gems:0});
  
  return (
    <Routes>
      <Route path="/" element={<HomePage getRecord={gamesRecord}/>} />
      <Route path="/play" element={<RockPaperScissorsGame setGamesRecord={setGamesRecord} gamesRecord={gamesRecord}  />} />
      <Route path="/avatar" element={<AvatarPage />} />
      <Route path="/battle" element={<Battle setGamesRecord={setGamesRecord} gamesRecord={gamesRecord}  />} />
      <Route path="/user-profile" element={<UserProfilePage  getRecord={gamesRecord}/>} /> {/* Corrected the component prop */}
    </Routes>
  );
};

export default App;
