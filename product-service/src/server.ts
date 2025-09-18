import dotenv from "dotenv";
import app from "./app";
import connectDB from "./config/db";

dotenv.config();
const PORT = process.env.PORT || 4002;

connectDB();

app.listen(PORT, () => {
  console.log(`Product Service listening on port ${PORT}`);
});
