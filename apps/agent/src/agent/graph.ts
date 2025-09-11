import { StateGraph, END, START } from "@langchain/langgraph";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { GraphAnnotation } from "./state";
import { webSearchTool } from "./tools";
import type { AIMessage } from "@langchain/core/messages";

const tools = [webSearchTool];

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-pro",
  temperature: 0,
  streaming: true,
});

const callModel = async (state: typeof GraphAnnotation.State) => {
  const { messages } = state;
  
  const llmWithTools = llm.bindTools(tools);
  const response = await llmWithTools.invoke(messages);
  return { messages: response };
};

const toolNode = new ToolNode(tools);

const shouldContinue = (state: typeof GraphAnnotation.State) => {
  const messages = state.messages;
  const lastMessage = messages[messages.length - 1];
  
  const castAIMessage = lastMessage as AIMessage;
  
  if (castAIMessage?.tool_calls?.length) {
    return "call_tools";
  }
  return END;
};

const workflow = new StateGraph(GraphAnnotation)
  .addNode("agent", callModel)
  .addNode("call_tools", toolNode)
  .addEdge(START, "agent")
  .addConditionalEdges("agent", shouldContinue)
  .addEdge("call_tools", "agent");

export const app = workflow.compile();