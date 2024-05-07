import { ILevel } from "../models";

export function createLevels(): ILevel[] {
  const rezArr: ILevel[] = [];
  const arr = [2, 3, 4, 5, 6, 7, 8, 9];

  arr.forEach((number) => {
    const actionType = "*";
    rezArr.push({ number, actionType, id: number + actionType });
  });

  arr.forEach((number) => {
    const actionType = "&";
    rezArr.push({ number, actionType, id: number + actionType });
  });

  return rezArr;
}
