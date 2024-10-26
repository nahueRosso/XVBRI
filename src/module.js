import React, { useState, useEffect, useCallback } from 'react';

function CountdownTimer({ onTimeUpdate }) {
  const targetDate = new Date('2024-11-23T21:00:00');
  const [timeLeft, setTimeLeft] = useState({});

  const formatNumber = (num) => {
    return String(num).padStart(2, '0'); 
  };

  const calculateTimeLeft = useCallback(() => {
    const now = new Date();
    const difference = targetDate - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      const formattedTimeLeft = {
        days: formatNumber(days),
        hours: formatNumber(hours),
        minutes: formatNumber(minutes),
        seconds: formatNumber(seconds)
      };

      setTimeLeft(formattedTimeLeft);
      if (onTimeUpdate) {
        onTimeUpdate(formattedTimeLeft);
      }
    } else {
      const zeroTime = { days: '00', hours: '00', minutes: '00', seconds: '00' };
      setTimeLeft(zeroTime);
      if (onTimeUpdate) {
        onTimeUpdate(zeroTime);
      }
    }
  }, [targetDate, onTimeUpdate]);

  useEffect(() => {
    const timer = setInterval(() => {
      calculateTimeLeft();
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

}

export default CountdownTimer;
