/**
 * Receives either nothing, a max value, or a min and max value
 * @param {number} [minimum = 10000] - Minimum number value
 * @param {number} [maximum] - Maximun number value
 */
export const randomInt = (minimum = 10000, maximum = null) => {
  const realMinimum = maximum === null ? 0 : minimum;
  const realMaximum = maximum === null ? minimum : maximum;

  return (
    realMinimum + Math.floor(Math.random() * (realMaximum - realMinimum + 1))
  );
};
