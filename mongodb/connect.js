import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { logger } from "../startup/logging.js";
dotenv.config();

const connectDB = () => {
  mongoose.set("strictQuery", true);

  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => logger.info("Connected to Mongodb ..."));
};
export default connectDB;
