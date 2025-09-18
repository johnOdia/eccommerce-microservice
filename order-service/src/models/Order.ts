import mongoose, { Document, Schema } from "mongoose";

export type OrderStatus = 'pending' | 'failed' | 'successful';

export interface IOrder extends Document {
  _id: mongoose.Types.ObjectId;
  status: OrderStatus;
  customerId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  amount: number;
}

const orderSchema = new Schema<IOrder>(
  {
    status: { type: String, required: true },
    customerId: { type: Schema.Types.ObjectId, required: true},
    productId: { type: Schema.Types.ObjectId, required: true },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.model<IOrder>("Order", orderSchema);
export default Order;
