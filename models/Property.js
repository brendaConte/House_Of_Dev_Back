const { Model, DataTypes } = require("sequelize");
const db = require("../db/index");

class Property extends Model {}

Property.init(
  
  {
    description: { type:DataTypes.STRING,  allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false},
    price: { type:DataTypes.INTEGER, allowNull: false},
    image: { type:DataTypes.STRING },
    locality: { type:DataTypes.STRING, allowNull: false},
    bedrooms: { type:DataTypes.INTEGER, allowNull: false},
    baths: { type:DataTypes.INTEGER, allowNull: false},
    square_meters: {type: DataTypes.INTEGER, allowNull: false},
    post_date: { type: DataTypes.DATE, allowNull: false},
    state: {type: DataTypes.STRING, allowNull: false},
  },
  { sequelize: db, modelName: "property" }
);


module.exports = Property;
