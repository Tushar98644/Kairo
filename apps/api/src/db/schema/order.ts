import { pgTable, uuid, varchar, real, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { timestamps } from "@/utils/columns.helper";

export const orderStatusEnum = pgEnum('order_status', ['PENDING', 'PAID', 'CANCELLED']);

export const orders = pgTable("orders", {
  id: uuid("id").primaryKey().defaultRandom(),
  buyerEmail: varchar("buyer_email", { length: 255 }).notNull(), 
  totalAmount: real("total_amount").notNull(),
  status: orderStatusEnum("status").notNull().default('PENDING'),
  ...timestamps
});

export const insertOrderSchema = createInsertSchema(orders);
export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
