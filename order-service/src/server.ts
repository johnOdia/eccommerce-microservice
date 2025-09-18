import dotenv from "dotenv";
import app from "./app";
import connectDB from "./config/db";

dotenv.config();
const PORT = process.env.PORT || 4003;

connectDB();

app.listen(PORT, () => {
  console.log(`Order Service listening on port ${PORT}`);
});
