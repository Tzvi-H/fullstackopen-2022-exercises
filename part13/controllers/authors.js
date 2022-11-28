const Sequelize = require("sequelize");
const authorsRouter = require("express").Router();
const { Blog } = require("../models");
// const { Op } = require("sequelize");

authorsRouter.get("/", async (req, res) => {
  const authors = await Blog.findAll({
    group: "author",
    attributes: [
      "author",
      [Sequelize.fn("COUNT", Sequelize.col("id")), "articles"],
      [Sequelize.fn("SUM", Sequelize.col("likes")), "likes"],
    ],
    order: [["likes", "DESC"]],
  });
  res.json(authors);
});

module.exports = authorsRouter;
