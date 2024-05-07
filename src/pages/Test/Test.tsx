import { useState } from "react";
import "./Test.css";
import { checkAnswer } from "../../utils/checkAnswer";
import Question from "../../components/Question/Question";
import Answers from "../../components/Answers/Answers";
import { createQuestions } from "../../utils/createQuestions";
import { useNavigate, useParams } from "react-router-dom";
import { mixArr } from "../../utils/mixArr";
import uniqid from "generate-unique-id";

const Test: React.FC = () => {
  const navigate = useNavigate();

  const { levelid } = useParams();
  const action = levelid?.split("")[1] === "&" ? "/" : "*";
  const keyNumber = Number(levelid?.split("")[0]);

  const getQuestions = () => {
    return mixArr(
      createQuestions({
        keyNumber,
        action,
      })
    );
  };

  const [questions, setQuestions] = useState(getQuestions());
  const [activeQuestionOrder, setActiveQuestionOrder] = useState<number>(0);
  const [countMistakes, setCountMistakes] = useState(0);
  const [isAnswerShown, setIsAnswerShown] = useState(false);

  const resetTest = () => {
    setIsAnswerShown(false);
    setQuestions(getQuestions());
    setCountMistakes(0);
    setActiveQuestionOrder(0);
  };

  ///////////////////////////////////////////////

  const handleClickAnswer = (answer: number) => {
    setIsAnswerShown(true);

    const activeQuestion = questions[activeQuestionOrder];
    let newCountMistakes = countMistakes;
    let isLastQuestion = activeQuestionOrder === questions.length - 1;

    if (!checkAnswer(activeQuestion, answer)) {
      newCountMistakes = newCountMistakes + 1;
      setQuestions((questions) => [
        ...questions,
        { ...activeQuestion, id: uniqid() },
      ]);
      isLastQuestion = false;
    }

    setCountMistakes(newCountMistakes);

    //////////////////////////////////////////////////

    setTimeout(() => {
      if (isLastQuestion) {
        navigate(`/${levelid}/${newCountMistakes}`);
      } else {
        setActiveQuestionOrder((order) => order + 1);
        setIsAnswerShown(false);
      }
    }, 1500);
  };

  const activeQuestion = questions[activeQuestionOrder];

  return (
    <div className="test">
      <div className="info">
        <p>
          питання номер <b>{activeQuestionOrder + 1}</b>
        </p>
        <p>
          зроблено помилок <b>{countMistakes}</b>
        </p>
      </div>

      <Question question={activeQuestion} isAnswerShown={isAnswerShown} />

      <Answers clickAnswer={handleClickAnswer} question={activeQuestion}>
        <button className="button" onClick={resetTest}>
          Спочатку
        </button>
      </Answers>
    </div>
  );
};

export default Test;
