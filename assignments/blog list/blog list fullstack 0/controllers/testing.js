const testingRouter = require("express").Router();
const Entry = require("../models/entry");
const User = require("../models/user");

testingRouter.post("/reset", async (request, response) => {
  await Entry.deleteMany({});
  await User.deleteMany({});

  response.status(204).end();
});

module.exports = testingRouter;
