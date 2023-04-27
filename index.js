import genreRouter from "./routes/genre.routes.js";
import customerRouter from "./routes/customer.routes.js";
import movieRouter from "./routes/movie.routes.js";
import rentalRouter from "./routes/rental.routes.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routers.js";
import error from "./middleware/error.js";
import connectDB from "./mongodb/connect.js";
import express from "express";
import * as dotenv from "dotenv";
import logger from "./middleware/loggingErrors.js";

dotenv.config();
const app = express();

process.on("uncaughtException", (ex) => {
  console.log("WE GOT AN UNCaught Exception");
  logger.error(new Error(ex.message));
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "Hello World!" });
});
app.use("/api/genres", genreRouter);
app.use("/api/customers", customerRouter);
app.use("/api/movies", movieRouter);
app.use("/api/rentals", rentalRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use(error);

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
