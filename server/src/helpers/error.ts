import { ApolloError } from "apollo-server-express";

import logger from "@server/logger";

/**Return an Error instance in a string format for the logger API */
export const getLogMsg = (err: Error) => {
  const { message, stack, name } = err;
  return JSON.stringify({ message, name, time: new Date(), stack });
};

/**Returns a readable error message to the client */
export const ReadableError = (message: string, errInstance?: Error) => {
  if (errInstance) logger.error(getLogMsg(errInstance));
  return new ApolloError(message, ErrorCodes.App);
};

/**Wraps a function under an error handler */
export const tryCatchWrap = async <T>(
  func: () => Promise<T> | T,
  onError?: (e?: Error) => Promise<void> | void
): Promise<T | undefined> => {
  try {
    return await func();
  } catch (e) {
    if (onError) await onError(e);
    logger.error(getLogMsg(e));
  }
  return;
};

export enum ErrorCodes {
  App = "APP",

  InternalServer = "INTERNAL_SERVER_ERROR",

  Db = "DB_ERROR",

  GraphQlValidation = "GRAPHQL_VALIDATION_FAILED",
}
