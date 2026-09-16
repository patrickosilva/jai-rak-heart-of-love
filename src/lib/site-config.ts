export const siteConfig = {
  name: "Jai Rak Team",
  whatsappDisplay: "(21) 97497-7175",
  whatsappNumber: "5521974977175",
  instagramHandle: "@jairakteam",
  instagramUrl: "https://www.instagram.com/jairakteam/",
  pixKey: "21974977175",
} as const;

export function whatsappUrl(message: string) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const whatsappLinks = {
  general: whatsappUrl("Olá! Gostaria de saber mais sobre o Jai Rak Team."),
  participate: whatsappUrl(
    "Olá! Conheci o Jai Rak Team pelo site e gostaria de saber como participar do projeto.",
  ),
  donation: whatsappUrl(
    "Olá! Estou entrando em contato pelo site do Jai Rak Team sobre uma contribuição ao projeto.",
  ),
  partnership: whatsappUrl(
    "Olá! Conheci o Jai Rak Team pelo site e gostaria de conversar sobre uma possível parceria com o projeto.",
  ),
} as const;