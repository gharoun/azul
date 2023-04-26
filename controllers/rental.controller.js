import { rentalModel, validate } from "../mongodb/models/rental.js";
import { movieModel } from "../mongodb/models/movie.js";
import { customerModel } from "../mongodb/models/customer.js";
import mongoose from "mongoose";

const getAllRentals = async (req, res) => {
  try {
    const rentals = await rentalModel.find({}).sort("-dateOut");
    res.status(200).json(rentals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createRental = async (req, res) => {
  try {
    //validate client request
    const { error } = validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

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
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export { getAllRentals, createRental };