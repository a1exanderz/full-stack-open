const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const helper = require("./test_helper");
const bcrypt = require("bcrypt");

const User = require("../models/user");
const Entry = require("../models/entry");

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

test("put request works", async () => {
  const putReqId = helper.initialEntries[0].id;

  const newEntry = {
    likes: 1,
  };

  await api.put(`/api/blog-entries/${putReqId}`).send(newEntry).expect(200);
});

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("username must be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});

test("password less than 3 char is invalid returns 400", async () => {
  const usersAtStart = await helper.usersInDb();

  const newUser = {
    username: "a",
    name: "name",
    password: "ppppppp",
  };

  const result = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  expect(result.body.error).toContain(
    "username or password must be at least 3 characters long"
  );

  const usersAtEnd = await helper.usersInDb();
  expect(usersAtEnd).toEqual(usersAtStart);
});

afterAll(() => {
  mongoose.connection.close();
});
