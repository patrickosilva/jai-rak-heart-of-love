import { createFileRoute } from "@tanstack/react-router";
import { JaiRakSite } from "@/components/JaiRakSite";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jai Rak Team | Muito Além do Muay Thai" },
      {
        name: "description",
        content:
          "Conheça o Jai Rak Team, projeto social que utiliza o Muay Thai, a disciplina e o amor de Jesus para acolher e inspirar crianças e adolescentes. Participe e apoie.",
      },
      { property: "og:title", content: "Jai Rak Team | Muito Além do Muay Thai" },
      {
        property: "og:description",
        content:
          "Muay Thai, disciplina e amor de Jesus para acolher e inspirar crianças e adolescentes.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: JaiRakSite,
});
