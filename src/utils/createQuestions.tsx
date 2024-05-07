import { IQuestion } from "../models";
import uniqId from "generate-unique-id";

interface IParams {
  keyNumber: number;
  action: "*" | "/";
}

export function createQuestions({ keyNumber, action }: IParams): IQuestion[] {
  const resArr = [];

  if (action === "*") {
    for (let i = 1; i <= 9; i++) {
      const newQuestion = {
        order: i - 1,
        number1: keyNumber,
        number2: i,
        action,
        id: uniqId(),
      };

      resArr.push(newQuestion);
    }
  }

  if (action === "/") {
    for (let i = 1; i <= 9; i++) {
      const newQuestion = {
        order: i - 1,
        number1: keyNumber * i,
        number2: keyNumber,
        action,
        id: uniqId(),
      };

      resArr.push(newQuestion);
    }
  }

  return resArr;
}
