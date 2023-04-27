import express from "express";
import auth from "../middleware/auth.js";
import asyncMiddleware from "../middleware/async.js";
import {
  getAllCustomers,
  createCustomer,
  findCustomerById,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customer.controller.js";

const router = express.Router();
router.route("/").get(asyncMiddleware(getAllCustomers));
router.route("/").post(auth, asyncMiddleware(createCustomer));
router.route("/:id").get(asyncMiddleware(findCustomerById));
router.route("/:id").put(auth, asyncMiddleware(updateCustomer));
router.route("/:id").delete(auth, asyncMiddleware(deleteCustomer));

export default router;
