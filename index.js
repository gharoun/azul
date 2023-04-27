import express from "express";
import connectDB from "./mongodb/connect.js";
import routes from "./startup/routes.js";
const app = express();

connectDB();
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
