const Blog = require("./blog");
const User = require("./user");
const ReadingList = require("./reading_list");

User.hasMany(Blog);
Blog.belongsTo(User);
Blog.belongsToMany(User, { through: ReadingList });

module.exports = {
  Blog,
  User,
  ReadingList,
};
