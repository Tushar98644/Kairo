import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as userSchema from './schema/users';

const schema = {
  ...userSchema,
};

export const db = drizzle({ 
  connection: { 
    connectionString: process.env.DATABASE_URL!,
    ssl: false
  },
  schema
});
