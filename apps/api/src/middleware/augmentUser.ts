import { Request, Response, NextFunction } from 'express';
import { eq } from 'drizzle-orm';
import { getAuth } from '@clerk/express';
import { db } from '../db/client';
import { users } from '../db/schema/user';

declare global {
  namespace Express {
    export interface Request {
      user?: {
        id: string;
        clerkId: string;
      };
    }
  }
}

export const augmentUser = async (req: Request, res: Response, next: NextFunction) => {
  const auth = getAuth(req);
  
  if (!auth.userId) {
    return res.status(401).json({ message: 'Unauthorized: Clerk user ID not found.' });
  }

  try {
    const clerkId = auth.userId;
    
    console.log(`Clerk ID: ${clerkId} which is type of: ${typeof clerkId}`);

    const user = await db.query.users.findFirst({
        where: eq(users.clerkId, clerkId),
        columns: {
            id: true
        }
    });
    
    if (!user) {
        console.log(`search result : ${user}`);
        return res.status(404).json({ message: 'User not found in our system.' });
    }

    req.user = { id: user.id, clerkId: clerkId };

    next();
  } catch (error) {
    console.error('Error augmenting user:', error);
    return res.status(500).json({ message: 'Internal server error during user augmentation.' });
  }
};
