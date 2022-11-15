require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 3001,
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  db_port: process.env.db_port,
};
