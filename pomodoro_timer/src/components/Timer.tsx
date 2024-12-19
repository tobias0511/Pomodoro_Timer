import React, { useEffect, useState } from "react";
import { Countdown } from "./Countdown";
import { TimerNav } from "./TimerNav";

export const Timer = () => {
  // let pomodoroTime = 0 * 60;
  // let shortBreak = 5 * 60;
  // build later that i can also adjust timeframe of pomdoro

  const POMODORO_TIME = 0.05 * 60;
  const SHORT_BREAK = 0.05 * 60;
  const LONG_BREAK = 0.05 * 60;
  const [intervalId, setIntervalId] = useState<number | undefined>(undefined);
  const [pomodoroTime, setPomodoroTime] = useState<number>(POMODORO_TIME);
  const [shortBreak, setShortBreak] = useState<number>(SHORT_BREAK);
  const [longBreak, setLongBreak] = useState<number>(LONG_BREAK);
  const [active, setActive] = useState<boolean>(false);
  const [round, setRound] = useState<number>(1);
  const [session, setSession] = useState<
    "pomodoro" | "shortBreak" | "longBreak"
  >("pomodoro");

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
          setShortBreak((prev) => prev - 1); // use max(prev - 1, 0) to prevent failing if i dont have round seconds
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
      round % 4 ? setSession("shortBreak") : setSession("longBreak");
      round % 4 ? sendNotification("shortBreak") : sendNotification("longBreak") // give notification for shortBreak or longBreak
      setPomodoroTime(POMODORO_TIME);
      setActive(false);
    } else if (shortBreak === 0 && session === "shortBreak") {
      
      clearInterval(intervalId);
      setSession("pomodoro");
      sendNotification("pomodoro")
      setShortBreak(SHORT_BREAK);
      setActive(false);
      setRound(round + 1);
    } else if (longBreak === 0 && session === "longBreak") {
      
      clearInterval(intervalId);
      setSession("pomodoro");
      sendNotification("pomodoro")
      setLongBreak(LONG_BREAK);
      setActive(false);
      setRound(round + 1);
    }
  }, [pomodoroTime, shortBreak, longBreak, session, round, intervalId]);



  const sendNotification = (cur_session : "pomodoro" | "shortBreak" | "longBreak") => {
    if (Notification.permission === "granted") {
      if (cur_session === "pomodoro"){
        new Notification("Zeit zu arbeiten", {
          body: `Du hast jetzt ${pomodoroTime / 60} Minuten Zeit konzentriert zu arbeiten.`,
        });

      } else if (cur_session === "shortBreak"){
        new Notification("Zeit für eine Pause", {
          body: `Du kannst ${shortBreak / 60} Minuten Pause machen.`,
        });

      } else if (cur_session === "longBreak") {
        new Notification("Zeit für eine Pause", {
          body: `Du kannst ${longBreak / 60} Minuten Pause machen.`,
        });
      }
      
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          new Notification("Countdown beendet!", {
            body: "Dein Countdown ist abgelaufen!",
          });
        }
      });
    }
  }

  return (
    <div className={`timerContainer ${session}`}>
      <div className="timerWrapper">
        <TimerNav currentSession={session} />
        <Countdown
          currentTime={
            session === "pomodoro"
              ? pomodoroTime
              : session === "shortBreak"
              ? shortBreak
              : longBreak
          }
        />
        <button className="startButton" onClick={handleButtonClick}>
          {active ? "Pause" : "Start"}
        </button>
      </div>
      <a className="roundNumber"># {round}</a>
    </div>
  );
};
