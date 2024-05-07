import { useState, useEffect, Children, PropsWithChildren } from "react";
import "./Answers.css";
import { IQuestion } from "../../models";
import { mixArr } from "../../utils/mixArr";
import { checkAnswer } from "../../utils/checkAnswer";
import Timer from "../Timer/Timer";
import HintButton from "../HintButton/HintButton";
import { makeTrueAnswer } from "../../redux/slices/hintsSlice";
import { useAppDispatch } from "../../hooks";

interface IProps {
  clickAnswer: (answer: number) => void;
  question: IQuestion;
}

const Answers: React.FC<PropsWithChildren<IProps>> = ({
  clickAnswer,
  question,
  children,
}) => {
  const dispatch = useAppDispatch();
  const [secondsLeft, setSecondsLeft] = useState(15);

  const [answers, setAnswers] = useState(createAnswers(question));
  const [isWaiting, setIsWaiting] = useState(false);
  const [yourAnswer, setYourAnswer] = useState<number | null>(null);
  const [trueAnswer, setTrueAnswer] = useState<number | null>(null);

  useEffect(() => {
    setIsWaiting(false);
    setAnswers(createAnswers(question));
    setTrueAnswer(null);
    setYourAnswer(null);
    setSecondsLeft(15);
  }, [question]);

  const handleClickAnswer = (answer: number) => {
    setIsWaiting(true);
    setYourAnswer(answer);

    answers.forEach((_answer) => {
      if (checkAnswer(question, _answer)) setTrueAnswer(_answer);
    });

    clickAnswer(answer);
  };

  return (
    <div>
      <div className="answer-container">
        {answers.map((answer) => {
          const className = getAnswerClassName({
            yourAnswer,
            trueAnswer,
            answer,
          });

          const handleClick = () => {
            if (checkAnswer(question, answer)) {
              dispatch(makeTrueAnswer());
            }

            handleClickAnswer(answer);
          };

          return (
            <button
              disabled={isWaiting}
              className={className}
              onClick={handleClick}
              key={answer + question.id}
            >
              {answer}
            </button>
          );
        })}
      </div>

      <div className="button-container">
        <div className="left">{children}</div>

        <HintButton
          question={question}
          handleClickAnswer={handleClickAnswer}
          isWaiting={isWaiting}
        />
      </div>

      <Timer
        isActive={!isWaiting}
        secondsLeft={secondsLeft}
        setSecondsLeft={setSecondsLeft}
        timeOutFunction={() => handleClickAnswer(1000)}
      />
    </div>
  );
};

function getAnswerClassName({
  answer,
  yourAnswer,
  trueAnswer,
}: {
  answer: number | null;
  yourAnswer: number | null;
  trueAnswer: number | null;
}) {
  let className = "answer";

  if (answer === yourAnswer) {
    className = "answer youranswer";
  }

  if (answer === trueAnswer) {
    className = "answer trueanswer";
  }

  return className;
}

function createAnswers({ number1, number2, action }: IQuestion): number[] {
  const arrCof = [-3, -2, -1, 1, 2, 3];
  let rezArr: number[] = [];
  let trueAnswer: number = 0;

  if (action === "*") {
    trueAnswer = number1 * number2;

    arrCof.forEach((cof) => {
      const answer = trueAnswer + cof * number1;
      if (answer > 0) rezArr.push(answer);
    });
  }

  if (action === "/") {
    arrCof.forEach((cof) => {
      const answer = (number1 + cof * number2) / number2;
      if (answer > 0) rezArr.push(answer);
    });

    trueAnswer = number1 / number2;
  }

  rezArr = mixArr(rezArr).slice(0, 3);
  rezArr.push(trueAnswer);
  return mixArr(rezArr);
}

export default Answers;
