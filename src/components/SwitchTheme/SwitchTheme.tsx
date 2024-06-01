import { useState, useEffect } from "react";
import "./SwitchTheme.css";
import MoonImg from "../../images/moon.svg";
import SunImg from "../../images/sun.svg";
import { toggleTheme } from "../../redux/slices/themeSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { AnimatePresence, motion } from "framer-motion";

const SwitchTheme: React.FC = () => {
  const { theme } = useAppSelector((state) => state.themeReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    }
  }, [theme]);

  const handleClickTheme = () => {
    dispatch(toggleTheme());
  };

  const variants = {
    initial: {
      rotate: 0,
    },
    animate: {
      rotate: 360,
    },
  };

  return (
    <AnimatePresence mode="wait">
      {theme === "dark" ? (
        <motion.div
          key={"moon"}
          variants={variants}
          initial="initial"
          animate="animate"
          onClick={handleClickTheme}
          className="theme-container"
        >
          <img src={MoonImg} alt="" />
        </motion.div>
      ) : (
        <motion.div
          key={"sun"}
          variants={variants}
          initial="initial"
          animate="animate"
          onClick={handleClickTheme}
          className="theme-container"
        >
          <img src={SunImg} alt="" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SwitchTheme;
