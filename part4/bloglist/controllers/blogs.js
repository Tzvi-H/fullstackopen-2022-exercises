const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  if (!request.body.url && !request.body.title) {
    return response.status(400).json({
      error: "url or title is missing",
    });
  }
  const blog = new Blog(request.body);
  const result = await blog.save();
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

// notesRouter.delete('/:id', (request, response, next) => {
//   Note.findByIdAndRemove(request.params.id)
//     .then(() => {
//       response.status(204).end()
//     })
//     .catch(error => next(error))
// })

// notesRouter.put('/:id', (request, response, next) => {
//   const body = request.body

//   const note = {
//     content: body.content,
//     important: body.important,
//   }

//   Note.findByIdAndUpdate(request.params.id, note, { new: true })
//     .then(updatedNote => {
//       response.json(updatedNote)
//     })
//     .catch(error => next(error))
// })

module.exports = blogsRouter;
