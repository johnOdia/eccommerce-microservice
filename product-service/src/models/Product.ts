import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  _id: mongoose.Types.ObjectId; 
  name: string;
  description?: string;
  amount: number;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String },
    amount: { type: Number, required: true}
  },
  { timestamps: true }
);

const Product = mongoose.model<IProduct>("Product", productSchema);
export default Product;
