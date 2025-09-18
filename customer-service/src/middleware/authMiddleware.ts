import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export interface AuthRequest extends Request {
    customer_id?: string;
}

export const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Missing or invalid token" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

        // attach customer_id to request body
        req.body.customer_id = decoded.id;
        req.customer_id = decoded.id;

        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized", error });
    }
};
