const Users = require("../models/Users");
const { generateToken } = require("../config/token");

exports.register = async (req, res) => {
  try {
    console.log("newUser", req.body);
    const searchUser = await Users.findOne({
      where: { email: req.body.email },
    });

    if (searchUser) {
      return res.status(400).send("Este usuario ya existe");
    }
    const newUser = await Users.create(req.body);

    res.status(200).send(newUser);
  } catch (error) {
    console.log("ERROR", error);
    res.send(error.message);
  }
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  Users.findOne({ where: { email } }).then((user) => {
    if (!user) return res.sendStatus(401);

    user.validatePassword(password).then((isValid) => {
      if (!isValid) return res.sendStatus(401);

      const payload = {
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        is_admin: user.is_admin,
      };

      const token = generateToken(payload);
      console.log("token ", token);

      res.cookie("token", token);
      res.send(payload);
    });
  });
};

exports.homeUser = (req, res) => {
  res.send(req.user);
};

exports.me = (req, res) => {
  console.log("entro");
  res.send(req.user);
};

exports.logout = (req, res) => {
  console.log("borro cookie");
  res.clearCookie("token");
  res.sendStatus(204);
};