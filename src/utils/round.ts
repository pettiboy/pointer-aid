export default (num: number, demimalPlaces?: number) => {
  const multiplier = Math.pow(10, demimalPlaces || 1);

  return Math.round((num + Number.EPSILON) * multiplier) / multiplier;
};
