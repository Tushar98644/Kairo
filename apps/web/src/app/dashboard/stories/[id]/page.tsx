import { EditorWrapper } from "@/features/editor/editor-wrapper";
import { Block } from "@blocknote/core";

async function getStoryData(storyId: string) {
  if (storyId === "new") {
    return {
      title: "Untitled Story",
      content: null,
    };
  }
  return {
    title: "The Last Cyber-Samurai",
    content: null
  };
}

export default async function EditorPage({
  params,
}: {
  params: { storyId: string };
}) {
  const story = await getStoryData(params.storyId);

  return <EditorWrapper story={story} />;
}