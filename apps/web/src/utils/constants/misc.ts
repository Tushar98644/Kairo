import { BookUpIcon, LightbulbIcon, SparklesIcon } from "lucide-react";

export const DEFAULT_AVATAR_URL =
  "https://api.dicebear.com/8.x/initials/svg?backgroundType=gradientLinear&backgroundRotation=0,360&seed=";

export const PAGINATION_LIMIT = 10;

export const PROCESS = [
  {
    icon: LightbulbIcon,
    title: "Start with an Idea",
    description:
      "Begin writing in our intuitive, distraction-free editor. Organize your thoughts, outline your plot, or just start typing.",
  },
  {
    icon: SparklesIcon,
    title: "Enhance with AI",
    description:
      "Use AI commands to generate text, overcome writer's block, create vivid imagery, or get smart suggestions to refine your prose.",
  },
  {
    icon: BookUpIcon,
    title: "Craft & Publish",
    description:
      "Edit, format, and perfect your work with powerful rich-text tools. When you're ready, share your story with the world.",
  },
] as const;
