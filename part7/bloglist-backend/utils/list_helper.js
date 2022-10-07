const _ = require("lodash");

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

const mostBlogs = (blogs) => {
  const authorBlogCount = {};
  blogs.forEach(({ author }) => {
    authorBlogCount[author] = authorBlogCount[author] + 1 || 1;
  });
  let maxAuthor;
  let maxBlogs = 0;
  for (const author in authorBlogCount) {
    if (authorBlogCount[author] > maxBlogs) {
      maxAuthor = author;
      maxBlogs = authorBlogCount[author];
    }
  }
  return {
    author: maxAuthor,
    blogs: maxBlogs,
  };
};

const mostLikes = (blogs) => {
  const authorLikesCount = {};
  blogs.forEach(({ author, likes }) => {
    authorLikesCount[author] = authorLikesCount[author] + likes || likes;
  });
  let maxAuthor;
  let maxLikes = 0;
  for (const author in authorLikesCount) {
    if (authorLikesCount[author] > maxLikes) {
      maxAuthor = author;
      maxLikes = authorLikesCount[author];
    }
  }
  return {
    author: maxAuthor,
    likes: maxLikes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
