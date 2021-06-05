import mongoose from "mongoose";

import logger from "@server/logger";
import { getLogMsg } from "@server/helpers/error";
import { isProduction } from "@server/fixed";

const connectMongo = () =>
  new Promise((resolve, reject) => {
    mongoose
      .connect(process.env.MONGO_URI || "", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: !isProduction,
        useFindAndModify: false,
        useCreateIndex: true,
      })
      .catch((e: Error) => logger.error(getLogMsg(e)));

    const db = mongoose.connection;

    db.on("error", (err: Error) => {
      logger.error(getLogMsg(err));
      reject(false);
    });

    db.once("open", () => {
      logger.info(JSON.stringify({ message: "DB_OPENED", time: new Date() }));
      resolve(db);
    });

    db.on("disconnected", () => logger.info(JSON.stringify({ message: "DB_Disconnected", time: new Date() })));

    db.on("connected", () => logger.info(JSON.stringify({ message: "DB_Connected", time: new Date() })));

    process.on("SIGINT", () =>
      db.close(() => {
        logger.info(
          JSON.stringify({
            message: "Mongoose default connection is disconnected due to application exit",
            time: new Date(),
          })
        );
        process.exit(0);
      })
    );
  });

connectMongo().catch((e) => e);
