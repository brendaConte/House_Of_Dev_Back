const S = require("sequelize");
const db = require("../db");
//const bc = require("bcrypt");

class User extends S.Model {
/*   hash(password, salt) {
    return bc.hash(password, salt); */
/*   }
  validatePassword(password) {
    return this.hash(password, this.salt).then(
      (newHash) => newHash === this.password
    );
  } */
}

User.init(
  { is_admin: {
    type: S.BOOLEAN,
    defaultValue: false,
  },
    name: {  type: S.STRING,
      allowNull: false,},
    lastname: { type: S.STRING,
      allowNull: false,},
    email: {
      type: S.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      }},
    password: {
      type: S.STRING,
      allowNull: false,
    },
    image: { type: S.STRING },

    phone: { type: S.BIGINT,isNumeric: true,   allowNull: false, },
   
    salt: { type: S.STRING },
  },
  { sequelize: db, modelName: "user" }
);

/* User.beforeCreate((user) => {
  const salt = bc.genSaltSync();
  user.salt = salt;

  if (user.email) {
    user.email = user.email.toLowerCase();
  }

  return user
    .hash(user.password, salt)
    .then((result) => {
      user.password = result;
    })
    .catch((err) => {
      console.log(err);
    });
});
 */
module.exports = User;