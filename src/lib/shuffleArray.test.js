import shuffleArray from './shuffleArray';

it('returns a new array with shuffled content', () => {
  const original = [...Array(100).keys()];
  const result = shuffleArray(original)
  expect(result).not.toBe(original);
  expect(result[0]).not.toBe(original[0]);
});
