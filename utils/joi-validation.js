import Joi from "joi";
import { joiPasswordExtendCore } from "joi-password";
const joiPassword = Joi.extend(joiPasswordExtendCore);

const validatePassword = joiPassword
  .string()
  .minOfSpecialCharacters(1)
  .minOfLowercase(1)
  .minOfUppercase(1)
  .minOfNumeric(1)
  .noWhiteSpaces()
  .onlyLatinCharacters()
  .min(8)
  .required();

export { validatePassword };
