import supertest from "supertest";
import { genreModel } from "../../models/genre";
import { userModel } from "../../models/user";
import app from "../../index";
import mongoose from "mongoose";
let server;
const url = "mongodb://127.0.0.1:27017/azul_test";
describe("Auth middleware", () => {
  beforeEach(async () => {
    await mongoose.connect(url);
    server = app.listen(3001);
  });

  afterEach(async () => {
    await genreModel.deleteMany({});
    await mongoose.disconnect();
    await server.close();
  });
  let token;
  const exec = () => {
    const request = supertest(server);
    return request
      .post("/api/genres")
      .set("x-auth-token", token)
      .send({ name: "genre1" });
  };
  beforeEach(() => {
    token = new userModel().generateAuthToken();
  });
  it("should return 401 if no token is provided", async () => {
    token = "";
    const res = await exec();
    expect(res.status).toBe(401);
  });
  it("should return 400 if token is invalide", async () => {
    token = "a";
    const res = await exec();
    expect(res.status).toBe(400);
  });
  it("should return 200 if token is valide", async () => {
    const res = await exec();
    expect(res.status).toBe(200);
  });
});
