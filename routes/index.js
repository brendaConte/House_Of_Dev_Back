const express = require("express");
const router = express.Router();

const { validateUser, isAdmin } = require("../middlewares/auth");
const usersRouter = require("./users");
const properties = require("./properties");
const admin = require("./admin");
const favorites= require("./favorites") ;
const visits = require("./visits") ;

router.use("/users", usersRouter);
router.use("/admin", validateUser, isAdmin ,admin);
router.use("/properties", properties);
router.use("/visits", visits);
router.use("/favorites", validateUser, favorites);

module.exports = router;
