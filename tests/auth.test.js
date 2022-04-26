const request = require("supertest");
const app = require("../backend/app");

test("Should register a new user", async () => {
  await request(app)
    .post("/auth/register")
    .send({
      name: "NewTest6",
      email: "newTest6@example.com",
      password: "test123",
    })
    .expect(201);
});

test("Should not register a new user with taken email", async () => {
  await request(app)
    .post("/auth/register")
    .send({
      name: "NewTest6",
      email: "newTest6@example.com",
      password: "test123",
    })
    .expect(400);
});

test("Should login an existing user", async () => {
  await request(app)
    .post("/auth/login")
    .send({
      name: "NewTest6",
      email: "newTest6@example.com",
      password: "test123",
    })
    .expect(200);
});

test("Should not login nonexisting user", async () => {
  await request(app)
    .post("/auth/login")
    .send({
      name: "NewTest12",
      email: "newTest12@example.com",
      password: "test123",
    })
    .expect(400);
});
