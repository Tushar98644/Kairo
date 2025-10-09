import express from "express";
import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { requireAuth } from "@clerk/express";

import { createRedisClient } from "./config/redis/client.js";

import { userRoutes } from "./modules/users/routes.js";
import { createStoryRouter } from "./modules/stories/routes.js";
import { StoryController } from "./modules/stories/controller.js";
import { StoryService } from "./modules/stories/service.js";
import { BlockService } from "./modules/blocks/service.js";
import { BlockController } from "./modules/blocks/controller.js";
import { createBlocksRouter } from "./modules/blocks/routes.js";

async function main() {
  const redisClient = await createRedisClient();

  const app = express();

  app.use(express.json());
  app.use(helmet());
  app.use(morgan("dev"));

  const corsOptions = {
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  };

  app.use(cors(corsOptions));
  
  const blockService = new BlockService(redisClient);
  const blockController = new BlockController(blockService);

  const blockRoutes = createBlocksRouter(blockController);

  const storyService = new StoryService(redisClient);
  const storyController = new StoryController(storyService);

  const storyRoutes = createStoryRouter(storyController, blockRoutes);
  
  app.use('/api/v1/users', userRoutes);
  app.use('/api/v1/stories', requireAuth(), storyRoutes);

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`🚀 Server is running on port: ${port}`);
  });
}

main().catch(err => {
  console.error("Fatal error during server startup:", err);
  process.exit(1);
});