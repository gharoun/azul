import { userModel } from "../models/user.js";
import _ from "lodash";
import bcrypt from "bcrypt";
const saltRounds = 10;

const getUserInfo = async (req, res) => {
  const user = await userModel.findById(req.user._id).select("-password");
  res.status(200).json(user);
};

const createUser = async (req, res) => {
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
};

export { getUserInfo, createUser };
