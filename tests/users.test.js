const request = require("supertest")("http://localhost:3000");

jest.setTimeout(20000);

describe("Users API", () => {
  test("GET /users should return 200 and a JSON array", async () => {
    const response = await request.get("/users");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("POST /users should create a user", async () => {
    const response = await request.post("/users").send({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phoneNumber: "1234567890",
      password: "password123",
      role: "student",
      registrationDate: "2025-01-01",
    });

    expect(response.statusCode).toBe(201);
    expect(response.text).toBe("User created successfully");
  });
});
     
