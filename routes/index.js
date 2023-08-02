const express = require("express");
const router = express.Router();
const { register, login, secret, me, logout} = require("../controllers/users");
const {validateUser,isAdmin} = require("../middlewares/auth");
const usersRouter = require("./users");
const properties = require ("./properties") ;
const admin = require("./admin")


router.use("/users", usersRouter);
router.use("/admin", validateUser, isAdmin, admin);
router.use("/properties", properties);
/* router.use("/visits", visit);
router.use("/favorites", validateUser, favorites); */


module.exports = router;