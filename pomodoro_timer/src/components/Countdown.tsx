import React from "react";

interface CountdownProps {
  currentTime: number;
}

export const Countdown: React.FC<CountdownProps> = ({ currentTime }) => {


  const convertSecondsInMins = (time: number) => {
    const mins = Math.floor(time / 60);
    const seconds = time % 60;
    return `${mins > 9 ? mins : `0${mins}`}:${
      seconds > 9 ? seconds : `0${seconds}`
    }`;
  };

  return (
    <div className="countdownContainer">
      {convertSecondsInMins(currentTime)}
    </div>
  );
};