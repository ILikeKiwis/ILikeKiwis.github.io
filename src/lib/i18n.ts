export type Locale = "en" | "es";

export const ui = {
  en: {
    navAbout: "About",
    navProjects: "Projects",
    navContact: "Contact",
    githubButton: "GitHub",
    viewGithub: "View GitHub",
    quickLink: "Quick link",
    copyGithub: "Copy GitHub",
    copySuccess: "GitHub copied to clipboard.",
    copyError: "Could not copy automatically.",
    aboutEyebrow: "About",
    aboutTitle: "Professional profile",
    projectsEyebrow: "Projects",
    projectsTitle: "Featured repositories",
    viewAll: "View all",
    contactEyebrow: "Contact",
    contactTitle: "Let's connect",
    contactText: "You can open my social links, review my repositories, or download my CV from this landing page.",
    openRepo: "Open",
    onGithub: "on GitHub",
    updated: "Updated",
    stars: "stars",
    locale: "en-US",
    otherLocaleLabel: "ES",
    otherLocaleHref: "/es/"
  },
  es: {
    navAbout: "Sobre mi",
    navProjects: "Proyectos",
    navContact: "Contacto",
    githubButton: "GitHub",
    viewGithub: "Ver GitHub",
    quickLink: "Enlace rapido",
    copyGithub: "Copiar GitHub",
    copySuccess: "GitHub copiado al portapapeles.",
    copyError: "No se pudo copiar automaticamente.",
    aboutEyebrow: "Sobre mi",
    aboutTitle: "Perfil profesional",
    projectsEyebrow: "Proyectos",
    projectsTitle: "Repositorios destacados",
    viewAll: "Ver todos",
    contactEyebrow: "Contacto",
    contactTitle: "Conectemos",
    contactText: "Puedes abrir mis redes, revisar mis repositorios o descargar el CV desde esta landing.",
    openRepo: "Abrir",
    onGithub: "en GitHub",
    updated: "Actualizado",
    stars: "estrellas",
    locale: "es-ES",
    otherLocaleLabel: "EN",
    otherLocaleHref: "/"
  }
} as const;

export function localized(value: string | Record<Locale, string> | undefined, locale: Locale) {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value[locale] ?? value.en ?? "";
}
