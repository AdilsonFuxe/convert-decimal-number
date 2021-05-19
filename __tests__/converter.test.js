const converter = require('../converter');
const ptNumbers = require('../pt-numbers.json');

describe('convert an number', () => {
  it('return a correct value on success', () => {
    for (let i = 1; i < 19; i++) expect(converter(i)).toBe(ptNumbers[i]);
    for (let i = 10; i < 100; i += 10) expect(converter(i)).toBe(ptNumbers[i]);
    for (let i = 100; i < 1000; i += 100)
      expect(converter(i)).toBe(ptNumbers[i]);
    expect(converter(1000000)).toBe(ptNumbers[1000000]);
  });
});
