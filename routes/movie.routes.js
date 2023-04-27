import express from "express";
import auth from "../middleware/auth.js";
import asyncMiddleware from "../middleware/async.js";
import {
  updateMovie,
  deleteMovie,
  findMovieById,
  getAllMovies,
  createMovie,
} from "../controllers/movie.controller.js";

const router = express.Router();

router.route("/").get(asyncMiddleware(getAllMovies));
router.route("/:id").get(asyncMiddleware(findMovieById));
router.route("/").post(auth, asyncMiddleware(createMovie));
router.route("/:id").put(auth, asyncMiddleware(updateMovie));
router.route("/:id").delete(auth, asyncMiddleware(deleteMovie));

export default router;
