const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("reading_list", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      blog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "blogs", key: "id" },
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
      },
      read_status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("reading_list");
  },
};
