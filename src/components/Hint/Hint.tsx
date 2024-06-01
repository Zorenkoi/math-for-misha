import "./Hint.css";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { takeHint } from "../../redux/slices/hintsSlice";
import HintScale from "../HintScale/HintScale";

interface IProps {
  onClick: () => void;
  isWaiting: boolean;
}

const Hint: React.FC<IProps> = ({ onClick, isWaiting }) => {
  const dispatch = useAppDispatch();

  const { countHint, hintDialLevel } = useAppSelector(
    (state) => state.hintsReducer
  );

  const handleClick = () => {
    onClick();
    dispatch(takeHint());
  };

  const disabled = countHint === 0 || isWaiting;

  return (
    <div className="hint-container">
      <button disabled={disabled} onClick={handleClick} className="button">
        використати підказку
      </button>

      <HintScale hintDialLevel={hintDialLevel} />

      <Frase countHint={countHint} />
    </div>
  );
};

const Frase = ({ countHint }: { countHint: number }) => {
  const firstWord = countHint === 1 ? "Залишилась" : "Залишилося";
  const lastWord = getLastWord(countHint);
  return (
    <p className="hint-text">
      <b>{countHint}</b> {lastWord}
    </p>
  );
};

function getLastWord(countHint: number): string {
  if (countHint % 10 === 1 && countHint % 100 !== 11) {
    return `підказка`;
  } else if (
    [2, 3, 4].includes(countHint % 10) &&
    ![12, 13, 14].includes(countHint % 100)
  ) {
    return `підказки`;
  } else {
    return `підказок`;
  }
}

export default Hint;
