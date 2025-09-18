import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db";
import Product from "../models/Product";

dotenv.config();

const seed = async () => {
    try {
        await connectDB();
        await Product.deleteMany();

        const product = await Product.create({
            _id: new mongoose.Types.ObjectId("68cb2f43698b94762e9456b9"),
            name: "Sample Product",
            description: "This is a sample product",
            amount: 100,
        });

        console.log("Seeded product:", product);
        mongoose.connection.close();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seed();
