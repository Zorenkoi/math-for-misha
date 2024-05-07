import "./Levels.css";
import { useNavigate } from "react-router-dom";
import { createLevels } from "../../utils/createLevels";
import { useAppSelector } from "../../hooks";
import Level from "../../components/Level/Level";
import { checkIsLevelAvailable } from "../../utils/checkIsLevelAvailable";

const Levels: React.FC = () => {
  const navigate = useNavigate();
  const { levelsScore } = useAppSelector((state) => state.levelsReducer);

  const levels = createLevels();

  return (
    <div>
      <h1 className="header">Рівні</h1>

      <div className="level-container">
        {levels.map((level) => {
          const { id: levelId } = level;

          const className = getLevelClassName({
            levelsScore,
            levelId,
          });

          const clickLevel = () => {
            if (checkIsLevelAvailable({ levelsScore, levelId })) {
              navigate(`/${levelId}`);
            }
          };

          const countMistakes = getCountMistakes(levelsScore[levelId]);

          return (
            <Level
              key={levelId}
              {...level}
              className={className}
              clickLevel={clickLevel}
              countMistakes={countMistakes}
            />
          );
        })}
      </div>
    </div>
  );
};

function getCountMistakes(value: number): number {
  if (value === 0) return 0;
  if (!value) return 100;
  return value;
}

function getLevelClassName({
  levelsScore,
  levelId,
}: {
  levelsScore: Record<string, number>;
  levelId: string;
}) {
  let className = "level";

  if (levelsScore[levelId] && levelsScore[levelId] === 0) {
    className += " completed";
    return className;
  }

  if (checkIsLevelAvailable({ levelsScore, levelId })) {
    className += " available";
    return className;
  }

  className += " unavailable";
  return className;
}

export default Levels;
