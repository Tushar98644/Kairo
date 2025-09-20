'use client'

import Link from "next/link";
import { format } from "date-fns";
import { MaxWidthWrapper } from "@/components/global/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { MagicCard } from "@/components/ui/magic-card";
import { ZapIcon } from "lucide-react";
import { Story } from "@/types/Story";
import { useCreateStory } from "@/hooks/mutations/useStory";
import { useRouter } from "next/navigation";
import { useFetchStories } from "@/hooks/queries/useStoryQuery";

const PageHeader = () => {
  const { mutateAsync: createStory } = useCreateStory();
  const router = useRouter();

  const handleCreateStory = async () => {
    try {
      const story = await createStory({
        title: "Untitled",
        description: "untitled",
      });

      if (story?.id) {
        router.push(`/dashboard/stories/${story.id}`);
      }
    } catch (error) {
      console.error("Failed to create story:", error);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="grid gap-1">
        <h1 className="text-2xl font-medium tracking-tight md:text-3xl">
          Your Stories
        </h1>
        <p className="text-muted-foreground">
          Create and manage your creative projects.
        </p>
      </div>
      <Button onClick={handleCreateStory}>
        New Story
        <ZapIcon className="size-3.5 ml-1.5 text-orange-500 fill-orange-500" />
      </Button>
    </div>
  );
};

const StoryCard = ({ story }: { story: any }) => (
  <Link href={`/dashboard/stories/${story.id}`}>
    <MagicCard className="h-full">
      <div className="flex h-full flex-col justify-between">
        <div>
          <h3 className="text-lg font-medium text-foreground truncate">
            {story.title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {story.description}
          </p>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Last updated: {format(story.updatedAt, "MMM d, yyyy")}
        </p>
      </div>
    </MagicCard>
  </Link>
);

const EmptyState = () => (
  <div className="mt-16 flex flex-col items-center gap-4 rounded-lg border-2 border-dashed border-border p-8 text-center">
    <h3 className="text-xl font-medium">
      You haven&apos;t created any stories yet.
    </h3>
    <p className="text-muted-foreground">
      Let&apos;s get that first spark of an idea down.
    </p>
    <Button className="mt-2">
      <ZapIcon className="mr-2 h-4 w-4" />
      Create your first story
    </Button>
  </div>
);

const DashboardPage = () => {
  const { data: stories = [], isPending} = useFetchStories();

  if (isPending) {
    return (
      <p>loading stories...</p>
    )
  }

  return (
    <MaxWidthWrapper className="py-8">
      <PageHeader />
      {stories.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((story: Story) => (
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
