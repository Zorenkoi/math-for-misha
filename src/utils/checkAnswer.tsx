import { IQuestion } from "../models";

export const checkAnswer = (question: IQuestion, answer: number) => {
  const { number1, number2, action } = question;

  if (action === "*") {
    if (Number(answer) === number1 * number2) return true;
  }
  if (action === "/") {
    if (Number(answer) === number1 / number2) return true;
  }

  return false;
};
