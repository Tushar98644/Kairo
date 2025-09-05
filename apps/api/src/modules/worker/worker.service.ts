import { db } from '../../db/client';
import { workers } from '../../db/schema/wokers';
import { eq } from "drizzle-orm";     

class WorkerService {
  async getAllWorkers() {
    try {
      const allWorkers = await db.query.workers.findMany();
      return allWorkers;
    } catch (error) {
      console.error('Error fetching workers:', error);
      return [];
    }
  }

  async createWorker(data: any) {
    try {
      const [newWorker] = await db
        .insert(workers)
        .values(data)
        .returning();
      return newWorker;
    } catch (error) {
      console.error('Error creating worker:', error);
      return null;
    }
  }

  async updateWorker(email: string, data: any) {
    try {
      const [updatedWorker] = await db
        .update(workers)
        .set(data)
        .where(eq(workers.email, email))
        .returning();
      return updatedWorker;
    } catch (error) {
      console.error('Error updating worker:', error);
      return null;
    }
  }

  async deleteWorker(email: string) {
    try {
      const [deletedWorker] = await db
        .delete(workers)
        .where(eq(workers.email, email))
        .returning();
      return deletedWorker;
    } catch (error) {
      console.error('Error deleting worker:', error);
      throw error;
    }
  }
}

export const workerService = new WorkerService();
