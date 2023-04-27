import connectDB from "./mongodb/connect.js";
import logger from "./middleware/loggingErrors.js";
import express from "express";
import * as dotenv from "dotenv";
import routes from "./startup/routes.js";

dotenv.config();
const app = express();

process.on("uncaughtException", (ex) => {
  logger.error(new Error(ex.message));
  process.exit(1);
});
process.on("unhandledRejection", (ex) => {
  logger.error(new Error(ex.message));
  process.exit(1);
});

routes(app);

const port = process.env.PORT || 3000;
const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(port, () => console.log(`Listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};
startServer();
