import express from "express";
import dotenv from "dotenv";
import orderRoutes from "./routes/orderRoutes";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/order", orderRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Order Service running 🚀" });
});

export default app;
