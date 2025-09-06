import { timestamps } from "@/utils/columns.helper";
import { pgTable, uuid, text, varchar, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  sellerEmail: varchar("seller_email", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  price: varchar("price", { length: 20 }).notNull(),
  image: text("image").notNull(),
  category: varchar("category", { length: 20 }).notNull(),
  isAvailable: boolean("is_available").notNull().default(true),
  ...timestamps
})

export const insertProductSchema = createInsertSchema(products);
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
