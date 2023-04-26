import express from "express";
import auth from "../middleware/auth.js";
import { createUser, getUserInfo } from "../controllers/user.controller.js";

const router = express.Router();
router.route("/me").get(auth, getUserInfo);
router.route("/").post(createUser);
export default router;
