const ptNumbers = require('./pt-numbers.json');

const convertToExt = (number = 0) => {
  if (number >= 0 && number < 20) return ptNumbers[number];
  if (number < 100) {
    const resto = number % 10;
    const numberMenosResto = number - resto;

    if (resto === 0) return ptNumbers[numberMenosResto];
    return ptNumbers[numberMenosResto] + ' e ' + convertToExt(resto);
  }
  if (number < 1000) {
    const resto = number % 100;
    const numberMenosResto = number - resto;

    if (resto === 0) return ptNumbers[numberMenosResto];
    return ptNumbers[numberMenosResto] + ' e ' + convertToExt(resto);
  }
  if (number < 1000000) {
    const resto = number % 1000;
    const result = Math.trunc(number / 1000);

    if (resto === 0) return result === 1 ? 'MIL' : convertToExt(result);
    return (
      (result === 1 ? 'Mil' : convertToExt(result) + ' MIL') +
      ' e ' +
      convertToExt(resto)
    );
  }
  if (number === 1000000) return ptNumbers[1000000];
};

module.exports = convertToExt;
