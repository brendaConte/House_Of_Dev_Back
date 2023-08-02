const { Model, DataTypes } = require("sequelize");
const db = require("../db/index");

class Favorites extends Model {}

Favorites.init({


  
}, { sequelize: db, modelName: "favorites" });

module.exports = Favorites;
