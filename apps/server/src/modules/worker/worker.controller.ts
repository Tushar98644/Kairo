import { Request, Response } from "express";
import { workerService } from "./worker.service";

class WorkerController {
  async getWorkers(req: Request, res: Response) {
    try {
      const workers = await workerService.getAllWorkers();
      res.status(200).json(workers);
    } catch (err) {
      console.error("Error fetching workers:", err);
      res.status(500).json({ message: err });
    }
  }

  async createWorker(req: Request, res: Response) {
    try {
      const worker = await workerService.createWorker(req.body);
      res.status(201).json(worker);
    } catch (err) {
      console.error("Error creating worker:", err);
      res.status(500).json({ message: err });
    }
  }

  async updateWorker(req: Request, res: Response) {
    try {
      const email = req.params.email as string;
      const worker = await workerService.updateWorker(email, req.body);
      res.status(200).json(worker);
    } catch (err) {
      console.error("Error updating worker:", err);
      res.status(500).json({ message: err });
    }
  }
  
  async deleteWorker(req: Request, res: Response) {
    try {
      const email = req.params.email as string;
      await workerService.deleteWorker(email);
      res.status(204).send();
    } catch (err) {
      console.error("Error deleting worker:", err);
      res.status(500).json({ message: err });
    }
  }
}

export const workerController = new WorkerController();
