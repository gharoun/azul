import { userModel } from "../../../models/user";
import auth from "../../../middleware/auth";
import mongoose from "mongoose";

describe("auth middleware", () => {
  it("should populate req.user with payload of a valide JWT", () => {
    const user = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      isAdmin: true,
    };
    const token = new userModel(user).generateAuthToken();
    const req = {
      header: jest.fn().mockReturnValue(token),
    };
    const next = jest.fn();
    const res = {};
    auth(req, res, next);
    console.log(req.user);
    // expect(req.user).toBeDefined();
    expect(req.user).toMatchObject(user);
  });
});
