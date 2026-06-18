const request = require("supertest")("http://localhost:3000");

jest.setTimeout(20000);

describe("Products API", () => {
  test("GET /products should return 200 and a JSON array", async () => {
    const response = await request.get("/products");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("POST /products should create a product", async () => {
    const response = await request.post("/products").send({
      name: "Laptop",
      description: "High-performance laptop",
      categoryId: "12345",
      price: 1500,
      stockQuantity: 10,
      brand: "Dell",
      createDate: "2025-01-01",
    });

    expect(response.statusCode).toBe(201);
    expect(response.text).toBe("product created successfully");
  });
});
