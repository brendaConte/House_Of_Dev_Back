const { Model, DataTypes } = require("sequelize");
const db = require("../db/index");

class Category extends Model {}
Category.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "category",
  }
);

module.exports = Category;