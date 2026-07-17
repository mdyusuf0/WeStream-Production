import { NextRequest } from "next/server";
import { getRedisClient } from "./redis";
import crypto from "crypto";

// Helper to get client IP
export function getClientIp(req: NextRequest): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  return "127.0.0.1";
}

// Check if IP or Cookie Token is blocked in Redis
export async function isRequestBlocked(req: NextRequest): Promise<{ blocked: boolean; reason: string }> {
  try {
    const ip = getClientIp(req);
    const blockToken = req.cookies.get("ws_block_token")?.value;
    const redis = getRedisClient();

    const promises = [redis.get(`block:ip:${ip}`)];
    if (blockToken) {
      promises.push(redis.get(`block:cookie:${blockToken}`));
    }

    const [ipVal, cookieVal] = await Promise.all(promises);

    if (ipVal) {
      return { blocked: true, reason: "IP is temporarily blocked due to excessive requests." };
    }
    if (cookieVal) {
      return { blocked: true, reason: "Access suspended. Please try again later." };
    }
  } catch (error) {
    console.error("Rate limit check failed (Redis error):", error);
    // Fail-open to avoid breaking the application if Redis is temporarily down
  }

  return { blocked: false, reason: "" };
}

// rateLimitLoginBefore
export async function rateLimitLoginBefore(req: NextRequest, email: string): Promise<{ blocked: boolean; reason: string }> {
  try {
    const ip = getClientIp(req);
    const blockToken = req.cookies.get("ws_block_token")?.value;
    const redis = getRedisClient();

    const trimmedEmail = email ? email.toLowerCase().trim() : "";

    const promises: Promise<string | null>[] = [];
    const keys: string[] = [];

    // 1. Queue IP check
    keys.push(`block:ip:${ip}`);
    promises.push(redis.get(`block:ip:${ip}`));

    // 2. Queue Cookie check
    if (blockToken) {
      keys.push(`block:cookie:${blockToken}`);
      promises.push(redis.get(`block:cookie:${blockToken}`));
    }

    // 3. Queue Email check
    if (trimmedEmail) {
      keys.push(`block:email:${trimmedEmail}`);
      promises.push(redis.get(`block:email:${trimmedEmail}`));
    }

    const results = await Promise.all(promises);

    for (let i = 0; i < keys.length; i++) {
      if (results[i]) {
        const key = keys[i];
        if (key.startsWith("block:ip:")) {
          return { blocked: true, reason: "IP is temporarily blocked due to excessive requests." };
        }
        if (key.startsWith("block:cookie:")) {
          return { blocked: true, reason: "Access suspended. Please try again later." };
        }
        if (key.startsWith("block:email:")) {
          return { blocked: true, reason: "Account is temporarily locked. Try again in 10 minutes." };
        }
      }
    }
  } catch (error) {
    console.error("Redis block check error:", error);
  }

  return { blocked: false, reason: "" };
}

// rateLimitLoginAfter (Increment failure and block if needed)
export async function rateLimitLoginAfter(
  req: NextRequest, 
  email: string
): Promise<{ shouldBlock: boolean; blockToken: string }> {
  try {
    const ip = getClientIp(req);
    const trimmedEmail = email.toLowerCase().trim();
    const redis = getRedisClient();

    const loginFailKey = `login:failed:count:${ip}:${trimmedEmail}`;
    
    // Increment the failed counter
    const currentCount = await redis.incr(loginFailKey);
    if (currentCount === 1) {
      // Set 10-minute expiry on first failure
      await redis.expire(loginFailKey, 600);
    }

    if (currentCount >= 5) {
      // Block email, IP, and generate a block cookie token for 10 minutes
      const blockToken = crypto.randomUUID();

      await Promise.all([
        redis.set(`block:ip:${ip}`, "1", "EX", 600),
        redis.set(`block:email:${trimmedEmail}`, "1", "EX", 600),
        redis.set(`block:cookie:${blockToken}`, "1", "EX", 600),
        redis.del(loginFailKey) // clear failure count once blocked
      ]);

      console.warn(`Admin login blocked for IP: ${ip}, Email: ${trimmedEmail}. Block token: ${blockToken}`);
      return { shouldBlock: true, blockToken };
    }
  } catch (error) {
    console.error("Redis login increment error:", error);
  }

  return { shouldBlock: false, blockToken: "" };
}

// rateLimitContact (Rate limit public contact form submissions)
export async function rateLimitContact(
  req: NextRequest
): Promise<{ blocked: boolean; shouldBlockCookie: boolean; blockToken: string }> {
  // First check if already blocked
  const check = await isRequestBlocked(req);
  if (check.blocked) {
    return { blocked: true, shouldBlockCookie: false, blockToken: "" };
  }

  try {
    const ip = getClientIp(req);
    const redis = getRedisClient();
    const contactKey = `contact:count:${ip}`;

    const submissionsCount = await redis.incr(contactKey);
    if (submissionsCount === 1) {
      // Set 1-hour expiry on first submission
      await redis.expire(contactKey, 3600);
    }

    if (submissionsCount > 5) {
      // Block IP and generate block cookie token for 1 hour
      const blockToken = crypto.randomUUID();

      await Promise.all([
        redis.set(`block:ip:${ip}`, "1", "EX", 3600),
        redis.set(`block:cookie:${blockToken}`, "1", "EX", 3600),
      ]);

      console.warn(`Contact form rate limit exceeded for IP: ${ip}. Block token: ${blockToken}`);
      return { blocked: true, shouldBlockCookie: true, blockToken };
    }
  } catch (error) {
    console.error("Redis contact rate limit error:", error);
  }

  return { blocked: false, shouldBlockCookie: false, blockToken: "" };
}

// blockUserInstantly (e.g. for honeypot triggers)
export async function blockUserInstantly(req: NextRequest): Promise<string> {
  try {
    const ip = getClientIp(req);
    const redis = getRedisClient();
    const blockToken = crypto.randomUUID();

    // Block for 24 hours for honeypot violation
    await Promise.all([
      redis.set(`block:ip:${ip}`, "1", "EX", 86400),
      redis.set(`block:cookie:${blockToken}`, "1", "EX", 86400),
    ]);

    console.warn(`Honeypot triggered! Instant 24h block for IP: ${ip}. Block token: ${blockToken}`);
    return blockToken;
  } catch (error) {
    console.error("Honeypot block error:", error);
    return "";
  }
}
