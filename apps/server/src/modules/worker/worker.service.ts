import { prisma } from "@/config/prisma.client";

class WorkerService {
    async getAllWorkers() {
        try {
          const workers = await prisma.worker.findMany();
          return workers;
        } catch (error) {
            console.error("Error fetching workers:", error);
            return [];
        }
    }
    
    async createWorker(data: any) {
        try {
            const worker = await prisma.worker.create({ data });
            return worker;
        } catch (error) {
            console.error("Error creating worker:", error);
            return null;
        }
    }
    
    async updateWorker(email: string, data: any) {
        try {
            const worker = await prisma.worker.update({ where: { email }, data });
            return worker;
        } catch (error) {
            console.error("Error updating worker:", error);
            return null;
        }
    }
    
    async deleteWorker(email: string) {
        try {
            await prisma.worker.delete({ where: { email } });
        } catch (error) {
            console.error("Error deleting worker:", error);
            throw error;
        }
    }
}

export const workerService = new WorkerService();