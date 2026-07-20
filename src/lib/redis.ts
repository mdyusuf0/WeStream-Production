import Redis from "ioredis";

const REDIS_URL = process.env.REDIS_URL;

interface RedisCache {
  client: Redis | null;
}

declare global {
  // eslint-disable-next-line no-var
  var redis: RedisCache | undefined;
}

let cached = global.redis;

if (!cached) {
  cached = global.redis = { client: null };
}

export function getRedisClient(): Redis {
  if (cached!.client) {
    return cached!.client;
  }

  const host = process.env.REDIS_HOST;
  const port = process.env.REDIS_PORT;
  const password = process.env.REDIS_PASS;
  const redisUrl = process.env.REDIS_URL;

  const options = {
    maxRetriesPerRequest: 3,
    connectTimeout: 2000, // Timeout after 2 seconds
    enableOfflineQueue: false, // Don't queue commands if offline
    retryStrategy(times: number) {
      if (times > 3) {
        return null; // Stop retrying
      }
      const delay = Math.min(times * 100, 1000);
      return delay;
    },
  };

  if (host) {
    cached!.client = new Redis({
      host,
      port: port ? Number(port) : 6379,
      password: password || undefined,
      ...options,
    });
  } else if (redisUrl) {
    cached!.client = new Redis(redisUrl, options);
  } else {
    throw new Error(
      "Please define either REDIS_URL or REDIS_HOST/REDIS_PORT/REDIS_PASS variables in env configuration."
    );
  }

  cached!.client.on("error", (err) => {
    console.error("Redis Connection Error:", err);
  });

  return cached!.client;
}
