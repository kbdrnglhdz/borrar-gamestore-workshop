import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const recentlyUpdated = new Set<number>();

const THROTTLE_MS = 60_000;

export const getSessionTimeoutMinutes = (): number => {
  const val = process.env.SESSION_INACTIVITY_TIMEOUT_MINUTES;
  if (val) {
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed) && parsed > 0) return parsed;
  }
  return 60;
};

export const updateLastActivity = async (userId: number): Promise<void> => {
  if (recentlyUpdated.has(userId)) return;

  recentlyUpdated.add(userId);
  setTimeout(() => recentlyUpdated.delete(userId), THROTTLE_MS);

  await prisma.user.update({
    where: { id: userId },
    data: { lastActivityAt: new Date() }
  });
};
