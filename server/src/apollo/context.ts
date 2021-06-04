import { Request, Response } from "express";
import { AuthenticationError } from "apollo-server-express";

import { ReadableError } from "@server/helpers/error";

const context = async ({ req, res, payload }: ContextArgs) => {
  const context = { uid: "" };

  const authenticate = () => {
    if (!context.uid) throw new AuthenticationError("You Must Be Logged In To Perform This Operation");
  };

  const throwUserOut = () => {
    throw ReadableError("Operation was rejected by server");
  };

  return {
    ...context,
    authenticate,
    throwUserOut,
  };
};

export default context;

export type Context = ReturnType<typeof context>;

type ContextArgs = {
  req: Request;
  res: Response;
  payload: any;
};
