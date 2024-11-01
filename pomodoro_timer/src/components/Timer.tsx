import React, { useState } from "react";
import { Countdown } from "./Countdown";
import { TimerNav } from "./TimerNav";

export const Timer = () => {
  // let pomodoroTime = 0 * 60;
  // let shortBreak = 5 * 60;
// build later that i can also adjust timeframe of pomdoro
  const [intervalId, setIntervalId] = useState<number | undefined>(undefined);
  const [pomodoroTime, setPomodoroTime] = useState<number>(25 * 60);
  const[shortBreak, setShortBreak] = useState<number>(5 * 60)
  const [active, setActive] = useState<boolean>(false);
  const [round, setRound] = useState<number>(1)

/**
 * Pomodoro 25 mins concentrate, 5 mins break (4x) -> 15 mins break
 */
  // countdown implementation
  // beim countdown ist es momentan so, dass, wenn ich sehr oft auf pause drücke, es länger als der eigentliche countdown sein kann, weil die sekunde dann immer von vorne anfängt, das könnte ich noch mit date implentieren, dass pause drücken keinen einfluss auf meine Zeit hat 
  const handleButtonClick = () => {
    if (active) {
      clearInterval(intervalId);
      setIntervalId(undefined);
    } else {
      const newIntervalId = setInterval(() => {
        setPomodoroTime((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            return 0;
          }
        });
      }, 1000);
      setIntervalId(newIntervalId);
    }
    setActive(!active);
  };
  // checks if i currently have a break or are in a pomodoro session
  const currentlyPomodoro = pomodoroTime === 0 ? false : true; 
  // colors if im currently in a pomodoro session
  if (currentlyPomodoro) {
    document.documentElement.style.setProperty(
      "--main-color",
      "rgb(186, 73, 73)"
    );
    document.documentElement.style.setProperty(
      "--secondary-color",
      "rgb(235, 129, 129)"
    );
    document.documentElement.style.setProperty(
      "--navbar-color",
      "rgb(201, 66, 66)"
    );
    // colors if im currently in a break
  } else {
    document.documentElement.style.setProperty(
      "--main-color",
      "rgb(6, 158, 105)"
    );
    document.documentElement.style.setProperty(
      "--secondary-color",
      "rgb(22, 184, 127)"
    );
    document.documentElement.style.setProperty(
      "--navbar-color",
      "rgb(9, 122, 83)"
    );
  }
  return (
    <div className="timerContainer">
      <div className="timerWrapper">
      <TimerNav currentlyPomodoro={currentlyPomodoro} />
      <Countdown currentTime={pomodoroTime} />
      <button className="startButton" onClick={handleButtonClick}>
        {active ? "Pause" : "Start"}
      </button>
      
      {/* <button onClick={handleStopClick}>stop</button> */}
    </div>
    <a className="roundNumber">#{round}</a>
    </div>
  );
};
