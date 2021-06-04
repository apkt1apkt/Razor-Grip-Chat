import { getPubsubKey, pubsub } from "@server/redis";
import { withFilter } from "graphql-subscriptions";

const rootResolvers: Resolver.Resolvers = {
  Query: {
    hello: () => {
      pubsub.publish(getPubsubKey("HELLO_CALLED"), { helloCalled: ++hello }).catch((e) => console.log(e));
      return "Hello World!";
    },
  },

  Mutation: {},

  Subscription: {
    helloCalled: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(getPubsubKey("HELLO_CALLED")),
        async (_, __, ___) => true
      ),
    },
  },
};

let hello = 0;

export default rootResolvers;
