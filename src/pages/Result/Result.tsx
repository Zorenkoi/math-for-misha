import "./Result.css";
import { useNavigate, useParams } from "react-router-dom";
import StarContainer from "../../components/StarContainer/StarContainer";
import { getNextLevelId } from "../../utils/getLevelId";
import { checkIsLevelAvailable } from "../../utils/checkIsLevelAvailable";
import { useAppSelector } from "../../hooks";
import { checkIsLastLevel } from "../../utils/checkIsLastLevel";

const Result: React.FC = () => {
  const { levelsScore } = useAppSelector((state) => state.levelsReducer);
  const navigate = useNavigate();

  let { levelid } = useParams();
  levelid = levelid ? levelid : "";
  const { mistakes } = useParams();
  const countMistakes = Number(mistakes);

  const nextLevelId = getNextLevelId(levelid);

  const isNextLevelAvailable = checkIsLevelAvailable({
    levelsScore,
    levelId: nextLevelId,
  });

  const isLastLevel = checkIsLastLevel(levelid);

  return (
    <>
      <StarContainer countMistakes={countMistakes} />

      {isLastLevel && countMistakes === 0 ? (
        <CongratulationHeader />
      ) : (
        <ResultHeader countMistakes={countMistakes} />
      )}

      <div className="result-button-container">
        <button onClick={() => navigate(-1)} className="button">
          пройти ще раз
        </button>

        <button onClick={() => navigate("/")} className="button">
          інші рівні
        </button>

        {!isLastLevel && (
          <button
            disabled={!isNextLevelAvailable}
            onClick={() => navigate(`/${nextLevelId}`)}
            className="button"
          >
            наступний рівень
          </button>
        )}
      </div>
    </>
  );
};

const ResultHeader = ({ countMistakes }: { countMistakes: number }) => {
  const getLastWord = (countMistakes: number): string => {
    if (countMistakes === 1) {
      return `помилку`;
    } else if (countMistakes >= 2 && countMistakes <= 4) {
      return `помилки`;
    } else {
      return `помилок`;
    }
  };

  const lastWord = getLastWord(countMistakes);
  return (
    <div className="result-header h1">
      Ви зробили {countMistakes} {lastWord}
    </div>
  );
};

const CongratulationHeader = () => {
  return (
    <div className="result-header h1">
      Вітаю тебе Міша
      <br /> тепер ти майстер таблиці множення
    </div>
  );
};

export default Result;
