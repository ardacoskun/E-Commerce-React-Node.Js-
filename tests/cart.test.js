const request = require("supertest");
const app = require("../backend/app");

let token = "";

beforeAll(async () => {
  const response = await request(app).post("/auth/login").send({
    email: "newTest5@gmail.com",
    password: "123456",
  });
  token = response.body.token;
});

describe("Cart Tests", () => {
  test("Should add item to cart for current user", async () => {
    const productAttributes = { color: "GUAVAFB", size: "", width: "" };
    const productVariants = [
      {
        variation_values: { color: "GUAVAFB" },
        price: 38,
        product_id: "799927757417",
        orderable: true,
      },
    ];

    await request(app)
      .post("/cart/addItem")
      .set("Authorization", `Bearer ${token}`)
      .send({
        productId: "25594785",
        productAttributes,
        productVariants,
        quantity: "1",
      })
      .expect(201);
  });

  test("Should get cart for current user", async () => {
    await request(app)
      .get("/cart")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });

  test("Should remove item from cart", async () => {
    await request(app)
      .delete("/cart/removeItem")
      .set("Authorization", `Bearer ${token}`)
      .send({
        productId: "25594785",
        variantId: "799927757417",
      })
      .expect(202);
  });
});
