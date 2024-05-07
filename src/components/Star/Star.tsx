import "./Star.css";
import starEmptyImg from "../../images/star-empty.svg";
import starImg from "../../images/star.svg";

interface IProps {
  type: "empty" | "filled";
}

const Star: React.FC<IProps> = ({ type }) => {
  return (
    <div className="star-icon">
      <img src={type === "filled" ? starImg : starEmptyImg} alt="" />
    </div>
  );
};

export default Star;
