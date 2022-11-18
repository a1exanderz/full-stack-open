const dummy = (entries) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, entry) => sum + entry.likes, 0);
};

module.exports = {
  dummy,
  totalLikes,
};
