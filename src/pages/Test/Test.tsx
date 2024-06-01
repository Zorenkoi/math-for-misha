import { useState } from "react";
import { checkAnswer } from "../../utils/checkAnswer";
import Question from "../../components/Question/Question";
import Answers from "../../components/Answers/Answers";
import { createQuestions } from "../../utils/createQuestions";
import { useNavigate, useParams } from "react-router-dom";
import { mixArr } from "../../utils/mixArr";
import uniqid from "generate-unique-id";
import { useAppDispatch } from "../../hooks";
import { setLevelScore } from "../../redux/slices/levelsSlice";
import QuestionInfo from "../../components/QuestionInfo/QuestionInfo";
import "./Test.css";

const Test: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  let { levelid } = useParams();
  levelid = String(levelid);
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

  const finishTest = () => {
    const newCountMistakes =
      questions.length - activeQuestionOrder + countMistakes;

    dispatch(setLevelScore({ levelid, countMistakes: newCountMistakes }));
    navigate(`/${levelid}/${newCountMistakes}`);
  };

  ///////////////////////////////////////////////

  const chooseAnswer = (answer: number) => {
    setIsAnswerShown(true);

    const activeQuestion = questions[activeQuestionOrder];
    const isTrueAnswer = checkAnswer(activeQuestion, answer);
    const newCountMistakes = isTrueAnswer ? countMistakes : countMistakes + 1;
    const isLastQuestion =
      isTrueAnswer && activeQuestionOrder === questions.length - 1;

    setCountMistakes(newCountMistakes);

    if (!isTrueAnswer) {
      setQuestions((questions) => [
        ...questions,
        { ...activeQuestion, id: uniqid() },
      ]);
    }

    if (isLastQuestion) {
      setTimeout(() => {
        dispatch(setLevelScore({ levelid, countMistakes: newCountMistakes }));
        navigate(`/${levelid}/${newCountMistakes}`);
      }, 1500);
    } else {
      setTimeout(() => {
        setActiveQuestionOrder((order) => order + 1);
        setIsAnswerShown(false);
      }, 1500);
    }
  };

  const activeQuestion = questions[activeQuestionOrder];

  return (
    <div className="test">
      <QuestionInfo
        countMistakes={countMistakes}
        questionNumber={activeQuestionOrder}
      />

      <Question question={activeQuestion} isAnswerShown={isAnswerShown} />

      <Answers throwAnswer={chooseAnswer} question={activeQuestion}>
        <button className="button" onClick={resetTest}>
          Спочатку
        </button>

        <button className="button" onClick={finishTest}>
          Закінчити тест
        </button>
      </Answers>
    </div>
  );
};

export default Test;
