// src/worker/paymentWorker.ts
import mongoose from "mongoose";
import { getChannel } from "../services/rabbitmq";
import { Transaction } from "../models/Transaction";

const QUEUE_NAME = "payment_transactions";
const MONGO_URL = process.env.MONGO_URL || "mongodb://mongo:27017/paymentdb";

export const startWorker = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("✅ MongoDB connected (Payment Worker)");

        const channel = getChannel();
        console.log("✅ RabbitMQ channel obtained (Payment Worker)", channel);
        
        await channel.assertQueue(QUEUE_NAME, { durable: true });

        console.log(`👷 Worker listening on queue: ${QUEUE_NAME}`);

        channel.consume(
            QUEUE_NAME,
            async (msg: any) => {
                if (msg) {
                    const data = JSON.parse(msg.content.toString());
                    console.log("📥 Worker received transaction:", data);

                    const transaction = new Transaction(data);
                    await transaction.save();
                    console.log("✅ Transaction saved to DB:", transaction);
                    channel.ack(msg);
                }
            },
            { noAck: false }
        );
    } catch (error) {
        console.error("❌ Worker failed:", error);
        process.exit(1);
    }
};
