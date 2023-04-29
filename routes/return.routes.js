import express from "express";
import { createReturn } from "../controllers/return.controller.js";
import auth from "../middleware/auth.js";
import asyncMiddleware from "../middleware/async.js";
import validate from "../middleware/validate.js";
import { validateRental } from "../models/rental.js";
const router = express.Router();

router
  .route("/")
  .post([auth, validate(validateRental)], asyncMiddleware(createReturn));

export default router;
