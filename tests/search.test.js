const request = require("supertest");
const app = require("../backend/app");

test("Should get the searching products.", async (done) => {
  const keyword = "glove";

  await request(app).get(`/search?keyword=${keyword}`).expect(200);
  done();
});
