import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

const ConfettiComponent = () => {
  useEffect(() => {
    const duration = 15 * 1000; // 15 seconds
    const { clientWidth, clientHeight } = document.documentElement;

    const interval = setInterval(() => {
      confetti({
        particleCount: 100,
        spread: 160,
        origin: { y: 0.6 },
      });
    }, 500);

    setTimeout(() => {
      clearInterval(interval);
    }, duration);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return null;
};

export default ConfettiComponent;
