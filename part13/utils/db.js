const Sequelize = require("sequelize");
const { database, user, password, host, db_port } = require("./config");

const sequelize = new Sequelize(database, user, password, {
  host,
  port: db_port,
  dialect: "postgres",
  logging: true,
});

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("connected to the database");
  } catch (err) {
    console.log("failed to connect to the database");
    return process.exit(1);
  }

  return null;
};

module.exports = { connectToDatabase, sequelize };
