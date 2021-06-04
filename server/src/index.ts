import compression from "compression";
import express from "express";
import helmet from "helmet";
import { createServer } from "http";

import apolloServer from "@server/apollo";
import logger, { logs } from "@server/logger";
import routes from "@server/router";
import { HOST_PORT } from "@server/fixed";

const server = express();

server.use(compression());

server.use(helmet({ contentSecurityPolicy: false }));

server.use(logs);

server.use(routes);

apolloServer.applyMiddleware({ app: server, cors: true });

const ws = createServer(server);

apolloServer.installSubscriptionHandlers(ws);

ws.listen(HOST_PORT, () => {
  logger.info(`Server Started on port - ${HOST_PORT}  processId - ${process.pid}`);
});
