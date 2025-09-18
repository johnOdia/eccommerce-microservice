import request from "supertest";
import app from "../src/app";
import jwt from "jsonwebtoken";

describe("POST /api/customers/products/order", () => {
    let token: string;

    beforeAll(() => {
        token = jwt.sign(
            { id: "test-customer-id", email: "john@example.com" },
            process.env.JWT_SECRET as string,
            { expiresIn: "1h" }
        );
    });

    it("should fail without a token", async () => {
        const res = await request(app)
            .post("/api/customers/products/order")
            .send({ productId: "68cb2f43698b94762e9456b9" });

        expect(res.status).toBe(401);
        expect(res.body.message).toMatch(/unauthorized/i);
    });

    it("should place an order with valid token and productId", async () => {
        const res = await request(app)
            .post("/api/customers/products/order")
            .set("Authorization", `Bearer ${token}`)
            .send({ productId: "68cb2f43698b94762e9456b9" });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("message", "Order request received");
        expect(res.body.data).toHaveProperty("productId", "68cb2f43698b94762e9456b9");
    });
});
