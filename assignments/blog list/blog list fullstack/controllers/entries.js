const entriesRouter = require("express").Router();
const Entry = require("../models/entry");

entriesRouter.get("/", async (request, response) => {
  const entries = await Entry.find({});
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

entriesRouter.post("/", async (request, response) => {
  const body = await request.body;

  const entry = new Entry({
    title: body.title ? body.title : response.status(400).end(),
    author: body.author,
    url: body.url ? body.url : response.status(400).end(),
    likes: body.likes ? body.likes : 0,
  });

  const savedEntry = await entry.save();
  response.status(201).json(savedEntry);
});

entriesRouter.delete("/:id", async (request, response) => {
  await Entry.findByIdAndRemove(request.params.id);
  response.status(204).end();
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
