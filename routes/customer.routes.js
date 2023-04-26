import express from "express";
import auth from "../middleware/auth.js";
import {
  getAllCustomers,
  createCustomer,
  findCustomerById,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customer.controller.js";

const router = express.Router();
router.route("/").get(getAllCustomers);
router.route("/").post(auth, createCustomer);
router.route("/:id").get(findCustomerById);
router.route("/:id").put(auth, updateCustomer);
router.route("/:id").delete(auth, deleteCustomer);

export default router;
