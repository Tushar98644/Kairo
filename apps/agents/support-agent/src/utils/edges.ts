import type { AIMessage } from "@langchain/core/messages";
import { END } from "@langchain/langgraph";
import type { GraphAnnotation } from "./state";

export const shouldContinue = (state: typeof GraphAnnotation.State): string => {
  const messages = state.messages;
  const lastMessage = messages[messages.length - 1];

  const castAIMessage = lastMessage as AIMessage;

  if (castAIMessage.tool_calls && castAIMessage.tool_calls.length > 0) {
    return "call_tools";
  }

  return END;
};


export const shouldRetrieve = (state: typeof GraphAnnotation.State): string => {
  const { messages } = state;
  const lastMessage = messages[messages.length - 1];
 
  const castAIMessage = lastMessage as AIMessage;

  if ("tool_calls" in castAIMessage && 
  Array.isArray(castAIMessage.tool_calls) && castAIMessage.tool_calls.length)
    return "retrieve"
  
  return END
}
