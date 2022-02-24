export const langToWord = (lang) => {

  let word = {
    en: 'English',
    fn: 'French'
  }

  return word[lang];

}

export const stringExist = (text, lookup) => {
  return text.indexOf(lookup) >= 0;
}