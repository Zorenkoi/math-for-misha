import { useState, useEffect } from "react";
import "./Timer.css";

interface IProps {
  secondsLeft: number;
  setSecondsLeft: React.Dispatch<React.SetStateAction<number>>;
  isActive: boolean;
  timeOutFunction: () => void;
}

const Timer: React.FC<IProps> = ({
  secondsLeft,
  setSecondsLeft,
  isActive,
  timeOutFunction,
}) => {
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    if (isActive) {
      intervalId = setInterval(() => {
        setSecondsLeft((seconds) => {
          const newValue = seconds - 1;

          if (newValue === 0) {
            timeOutFunction();
            clearInterval(intervalId);
          }

          return newValue;
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive]);

  return <div className="timer">{secondsLeft}</div>;
};

export default Timer;
