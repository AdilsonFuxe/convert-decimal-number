const ptNumbers = require('./lang/pt-numbers.json');
const enNumbers = require('./lang/en-numbers.json');

const chooseLanguage = {
  pt: ptNumbers,
  en: enNumbers,
};

const NO_SOLUCTION = '--';

const getE = (lang) => (lang === 'pt' ? ' e ' : ' ');

const convertToLiteral = (number, lang) => {
  if (lang !== 'pt' && lang !== 'en')
    throw new Error('This language is not supported yet');
  if (typeof number !== 'number') throw new Error('You must provide a number');

  const words = chooseLanguage[lang];

  if (number <= 20) return words[number].toLowerCase();

  if (number <= 99) {
    const firstDigit = Math.trunc(number / 10);
    const rest = convertToLiteral(number % 10, lang);

    return `${words[firstDigit + '0'].toLowerCase()}${
      rest !== words['0'].toLowerCase() ? `${getE(lang)}${rest}` : ''
    }`;
  }

  if (number % 100 === 0 && number % 1000 !== 0)
    return words[number].toLowerCase();

  if (number <= 999) {
    const firstDigit = Math.trunc(number / 100);
    const rest = convertToLiteral(number % 100, lang);

    return `${words[firstDigit + '00'].toLowerCase()}${
      rest !== words['0'].toLowerCase() ? `${getE(lang)}${rest}` : ''
    }`;
  }

  if (number <= 999999) {
    const firstDigit = Math.trunc(number / 1000);
    const rest = convertToLiteral(number % 1000, lang);

    return `${
      firstDigit === 1
        ? words['0000'].toLowerCase()
        : `${convertToLiteral(firstDigit, lang)} ${words['0000'].toLowerCase()}`
    }${rest !== words['0'].toLowerCase() ? `${getE(lang)}${rest}` : ''}`;
  }

  if (number <= 999999999) {
    const firstDigit = Math.trunc(number / 1000000);
    const rest = convertToLiteral(number % 1000000, lang);

    return `${
      firstDigit === 1
        ? words['000000'].toLowerCase()
        : `${convertToLiteral(firstDigit, lang)} ${words[
            `${firstDigit === 1 ? '' : '+'}000000`
          ].toLowerCase()}`
    }${rest !== words['0'].toLowerCase() ? `${getE(lang)}${rest}` : ''}`;
  }

  return NO_SOLUCTION;
};

console.log(convertToLiteral(23647234, 'pt'));

module.exports = convertToLiteral;
