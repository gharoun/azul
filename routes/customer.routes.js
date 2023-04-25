import express from "express";
import {
  getAllCustomers,
  createCustomer,
  findCustomerById,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customer.controller.js";

const router = express.Router();
router.route("/").get(getAllCustomers);
router.route("/").post(createCustomer);
router.route("/:id").get(findCustomerById);
router.route("/:id").put(updateCustomer);
router.route("/:id").delete(deleteCustomer);

export default router;
