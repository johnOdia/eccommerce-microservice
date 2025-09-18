import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Customer from "../models/Customer";
import axios from "axios";

const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: "30d" });
};

// Register
export const registerCustomer = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        const customerExists = await Customer.findOne({ email });
        if (customerExists) {
            return res.status(400).json({ message: "Customer already exists" });
        }

        const customer = await Customer.create({ name, email, password });

        res.status(201).json({
            _id: customer._id,
            name: customer.name,
            email: customer.email,
            token: generateToken(customer._id.toString()),
        });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

// Login
export const loginCustomer = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const customer = await Customer.findOne({ email });
        console.log('customer:::', customer);

        if (customer && (await customer.matchPassword(password))) {
            res.json({
                _id: customer._id,
                name: customer.name,
                email: customer.email,
                token: generateToken(customer._id.toString()),
            });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

// process order
export const processOrder = async (req: Request, res: Response) => {
    try {
        const { customer_id, productId } = req.body;
        console.log('customer_id:::', customer_id, 'productId:::', productId,);

        // Call product service to validate productId and get product details
        const product = await axios.get(`http://product-service:4002/api/product/${productId}`)
        .catch((err: any) => {
            console.error('Error fetching product:', err.message);
            return res.status(404).json({ message: "Unable to fetch product" });
        }) as any

        // Call order service to create an order
        const order = await axios.post(`http://order-service:4003/api/order`, {
            customerId: customer_id,
            productId,
            amount: product.data?.amount,
        }) as any;

        console.log('order:::', order.data);

        return res.status(201).json({
            message: "Order request received",
            data: {
                customerId: customer_id,
                orderId: order.data._id,
                productId: order.data.productId,
                orderStatus: order.data.status,
                amount: order.data.amount,
            },
        });
    } catch (err: any) {
        console.error(err.message);
        
        res.status(500).json({ message: err.message });
    }
};
