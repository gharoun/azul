import express from "express";
import * as dotenv from "dotenv";

import { logger } from "./startup/logging.js";
import routes from "./startup/routes.js";
import DBConnect from "./startup/connectDB.js";
const app = express();
dotenv.config();
routes(app);
// DBConnect("mongodb://127.0.0.1:27017/azul_test");
// DBConnect(process.env.MONGODB_URL);
const port = process.env.PORT || 3000;
// app.listen(port, () => logger.info(`Listening on port ${port}...`));

export default app;
