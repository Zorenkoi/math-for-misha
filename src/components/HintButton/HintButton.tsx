import { useState, useEffect } from "react";
import { IQuestion } from "../../models";
import "./HintButton.css";
import { getTrueAnswer } from "../../utils/getTrueAnswer";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { takeHint } from "../../redux/slices/hintsSlice";

interface IProps {
  question: IQuestion;
  handleClickAnswer: (answer: number) => void;
  isWaiting: boolean;
}

const HintButton: React.FC<IProps> = ({
  question,
  handleClickAnswer,
  isWaiting,
}) => {
  const [hintLevel, setHintLevel] = useState(0);
  const dispatch = useAppDispatch();
  const { countHint, hintDialLevel } = useAppSelector(
    (state) => state.hintsReducer
  );

  useEffect(() => {
    if (hintDialLevel === 0) {
      setHintLevel(4);

      setTimeout(() => {
        setHintLevel(0);
      }, 500);
    } else {
      setHintLevel(hintDialLevel);
    }
  }, [hintDialLevel]);

  const handleClick = () => {
    if (countHint > 0) {
      const trueAnswer = getTrueAnswer(question);
      handleClickAnswer(trueAnswer);

      dispatch(takeHint());
    }
  };

  const disabled = countHint === 0 || isWaiting;

  return (
    <div className="hint-container">
      <button disabled={disabled} onClick={handleClick} className="button">
        використати підказку
      </button>
      <div>
        Залишилось <b>{countHint}</b> підказок
      </div>
      <div className="hint-level-container">
        <div
          className="hint-level"
          style={{
            width: `${100 - hintLevel * 25}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default HintButton;
