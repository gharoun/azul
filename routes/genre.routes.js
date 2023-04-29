import express from "express";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
import asyncMiddleware from "../middleware/async.js";
import validateObjectId from "../middleware/validateObjectId.js";
import validate from "../middleware/validate.js";
import { validateGenre } from "../models/genre.js";
import {
  getAllGenres,
  findGenreById,
  updateGenre,
  deleteGenre,
  createGenre,
} from "../controllers/genre.controller.js";

const router = express.Router();
router.route("/").get(asyncMiddleware(getAllGenres));
router.route("/:id").get(validateObjectId, asyncMiddleware(findGenreById));
router
  .route("/")
  .post([auth, validate(validateGenre)], asyncMiddleware(createGenre));
router
  .route("/:id")
  .put([auth, validate(validateGenre)], asyncMiddleware(updateGenre));
router.route("/:id").delete([auth, admin], asyncMiddleware(deleteGenre));

export default router;
