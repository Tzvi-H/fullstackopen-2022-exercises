const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");

jest.setTimeout(10000);

const initialBlogs = [
  {
    title: "title 1",
    author: "author 1",
    url: "url1.com",
    likes: 1,
  },
  {
    title: "title 2",
    author: "author 2",
    url: "url2.com",
    likes: 0,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are two blogs", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(initialBlogs.length);
});

test("a blog contains an 'id' property", async () => {
  const response = await api.get("/api/blogs");
  const blog = response.body[0];
  expect(blog.id).toBeDefined();
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "title 3",
    author: "author 3",
    url: "url3.com",
    likes: 10,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  const contents = response.body.map((r) => r.title);

  expect(response.body).toHaveLength(initialBlogs.length + 1);
  expect(contents).toContain("title 3");
});

test("'likes' will default to 0 when 'likes' is missing from POST request", async () => {
  const newBlog = {
    title: "title 3",
    author: "author 3",
    url: "url3.com",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  const blog = response.body.find((blog) => blog.title === "title 3");

  expect(blog.likes).toBe(0);
});

test("blog without content are url is not added", async () => {
  const newBlog = {
    author: "author 3",
  };

  await api.post("/api/blogs").send(newBlog).expect(400);

  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(initialBlogs.length);
});

afterAll(() => {
  mongoose.connection.close();
});
