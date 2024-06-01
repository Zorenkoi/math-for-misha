import { useState, useEffect } from "react";
import { checkAnswer } from "../../utils/checkAnswer";
import { makeTrueAnswer } from "../../redux/slices/hintsSlice";
import { useAppDispatch } from "../../hooks";
import { IQuestion } from "../../models";
import "./ListAnswers.css";
import { motion, useAnimate } from "framer-motion";

const variants = {
  initial: {
    top: 60,
    opacity: 0,
  },
  animate: (i: number) => ({
    top: 0,
    opacity: 1,
    transition: {
      delay: i * 0.1,
    },
  }),
};

interface IProps {
  question: IQuestion;
  isWaiting: boolean;
  answers: { answer: number; id: string }[];
  throwAnswer: (answer: number) => void;
  setIsWaiting: (value: boolean) => void;
}

const ListAnswers: React.FC<IProps> = ({
  answers,
  throwAnswer,
  isWaiting,
  setIsWaiting,
  question,
}) => {
  const dispatch = useAppDispatch();
  const [yourAnswer, setYourAnswer] = useState<number | null>(null);

  useEffect(() => {
    setYourAnswer(null);
  }, [question]);

  const clickAnswer = (answer: number) => {
    setIsWaiting(true);
    setYourAnswer(answer);

    if (checkAnswer(question, answer)) {
      dispatch(makeTrueAnswer());
    }

    throwAnswer(answer);
  };

  return (
    <div className="answers-container">
      {answers.map(({ answer, id }, i) => {
        const isTrueAnswer = checkAnswer(question, answer);
        const isYourAnswer = answer === yourAnswer;

        let className = "answer";

        if (isWaiting) {
          if (isYourAnswer) className = "answer your-answer";
          if (isTrueAnswer) className = "answer true-answer";
        }

        return (
          <AnswerButton
            i={i}
            key={id}
            answer={answer}
            className={className}
            isWaiting={isWaiting}
            isTrueAnswer={isTrueAnswer}
            isYourAnswer={isYourAnswer}
            onClick={() => clickAnswer(answer)}
          />
        );
      })}
    </div>
  );
};

const AnswerButton = ({
  i,
  isWaiting,
  isTrueAnswer,
  isYourAnswer,
  onClick,
  className,
  answer,
}: {
  i: number;
  isWaiting: boolean;
  isTrueAnswer: boolean;
  isYourAnswer: boolean;
  className: string;
  answer: number;
  onClick: () => void;
}) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (isWaiting === true && !isTrueAnswer && !isYourAnswer) {
      animate(
        scope.current,
        {
          top: 60,
          opacity: 0,
        },
        {
          delay: i * 0.05,
        }
      );
    }
  }, [isWaiting, isTrueAnswer]);

  return (
    <motion.button
      ref={scope}
      variants={variants}
      initial="initial"
      animate="animate"
      custom={i}
      disabled={isWaiting}
      className={className}
      onClick={onClick}
    >
      {answer}
    </motion.button>
  );
};

export default ListAnswers;
