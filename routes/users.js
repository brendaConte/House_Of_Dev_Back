const express = require("express");
const {
  register,
  login,
  homeUser,
  me,
  logout,
} = require("../controllers/userController");
const { validateUser } = require("../middlewares/auth");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/home", validateUser, homeUser); //futura pagina de inicio
router.get("/me", validateUser, me); //perfil de usuario logueado
router.get("/logout", logout);

module.exports = router;
