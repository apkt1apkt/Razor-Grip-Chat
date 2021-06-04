import express, { RequestHandler } from "express";
import path from "path";

import { isProduction } from "@server/fixed";

const router = express.Router();

const routes: RequestHandler = function (_, __, next) {
  if (isProduction) {
    express.static(path.join(__dirname, "../web"));
    router.get("/*", (req, res) => {
      res.sendFile(path.join(__dirname, "../web/index.html"));
    });
  }
  next();
};

export default routes;
