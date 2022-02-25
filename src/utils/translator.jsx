const transEn = (keyword) => {
  const message = {

    agreement: 'You understand that by using the site or site services, you agree to be bound by this agreement. If you do not accept this agreement in its entirety, you must not access or use the site or the site services.',

    confirmation: 'Do you agree to this agreement? Please respond by saying “Yes” or “No”.'

  }

  return message[keyword];
}

const transFn = (keyword) => {
  const message = {
    agreement: "Vous comprenez qu'en utilisant le site ou les services du site, vous acceptez d'être lié par cet accord. Si vous n'acceptez pas cet accord dans son intégralité, vous ne devez pas accéder ou utiliser le site où les services du site.",

    confirmation: "Êtes-vous d'accord avec cet accord ? Veuillez répondre en disant “Oui” ou “Non”.",
  }

  return message[keyword];
}

export const transLang = (lang, keyword) => {
  if (lang === 'en') return transEn(keyword);
  else if (lang === 'fr') return transFn(keyword);
  else return "Unknown language";
}