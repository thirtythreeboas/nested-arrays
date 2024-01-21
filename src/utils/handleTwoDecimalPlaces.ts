export const handleTwoDecimalPlaces = (number: number) => {
  return Math.round(number * 100) / 100;
};
