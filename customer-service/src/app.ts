import express from "express";
import dotenv from "dotenv";
import customerRoutes from "./routes/customerRoutes";
import { setupSwagger } from "./swagger";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/customers", customerRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Customer Service running 🚀" });
});

// Swagger docs
setupSwagger(app);

export default app;
