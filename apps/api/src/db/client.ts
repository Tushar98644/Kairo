import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as ordersSchema from './schema/order';
import * as orderItemSchema from './schema/orderItem';
import * as productsSchema from './schema/product';
import * as notificationSchema from './schema/notification';

const schema = {
  ...ordersSchema,
  ...orderItemSchema,
  ...productsSchema,
  ...notificationSchema,
};

export const db = drizzle({ 
  connection: { 
    connectionString: process.env.DATABASE_URL!,
    ssl: false
  },
  schema
});
