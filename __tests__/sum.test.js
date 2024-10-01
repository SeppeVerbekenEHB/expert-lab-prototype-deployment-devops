const sum = require('../sum.js');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
  expect(sum(1, 2)).not.toBe(4);
  expect(sum(1, 2)).toBeGreaterThan(2);
  expect(sum(1, 2)).toBeLessThan(4);

//   write some failing tests as well
    expect(sum(1, 2)).toBe(4);
    expect(sum(1, 2)).not.toBe(3);
    expect(sum(1, 2)).toBeGreaterThan(4);
    expect(sum(1, 2)).toBeLessThan(2);
});