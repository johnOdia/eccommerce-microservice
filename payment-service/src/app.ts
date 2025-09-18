import express from "express";
import dotenv from "dotenv";
import paymentRoutes from "./routes/paymentRoutes";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/payment", paymentRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Payment Service running 🚀" });
});

export default app;
