const request = require("supertest")("http://localhost:3000");

jest.setTimeout(20000);

describe("Categories API", () => {
  test("GET /categories should return 200 and a JSON array", async () => {
    const response = await request.get("/categories");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("POST /categories should create a category", async () => {
    const response = await request.post("/categories").send({
      name: "Programming",
      description: "Programming related courses",
    });

    expect(response.statusCode).toBe(201);
    expect(response.text).toBe("category created successfully");
  });
});
