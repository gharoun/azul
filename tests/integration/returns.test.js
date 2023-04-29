import request from "supertest";
import { movieModel as Movie } from "../../models/movie";
import { genreModel } from "../../models/genre";
import { userModel } from "../../models/user";
import { rentalModel as Rental } from "../../models/rental";
import app from "../../index";
import mongoose from "mongoose";
import moment from "moment";
const url = "mongodb://127.0.0.1:27017/azul_test";

describe("/api/returns", () => {
  let server;
  let customerId;
  let movieId;
  let rental;
  let token;
  let movie;

  const exec = () => {
    return request(server)
      .post("/api/returns")
      .set("x-auth-token", token)
      .send({ movieId, customerId });
  };
  beforeEach(async () => {
    await mongoose.connect(url);
    server = app.listen(3002);
    customerId = new mongoose.Types.ObjectId();
    movieId = new mongoose.Types.ObjectId();
    token = new userModel().generateAuthToken();
    movie = new Movie({
      _id: movieId,
      title: "12345",
      dailyRentalRate: 2,
      genre: { name: "12345" },
      numberInStock: 10,
    });
    await movie.save();
    rental = new Rental({
      customer: {
        _id: customerId,
        name: "12345",
        phone: "123145",
      },
      movie: {
        _id: movieId,
        title: "123456",
        dailyRentalRate: 2,
      },
    });
    await rental.save();
  });

  afterEach(async () => {
    await Rental.deleteMany({});
    await Movie.deleteMany({});
    await mongoose.disconnect();
    await server.close();
  });
  it("should return 401 if client is not logged in", async () => {
    token = "";
    const res = await exec();
    expect(res.status).toBe(401);
  });
  it("should return 400 if customerId is not provided", async () => {
    customerId = "";
    const res = await exec();
    expect(res.status).toBe(400);
  });
  it("should return 400 if movieId is not provided", async () => {
    movieId = "";
    const res = await exec();
    expect(res.status).toBe(400);
  });
  it("should return 404 if no rental found for movieId and customerId", async () => {
    await Rental.deleteMany({});
    const res = await exec();
    expect(res.status).toBe(404);
  });
  it("should return 400 if rental is already processed", async () => {
    rental.dateReturned = new Date();
    await rental.save();
    const res = await exec();
    expect(res.status).toBe(400);
  });
  it("should return 200 if we have a valid request", async () => {
    const res = await exec();
    expect(res.status).toBe(200);
  });
  it("should return set returnDate if imput is valid", async () => {
    await exec();
    const rentalInDb = await Rental.findById(rental._id);
    const diff = new Date() - rentalInDb.dateReturned;
    expect(diff).toBeLessThan(10 * 1000);
    expect(rentalInDb.dateReturned).toBeDefined();
  });
  it("should set rentalFee if input is valid", async () => {
    rental.dateOut = moment().add(-7, "days").toDate();
    await rental.save();
    console.log(rental.dateOut);
    await exec();

    const rentalInDb = await Rental.findById(rental._id);

    expect(rentalInDb.rentalFee).toBe(14);
  });
  it("should increase the movie stock ", async () => {
    await exec();

    const movieInDb = await Movie.findById(movieId);

    expect(movieInDb.numberInStock).toBe(movie.numberInStock + 1);
  });
  it("should Return the rental in the body of the response if input is valid ", async () => {
    const res = await exec();

    // expect(res.body).toHaveProperty("dateOut");
    // expect(res.body).toHaveProperty("customer");
    // expect(res.body).toHaveProperty("movie");
    // expect(res.body).toHaveProperty("dateReturned");
    // expect(res.body).toHaveProperty("rentalFee");
    expect(Object.keys(res.body)).toEqual(
      expect.arrayContaining([
        "dateOut",
        "customer",
        "movie",
        "dateReturned",
        "rentalFee",
      ])
    );
  });
});
