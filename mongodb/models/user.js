import mongoose from "mongoose";
import Joi from "joi";
import { joiPasswordExtendCore } from "joi-password";
const joiPassword = Joi.extend(joiPasswordExtendCore);

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
    password: joiPassword
      .string()
      .minOfSpecialCharacters(1)
      .minOfLowercase(1)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .noWhiteSpaces()
      .onlyLatinCharacters()
      .min(8)
      .required(),
  });

  return schema.validate(user);
}

export { userModel, validate };
