import { Request, Response } from 'express';
import { getAuth, clerkClient } from '@clerk/express';
import { orderService } from './order.service';

export class OrderController {
  async createOrder(req: Request, res: Response) {
    try {
      const { userId } = getAuth(req);
      if (!userId) {
        res.status(401).json({ message: 'Not authenticated' });
        return;
      }

      const { emailAddresses } = await clerkClient.users.getUser(userId);
      const buyerEmail = emailAddresses[0]?.emailAddress;
      if (!buyerEmail) {
        res.status(400).json({ message: 'Buyer email not available' });
        return;
      }

      const items = (req.body?.items ?? []) as { productId: string; quantity: number }[];
      if (!Array.isArray(items) || items.length === 0) {
        res.status(400).json({ message: 'Items are required' });
        return;
      }

      const result = await orderService.create({ buyerEmail, items });
      res.status(201).json(result);
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(400).json({ message: 'Failed to create order' });
    }
  }

  async getMyOrders(req: Request, res: Response) {
    try {
      const { userId } = getAuth(req);
      if (!userId) {
        res.status(401).json({ message: 'Not authenticated' });
        return;
      }

      const { emailAddresses } = await clerkClient.users.getUser(userId);
      const buyerEmail = emailAddresses[0]?.emailAddress;
      if (!buyerEmail) {
        res.status(400).json({ message: 'Buyer email not available' });
        return;
      }

      const orders = await orderService.getMine(buyerEmail);
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ message: 'Failed to fetch orders' });
    }
  }

  async getOrderById(req: Request, res: Response) {
    try {
      const { userId } = getAuth(req);
      if (!userId) {
        res.status(401).json({ message: 'Not authenticated' });
        return;
      }

      const { emailAddresses } = await clerkClient.users.getUser(userId);
      const buyerEmail = emailAddresses[0]?.emailAddress;
      if (!buyerEmail) {
        res.status(400).json({ message: 'Buyer email not available' });
        return;
      }
      
      const id = req?.params?.id;
      if (!id) {
        res.status(400).json({ message: 'Order ID not provided' });
        return;
      }
      
      const data = await orderService.getById(id, buyerEmail);
      if (!data) {
        res.status(404).json({ message: 'Order not found' });
        return;
      }

      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching order:', error);
      res.status(500).json({ message: 'Failed to fetch order' });
    }
  }
}

export const orderController = new OrderController();