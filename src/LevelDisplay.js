// LevelDisplay.js
import React from 'react';

const LevelDisplay = ({ currentLevel }) => {
  const levels = Array.from({ length: 9 }, (_, index) => index + 1); // Total 9 boxes

  return (
    <div className="level-display">
      {[0, 1, 2].map((row) => (
        <div key={row} className="level-row">
          {levels.slice(row * 3, row * 3 + 3).map((level) => (
            <div
              key={level}
              className={`level-box ${level <= currentLevel ? 'active' : ''}`}
              style={{
                backgroundColor: level <= currentLevel ? '#FF1493' : 'black',
                border: `1px solid ${level <= currentLevel ? '#FF1493' : 'pink'}`,
                color: level <= currentLevel ? 'white' : '#FF1493',
              }}
            >
              {level <= currentLevel ? level : 'X'}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default LevelDisplay;
