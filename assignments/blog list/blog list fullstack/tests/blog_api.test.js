const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

test("blog entries are returned as json", async () => {
  await api
    .get("/api/blog-entries")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 100000);

test("get returns correct number of blog posts", async () => {
  const response = await api.get("/api/blog-entries");

  expect(response.body).toHaveLength(2);
});

afterAll(() => {
  mongoose.connection.close();
});
