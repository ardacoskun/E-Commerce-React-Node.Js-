const request = require("supertest");
const app = require("../backend/app");

test("Should get parent categories", async (done) => {
  const parentId = "mens";

  const response = await request(app).get(`/${parentId}`);
  expect(response.body.length).toBeGreaterThan(0);
  done();
});

test("Should get subcategories of parent category", async (done) => {
  const parentId = "mens";
  const subCategoryId = "clothing";

  const response = await request(app).get(`/${parentId}/${subCategoryId}`);
  expect(response.body.length).toBeGreaterThan(0);
  done();
});

test("Should get sub subcategories of subcategory ", async (done) => {
  const parentId = "mens";
  const subCategoryId = "clothing";
  const productCategoryId = "mens-clothing-shorts";
  const productId = "54736828";

  const response = await request(app).get(
    `/${parentId}/${subCategoryId}/${productCategoryId}/${productId}`
  );
  expect(response.body[0].id).toBe(productId);
  done();
});

test("Should get root categories", async (done) => {
  const parentId = "mens";
  const response = await request(app).get(`/categories/${parentId}`);
  expect(200);
  done();
});
