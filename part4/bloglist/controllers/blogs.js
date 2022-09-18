const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../utils/config");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    id: 1,
    name: 1,
    username: 1,
  });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate("user", {
    id: 1,
    name: 1,
    username: 1,
  });
  response.json(blog);
});

blogsRouter.post("/", async (request, response) => {
  if (!request.body.url && !request.body.title) {
    return response.status(400).json({
      error: "url or title is missing",
    });
  }

  const token = request.token;
  if (!token) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const decodedToken = jwt.verify(token, SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const blog = new Blog(request.body);
  const user = await User.findById(decodedToken.id);
  blog.user = user._id;
  const result = await blog.save();
  user.blogs = user.blogs.concat(result._id);
  await user.save();
  response.status(201).json(result);
});

blogsRouter.delete("/:id", async (request, response) => {
  const blog = await Blog.findByIdAndDelete(request.params.id);
  if (blog) {
    response.status(204).end();
  } else {
    response.status(404).end();
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const blog = await Blog.findByIdAndUpdate(
    request.params.id,
    { likes: request.body.likes },
    { new: true }
  );
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

module.exports = blogsRouter;
