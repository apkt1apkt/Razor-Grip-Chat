import Redis from "ioredis";
import { RedisPubSub } from "graphql-redis-subscriptions";
import { withFilter } from "graphql-subscriptions";

import { appId } from "@server/fixed";
import { RedisChannels } from "@server/types/redis-channels";

const { REDIS_HOST, REDIS_PORT } = process.env;

const PORT = parseInt(REDIS_PORT as string);

const OPTIONS: Redis.RedisOptions = {
  retryStrategy: (times) => Math.max(times * 100, 3000),
};

const pubsub = new RedisPubSub({
  publisher: new Redis(PORT, REDIS_HOST, OPTIONS),
  subscriber: new Redis(PORT, REDIS_HOST, OPTIONS),
});

const getPubsubKey = (channel: RedisChannels) => appId + "_" + channel;

export const PUBLISH = (channel: RedisChannels, payload: Obj) => pubsub.publish(getPubsubKey(channel), payload);

export const SUBSCRIBE = (channel: RedisChannels, filterFn: Resolver.Func): Resolver.Subscription => ({
  subscribe: withFilter(() => pubsub.asyncIterator(getPubsubKey(channel)), filterFn),
});
