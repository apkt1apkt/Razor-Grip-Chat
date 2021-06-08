import compression from "compression";
import express from "express";
import helmet from "helmet";
import path from "path";
import { createServer } from "http";

import apolloServer from "@server/apollo";
import logger, { logs } from "@server/logger";
import { HOST_PORT, isProduction } from "@server/fixed";
import "@server/mongo";

const server = express();

server.use(compression());

server.use(helmet({ contentSecurityPolicy: false }));

server.use(logs);

if (isProduction) {
  server.use(express.static(path.join(__dirname, "../../web/build")));

  server.get("/", (_, res) => {
    res.sendFile(path.join(__dirname, "../../web/build/index.html"));
  });
}

apolloServer.applyMiddleware({ app: server, cors: true });

const ws = createServer(server);

apolloServer.installSubscriptionHandlers(ws);

ws.listen(HOST_PORT, () => {
  logger.info(`Server Started on port - ${HOST_PORT}  processId - ${process.pid}`);
});
