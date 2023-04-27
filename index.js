import express from "express";
import routes from "./startup/routes.js";
import DBConnect from "./startup/connectDB.js";
const app = express();
DBConnect();
routes(app);
const port = process.env.PORT || 3000;
const startServer = async () => {
  try {
    app.listen(port, () => console.log(`Listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};
startServer();
