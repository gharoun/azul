import express from "express";
import auth from "../middleware/auth.js";
import asyncMiddleware from "../middleware/async.js";
import { createUser, getUserInfo } from "../controllers/user.controller.js";
import validate from "../middleware/validate.js";
import { validateUser } from "../models/user.js";

const router = express.Router();
router.route("/me").get(auth, asyncMiddleware(getUserInfo));
router.route("/").post(validate(validateUser), asyncMiddleware(createUser));
export default router;
