export interface IQuestion {
  order: number;
  number1: number;
  number2: number;
  action: "*" | "/";
  id: string;
}

export interface ILevel {
  number: number;
  actionType: "*" | "&";
  id: string;
}
