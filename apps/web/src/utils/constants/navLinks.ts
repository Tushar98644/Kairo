import {
  BotMessageSquareIcon,
  ImageIcon,
  BookTextIcon,
  LayoutGridIcon,
} from "lucide-react";

export const NAV_LINKS = [
  {
    title: "Features",
    href: "/#features",
    menu: [
      {
        title: "AI Writer",
        tagline: "Generate text, overcome writer's block, and more.",
        href: "/features/ai-writer",
        icon: BotMessageSquareIcon,
      },
      {
        title: "AI Image Studio",
        tagline: "Create stunning visuals from simple text prompts.",
        href: "/features/image-studio",
        icon: ImageIcon,
      },
      {
        title: "Smart Editor",
        tagline: "An intuitive, Notion-like editor to craft your stories.",
        href: "/features/smart-editor",
        icon: BookTextIcon,
      },
      {
        title: "Content Templates",
        tagline: "Kickstart your writing with a library of templates.",
        href: "/features/templates",
        icon: LayoutGridIcon,
      },
    ],
  },
  {
    title: "Pricing",
    href: "/#pricing",
  },
];