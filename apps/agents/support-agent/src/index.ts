import express from "express";
import "dotenv/config";
import { agent } from "./agent";
import { HumanMessage } from "@langchain/core/messages";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.post("/chat", async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: "The 'query' field is required." });
    }

    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache",
    });

    const inputs = { messages: [new HumanMessage(query)] };

    console.log(`Invoking agent with query: "${query}"`);

    const stream = await agent.stream(inputs, {
      streamMode: "messages",
    });

    for await (const chunk of stream) {
      const [token, metadata] = chunk;
      res.write(`data: ${JSON.stringify({ token: token.content })}\n\n`);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An internal server error occurred." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running and listening on http://localhost:${PORT}`);
});
