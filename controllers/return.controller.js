import { rentalModel } from "../models/rental";
import { movieModel } from "../models/movie";

const createReturn = async (req, res) => {
  const { customerId, movieId } = req.body;
  const rental = await rentalModel.lookup(customerId, movieId);
  if (!rental) return res.status(404).json({ message: "Rental not found" });

  if (rental.dateReturned)
    return res.status(400).json({ message: "Return already processed" });

  rental.return();
  rental.save();
  await movieModel.updateOne(
    { _id: rental.movie._id },
    { $inc: { numberInStock: 1 } }
  );
  res.json(rental);
};

export { createReturn };
