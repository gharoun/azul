import mongoose from "mongoose";
import Joi from "joi";

const CustmorSchema = new mongoose.Schema({
  isGold: { type: Boolean, default: false },
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
  phone: { type: String, required: true, minlength: 5, maxlength: 50 },
});

const customerModel = mongoose.model("Customer", CustmorSchema);

function validate(customer) {
  const schema = Joi.object({
    name: Joi.string().min(5).required(),
    phone: Joi.string().min(5).required(),
    isGold: Joi.boolean(),
  });

  return schema.validate(customer);
}

export { customerModel, validate };
