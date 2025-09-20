import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export const llm = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-pro",
  apiKey: process.env.GEMINI_API_KEY,
  temperature: 0,
  maxRetries: 2,
  streaming: true,
});