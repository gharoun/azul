import winston from "winston";
import "winston-mongodb";
import * as dotenv from "dotenv";

dotenv.config();

const { combine, timestamp, json, errors, metadata } = winston.format;
export default winston.createLogger({
  level: "error",
  format: combine(errors({ stack: true }), timestamp(), json()),
  transports: [
    new winston.transports.File({
      filename: "logfile.log",
    }),
    new winston.transports.MongoDB({
      db: process.env.MONGODB_URL,
      level: "error",
      format: metadata(),
      options: {
        useUnifiedTopology: true,
      },
    }),
  ],
});
