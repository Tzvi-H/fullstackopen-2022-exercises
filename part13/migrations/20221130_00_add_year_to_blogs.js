const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("blogs", "year", DataTypes.INTEGER);
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("blogs", "year");
  },
};
