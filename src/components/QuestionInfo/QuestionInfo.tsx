import "./QuestionInfo.css";

interface IProps {
  questionNumber: number;
  countMistakes: number;
}

const QuestionInfo: React.FC<IProps> = ({ countMistakes, questionNumber }) => {
  return (
    <div className="info">
      <p>
        Питання: <b>{questionNumber + 1}</b>
      </p>
      <p>
        Помилок: <b>{countMistakes}</b>
      </p>
    </div>
  );
};

export default QuestionInfo;
