import { Router, Response, Request } from 'express';
import { PrismaClient } from '@prisma/client';
import { generateToken, generateRefreshToken, verifyRefreshToken, AuthRequest, authenticate } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: false,
  sameSite: 'strict' as const,
  path: '/api/auth',
  maxAge: 7 * 24 * 60 * 60 * 1000
};

router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // BUG: Password stored in plain text
    const user = await prisma.user.create({
      data: {
        email,
        password, // TODO: Store hashed password
        name,
        role: 'user'
      }
    });

    const token = generateToken(user.id, user.role);
    const refreshToken = generateRefreshToken(user.id);

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken }
    });

    res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);
    res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (error: any) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // BUG: Comparing plain text passwords directly
    const user = await prisma.user.findFirst({
      where: { email, password } // FIXME: Should compare with hashed password
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user.id, user.role);
    const refreshToken = generateRefreshToken(user.id);

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken }
    });

    res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);
    res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (error: any) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

router.post('/refresh', async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token required' });
    }

    const decoded = verifyRefreshToken(refreshToken);
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }

    const token = generateToken(user.id, user.role);
    const newRefreshToken = generateRefreshToken(user.id);

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: newRefreshToken }
    });

    res.cookie('refreshToken', newRefreshToken, COOKIE_OPTIONS);
    res.json({ token });
  } catch (error: any) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

router.post('/logout', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    await prisma.user.update({
      where: { id: req.userId },
      data: { refreshToken: null }
    });

    res.clearCookie('refreshToken', { path: '/api/auth' });
    res.json({ message: 'Logged out successfully' });
  } catch (error: any) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

router.get('/me', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { id: true, email: true, name: true, role: true }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

export default router;