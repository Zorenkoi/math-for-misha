import StarContainer from "../StarContainer/StarContainer";
import "./Level.css";

interface IProps {
  clickLevel: () => void;
  actionType: string;
  number: number;
  className: string;
  countMistakes: number;
}

const Level: React.FC<IProps> = ({
  actionType,
  className,
  clickLevel,
  number,
  countMistakes,
}) => {
  return (
    <div onClick={clickLevel} className={className}>
      <StarContainer countMistakes={countMistakes} />

      {number === 9 ? (
        <b>BOSS</b>
      ) : (
        <div>
          {actionType === "*" ? "множення" : "ділення"} на
          <br />
          <b>{number}</b>
        </div>
      )}
    </div>
  );
};

export default Level;
