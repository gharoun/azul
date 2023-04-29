import mongoose from "mongoose";

import { logger } from "./logging.js";

export default function (url) {
  mongoose.set("strictQuery", true);

  mongoose.connect(url).then(() => logger.info("Connected to Mongodb ..."));
}
