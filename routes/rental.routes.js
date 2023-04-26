import express from "express";
import {
  getAllRentals,
  createRental,
} from "../controllers/rental.controller.js";

const router = express.Router();
router.route("/").get(getAllRentals);
router.route("/").post(createRental);
export default router;
