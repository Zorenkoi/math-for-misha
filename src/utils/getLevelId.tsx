export function getNextLevelId(levelid: string): string {
  const arr = levelid?.split("");
  const number = Number(arr[0]);
  const action = arr[1];

  if (action === "*") {
    const firstPart = number === 9 ? 2 : number + 1;
    const secondPart = number === 9 ? "&" : "*";

    return `${firstPart}${secondPart}`;
  } else {
    const firstPart = number + 1;
    const secondPart = "&";

    return `${firstPart}${secondPart}`;
  }
}
export function getPreviousLevelId(levelid: string): string {
  const arr = levelid?.split("");
  const number = Number(arr[0]);
  const action = arr[1];

  if (action === "*") {
    if (number === 2) return "";

    const firstPart = number === 2 ? "" : number - 1;
    const secondPart = number === 2 ? "" : "*";

    return `${firstPart}${secondPart}`;
  } else {
    const firstPart = number === 2 ? 9 : number - 1;
    const secondPart = number === 2 ? "*" : "&";

    return `${firstPart}${secondPart}`;
  }
}
