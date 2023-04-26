import express from "express";
import { createUser, getAllUsers } from "../controllers/user.controller.js";

const router = express.Router();
router.route("/").get(getAllUsers);
router.route("/").post(createUser);
export default router;
