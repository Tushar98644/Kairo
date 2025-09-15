import { FileTextIcon } from "@radix-ui/react-icons";
import { ImageIcon, LayoutGridIcon, SparklesIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { Marquee } from "@/components/ui/marquee";
import Image from "next/image";

const storySnippets = [
  {
    name: "Sci-Fi Novel",
    body: "The chrome city slept under a neon moon, unaware of the code awakening in its core...",
  },
  {
    name: "Marketing Copy",
    body: "Unlock your creativity. Write smarter, not harder. Discover Kairo.",
  },
  {
    name: "Fantasy Script",
    body: "[SCENE START] Aetherial light filters through the ancient forest canopy.",
  },
  {
    name: "Blog Post Idea",
    body: "Five ways AI is changing the landscape of modern storytelling.",
  },
  {
    name: "Character Bio",
    body: "Jax, a renegade pilot with a stolen starship and a secret to protect.",
  },
];

const features = [
  {
    Icon: FileTextIcon,
    name: "Intuitive Smart Editor",
    description: "Craft your stories in a distraction-free, Notion-like environment.",
    href: "#",
    cta: "Explore the Editor",
    className: "col-span-3 md:col-span-2",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
      >
        {storySnippets.map((snippet, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-40 cursor-pointer overflow-hidden rounded-xl border p-4",
              "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
              "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none"
            )}
          >
            <div className="flex flex-row items-center gap-2">
              <figcaption className="text-sm font-medium dark:text-white ">
                {snippet.name}
              </figcaption>
            </div>
            <blockquote className="mt-2 text-xs">{snippet.body}</blockquote>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    Icon: SparklesIcon,
    name: "AI Suggestions",
    description: "Overcome writer's block with creative prompts.",
    href: "#",
    cta: "See it in Action",
    className: "col-span-3 md:col-span-1",
    background: (
      <Image
        src="/hero-dashboard.png"
        width={200}
        height={200}
        alt="AI Generated Images"
        className="absolute inset-0 h-full w-full object-cover opacity-20 transition-all duration-300 group-hover:opacity-30"
      />
    ),
  },
  {
    Icon: ImageIcon,
    name: "Visualize Your World",
    description: "Create stunning images from your descriptions.",
    href: "#",
    cta: "Try Image Studio",
    className: "col-span-3 md:col-span-1",
    background: (
      <Image
        src="/hero-dashboard.png"
        width={200}
        height={200}
        alt="AI Generated Images"
        className="absolute inset-0 h-full w-full object-cover opacity-20 transition-all duration-300 group-hover:opacity-30"
      />
    ),
  },
  {
    Icon: LayoutGridIcon,
    name: "Creative Templates",
    description: "Start with templates for novels, blogs, and scripts.",
    className: "col-span-3 md:col-span-2",
    href: "#",
    cta: "Browse Templates",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-transparent opacity-50 transition-all duration-300 group-hover:opacity-80"></div>
    ),
  },
];

export function BentoFeatures() {
  return (
    <BentoGrid className="grid-cols-3">
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  );
}