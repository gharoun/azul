import express from "express";
import * as dotenv from "dotenv";
import prod from "./startup/prod.js";
import { logger } from "./startup/logging.js";
import routes from "./startup/routes.js";
import DBConnect from "./startup/connectDB.js";
import cors from "cors";
dotenv.config();
const app = express();
app.use(cors());
routes(app);

// DBConnect("mongodb://127.0.0.1:27017/azul_test");
DBConnect(process.env.MONGODB_URL);
const port = process.env.PORT || 5000;
app.listen(port, () => logger.info(`Listening on port ${port}...`));
prod(app);
export default app;
