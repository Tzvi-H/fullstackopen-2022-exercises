require("dotenv").config();

const express = require("express");
const app = express();

const blogsRouter = require("./controllers/blogs");

app.use(express.json());

app.use("/api/blogs", blogsRouter);

app.listen(3001, () => console.log("listening on port 3001"));
