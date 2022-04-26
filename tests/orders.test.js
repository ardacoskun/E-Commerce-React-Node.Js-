const request = require("supertest");
const app = require("../backend/app");

let token = "";

beforeAll(async (done) => {
  const response = await request(app).post("/auth/login").send({
    email: "test2@gmail.com",
    password: "123456",
  });
  token = response.body.token;
  done();
});
describe("Order Tests", () => {
  test("Should get current user's orders", async (done) => {
    const response = await request(app)
      .get("/orders")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.orders.length).toBeGreaterThan(0);
    done();
  });

  test("Should create an order from a user", async (done) => {
    const response = await request(app)
      .post("/orders")
      .set("Authorization", `Bearer ${token}`)
      .send({
        address: "address",
        paymentId: "1",
        items: [
          {
            variant: {
              variation_values: {
                color: "C43",
                size: "33",
              },
              price: 145,
              product_id: "883360544250",
              orderable: true,
            },
            productId: "86736845",
            quantity: 11,
          },
        ],
      });
    expect(response.body.status).toBe("created");
    done();
  });
});
