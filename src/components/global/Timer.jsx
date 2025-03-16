import React from 'react';
import Countdown, { zeroPad } from 'react-countdown';

const Timer = ({ onFinish, timing }) => {
  return (
    <Countdown
      date={Date.now() + (60000 * timing)}
      onComplete={onFinish}
      renderer={({ minutes, seconds }) => (
        <span className="timer">
          {zeroPad(minutes)}:{zeroPad(seconds)}
        </span>
      )}
  />
  )
}

export default Timer;
