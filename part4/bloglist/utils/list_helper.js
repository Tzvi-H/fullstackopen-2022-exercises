const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => {
    return total + blog.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  let blog = blogs[0];
  blogs.forEach((currentBlog) => {
    if (currentBlog.likes > blog.likes) {
      blog = currentBlog;
    }
  });
  return blog;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
