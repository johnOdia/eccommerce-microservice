import amqp from "amqplib";
import type { Connection, Channel } from "amqplib";

let connection: Connection | any;
let channel: Channel;

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://rabbitmq:5672";
const RETRY_DELAY = 5000; // 5 seconds

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const initRabbitMQ = async (): Promise<Channel> => {
    while (true) {
        try {
            connection = await amqp.connect(RABBITMQ_URL);
            channel = await connection.createChannel();
            console.log("✅ RabbitMQ connected");
            return channel;
        } catch (error) {
            console.error("❌ Failed to connect to RabbitMQ. Retrying in 5 seconds...", error);
            await sleep(RETRY_DELAY);
        }
    }
};

export const getChannel = (): Channel => {
    if (!channel) {
        throw new Error("RabbitMQ channel not initialized.");
    }
    return channel;
};

export const closeRabbitMQ = async () => {
    await channel?.close();
    await connection?.close();
};
