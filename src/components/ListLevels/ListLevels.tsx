import "./ListLevels.css";
import { createLevels } from "../../utils/createLevels";
import { useAppSelector } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { checkIsLevelAvailable } from "../../utils/checkIsLevelAvailable";
import Level from "../Level/Level";

const ListLevels: React.FC = () => {
  const navigate = useNavigate();

  const { levelsScore } = useAppSelector((state) => state.levelsReducer);

  const levels = createLevels();

  return (
    <div className="levels-container">
      {levels.map((level) => {
        const { id: levelId } = level;

        const isAvailable = checkIsLevelAvailable({ levelsScore, levelId });

        const className = `level ${isAvailable ? "available" : "unavailable"}`;

        const clickLevel = () => {
          if (isAvailable) {
            navigate(`/${levelId}`);
          }
        };

        const countMistakes = levelsScore[levelId];

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
  );
};

export default ListLevels;
