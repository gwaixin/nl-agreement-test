export const langToWord = (lang) => {

  let word = {
    en: 'English',
    fr: 'French'
  }

  return word[lang];

}

export const stringExist = (text, lookup) => {
  return text.indexOf(lookup) >= 0;
}