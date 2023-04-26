import { userModel, validate } from "../mongodb/models/user.js";
import _ from "lodash";
import bcrypt from "bcrypt";
const saltRounds = 10;

const getUserInfo = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const { name, email, password } = req.body;

    const userExists = await userModel.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already registered" });

    const newUser = await userModel.create({
      name,
      email,
      password: await bcrypt.hash(password, saltRounds),
    });

    res
      .header("x-auth-token", newUser.generateAuthToken())
      .status(200)
      .json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { getUserInfo, createUser };
