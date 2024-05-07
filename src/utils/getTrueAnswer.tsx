import { IQuestion } from "../models";

export function getTrueAnswer({ action, number1, number2 }: IQuestion): number {
  if (action === "*") {
    return number1 * number2;
  } else {
    return number1 / number2;
  }
}
