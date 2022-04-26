const request = require("supertest");
const app = require("../backend/app");

test("Should register a new user", async (done) => {
  await request(app)
    .post("/auth/register")
    .send({
      name: "NewTest8",
      email: "newTest8@example.com",
      password: "test123",
    })
    .expect(201);
  done();
});

test("Should not register a new user with taken email", async (done) => {
  await request(app)
    .post("/auth/register")
    .send({
      name: "NewTest6",
      email: "newTest6@example.com",
      password: "test123",
    })
    .expect(400);
  done();
});

test("Should login an existing user", async (done) => {
  await request(app)
    .post("/auth/login")
    .send({
      name: "NewTest6",
      email: "newTest6@example.com",
      password: "test123",
    })
    .expect(200);
  done();
});

test("Should not login nonexisting user", async (done) => {
  await request(app)
    .post("/auth/login")
    .send({
      name: "NewTest12",
      email: "newTest12@example.com",
      password: "test123",
    })
    .expect(400);
  done();
});
