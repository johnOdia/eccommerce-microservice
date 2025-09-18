import { Request, Response } from "express";
import Order from "../models/Order";
import axios from "axios";

// Create a new order
export const createOrder = async (req: Request, res: Response) => {
    try {
        const { customerId, productId, amount } = req.body;
        const newOrder = await Order.create({
            status: "pending",
            customerId,
            productId,
            amount,
        });
        console.log("Order created:", newOrder);

        // Call payment service to process order
        await axios.post("http:/payment-service:4004/api/payment", {
            customerId,
            orderId: newOrder._id,
            amount,
            productId
        });
        
        res.status(201).json(newOrder);
    } catch (error: any) {
        console.error("Error creating order:", error.message);
        
        res.status(500).json({ message: "Server error", error });
    }
};
