import path from "path";
import morgan from "morgan";
import winston from "winston";
import { RequestHandler } from "express";

import { isProduction } from "@server/fixed";

require("winston-daily-rotate-file");

const WTransport = winston.transports as any;
const logPath = path.join(__dirname, "../logs");

const options = {
  file: {
    level: "info",
    format: winston.format.json(),
    handleExceptions: true,
  },
  console: {
    level: "info",
    handleExceptions: true,
    format: winston.format.combine(winston.format.colorize({}), winston.format.simple()),
  },
};

var transport = new WTransport.DailyRotateFile({
  dirname: logPath,
  datePattern: "YYYY-MM-DD-HH",
  ...options.file,
  json: true,
  maxsize: 5242880,
  maxFiles: 5,
});

var logger = winston.createLogger({
  transports: [transport],
  exceptionHandlers: [new winston.transports.File({ filename: logPath + "/exceptions.log" })],
  exitOnError: false,
});

if (!isProduction) {
  logger.add(new winston.transports.Console(options.console));
}

logger.stream = {
  write: function (message: any) {
    logger.info(message);
  },
} as any;

export default logger;

export const logs: RequestHandler = function (_, __, next) {
  if (isProduction) morgan("combined" as any, { stream: logger.stream as any });
  next();
};
