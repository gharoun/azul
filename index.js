import genreRouter from "./routes/genre.routes.js";
import customerRouter from "./routes/customer.routes.js";
import connectDB from "./mongodb/connect.js";
import express from "express";
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "Hello World!" });
});
app.use("/api/genres", genreRouter);
app.use("/api/customers", customerRouter);
const startServer = async () => {
  try {
    connectDB("mongodb://127.0.0.1:27017/azul");

    app.listen(port, () => console.log(`Listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};
startServer();
