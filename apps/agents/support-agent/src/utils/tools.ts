import { TavilySearch } from "@langchain/tavily";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { tool } from "@langchain/core/tools";
import { sql } from "drizzle-orm";
import { db } from "../../../../api/src/db/client";
import { z } from "zod";
import { embeddings } from "../config/llm";

const webSearchTool = new TavilySearch({
  maxResults: 1,
});

const retrieveStoryContextTool = tool(
  async (input: unknown) => {
    const schema = z.object({
      storyId: z.string().describe("The ID of the story to search within."),
      query: z.string().describe("The user's question or query."),
      limit: z
        .number()
        .optional()
        .default(5)
        .describe("The number of blocks to retrieve."),
    });
    const { storyId, query, limit } = schema.parse(input);

    const queryEmbedding = await embeddings.embedQuery(query);

    const relevantBlocks = await db.execute(sql`
      SELECT content, 1 - (embedding <=> ${JSON.stringify(queryEmbedding)}) as similarity
      FROM story_blocks
      WHERE story_id = ${storyId}
      ORDER BY similarity DESC
      LIMIT ${limit}
    `);

    const context = relevantBlocks.rows
      .map((block: any) => JSON.stringify(block.content))
      .join("\n---\n");
    return context;
  },
  {
    name: "retrieve_story_context",
    description:
      "Retrieves relevant blocks from a story to answer a user's query.",
    schema: z.object({
      storyId: z.string().describe("The ID of the story to search within."),
      query: z.string().describe("The user's question or query."),
      limit: z
        .number()
        .optional()
        .default(5)
        .describe("The number of blocks to retrieve."),
    }),
  }
);

export const tools = [webSearchTool, retrieveStoryContextTool];
