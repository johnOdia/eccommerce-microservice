import { Router } from "express";
import { registerCustomer, loginCustomer, processOrder } from "../controllers/customerController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

/**
 * @swagger
 * /api/customers/register:
 *   post:
 *     summary: Register a new customer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *           example:
 *             name: John Doe
 *             email: john@example.com
 *             password: password123
 *     responses:
 *       201:
 *         description: Customer registered successfully
 */
router.post("/register", registerCustomer);

/**
 * @swagger
 * /api/customers/login:
 *   post:
 *     summary: Login a customer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *           example:
 *             email: john@example.com
 *             password: password123
 *     responses:
 *       200:
 *         description: Login successful, returns auth token
 */
router.post("/login", loginCustomer);

/**
 * @swagger
 * /api/customers/products/order:
 *   post:
 *     summary: Place an order for a product
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 68cb2f43698b94762e9456b9
 *           example:
 *             productId: 68cb2f43698b94762e9456b9
 *     responses:
 *       200:
 *         description: Order request received
 *       401:
 *         description: Unauthorized - Missing or invalid token
 */
router.post("/products/order", authMiddleware, processOrder);


export default router;
