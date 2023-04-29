import winston from "winston";
// import "winston-mongodb";
import * as dotenv from "dotenv";

dotenv.config();

const { combine, timestamp, json, errors, metadata } = winston.format;
export const logger = winston.createLogger({
  level: "error",
  format: combine(errors({ stack: true }), timestamp(), json()),
  transports: [
    new winston.transports.File({
      filename: "logfile.log",
    }),
    new winston.transports.Console({
      colorize: true,
      prettyPrint: true,
    }),
    new winston.transports.Console({
      level: "info",
    }),
    // new winston.transports.MongoDB({
    //   db: process.env.MONGODB_URL,
    //   level: "error",
    //   format: metadata(),
    //   options: {
    //     useUnifiedTopology: true,
    //   },
    // }),
  ],
});
process.on("uncaughtException", (ex) => {
  logger.error(new Error(ex.message));
  process.exit(1);
});
process.on("unhandledRejection", (ex) => {
  logger.error(new Error(ex.message));
  process.exit(1);
});
