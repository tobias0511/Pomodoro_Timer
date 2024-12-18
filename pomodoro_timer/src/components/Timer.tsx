import React, { act, useEffect, useRef, useState } from "react";
import { Countdown } from "./Countdown";
import { TimerNav } from "./TimerNav";
import { flushSync } from "react-dom";

export const Timer = () => {
  // let pomodoroTime = 0 * 60;
  // let shortBreak = 5 * 60;
// build later that i can also adjust timeframe of pomdoro

const POMODORO_TIME = 0.05*60
const SHORT_BREAK = 0.05 * 60
const LONG_BREAK = 15 * 60
  const [intervalId, setIntervalId] = useState<number | undefined>(undefined);
  const [pomodoroTime, setPomodoroTime] = useState<number>(POMODORO_TIME);
  const[shortBreak, setShortBreak] = useState<number>(SHORT_BREAK)
  const[longBreak, setLongBreak] = useState<number>(LONG_BREAK)
  const [active, setActive] = useState<boolean>(false);
  const [round, setRound] = useState<number>(1)
  const [session, setSession] = useState<"pomodoro" | "shortBreak" | "longBreak">("pomodoro")
 
 
/**
 * Pomodoro 25 mins concentrate, 5 mins break (4x) -> 15 mins break
 */
  // countdown implementation
  // beim countdown ist es momentan so, dass, wenn ich sehr oft auf pause drücke, es länger als der eigentliche countdown sein kann, weil die sekunde dann immer von vorne anfängt, das könnte ich noch mit date implentieren, dass pause drücken keinen einfluss auf meine Zeit hat 
  const handleButtonClick = () => {
    if (active) {
      clearInterval(intervalId);
      setIntervalId(undefined);
      setActive(false);
    } else {
      const newIntervalId = setInterval(() => {
        if (session === "pomodoro") {
          setPomodoroTime((prev) => prev - 1);
        } else if (session === "shortBreak") {
          setShortBreak((prev) => prev - 1);
        } else if (session === "longBreak") {
          setLongBreak((prev) => prev - 1);
        }
      }, 1000);
      setIntervalId(newIntervalId);
      setActive(true);
    }
  };

  useEffect(() => {
    if (pomodoroTime === 0 && session === "pomodoro") {
      clearInterval(intervalId);
      round < 4 ? setSession("shortBreak") : setSession("longBreak")
      setPomodoroTime(POMODORO_TIME);
      setActive(false);
    } else if (shortBreak === 0 && session === "shortBreak") {
      clearInterval(intervalId);
      // setSession(round < 4 ? "pomodoro" : "longBreak");
      setSession("pomodoro")
      setShortBreak(SHORT_BREAK);
      setActive(false);
      setRound(round < 4 ? round + 1 : 1);
    } else if (longBreak === 0 && session === "longBreak") {
      clearInterval(intervalId);
      setSession("pomodoro");
      setLongBreak(LONG_BREAK);
      setActive(false);
    }
  }, [pomodoroTime, shortBreak, longBreak, session, round, intervalId]);
  // checks if i currently have a break or are in a pomodoro session
  // const currentlyPomodoro = pomodoroTime === 0 ? false : true; 
  const currentlyPomodoro = session === "pomodoro" ? true : false
  // const sess = 
  // colors if im currently in a pomodoro session
  if (session === "pomodoro") {
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
  } else if (session === "shortBreak") {
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

  // active is set to false if pomodoro time is 0 => button displays start that the pause can be started 
  // useEffect(() => {
  //   if(pomodoroTime === 0){
  //     setActive(false)
  //     setPomodoroTime(POMODORO_TIME)
  //     setSession("shortBreak")
  //   }
  // }, [pomodoroTime])

  // useEffect(() => {
  //   if(shortBreak === 0){
  //     setActive(false)
  //     setShortBreak(SHORT_BREAK)
  //     setSession("pomodoro")
  //   }
  // }, [shortBreak])

  
  return (
    <div className={`timerContainer ${session}`}>
      <div className="timerWrapper">
      <TimerNav currentSession={session} />
      <Countdown currentTime={session === "pomodoro" ? pomodoroTime : session === "shortBreak" ? shortBreak : longBreak} />
      <button className="startButton" onClick={handleButtonClick}>
        {active ? "Pause" : "Start"}
      </button>
      
      {/* <button onClick={handleStopClick}>stop</button> */}
    </div>
    <a className="roundNumber">#{round}</a>
    <a>{session}</a>
    </div>
  );
};
