import mongoose from "mongoose";
import Joi from "joi";
import joiObjectId from "joi-objectid";
const joi_oid = joiObjectId(Joi);
import { GenreSchema } from "./genre.js";
const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
    trim: true,
  },
  genre: { type: GenreSchema, required: true },
  numberInStock: { type: Number, required: true, min: 0, max: 255 },
  dailyRentalRate: { type: Number, required: true, min: 0, max: 255 },
});

const movieModel = mongoose.model("Movie", MovieSchema);

function validate(movie) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
    genreId: Joi.joi_oid().required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required(),
  });

  return schema.validate(movie);
}

export { movieModel, validate };
