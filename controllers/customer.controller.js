import { customerModel, validate } from "../mongodb/models/customer.js";

const getAllCustomers = async (req, res) => {
  const customers = await customerModel.find({});
  res.status(200).json(customers);
};
const createCustomer = async (req, res) => {
  const { name, isGold, phone } = req.body;
  const customerExists = await customerModel.findOne({ name });
  if (customerExists) {
    res.status(200).json(customerExists);
  } else {
    const newCustomer = await customerModel.create({
      name,
      isGold,
      phone,
    });
    res.status(200).json(newCustomer);
  }
};
const findCustomerById = async (req, res) => {
  const { id } = req.params;
  const customer = await customerModel.findOne({ _id: id });
  if (customer) {
    res.status(200).json(customer);
  } else {
    res.status(404).json({ message: "Genre not found" });
  }
};
const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const { name, isGold, phone } = req.body;
  const { error } = validate(req.body);
  console.log(error);
  if (error) return res.status(400).json({ message: error.details[0].message });

  await customerModel.findByIdAndUpdate({ _id: id }, { name, isGold, phone });
  res.status(200).json({ message: "Customer Updated successfully." });
};
const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  const customer = await customerModel.findByIdAndDelete({ _id: id });
  if (!customer)
    return res
      .status(404)
      .json({ message: "The customer with the given id doesn't exist" });
  res.status(200).json({ message: "Customer deleted successfully.", customer });
};

export {
  getAllCustomers,
  createCustomer,
  findCustomerById,
  updateCustomer,
  deleteCustomer,
};
