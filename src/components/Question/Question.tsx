import "./Question.css";
import { IQuestion } from "../../models";
import { getTrueAnswer } from "../../utils/getTrueAnswer";

interface IProps {
  question: IQuestion;
  isAnswerShown: boolean;
}

const Question: React.FC<IProps> = ({ question, isAnswerShown }) => {
  const { number1, number2, action } = question;
  const trueAnswer = getTrueAnswer(question);

  const questionText = `${number1} ${action} ${number2}`;
  const answerText = isAnswerShown ? trueAnswer : "?";

  return (
    <div className="question-text">{`${questionText} = ${answerText}`}</div>
  );
};

export default Question;
