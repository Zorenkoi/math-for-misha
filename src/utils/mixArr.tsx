export function mixArr<T>(array: T[]): T[] {
  const arrayWithRandom: { value: T; randomNum: number }[] = array.map(
    (value) => ({
      value,
      randomNum: Math.random(),
    })
  );

  arrayWithRandom.sort((a, b) => a.randomNum - b.randomNum);

  return arrayWithRandom.map((item) => item.value);
}
