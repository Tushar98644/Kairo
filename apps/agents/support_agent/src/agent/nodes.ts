import { ToolNode } from "@langchain/langgraph/prebuilt";
import { llm } from "../../config/llm";
import { tools } from "./tools";
import { type GraphState } from "./state";

/**
 * @param state The current state of the graph.
 * @returns An object with the updated messages list, i.e the updated state.
 */

export const callModelNode = async (state: GraphState) => {
  const { messages } = state;
  const llmWithTools = llm.bindTools(tools);
  const response = await llmWithTools.invoke(messages);
  return { ...state, messages: [response] };
};

/**
 * A pre-built node from LangGraph that executes the tools called by the LLM.
 */
export const toolNode = new ToolNode(tools);
