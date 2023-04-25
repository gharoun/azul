import express from "express";
import {
  updateMovie,
  deleteMovie,
  findMovieById,
  getAllMovies,
  createMovie,
} from "../controllers/movie.controller.js";

const router = express.Router();

router.route("/").get(getAllMovies);
router.route("/:id").get(findMovieById);
router.route("/").post(createMovie);
router.route("/:id").put(updateMovie);
router.route("/:id").delete(deleteMovie);

export default router;
