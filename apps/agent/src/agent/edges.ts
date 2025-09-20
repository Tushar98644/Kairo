import type { AIMessage } from "@langchain/core/messages";
import { END } from "@langchain/langgraph";
import type { GraphAnnotation } from "./state";

/**
 * @param state The current state of the graph.
 * @returns A string indicating the next node to call, or END to finish.
 */

export const shouldContinue = (state: typeof GraphAnnotation.State) => {
  const messages = state.messages;
  const lastMessage = messages[messages.length - 1];
  
  const castAIMessage = lastMessage as AIMessage;
  
  if (castAIMessage.tool_calls && castAIMessage.tool_calls.length > 0) {
    return "call_tools";
  }

  return END;
};