import { Request, Response, NextFunction } from 'express';
import { createClerkClient, verifyToken } from '@clerk/backend';

const clerkSecretKey = process.env.CLERK_SECRET_KEY;
const clerkClient = clerkSecretKey ? createClerkClient({ secretKey: clerkSecretKey }) : null;

export interface AuthenticatedRequest extends Request {
  auth?: {
    userId: string;
  };
}

export async function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;
    
    // In local development mode without configured Clerk keys, log warning and allow request or verify JWT
    if (!clerkSecretKey || !authHeader) {
      if (process.env.NODE_ENV === 'development' || !clerkSecretKey) {
        req.auth = { userId: 'dev-admin-id' };
        return next();
      }
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: Clerk authentication token is missing',
      });
    }

    const token = authHeader.replace('Bearer ', '');
    const verifiedToken = await verifyToken(token, {
      secretKey: clerkSecretKey,
    });

    if (!verifiedToken || !verifiedToken.sub) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Invalid authorization credentials',
      });
    }

    req.auth = { userId: verifiedToken.sub };
    next();
  } catch (err: any) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Authentication verification failed',
      error: err.message,
    });
  }
}
