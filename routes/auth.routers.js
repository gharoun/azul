import express from "express";
import { loginUser } from "../controllers/auth.controller.js";
import asyncMiddleware from "../middleware/async.js";

const router = express.Router();

router.route("/").post(asyncMiddleware(loginUser));

export default router;
