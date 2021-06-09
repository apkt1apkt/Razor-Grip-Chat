import mongoose from "mongoose";
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

  GraphQlValidation = "GRAPHQL_VALIDATION_FAILED",
}

/**Wraps a function under mongodb session and an error handler */
export const sessionWrap: SessionWrap = async (func, errorMessage, options) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const result = await func(session);
    await session.commitTransaction();
    session.endSession();
    return result;
  } catch (e) {
    await session.abortTransaction();
    session.endSession();
    const { onError, getMsg } = options || {};
    if (onError) await tryCatchWrap(() => onError(e));
    if (getMsg) {
      const errMsg = getMsg(e);
      if (errMsg) throw ReadableError(errMsg, e);
    }
    if (errorMessage !== null) throw ReadableError(errorMessage, e);
  } finally {
    const { regardless } = options || {};
    if (regardless) await tryCatchWrap(regardless);
  }
};

type SessionWrap = <T>(
  func: Session<Promise<T> | T>,
  errorMessage: string | null,
  options?: {
    onError?: Error_<Promise<void> | void>;
    regardless?: NoParams<Promise<void> | void>;
    getMsg?: Error_<string | null | undefined>;
  }
) => Promise<T | undefined>;

type Session<T> = (session: mongoose.ClientSession) => T;

type Error_<T> = (error: Err) => T;

type NoParams<T> = () => T;

type Err = {
  message: string;
  code: number;
  name: string;
  stack?: string;
  status?: string;
};
