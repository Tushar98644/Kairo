import express from "express";
import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import ratelimit from "express-rate-limit";
import morgan from "morgan";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import workerRoutes from "./modules/worker/worker.routes";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(ratelimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(morgan("dev"));

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(clerkMiddleware());

app.use('/api/v1/service', workerRoutes, requireAuth());

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});