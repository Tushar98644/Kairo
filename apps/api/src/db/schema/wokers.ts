import {
  pgTable,
  integer,
  varchar,
  text,
  boolean,
  timestamp,
  numeric,
} from "drizzle-orm/pg-core";

export const workers = pgTable("workers", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  skills: text("skills").array().notNull(),
  hourlyRate: numeric("hourly_rate", { precision: 10, scale: 2 }),
  isAvailable: boolean("is_available").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
