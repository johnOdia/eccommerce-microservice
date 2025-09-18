import { Request, Response } from "express";
import { getChannel } from "../services/rabbitmq";

const QUEUE_NAME = "payment_transactions";

// Simulated payment processing function
export const makePayment = async (req: Request, res: Response) => {
    const { customerId, orderId, productId, amount } = req.body;

    try {
        const channel = getChannel();
        await channel.assertQueue(QUEUE_NAME, { durable: true });

        const message = JSON.stringify({ customerId, orderId, productId, amount, createdAt: new Date() });
        console.log("💳 Processing payment:", message);
        
        channel.sendToQueue(QUEUE_NAME, Buffer.from(message), { persistent: true });

        console.log("✅ Published transaction:", message);

        res.status(200).json({ message: "Payment processed successfully" });
    } catch (error) {
        console.error("❌ Error publishing transaction:", error);
        res.status(500).json({ message: "Payment processing failed", error });
    }
};

