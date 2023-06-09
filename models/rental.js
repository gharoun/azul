import mongoose from "mongoose";
import Joi from "joi";
import joiObjectId from "joi-objectid";
const joi_oid = joiObjectId(Joi);
import moment from "moment";

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

RentalSchema.methods.return = function () {
  this.dateReturned = new Date();

  this.rentalFee =
    moment().diff(this.dateOut, "days") * this.movie.dailyRentalRate;
};

RentalSchema.statics.lookup = function (customerId, movieId) {
  return this.findOne({
    "customer._id": customerId,
    "movie._id": movieId,
  });
};
const rentalModel = mongoose.model("Rental", RentalSchema);

function validateRental(rental) {
  const schema = Joi.object({
    customerId: joi_oid().required(),
    movieId: joi_oid().required(),
  });

  return schema.validate(rental);
}

export { rentalModel, validateRental };
