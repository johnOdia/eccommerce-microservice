import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db";
import Customer from "../models/Customer";

dotenv.config();

const seed = async () => {
    try {
        await connectDB();
        await Customer.deleteMany();

        const customer = await Customer.create({
            name: "John Doe",
            email: "john@example.com",
            password: "password123"
        });

        console.log("Seeded customer:", customer);
        mongoose.connection.close();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seed();
