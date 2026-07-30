import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

// In-Memory Fallback Map
const memoryStore = new Map<string, { count: number; lastReset: number }>();

// Try initializing Upstash Redis if env vars exist
let redis: Redis | null = null;
const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

if (url && token) {
  try {
    redis = new Redis({ url, token });
  } catch (err) {
    console.warn('Upstash Redis init failed, using in-memory rate limiter:', err);
  }
}

// Upstash Ratelimit instances (if redis configured)
const chatRatelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(15, '1 m'),
      analytics: true,
      prefix: '@upstash/ratelimit/chat',
    })
  : null;

const contactRatelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '10 m'),
      analytics: true,
      prefix: '@upstash/ratelimit/contact',
    })
  : null;

export async function checkChatRateLimit(ip: string): Promise<boolean> {
  if (chatRatelimit) {
    try {
      const { success } = await chatRatelimit.limit(ip);
      return success;
    } catch (err) {
      console.warn('Upstash Ratelimit error, falling back to memory:', err);
    }
  }

  // Fallback to memory tracking
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 min
  const maxReq = 15;
  const entry = memoryStore.get(`chat:${ip}`);

  if (!entry || now - entry.lastReset > windowMs) {
    memoryStore.set(`chat:${ip}`, { count: 1, lastReset: now });
    return true;
  }
  if (entry.count >= maxReq) return false;
  entry.count += 1;
  return true;
}

export async function checkContactRateLimit(ip: string): Promise<boolean> {
  if (contactRatelimit) {
    try {
      const { success } = await contactRatelimit.limit(ip);
      return success;
    } catch (err) {
      console.warn('Upstash Contact Ratelimit error, falling back to memory:', err);
    }
  }

  // Fallback to memory tracking
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 mins
  const maxReq = 5;
  const entry = memoryStore.get(`contact:${ip}`);

  if (!entry || now - entry.lastReset > windowMs) {
    memoryStore.set(`contact:${ip}`, { count: 1, lastReset: now });
    return true;
  }
  if (entry.count >= maxReq) return false;
  entry.count += 1;
  return true;
}
