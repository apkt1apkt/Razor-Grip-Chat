require("dotenv").config();

const { NODE_ENV, PORT, APP_ID } = process.env;

export const isProduction = NODE_ENV === "production";

export const HOST_PORT = PORT;

export const appId = APP_ID;
