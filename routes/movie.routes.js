import express from "express";
import auth from "../middleware/auth.js";
import asyncMiddleware from "../middleware/async.js";
import validate from "../middleware/validate.js";
import { validateMovie } from "../models/movie.js";
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
router
  .route("/")
  .post([auth, validate(validateMovie)], asyncMiddleware(createMovie));
router
  .route("/:id")
  .put([auth, validate(validateMovie)], asyncMiddleware(updateMovie));
router.route("/:id").delete(auth, asyncMiddleware(deleteMovie));

export default router;
