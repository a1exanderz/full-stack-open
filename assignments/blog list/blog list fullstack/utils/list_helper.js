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

  const transformObject = (array) => {
    const object = array[0];
    delete object._id;
    delete object.__v;
    delete object.url;

    return object;
  };

  return transformObject(favoriteBlog);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
