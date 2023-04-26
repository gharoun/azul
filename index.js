import genreRouter from "./routes/genre.routes.js";
import customerRouter from "./routes/customer.routes.js";
import movieRouter from "./routes/movie.routes.js";
import rentalRouter from "./routes/rental.routes.js";
import userRouter from "./routes/user.routes.js";
import connectDB from "./mongodb/connect.js";
import express from "express";
import * as dotenv from "dotenv";

dotenv.config();
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "Hello World!" });
});
app.use("/api/genres", genreRouter);
app.use("/api/customers", customerRouter);
app.use("/api/movies", movieRouter);
app.use("/api/rentals", rentalRouter);
app.use("/api/users", userRouter);
const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);

    app.listen(port, () => console.log(`Listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};
startServer();
