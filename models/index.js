const Users = require("./Users") ;
const Property = require("./Property");
const Category = require("./Category");
const Visits = require("./Visits");
const Favorites = require("./Favorites");

Property.belongsTo(Category, { as: "category" });

Property.hasMany(Visits, { foreignKey: "propertyId", as: "visits" }); // Agrega esta línea

Users.hasMany(Visits, { foreignKey: "userId", as: "visits" });

Visits.belongsTo(Users);
Visits.belongsTo(Property);

Favorites.belongsTo(Users, { foreignKey: "userId" });
Favorites.belongsTo(Property, { foreignKey: "propertyId" });

module.exports = { Users, Property, Category, Favorites, Visits };