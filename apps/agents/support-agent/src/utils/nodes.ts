import { ToolNode } from "@langchain/langgraph/prebuilt";
import { llm } from "../config/llm";
import { tools } from "./tools";
import { type GraphState } from "./state";

export const callModelNode = async (state: GraphState) => {
  const { messages } = state;
  const llmWithTools = llm.bindTools(tools);
  const response = await llmWithTools.invoke(messages);
  return { ...state, messages: [response] };
};

export const toolNode = new ToolNode(tools);
