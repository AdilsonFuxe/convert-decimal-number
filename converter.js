const ptNumbers = require('./lang/pt-numbers.json');
const enNumbers = require('./lang/en-numbers.json');

const language = {
  portuguese: 'pt',
  english: 'en',
};

const chooseLanguage = {
  pt: ptNumbers,
  en: enNumbers,
};

const convertToExt = (number = 0, lang = 'pt') => {
  if (typeof Number(number) === 'number') {
    let numberLang = chooseLanguage[lang];

    if (numberLang[number]) return numberLang[number];
    if (number < 100) {
      const rest = number % 10;
      const numberMinusRest = number - rest;

      return rest === 0
        ? numberLang[numberMinusRest]
        : `${numberLang[numberMinusRest]} e ${convertToExt(rest)}`;
    }

    if (number < 1000) {
      const rest = number % 100;
      const numberMinusRest = number - rest;
      return rest === 0
        ? numberLang[numberMinusRest]
        : `${numberLang[numberMinusRest]} e ${convertToExt(rest)}`;
    }

    if (number < 1000000) {
      const rest = number % 1000;
      const result = Math.trunc(number / 1000);

      if (rest === 0) return result === 1 ? 'Mil' : convertToExt(result);
      return (
        (result === 1 ? 'Mil' : convertToExt(result) + ' MIL') +
        ' e ' +
        convertToExt(rest)
      );
    }
    if (number === 1000000) return ptNumbers[1000000];
  }

  return lang === chooseLanguage[language.portuguese]
    ? `${number} não é um número.`
    : `${number} is not a number.`;
};

console.log(convertToExt(1001, 'pt'));

module.exports = convertToExt;
