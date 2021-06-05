import { ApolloServer } from "apollo-server-express";

import context from "@server/apollo/context";
import formatError from "@server/apollo/format-error";
import schema from "@server/apollo/schema";
import { verify } from "@server/auth";
import { userIsOnline } from "@server/crud/user";

const apolloServer = new ApolloServer({
  schema,

  context,

  formatError,

  playground: {
    settings: {
      "editor.theme": "dark",
      "editor.reuseHeaders": true,
      "editor.cursorShape": "line",
      "tracing.hideTracingResponse": true,
    },
  },

  subscriptions: {
    path: "/socket",

    onConnect: async (connectionParams) => {
      const decoded = await verify((connectionParams as any)["x-auth"]);
      const uid = decoded?.sub;
      if (uid) userIsOnline(true, uid);
      return { uid };
    },

    onDisconnect: async (_, context) => {
      const { uid } = await context.initPromise;
      if (uid) userIsOnline(false, uid);
    },
  },
});

export default apolloServer;
