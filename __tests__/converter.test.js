const convertToLiteral = require('../converter');

describe('convert an number', () => {
  test.each([
    [1, 'pt', 'um'],
    [23, 'pt', 'vinte e três'],
    [
      748322,
      'pt',
      'setecentos e quarenta e oito mil e trezentos e vinte e dois',
    ],
  ])(
    'return a correct value on success with %i',
    (number, second, expectedResult) => {
      expect(convertToLiteral(Number(number), second)).toBe(expectedResult);
    }
  );
});