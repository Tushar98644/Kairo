import { Router } from "express";
import { workerController } from "./worker.controller";

const router = Router();

router.get("/", (req, res) => workerController.getWorkers(req, res));
router.post("/", (req, res) => workerController.createWorker(req, res));
router.put("/:id", (req, res) => workerController.updateWorker(req, res));

export default router;