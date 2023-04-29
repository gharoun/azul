import mongoose from "mongoose";
import Joi from "joi";

const GenreSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 4, maxlength: 50 },
});

const genreModel = mongoose.model("Genre", GenreSchema);

function validate(genre) {
  const schema = Joi.object({
    name: Joi.string().min(4).max(50).required(),
  });

  return schema.validate(genre);
}

export { genreModel, validate, GenreSchema };
