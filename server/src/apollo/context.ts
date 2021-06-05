import { Request, Response } from "express";
import { AuthenticationError } from "apollo-server-express";

import { ReadableError } from "@server/helpers/error";
import { verify } from "@server/auth";

const context = async (args: ContextArgs) => {
  const { connection, req } = args;

  let context = { uid: "" };

  if (connection) context = { ...context, ...connection.context };
  else {
    const decoded = await verify(req?.headers.authorization);
    if (decoded) context.uid = decoded.sub;
  }

  const authenticate = () => {
    if (!context.uid) throw new AuthenticationError("You Must Be Logged In To Perform This Operation");
  };

  const throwUserOut = () => {
    throw ReadableError("Operation was rejected by server");
  };

  return {
    ...context,
    isAuthenticated: !!context.uid,
    authenticate,
    throwUserOut,
  };
};

export default context;

export type Context = ResolvePromise<ReturnType<typeof context>>;

type ContextArgs = {
  req?: Request;
  res?: Response;
  payload?: any;
  connection?: any;
};
