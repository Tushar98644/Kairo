import { pgTable, text, varchar, real, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

export const paymentStatusEnum = pgEnum('payment_status', ['PENDING', 'SUCCEEDED', 'FAILED']);

export const payments = pgTable('payments', {
  id: varchar('id', { length: 255 }).primaryKey(),
  serviceRequestId: varchar('service_request_id', { length: 255 }).notNull(),
  amount: real('amount').notNull(),
  currency: varchar('currency', { length: 3 }).default('usd').notNull(),
  status: paymentStatusEnum('status').default('PENDING'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const insertPaymentSchema = createInsertSchema(payments);
