const blogsRouter = require("express").Router();
const { Blog, User } = require("../models");
const { Op } = require("sequelize");
const { tokenExtractor } = require("../utils/middleware");

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

blogsRouter.get("/", async (req, res) => {
  const where = {};

  if (req.query.search) {
    where.title = {
      [Op.iLike]: `%${req.query.search}%`,
    };
  }

  const blogs = await Blog.findAll({ include: User, where });
  res.json(blogs);
});

blogsRouter.post("/", tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  const blog = await Blog.create({ ...req.body, userId: user.id });
  res.json(blog);
});

blogsRouter.put("/:id", blogFinder, async (req, res, next) => {
  const blog = req.blog;

  if (blog) {
    if (isNaN(req.body.likes)) {
      next({
        name: "InvalidLikesProperty",
        message: "likes must contain a valid number",
      });
    }
    blog.likes = req.body.likes;
    await blog.save();
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

blogsRouter.delete("/:id", tokenExtractor, blogFinder, async (req, res) => {
  const blog = req.blog;
  const user = await User.findByPk(req.decodedToken.id);

  if (!blog) {
    res.status(404).end();
  } else if (blog.userId !== user.id) {
    res.status(401).end();
  } else {
    await blog.destroy();
    res.status(204).end();
  }
});

module.exports = blogsRouter;
