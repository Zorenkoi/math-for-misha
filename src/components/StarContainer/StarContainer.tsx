import "./StarContainer.css";

import Star from "../Star/Star";
interface IProps {
  countMistakes: number;
}

const StarContainer: React.FC<IProps> = ({ countMistakes }) => {
  return (
    <div className="star-container">
      {countMistakes <= 6 ? <Star type="filled" /> : <Star type="empty" />}
      {countMistakes <= 3 ? <Star type="filled" /> : <Star type="empty" />}
      {countMistakes <= 0 ? <Star type="filled" /> : <Star type="empty" />}
    </div>
  );
};

export default StarContainer;
