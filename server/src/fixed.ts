require("dotenv").config();

const { NODE_ENV, PORT } = process.env;

export const isProduction = NODE_ENV === "production";

export const HOST_PORT = PORT;
