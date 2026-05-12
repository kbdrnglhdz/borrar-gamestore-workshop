import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { getSessionTimeoutMinutes, updateLastActivity } from './activity';

const JWT_SECRET = 'hardcoded-secret-key-12345';
const prisma = new PrismaClient();

export interface AuthRequest extends Request {
  userId?: number;
  userRole?: string;
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; role: string };
    req.userId = decoded.userId;
    req.userRole = decoded.role;

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { lastActivityAt: true }
    });

    if (user?.lastActivityAt) {
      const timeoutMs = getSessionTimeoutMinutes() * 60 * 1000;
      const elapsed = Date.now() - user.lastActivityAt.getTime();
      if (elapsed > timeoutMs) {
        return res.status(401).json({ error: 'Session expired due to inactivity' });
      }
    }

    await updateLastActivity(decoded.userId);

    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

export const generateToken = (userId: number, role: string) => {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: '60m' });
};

export const generateRefreshToken = (userId: number) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET) as { userId: number };
};

export { JWT_SECRET };