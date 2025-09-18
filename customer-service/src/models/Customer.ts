import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface ICustomer extends Document {
  _id: mongoose.Types.ObjectId; 
  name: string;
  email: string;
  password: string;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

const customerSchema = new Schema<ICustomer>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
);

customerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

customerSchema.methods.matchPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Customer = mongoose.model<ICustomer>("Customer", customerSchema);
export default Customer;
