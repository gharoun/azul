import jwt from "jsonwebtoken";
import { userModel } from "../../../models/user.js";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
describe("user.generateAuthToken", () => {
  it("should generate a valid JWT token", () => {
    const payload = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      isAdmin: true,
    };
    const user = new userModel(payload);
    const token = user.generateAuthToken();
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    expect(decoded).toMatchObject(payload);
  });
});
