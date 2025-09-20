import { StateGraph, START } from "@langchain/langgraph";
import { GraphAnnotation } from "./state";
import { callModelNode, toolNode } from "./nodes";
import { shouldContinue } from "./edges";

const workflow = new StateGraph(GraphAnnotation)
  .addNode("agent", callModelNode)
  .addNode("call_tools", toolNode)
  .addEdge(START, "agent")
  .addConditionalEdges("agent", shouldContinue)
  .addEdge("call_tools", "agent");

export const app = workflow.compile();