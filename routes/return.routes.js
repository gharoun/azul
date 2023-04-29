import express from "express";
import { createReturn } from "../controllers/return.controller";
import auth from "../middleware/auth.js";
import asyncMiddleware from "../middleware/async.js";
import validate from "../middleware/validate";
import { validateRental } from "../models/rental";
const router = express.Router();

router
  .route("/")
  .post([auth, validate(validateRental)], asyncMiddleware(createReturn));

export default router;
