const request = require("supertest")("http://localhost:3000");

jest.setTimeout(20000);

describe("Orders API", () => {
  test("GET /orders should return 200 and a JSON array", async () => {
    const response = await request.get("/orders");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("POST /orders should create an order", async () => {
    const response = await request.post("/orders").send({
      userId: "12345",
      products: [
        {
          productId: "67890",
          quantity: 2,
        },
      ],
      totalAmount: 500,
      status: "Pending",
      orderDate: "2025-01-01",
    });

    expect(response.statusCode).toBe(201);
    expect(response.text).toBe("order created successfully");
  });
});
