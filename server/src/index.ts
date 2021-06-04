import compression from "compression";
import express from "express";
import helmet from "helmet";
import { graphqlUploadExpress } from "graphql-upload";
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

server.use(graphqlUploadExpress({ maxFileSize: 1000000000, maxFiles: 10 }));

apolloServer.applyMiddleware({ app: server, cors: true });

const ws = createServer(server);

apolloServer.installSubscriptionHandlers(ws);

server.listen(HOST_PORT, () => {
  logger.info(`Server Started on port - ${HOST_PORT}  processId - ${process.pid}`);
});
