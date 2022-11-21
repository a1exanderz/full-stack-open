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

entriesRouter.post("/", (request, response, next) => {
  const body = request.body;

  const entry = new Entry({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  entry
    .save()
    .then((savedEntry) => {
      response.json(savedEntry);
    })
    .catch((error) => next(error));
});

entriesRouter.delete("/:id", (request, response, next) => {
  Entry.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
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
