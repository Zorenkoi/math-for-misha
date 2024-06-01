import { useState, useEffect, PropsWithChildren } from "react";
import { IQuestion } from "../../models";
import { mixArr } from "../../utils/mixArr";
import Timer from "../Timer/Timer";
import Hint from "../Hint/Hint";
import ListAnswers from "../ListAnswers/ListAnswers";
import { getTrueAnswer } from "../../utils/getTrueAnswer";
import "./Answers.css";
import generateUniqueId from "generate-unique-id";

interface IProps {
  throwAnswer: (answer: number) => void;
  question: IQuestion;
}

const Answers: React.FC<PropsWithChildren<IProps>> = ({
  throwAnswer,
  question,
  children,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(15);
  const [answers, setAnswers] = useState(createAnswers(question));
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    setIsWaiting(false);
    setAnswers(createAnswers(question));
    setSecondsLeft(15);
  }, [question]);

  const clickHint = () => {
    setIsWaiting(true);
    const trueAnswer = getTrueAnswer(question);
    throwAnswer(trueAnswer);
  };

  const timeOutFunction = () => {
    setIsWaiting(true);
    throwAnswer(99999999999);
  };

  return (
    <div>
      <ListAnswers
        answers={answers}
        isWaiting={isWaiting}
        question={question}
        throwAnswer={throwAnswer}
        setIsWaiting={setIsWaiting}
      />

      <div className="answers-button-container">
        <Hint onClick={clickHint} isWaiting={isWaiting} />
        <div className="bottom">{children}</div>
      </div>

      <Timer
        isActive={!isWaiting}
        secondsLeft={secondsLeft}
        setSecondsLeft={setSecondsLeft}
        timeOutFunction={timeOutFunction}
      />
    </div>
  );
};

function createAnswers({
  number1,
  number2,
  action,
}: IQuestion): { answer: number; id: string }[] {
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
  rezArr = mixArr(rezArr);

  return rezArr.map((answer) => ({
    id: generateUniqueId(),
    answer,
  }));
}

export default Answers;
