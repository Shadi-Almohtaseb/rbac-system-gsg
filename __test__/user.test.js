import "../dist/config";
import dataSource from "../dist/src/db/dataSource.js";
import express from "express";
import request from "supertest";
import usersRouter from "../dist/src/routes/user.js";

const app = express();
app.use(express.json());
app.use("/user", usersRouter);

beforeAll(async () => {
  try {
    await dataSource.initialize();
    console.log("Connected to DB!");
  } catch (err) {
    console.log("Failed to connect to DB:", err);
  }
}, 10000);

afterAll(async () => {
  await dataSource.destroy();
});

describe("POST /user", () => {
  it("should create a user with valid input", async () => {
    const user = {
      email: "test@example.com",
      password: "password123",
      userName: "testuser",
      displayName: "Test User",
      role: "user",
    };

    const response = await request(app).post("/user").send(user);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User created successfully");
  });

  it("should return 400 if any field is missing", async () => {
    const user = {
      email: "test@example.com",
      password: "password123",
      displayName: "Test User",
      role: "user",
    };

    const response = await request(app).post("/user").send(user);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("All fields are required.");
  });

  it("should return 400 for an invalid role", async () => {
    const user = {
      email: "test@example.com",
      password: "password123",
      userName: "testuser",
      displayName: "Test User",
      role: "invalidRole",
    };

    const response = await request(app).post("/user").send(user);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Invalid role");
  });
});
