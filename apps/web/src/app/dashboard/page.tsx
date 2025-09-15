import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { format } from "date-fns";
import { MaxWidthWrapper } from "@/components/global/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { MagicCard } from "@/components/ui/magic-card";

const userStories = [
  {
    id: "story_1",
    title: "The Last Cyber-Samurai",
    excerpt: "In the neon-drenched streets of Neo-Kyoto, a lone warrior with a plasma katana seeks vengeance...",
    lastUpdated: new Date("2025-09-15T18:30:00Z"),
  },
  {
    id: "story_2",
    title: "Whispers of the Void",
    excerpt: "An ancient cosmic entity awakens, its thoughts echoing across galaxies, promising knowledge at a terrible price.",
    lastUpdated: new Date("2025-09-12T11:00:00Z"),
  },
];

const PageHeader = () => (
  <div className="flex items-center justify-between">
    <div className="grid gap-1">
      <h1 className="text-2xl font-medium tracking-tight md:text-3xl">
        Your Stories
      </h1>
      <p className="text-muted-foreground">
        Create and manage your creative projects.
      </p>
    </div>
    <Button asChild>
      <Link href="/editor/new">
        <PlusCircle className="mr-2 h-4 w-4" />
        New Story
      </Link>
    </Button>
  </div>
);

const StoryCard = ({ story }: { story: (typeof userStories)[0] }) => (
  <Link href={`/editor/${story.id}`}>
    <MagicCard className="h-full">
      <div className="flex h-full flex-col justify-between">
        <div>
          <h3 className="text-lg font-medium text-foreground truncate">
            {story.title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {story.excerpt}
          </p>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Last updated: {format(story.lastUpdated, "MMM d, yyyy")}
        </p>
      </div>
    </MagicCard>
  </Link>
);

const EmptyState = () => (
    <div className="mt-16 flex flex-col items-center gap-4 rounded-lg border-2 border-dashed border-border p-8 text-center">
    <h3 className="text-xl font-medium">You haven&apos;t created any stories yet.</h3>
    <p className="text-muted-foreground">
      Let&apos;s get that first spark of an idea down.
    </p>
    <Button asChild className="mt-2">
      <Link href="/editor/new">
        <PlusCircle className="mr-2 h-4 w-4" />
        Create your first story
      </Link>
    </Button>
  </div>
);


const DashboardPage = () => {
  const stories = userStories;

  return (
    <MaxWidthWrapper className="py-8">
      <PageHeader />
      {stories.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </MaxWidthWrapper>
  );
};

export default DashboardPage;