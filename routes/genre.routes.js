import express from "express";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
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
router.route("/").post(auth, createGenre);
router.route("/:id").put(auth, updateGenre);
router.route("/:id").delete([auth, admin], deleteGenre);

export default router;
