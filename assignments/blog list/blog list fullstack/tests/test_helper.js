const Entry = require("../models/entry");

const initialEntries = [
  {
    title: "Title",
    author: "Author",
    url: "Url",
    likes: 333,
    id: "6376ca633dde21e6a60ff0ab",
  },
  {
    title: "Blog 2",
    author: "Author 2",
    url: "urlurl",
    likes: 3323,
    id: "637bf583c4515b0cd317d5c0",
  },
  {
    title: "test title",
    author: "test author",
    url: "test url",
    likes: 99,
    id: "637bff4f95bdfb08ce426a2d",
  },
  {
    title: "test title",
    author: "test author",
    url: "test url",
    likes: 99,
    id: "637bff68fc408d7ba17dbf99",
  },
  {
    title: "test title",
    author: "test author",
    url: "test url",
    likes: 99,
    id: "637bffcfe00fd5a439aa2284",
  },
];

const entriesInDb = async () => {
  const entries = await Entry.find({});
  return entries.map((entry) => entry.toJSON());
};

module.exports = {
  initialEntries,
  entriesInDb,
};
