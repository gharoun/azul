import supertest from "supertest";
import { genreModel } from "../../models/genre";
import { userModel } from "../../models/user";
import app from "../../index";
import mongoose from "mongoose";
let server;
const url = "mongodb://127.0.0.1:27017/azul_test";
describe("/api/genres", () => {
  beforeEach(async () => {
    await mongoose.connect(url);
    server = app.listen(3000);
  });

  afterEach(async () => {
    await genreModel.deleteMany({});
    await mongoose.disconnect();
    await server.close();
  });

  describe("GET /", () => {
    it("should return all genres", async () => {
      await genreModel.collection.insertMany([
        { name: "genre1" },
        { name: "genre2" },
        { name: "genre3" },
      ]);
      const request = supertest(server);
      const res = await request.get("/api/genres");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(3);
      expect(res.body.some((g) => g.name === "genre1")).toBe(true);
    });
  });
  describe("GeT /:id", () => {
    it("should return all genre with given Id", async () => {
      const genre = new genreModel({
        name: "genre1",
      });
      await genre.save();
      const request = supertest(server);
      const res = await request.get("/api/genres/" + genre._id);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", genre.name);
    });
    it("should return 404 if invalid id is passed", async () => {
      const request = supertest(server);
      const res = await request.get("/api/genres/1");
      expect(res.status).toBe(404);
    });
    it("should return 404 if no genre with given id exist", async () => {
      const id = new mongoose.Types.ObjectId();
      const request = supertest(server);
      const res = await request.get("/api/genres/" + id);
      expect(res.status).toBe(404);
    });
  });
  describe("POST /", () => {
    let name;
    let token;
    let request;
    const exec = async () => {
      request = supertest(server);
      return await request
        .post("/api/genres")
        .set("x-auth-token", token)
        .send({ name });
    };

    beforeEach(() => {
      token = new userModel().generateAuthToken();
      name = "genre1";
    });

    it("should return 401 if client is not logged in", async () => {
      token = "";

      const res = await exec();
      expect(res.status).toBe(401);
    });
    it("should return 400 if genre is less than 4 characters", async () => {
      name = "123";
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("should return 400 if genre is more than 50 characters", async () => {
      name = new Array(52).join("c");

      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("should save genre if it is valid", async () => {
      await exec();
      const genre = genreModel.findOne({ name: "genre1" });
      expect(genre).not.toBeNull();
    });
    it("should return genre if it is valid", async () => {
      const res = await exec();
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", "genre1");
    });
  });
});
