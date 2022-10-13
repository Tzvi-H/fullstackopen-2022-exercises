const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const middleware = require("../utils/middleware");

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

blogsRouter.post(
  "/",
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (request, response) => {
    if (!request.body.url && !request.body.title) {
      return response.status(400).json({
        error: "url or title is missing",
      });
    }

    const blog = new Blog(request.body);
    const user = request.user;

    blog.user = user._id;

    const result = await blog.save();
    user.blogs = user.blogs.concat(result._id);
    await user.save();
    response.status(201).json(result);
  }
);

blogsRouter.delete(
  "/:id",
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (request, response) => {
    const blog = await Blog.findById(request.params.id);
    if (!blog) {
      return response.status(404).end();
    }

    const loggedInUserId = request.token.id;
    const blogCreatorId = blog.user.toString();

    if (loggedInUserId === blogCreatorId) {
      await blog.delete();
      return response.status(204).end();
    } else {
      return response.status(401).json({ error: "unauthorized" });
    }
  }
);

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

blogsRouter.post("/:id/comments", async (request, response) => {
  if (!request.body.comment) {
    return response.status(400).json({
      error: "comment is missing",
    });
  }

  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    return response.status(404).end();
  }

  blog.comments.push(request.body.comment);

  const result = await blog.save();
  response.status(201).json(result);
});

module.exports = blogsRouter;
