import { FooterItem } from "@/types";


export type SiteConfig = typeof siteConfig;

const links = {
  X: "https://twitter.com",
  instagram:
    "https://www.instagram.com/simplelifemind/?utm_source=ig_web_button_share_sheet&igshid=OGQ5ZDc2ODk2ZA==",
  about: "",
  contact: "/contact",
  dashboard: "",
};

export const siteConfig = {
  name: "Simple Life",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    youtube: "https://www.youtube.com/@SalomonBoss",
    facebook: "https://www.facebook.com/profile.php?id=61556243141117",
    linkedIn: "linkedin.com/in/salomonboss",
  },
  footerNav: [
    {
      title: "Plataforma",
      items: [
        {
          title: "Conviértete en tutora",
          href: "/become-tutor",
          external: false,
        },
        {
          title: "Explorar todas las certificaciones",
          href: "/search",
          external: false,
        },
        {
          title: "Sobre nosotros",
          href: "/aboutus",
          external: false,
        }
      ],
    },
    {
      title: "Ayuda",
      items: [
        {
          title: "Contacto",
          href: "/contact",
          external: false,
        },
        {
          title: "Preguntas frecuentes",
          href: "/faq",
          external: false,
        },
      ],
    },
    {
      title: "Sociales",
      items: [
        {
          title: "Instagram",
          href: links.instagram,
          external: true,
        },
        {
          title: "YouTube",
          href: "https://www.youtube.com/@SalomonBoss",
          external: true,
        },
        {
          title: "Facebook",
          href: "https://www.facebook.com/profile.php?id=61556243141117",
          external: true,
        },
        {
          title: "LinkedIn",
          href: "https://www.linkedin.com/company/simplelifeoficial/",
          external: true,
        },
      ],
    },
  ] satisfies FooterItem[],
};
