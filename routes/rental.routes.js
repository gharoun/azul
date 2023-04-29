import express from "express";
import auth from "../middleware/auth.js";
import asyncMiddleware from "../middleware/async.js";
import validate from "../middleware/validate.js";
import { validateRental } from "../models/rental.js";
import {
  getAllRentals,
  createRental,
} from "../controllers/rental.controller.js";

const router = express.Router();
router.route("/").get(asyncMiddleware(getAllRentals));
router
  .route("/")
  .post([auth, validate(validateRental)], asyncMiddleware(createRental));
export default router;
