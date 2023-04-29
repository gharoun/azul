import express from "express";
import auth from "../middleware/auth.js";
import asyncMiddleware from "../middleware/async.js";
import { validateUser } from "../models/user.js";
import validate from "../middleware/validate.js";
import {
  getAllCustomers,
  createCustomer,
  findCustomerById,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customer.controller.js";

const router = express.Router();
router.route("/").get(asyncMiddleware(getAllCustomers));
router
  .route("/")
  .post([auth, validate(validateUser)], asyncMiddleware(createCustomer));
router.route("/:id").get(asyncMiddleware(findCustomerById));
router
  .route("/:id")
  .put([auth, validate(validateUser)], asyncMiddleware(updateCustomer));
router.route("/:id").delete(auth, asyncMiddleware(deleteCustomer));

export default router;
