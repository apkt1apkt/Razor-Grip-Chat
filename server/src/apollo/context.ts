import { Request, Response } from "express";
import { AuthenticationError } from "apollo-server-express";

import { ReadableError } from "@server/helpers/error";
import { verify } from "@server/auth";

const context = async (args: ContextArgs) => {
  const { connection, req, res } = args;
  let context = { uid: "" };

  const { authorization: token } = req ? req.headers || {} : ({} as any);
  const decoded = await verify(token);
  if (decoded) {
    console.log(decoded);
  }

  const authenticate = () => {
    if (!context.uid) throw new AuthenticationError("You Must Be Logged In To Perform This Operation");
  };

  const throwUserOut = () => {
    throw ReadableError("Operation was rejected by server");
  };

  return {
    ...context,
    req,
    res,
    authenticate,
    throwUserOut,
  };
};

export default context;

export type Context = ReturnType<typeof context>;

type ContextArgs = {
  req?: Request;
  res?: Response;
  payload?: any;
  connection?: any;
};
