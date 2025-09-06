import { Request, Response } from "express";
import { clerkClient, getAuth } from "@clerk/express";
import { notificationService } from "./notifications.service";
import { insertNotificationSchema } from "@/db/schema/notification";

class NotificationController {
  
  async createNotification (req: Request, res: Response) {
    const { userId } = getAuth(req);
    
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const { emailAddresses } = await clerkClient.users.getUser(userId);
    const email = emailAddresses[0]?.emailAddress;
    
    if (!email) {
      return res.status(401).json({ message: "Email not found" });
    }
    
    const { title, message } = req.body;
    if (!title || !message) {
      return res.status(400).json({ message: "Title and message are required" });
    }
    
    const notificationData = insertNotificationSchema.safeParse({
      title,
      message,
      sellerEmail: email,
    });

    if (!notificationData.success) {
      res.status(400).json({
        message: "Invalid notification data",
        errors: notificationData.error.issues,
      });
      return;
    }

    const notification = await notificationService.create(notificationData.data);
    res.status(201).json(notification);
  };

  async getNotifications (req: Request, res: Response) {
    const { userId } = getAuth(req);
    
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const { emailAddresses } = await clerkClient.users.getUser(userId);
    const email = emailAddresses[0]?.emailAddress;
    
    if (!email) {
      return res.status(401).json({ message: "Email not found" });
    }

    const notifications = await notificationService.getForUser(email);
    res.status(200).json(notifications);
  };
}

export const notificationController = new NotificationController();
