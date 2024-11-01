import React from "react";

interface TimerNavProps{
  currentlyPomodoro: boolean
}

export const TimerNav : React.FC<TimerNavProps> = ( {currentlyPomodoro} ) => {
  return (
    <div className="timerNavContainer">
        <ul>
        <li className={currentlyPomodoro ? "active" : "passive"}>Pomodoro</li>
        <li className={currentlyPomodoro ? "passive" : "active"}>Short Break</li>
        <li>Long Break</li>
        
        </ul>
        
      {/* {currentlyPomodoro ? "Pomodoro" : "Short Break"} */}
    </div>
  );
};
