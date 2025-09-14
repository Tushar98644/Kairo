import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as userSchema from './schema/user';
import * as storySchema from './schema/story';

const schema = {
  ...userSchema,
  ...storySchema,
};

export const db = drizzle({ 
  connection: { 
    connectionString: process.env.DATABASE_URL!,
    ssl: false
  },
  schema
});
