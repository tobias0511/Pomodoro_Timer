import React from "react";

interface TimerNavProps {
  currentSession: "shortBreak" | "longBreak" | "pomodoro";
}

export const TimerNav: React.FC<TimerNavProps> = ({ currentSession }) => {
  return (
    <div className="timerNavContainer">
      <ul>
        <li className={currentSession === "pomodoro" ? "pomodoro" : ""}>
          Pomodoro
        </li>
        <li className={currentSession === "shortBreak" ? "shortBreak" : ""}>
          Short Break
        </li>
        <li className={currentSession === "longBreak" ? "longBreak" : ""}>
          Long Break
        </li>
      </ul>
    </div>
  );
};
