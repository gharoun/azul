import mongoose from "mongoose";
import Joi from "joi";

const RentalSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50,
      },
      isGold: { type: Boolean, default: false },
      phone: { type: String, required: true, minlength: 1, maxlength: 50 },
    }),
    required: true,
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255,
        trim: true,
      },
      dailyRentalRate: { type: Number, required: true, min: 0, max: 255 },
    }),
    required: true,
  },
  dateOut: { type: Date, required: true, default: Date.now },
  dateReturned: { type: Date },
  rentalFee: { type: Number, min: 0 },
});

const rentalModel = mongoose.model("Rental", RentalSchema);

function validate(rental) {
  const schema = Joi.object({
    customerId: Joi.string().required(),
    movieId: Joi.string().required(),
  });

  return schema.validate(rental);
}

export { rentalModel, validate };
