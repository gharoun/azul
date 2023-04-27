import winston from "winston";
import "winston-mongodb";
import * as dotenv from "dotenv";

dotenv.config();

const { combine, timestamp, json, errors } = winston.format;
const logger = winston.createLogger({
  level: "error",
  format: combine(errors({ stack: true }), timestamp(), json()),
  transports: [
    new winston.transports.File({
      filename: "logfile.log",
    }),
    new winston.transports.MongoDB({
      db: process.env.MONGODB_URL,
      options: {
        useUnifiedTopology: true,
      },
    }),
  ],
});

export default function (err, req, res, next) {
  logger.error(new Error(err.message));
  res.status(500).json({ message: "Somthing failed!" });
}
