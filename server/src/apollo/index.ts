import { ApolloServer, concatenateTypeDefs } from "apollo-server-express";

import schema from "@server/apollo/schema";
import formatError from "@server/apollo/format-error";
import context from "@server/apollo/context";
import { connection } from "mongoose";

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
    onConnect: (connectionParams, webSocket, context) => {
      console.log("connected");
    },
    onDisconnect: (webSocket, context) => {
      console.log("disconnected");
    },
  },
});

export default apolloServer;
