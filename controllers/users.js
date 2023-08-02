const  Users  = require("../models/Users");
const { generateToken, validateToken } = require("../config/token");
const {validateUser , isAdmin} = require("../middlewares/auth");

exports.register = (req, res) => {
  console.log("body", req.body);
  Users.create(req.body).then((user) => {
    console.log("user", user);
    res.status(201).send(user);
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  Users.findOne({ where: { email } }).then((user) => {
    if (!user) return res.sendStatus(401);

    user.validatePassword(password).then((isValid) => {
      if (!isValid) return res.sendStatus(401);

      const payload = {
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        is_admin: user.is_admin
      };
      const token = generateToken(payload);

      res.cookie("token", token);
      res.send(payload);
    });
  });
};

exports.homeUser = (req,res) => {
  res.send(req.user)
}  

exports.me = (req,res) =>{
  res.send(req.user)
}

exports.logout= (req,res) => {
  res.clearCookie("token") ;
  res.sendStatus(204)
}