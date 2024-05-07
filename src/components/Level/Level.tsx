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

      <div>
        {actionType === "*" ? "множення" : "ділення"} на {number}
      </div>
    </div>
  );
};

export default Level;
