import express from "express";
import 'dotenv/config'
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { app } from "./agent/graph";

const server = express();

server.use(express.json());

const PORT = process.env.PORT || 8001;

server.post("/api/agent/invoke", async (req, res) => {
  const { messages } = req.body;

  if (!messages) {
    return res.status(400).json({ error: "Missing 'messages' in request body" });
  }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const input = {
    messages: messages.map((msg: any) =>
      msg.role === "user" ? new HumanMessage(msg) : new AIMessage(msg)
    ),
  };

  try {
    const stream = await app.stream(input, { streamMode: "values" });

    for await (const value of stream) {
      const lastMessage = value.messages[value.messages.length - 1];
      
      const castAIMessage = lastMessage as AIMessage;
      if (lastMessage && !castAIMessage.tool_calls?.length) {
        res.write(lastMessage.content as string);
      }
    }
  } catch (e) {
    console.error("Error streaming from agent:", e);
  } finally {
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`LangGraph agent server listening on http://localhost:${PORT}`);
});
