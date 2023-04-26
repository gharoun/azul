import express from "express";
import auth from "../middleware/auth.js";
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
router.route("/").post(auth, createMovie);
router.route("/:id").put(auth, updateMovie);
router.route("/:id").delete(auth, deleteMovie);

export default router;
