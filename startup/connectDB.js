import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { logger } from "./logging.js";
dotenv.config();
export default function () {
  mongoose.set("strictQuery", true);

  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => logger.info("Connected to Mongodb ..."));
}
