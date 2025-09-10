import { getStoriesForUser } from "@/lib/data/stories";
import Link from "next/link";
import Image from "next/image";
import { CreateStoryClientButton } from "@/components/create-story-client-button";
import { Book, Plus } from "lucide-react";

export default async function DashboardPage() {
  const stories: any[] = [];

  return (
    <div>
      <h1 className="text-4xl font-bold text-ink/90 dark:text-dark-ink/90 mb-2">
        Welcome, writer.
      </h1>
      <p className="text-lg text-ink/60 dark:text-dark-ink/60 mb-12">
        Your stories are waiting. Pick up where you left off.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {stories &&
          stories.map((story) => (
            <Link
              href={`/story/${story.id}`}
              key={story.id}
              className="group block p-6 border-l-2 border-accent/50 hover:bg-accent/5 transition-all"
            >
              <h2 className="text-2xl font-bold text-ink dark:text-dark-ink group-hover:text-accent transition-colors">
                {story.title}
              </h2>
              <p className="mt-2 text-ink/70 dark:text-dark-ink/70 line-clamp-3">
                {story.description || "No description yet..."}
              </p>
              <div className="mt-4 text-xs text-ink/50 dark:text-dark-ink/50">
                Last updated: {new Date(story.updatedAt).toLocaleDateString()}
              </div>
            </Link>
          ))}
        {/* Create new story 'card' */}
        <div className="p-6 border-l-2 border-dashed border-ink/20 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-ink/40">A new idea?</h2>
          <p className="mt-2 text-ink/50">Begin a new journey.</p>
          <CreateStoryClientButton
            variant="link"
            className="!p-0 !justify-start mt-4 text-accent"
          />
        </div>
      </div>
    </div>
  );
}
