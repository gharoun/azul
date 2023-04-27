import express from "express";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
import asyncMiddleware from "../middleware/async.js";
import {
  getAllGenres,
  findGenreById,
  updateGenre,
  deleteGenre,
  createGenre,
} from "../controllers/genre.controller.js";

const router = express.Router();
router.route("/").get(asyncMiddleware(getAllGenres));
router.route("/:id").get(asyncMiddleware(findGenreById));
router.route("/").post(auth, asyncMiddleware(createGenre));
router.route("/:id").put(auth, asyncMiddleware(updateGenre));
router.route("/:id").delete([auth, admin], asyncMiddleware(deleteGenre));

export default router;
