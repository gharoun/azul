import express from "express";
import auth from "../middleware/auth.js";
import asyncMiddleware from "../middleware/async.js";
import {
  getAllRentals,
  createRental,
} from "../controllers/rental.controller.js";

const router = express.Router();
router.route("/").get(asyncMiddleware(getAllRentals));
router.route("/").post(auth, asyncMiddleware(createRental));
export default router;
