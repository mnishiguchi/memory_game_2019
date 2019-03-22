import padNumber from './padNumber';

it('returns a 0-padded number string', () => {
  expect(padNumber(1)).toBe('0000000001')
  expect(padNumber(1, 4)).toBe('0001')
});
