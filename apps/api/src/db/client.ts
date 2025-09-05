import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as workersSchema from './schema/wokers';

const schema = {
  ...workersSchema,
};

export const db = drizzle({ 
  connection: { 
    connectionString: process.env.DATABASE_URL!,
    ssl: true
  },
  schema
});
