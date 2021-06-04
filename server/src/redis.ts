import { RedisPubSub } from "graphql-redis-subscriptions";
import Redis from "ioredis";

import { appId } from "@server/fixed";

const { REDIS_HOST, REDIS_PORT } = process.env;

const PORT = parseInt(REDIS_PORT as string);

const OPTIONS: Redis.RedisOptions = {
  retryStrategy: (times) => Math.max(times * 100, 3000),
};

export const pubsub = new RedisPubSub({
  publisher: new Redis(PORT, REDIS_HOST, OPTIONS),
  subscriber: new Redis(PORT, REDIS_HOST, OPTIONS),
});

export const getPubsubKey = (key: string) => appId + "_" + key;
