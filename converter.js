const ptNumbers = require('./lang/pt-numbers.json');
const enNumbers = require('./lang/en-numbers.json');

const chooseLanguage = {
  pt: ptNumbers,
  en: enNumbers,
};

const setNumber = (number) => {
  let num = 0;

  if (number < 100) {
    num = 10;
  } else if (number < 1000) {
    num = 100;
  } else if (number < 10000) {
    num = 1000;
  } else if (number < 100000) {
    num = 10000;
  } else if (number < 1000000) {
    num = 100000;
  } else if (number < 10000000) {
    num = 1000000;
  } else if (number < 100000000) {
    num = 10000000;
  }

  return num;
};

const convertToLiteral = (number, lang) => {
  let divider;
  let res = 0;

  if (lang !== 'pt' && lang !== 'en')
    throw new Error('This language is not supported yet');
  if (typeof number !== 'number') throw new Error('You must provide a number');

  const words = chooseLanguage[lang];

  if (words[number]) {
    return words[number];
  }

  divider = setNumber(number);
  res = parseInt(number / divider) * divider;
  return `${words[res]} and ${convertToLiteral(number % divider, lang)}`;
};

module.exports = convertToLiteral;
