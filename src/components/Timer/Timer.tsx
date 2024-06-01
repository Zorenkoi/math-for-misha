import { useState, useEffect } from "react";
import ClockBlackImg from "../../images/clock-black.svg";
import ClockWhiteImg from "../../images/clock-white.svg";
import { motion, useAnimate } from "framer-motion";
import "./Timer.css";
import { useAppSelector } from "../../hooks";

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
  const { theme } = useAppSelector((state) => state.themeReducer);
  const [scope, animate] = useAnimate();

  const amimateTimer = () => {
    const rotateAnimation = {
      rotate: [0, -15, 15, -15, 15, -15, 15, -15, 15, 0],
    };
    const scaleAnimation = {
      scale: [1, 1.2, 1],
    };
    const transitionSettings = {
      duration: 0.6,
    };

    animate(scope.current, rotateAnimation, transitionSettings);
    animate(scope.current, scaleAnimation, transitionSettings);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isActive) return;

      setSecondsLeft((secondsLeft) => {
        const newSecondsLeft = secondsLeft - 1;

        if (newSecondsLeft <= 0) {
          amimateTimer();
          timeOutFunction();
          clearInterval(intervalId);
        }

        return newSecondsLeft;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isActive]);

  return (
    <motion.div ref={scope} className="timer">
      <img src={theme === "dark" ? ClockWhiteImg : ClockBlackImg} alt="" />
      <p>{secondsLeft}</p>
    </motion.div>
  );
};

export default Timer;
