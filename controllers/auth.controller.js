import bcrypt from "bcrypt";
import { userModel } from "../mongodb/models/user.js";
import Joi from "joi";
import { validatePassword } from "../utils/joi-validation.js";

const loginUser = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user)
    return res.status(400).json({ message: "Invalid email or password." });

  bcrypt.compare(password, user.password, function (err, result) {
    if (result) {
      const token = user.generateAuthToken();
      res.status(200).json(token);
    } else {
      return res.status(400).json({ message: "Invalid email or password." });
    }
  });
};

function validate(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: validatePassword,
  });

  return schema.validate(user);
}

export { loginUser };
