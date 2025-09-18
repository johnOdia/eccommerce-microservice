import dotenv from "dotenv";
import app from "./app";
import connectDB from "./config/db";
import { initRabbitMQ } from "./services/rabbitmq";
import { startWorker } from "./worker/paymentWorker";

dotenv.config();

const PORT = process.env.PORT || 4004;

const startServer = async () => {
  try {
    // Connect MongoDB
    await connectDB();

    // Connect RabbitMQ
    await initRabbitMQ();

    // Listen to RabbitMQ and process messages
    await startWorker();

    app.listen(PORT, () => {
      console.log(`🚀 Payment Service listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
