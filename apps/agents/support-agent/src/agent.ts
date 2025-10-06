import { StateGraph, START, END } from "@langchain/langgraph";
import { GraphAnnotation } from "./utils/state";
import { callModelNode, toolNode } from "./utils/nodes";
import { shouldContinue } from "./utils/edges";

const workflow = new StateGraph(GraphAnnotation)
  .addNode("agent", callModelNode)
  .addNode("call_tools", toolNode)

workflow.addEdge(START, "agent");
workflow.addConditionalEdges("agent", shouldContinue);
workflow.addEdge("call_tools", "agent");

export const agent = workflow.compile();