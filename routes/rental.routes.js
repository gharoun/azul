import express from "express";
import auth from "../middleware/auth.js";
import {
  getAllRentals,
  createRental,
} from "../controllers/rental.controller.js";

const router = express.Router();
router.route("/").get(getAllRentals);
router.route("/").post(auth, createRental);
export default router;
