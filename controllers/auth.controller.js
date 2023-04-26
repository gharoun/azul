import { userModel } from "../mongodb/models/user.js";
import bcrypt from "bcrypt";

import Joi from "joi";
import { validatePassword } from "../utils/joi-validation.js";

const loginUser = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const { email, password } = req.body;

    const userExists = await userModel.findOne({ email });
    if (!userExists)
      return res.status(400).json({ message: "Invalid email or password." });
    bcrypt.compare(password, userExists.password, function (err, result) {
      if (result) {
        res.status(200).json(true);
      } else {
        return res.status(400).json({ message: "Invalid email or password." });
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

function validate(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: validatePassword,
  });

  return schema.validate(user);
}

export { loginUser };
