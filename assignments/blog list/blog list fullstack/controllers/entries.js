const entriesRouter = require("express").Router();
const Entry = require("../models/entry");

entriesRouter.get("/", async (request, response) => {
  const entries = await Entry.find({});
  response.json(entries);
});

entriesRouter.get("/:id", (request, response, next) => {
  Entry.findById(request.params.id)
    .then((entry) => {
      if (entry) {
        response.json(entry);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
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

entriesRouter.delete("/:id", async (request, response, next) => {
  await Entry.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

entriesRouter.put("/:id", (request, response, next) => {
  const body = request.body;

  const entry = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  Entry.findByIdAndUpdate(request.params.id, entry, { new: true })
    .then((updatedEntry) => {
      response.json(updatedEntry);
    })
    .catch((error) => next(error));
});

module.exports = entriesRouter;
