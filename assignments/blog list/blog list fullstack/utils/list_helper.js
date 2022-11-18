const dummy = (entries) => {
  return 1;
};

const totalLikes = (entries) => {
  return entries.reduce((sum, entry) => sum + entry.likes, 0);
};

const favoriteBlog = (entries) => {
  const mostLikes = entries.reduce(
    (currentFav, entry) => Math.max(currentFav, entry.likes),
    0
  );

  let favoriteBlog = entries.filter((entry) => entry.likes === mostLikes);

  const transformObject = (entries) => {
    const object = entries[0];
    delete object._id;
    delete object.__v;
    delete object.url;

    return object;
  };

  return transformObject(favoriteBlog);
};

const mostBlogs = (entries) => {
  const map = new Map();

  let mostBlogs = [0, ""];
  for (let i = 0; i < entries.length; i++) {
    map.set(entries[i].author, (map.get(entries[i].author) ?? 0) + 1);

    if (map.get(entries[i].author) > mostBlogs[0]) {
      mostBlogs = [map.get(entries[i].author), entries[i].author];
    }
  }

  const testOutput = {
    author: mostBlogs[1],
    blogs: mostBlogs[0],
  };

  return testOutput;
};

const mostLikes = (entries) => {
  const map = new Map();

  let mostLikes = [0, ""];

  for (let i = 0; i < entries.length; i++) {
    map.set(
      entries[i].author,
      (map.get(entries[i].author) ?? 0) + entries[i].likes
    );

    if (map.get(entries[i].author) > mostLikes[0]) {
      mostLikes = [map.get(entries[i].author), entries[i].author];
    }
  }

  const testOutput = {
    author: mostLikes[1],
    likes: mostLikes[0],
  };

  return testOutput;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
