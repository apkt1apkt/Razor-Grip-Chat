import { AuthenticationError, ForbiddenError } from "apollo-server-express";
import { GraphQLError } from "graphql";

import logger from "@server/logger";
import { isProduction } from "@server/fixed";
import { ErrorCodes } from "@server/helpers/error";

const formatError = (err: GraphQLError) => {
  if (!isProduction) console.error(err.message);

  const { message, name, extensions, path } = err;

  const code = extensions?.code;

  const loggerMsg = JSON.stringify({
    message,
    name,
    path,
    code,
    time: new Date(),
    stack: extensions?.exception?.stacktrace,
  });

  if (code === ErrorCodes.App || code === ErrorCodes.GraphQlValidation) {
    logger.debug(loggerMsg);
    return err;
  }

  logger.error(loggerMsg);

  if (!(err.originalError instanceof AuthenticationError || err.originalError instanceof ForbiddenError))
    err.message = "Something went wrong.\n Please try again.";

  return err;
};

export default formatError;
