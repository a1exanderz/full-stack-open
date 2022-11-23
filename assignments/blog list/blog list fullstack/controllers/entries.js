const entriesRouter = require("express").Router();
const Entry = require("../models/entry");
const User = require("../models/user");

const jwt = require("jsonwebtoken");

entriesRouter.get("/", async (request, response) => {
  const entries = await Entry.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  response.json(entries);
});

entriesRouter.get("/:id", async (request, response, next) => {
  const entry = await Entry.findById(request.params.id);
  if (entry) {
    response.json(entry);
  } else {
    response.status(404).end();
  }
});

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

entriesRouter.post("/", async (request, response) => {
  const body = await request.body;
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);

  const entry = new Entry({
    title: body.title ? body.title : response.status(400).end(),
    author: body.author,
    url: body.url ? body.url : response.status(400).end(),
    likes: body.likes ? body.likes : 0,
    user: user._id,
  });

  const savedEntry = await entry.save();
  user.entries = user.entries.concat(savedEntry._id);
  await user.save();

  response.json(savedEntry);
});

entriesRouter.delete("/:id", async (request, response) => {
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const entry = await Entry.findById(request.params.id);
  if (entry.user.toString() === decodedToken.id) {
    await Entry.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } else {
    response
      .status(401)
      .json({ error: "cannot delete a note that isn't yours!" });
  }
});

entriesRouter.put("/:id", async (request, response) => {
  const body = await request.body;

  const entry = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedEntry = await Entry.findByIdAndUpdate(request.params.id, entry, {
    new: true,
  });

  response.json(updatedEntry);
});

module.exports = entriesRouter;
