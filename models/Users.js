const { Model, DataTypes } = require("sequelize");
const db = require("../db/index");
const bcrypt = require("bcrypt");

class Users extends Model {
  hash(password, salt) {
    return bcrypt.hash(password, salt);
  }
  validatePassword(password) {
    return this.hash(password, this.salt).then(
      (newHash) => newHash === this.password);
  }
}

Users.init(
  {
    is_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    lastname: { type: DataTypes.STRING, allowNull: false },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING,
    },
    image: { type: DataTypes.STRING },

    phone: { type: DataTypes.BIGINT, isNumeric: true, allowNull: false },
  },
  { sequelize: db, modelName: "user" }
);

Users.beforeCreate((user) => {
  const salt = bcrypt.genSaltSync(8);
  user.salt = salt;
  return user.hash(user.password, salt).then((hash) => {
    user.password = hash;
  });
});



module.exports = Users;
