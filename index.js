import express from "express";
import { logger } from "./startup/logging.js";
import routes from "./startup/routes.js";
import DBConnect from "./startup/connectDB.js";
const app = express();
routes(app);
DBConnect();
const port = process.env.PORT || 3000;
app.listen(port, () => logger.info(`Listening on port ${port}...`));
