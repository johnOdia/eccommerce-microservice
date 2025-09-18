import dotenv from "dotenv";
import app from "./app";
import connectDB from "./config/db";

dotenv.config();
const PORT = process.env.PORT || 4001;

connectDB();

app.listen(PORT, () => {
  console.log(`Customer Service listening on port ${PORT}`);
});
