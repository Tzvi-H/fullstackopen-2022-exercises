const { application } = require("express");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const User = require("../models/user");

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

const initialUsers = [
  {
    name: "name1",
    username: "username1",
    password: "secret1",
  },
  {
    name: "name2",
    username: "username2",
    password: "secret2",
  },
];
let token;

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  for (const user of initialUsers) {
    await api.post("/api/users").send(user);
  }
  user = await User.findOne({});
  for (const blog of initialBlogs) {
    const blogObject = new Blog(blog);
    blogObject.user = user._id;
    await blogObject.save();
  }
  const loggedInUser = initialUsers[0];
  const userInfo = {
    username: loggedInUser.username,
    password: loggedInUser.password,
  };

  const res = await api.post("/api/login").send(userInfo);
  token = "bearer " + res.body.token;
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

  await await api
    .post("/api/blogs")
    .send(newBlog)
    .set("Authorization", token)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  const contents = response.body.map((r) => r.title);

  expect(response.body).toHaveLength(initialBlogs.length + 1);
  expect(contents).toContain("title 3");
});

test("creating a blog withouth sending a token results in a 401", async () => {
  const newBlog = {
    title: "title 3",
    author: "author 3",
    url: "url3.com",
    likes: 10,
  };

  await await api.post("/api/blogs").send(newBlog).expect(401);

  const response = await api.get("/api/blogs");
  const contents = response.body.map((r) => r.title);

  expect(response.body).toHaveLength(initialBlogs.length);
  expect(contents).not.toContain("title 3");
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
    .set("Authorization", token)
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

  await api
    .post("/api/blogs")
    .send(newBlog)
    .set("Authorization", token)
    .expect(400);

  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(initialBlogs.length);
});

test("deletion of a note succeeds with status code 204 if id is valid", async () => {
  const blogs = await Blog.find({});
  const blogToDelete = blogs[0];
  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set("Authorization", token)
    .expect(204);

  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(initialBlogs.length - 1);

  const contents = response.body.map((r) => r.title);

  expect(contents).not.toContain(blogToDelete.title);
});

test("updating a note succeeds", async () => {
  const blogs = await Blog.find({});
  const blogToUpdate = blogs[0];
  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send({ likes: 10 })
    .expect(200);

  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(initialBlogs.length);

  const blog = await api.get(`/api/blogs/${blogToUpdate.id}`);

  expect(blog.body.likes).toBe(10);
});

afterAll(() => {
  mongoose.connection.close();
});
