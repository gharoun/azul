import { rentalModel } from "../models/rental";
import { movieModel } from "../models/movie";
import moment from "moment";
import Joi from "joi";
import joiObjectId from "joi-objectid";
const joi_oid = joiObjectId(Joi);

const createReturn = async (req, res) => {
  const { customerId, movieId } = req.body;
  const rental = await rentalModel.findOne({
    "customer._id": customerId,
    "movie._id": movieId,
  });
  if (!rental) return res.status(404).json({ message: "Rental not found" });

  if (rental.dateReturned)
    return res.status(400).json({ message: "Return already processed" });
  rental.dateReturned = new Date();
  rental.rentalFee =
    moment().diff(rental.dateOut, "days") * rental.movie.dailyRentalRate;
  rental.save();
  await movieModel.updateOne(
    { _id: rental.movie._id },
    { $inc: { numberInStock: 1 } }
  );
  res.status(200).json(rental);
};

function validate(rental) {
  const schema = Joi.object({
    customerId: joi_oid().required(),
    movieId: joi_oid().required(),
  });

  return schema.validate(rental);
}
export { createReturn };
