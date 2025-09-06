import { db } from '../../db/client';
import { orders, type Order } from '../../db/schema/order';
import { orderItems, type OrderItem } from '../../db/schema/orderItem';
import { products } from '../../db/schema/product';
import { eq, inArray } from 'drizzle-orm';

type CreateOrderItemInput = { productId: string; quantity: number };
type CreateOrderInput = { buyerEmail: string; items: CreateOrderItemInput[] };

export class OrderService {
  async create(input: CreateOrderInput): Promise<{ order: Order; items: OrderItem[] }> {
    if (!input.items?.length) throw new Error('No items provided');

    const ids = input.items.map(i => i.productId);
    const dbProducts = await db.select().from(products).where(inArray(products.id, ids));
    const byId = new Map(dbProducts.map(p => [p.id, p]));

    let total = 0;
    const prepared: Omit<OrderItem, 'id'>[] = [];

    for (const it of input.items) {
      const prod = byId.get(it.productId);
      if (!prod) throw new Error(`Product not found: ${it.productId}`);
      const qty = Math.max(1, it.quantity | 0);
      const unit = Number(prod.price);
      const line = unit * qty;
      total += line;

      prepared.push({
        orderId: '' as any,
        productId: it.productId,
        title: prod.title,
        unitPrice: unit,
        quantity: qty,
        lineTotal: line,
      });
    }

    const [newOrder] = await db
      .insert(orders)
      .values({
        buyerEmail: input.buyerEmail,
        totalAmount: Number(total.toFixed(2)),
        status: 'PENDING',
      })
      .returning();

    if (!newOrder) throw new Error('Failed to create order');

    const withOrderId = prepared.map(i => ({ ...i, orderId: newOrder.id }));
    const insertedItems = await db.insert(orderItems).values(withOrderId).returning();

    return { order: newOrder, items: insertedItems };
  }

  async getById(id: string, buyerEmail: string): Promise<{ order: Order; items: OrderItem[] } | null> {
    const [ord] = await db.select().from(orders).where(eq(orders.id, id));
    if (!ord || ord.buyerEmail !== buyerEmail) return null;

    const items = await db.select().from(orderItems).where(eq(orderItems.orderId, id));
    return { order: ord, items };
  }

  async getMine(buyerEmail: string): Promise<Order[]> {
    return await db.select().from(orders).where(eq(orders.buyerEmail, buyerEmail));
  }
}

export const orderService = new OrderService();