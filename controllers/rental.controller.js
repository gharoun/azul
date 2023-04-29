import { rentalModel } from "../models/rental.js";
import { movieModel } from "../models/movie.js";
import { customerModel } from "../models/customer.js";
import mongoose from "mongoose";

const getAllRentals = async (req, res) => {
  const rentals = await rentalModel.find({}).sort("-dateOut");
  res.status(200).json(rentals);
};

const createRental = async (req, res) => {
  //extract body object
  const { customerId, movieId } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  const customerExists = await customerModel
    .findById(customerId)
    .session(session);
  if (!customerExists)
    return res.status(404).json({ message: "this customer doesn't exists" });

  const movieExists = await movieModel.findById(movieId).session(session);
  if (!movieExists)
    return res.status(404).json({ message: "this movie doesn't exists" });

  if (movieExists.numberInStock === 0)
    return res.status(400).json({ message: "Movie not in stock" });
  //the movie exist no need to add new movie of same title

  const newRental = await rentalModel.create({
    customer: {
      _id: customerExists._id,
      name: customerExists.name,
      phone: customerExists.phone,
    },
    movie: {
      _id: movieExists._id,
      title: movieExists.title,
      dailyRentalRate: movieExists.dailyRentalRate,
    },
  });

  movieExists.numberInStock--;
  await movieExists.save({ session });

  await session.commitTransaction();
  res.status(200).json(newRental);
};
export { getAllRentals, createRental };
