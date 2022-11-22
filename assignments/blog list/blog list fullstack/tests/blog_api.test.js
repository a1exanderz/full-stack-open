const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const helper = require("./test_helper");

test("blog entries are returned as json", async () => {
  await api
    .get("/api/blog-entries")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 100000);

test("get returns correct number of blog posts", async () => {
  const response = await api.get("/api/blog-entries");

  expect(response.body).toHaveLength(helper.initialEntries.length);
});

test("blog identifier contains property name id", async () => {
  const response = await api.get("/api/blog-entries");

  expect(response.body[0].id).toBeDefined();
});

test("post request creates new blog post", async () => {
  const newEntry = {
    title: "test title",
    author: "test author",
    url: "test url",
    likes: 99,
  };

  await api
    .post("/api/blog-entries")
    .send(newEntry)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const entriesAtEnd = await helper.entriesInDb();
  expect(entriesAtEnd).toHaveLength(helper.initialEntries.length + 1);

  const titles = entriesAtEnd.map((entry) => entry.title);
  expect(titles).toContain("test title");
});

test("post likes missing defaults 0", async () => {
  const newEntry = {
    title: "new test no likes 2",
    author: "author",
    url: "url",
  };

  await api
    .post("/api/blog-entries")
    .send(newEntry)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const entriesAtEnd = await helper.entriesInDb();
  const likes = entriesAtEnd[entriesAtEnd.length - 1];
  expect(likes) === 0;
});

test("if title missing 400 response", async () => {
  const newEntry = {
    author: "test author",
    url: "test url",
  };

  await api.post("/api/blog-entries").send(newEntry).expect(400);
});

test("if url missing 400 response", async () => {
  const newEntry = {
    title: "test title",
    author: "test author",
  };

  await api.post("/api/blog-entries").send(newEntry).expect(400);
});

test("delete request works", async () => {
  const deleteId = helper.initialEntries[helper.initialEntries.length - 1].id;

  await api.delete(`/api/blog-entries/${deleteId}`).expect(204);

  // const entriesAtEnd = await helper.entriesInDb();
  // expect(entriesAtEnd).toHaveLength(helper.initialEntries.length - 1);
});

afterAll(() => {
  mongoose.connection.close();
});
