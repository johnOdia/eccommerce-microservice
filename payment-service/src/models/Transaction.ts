import mongoose, { Document, Schema } from "mongoose";

export interface ITransaction extends Document {
    customerId: string;
    orderId: string;
    productId: string;
    amount: number;
}

const TransactionSchema = new Schema<ITransaction>(
    {
        customerId: { type: String, required: true },
        orderId: { type: String, required: true },
        productId: { type: String, required: true },
        amount: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);

export const Transaction = mongoose.model<ITransaction>(
    "Transaction",
    TransactionSchema
);
