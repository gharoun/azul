import express from "express";

import {
  getAllGenres,
  findGenreById,
  updateGenre,
  deleteGenre,
  createGenre,
} from "../controllers/genre.controller.js";

const router = express.Router();
router.route("/").get(getAllGenres);
router.route("/:id").get(findGenreById);
router.route("/").post(createGenre);
router.route("/:id").put(updateGenre);
router.route("/:id").delete(deleteGenre);

export default router;
