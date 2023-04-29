import genreRouter from "../routes/genre.routes.js";
import customerRouter from "../routes/customer.routes.js";
import movieRouter from "../routes/movie.routes.js";
import rentalRouter from "../routes/rental.routes.js";
import userRouter from "../routes/user.routes.js";
import authRouter from "../routes/auth.routers.js";
import returnRouter from "../routes/return.routes.js";
import error from "../middleware/error.js";
import express from "express";

export default function (app) {
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
  app.use("/api/returns", returnRouter);
  app.use(error);
}
