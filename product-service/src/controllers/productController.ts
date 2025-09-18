import { Request, Response } from "express";
import Product from "../models/Product";


// Fetch one product by ID
export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id);        
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

