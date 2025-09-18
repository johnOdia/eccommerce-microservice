import express from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/product", productRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Product Service running 🚀" });
});

export default app;
