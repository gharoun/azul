import logger from "./loggingErrors.js";

export default function (err, req, res, next) {
  logger.error(new Error(err.message));
  res.status(500).json({ message: "Somthing failed!" });
}
