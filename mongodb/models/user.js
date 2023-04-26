import mongoose from "mongoose";
import Joi from "joi";
import { validatePassword } from "../../utils/joi-validation.js";

const userModel = mongoose.model(
  "User",
  new mongoose.Schema({
    name: { type: String, required: true, minlength: 2, maxlength: 50 },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
    },
  })
);

function validate(user) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: validatePassword,
  });

  return schema.validate(user);
}

export { userModel, validate };
