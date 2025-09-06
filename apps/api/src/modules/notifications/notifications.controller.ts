import { Request, Response } from "express";
import { clerkClient, getAuth } from "@clerk/express";
import { NotificationService } from "./notifications.service";

const notificationService = new NotificationService();

export const getNotifications = async (req: Request, res: Response) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const user = await clerkClient.users.getUser(userId);

  const email = user.emailAddresses[0]?.emailAddress;
  if (!email) {
    return res.status(401).json({ message: "Email not found" });
  }

  const myNotifications = await notificationService.getForUser(email);
  res.status(200).json(myNotifications);
};
