const { Model, DataTypes } = require("sequelize");
const db = require("../db/index");

class Visits extends Model {}

Visits.init(
  {
    date: { type: DataTypes.DATEONLY,  allowNull: false},
    hour: { type: DataTypes.TIME,  allowNull: false},
    is_booked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { sequelize: db, modelName: "visits" }
);

module.exports = Visits;