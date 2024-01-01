// components/Confetti.js
import React, { useEffect } from 'react';
import  confetti from 'canvas-confetti';

const Confetti = () => {
  useEffect(() => {
    var end = Date.now() + 15 * 100;
    var colors = ['#B2F35F', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  return <div id="confetti-container"></div>;
};

export default Confetti;
