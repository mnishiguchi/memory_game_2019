import shuffleArray from './shuffleArray';

it('returns a new array with shuffled content', () => {
  const original = [...Array(100).keys()];
  expect(shuffleArray(original)).not.toBe(original);
  expect(shuffleArray(original)[0]).not.toBe(original[0]);
});
