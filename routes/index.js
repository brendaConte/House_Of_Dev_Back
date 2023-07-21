const express = require("express");
const router = express.Router();

const usersRouter = require("./users");
/* const properties = require("./properties"); */
//const admin = require("./admin");
/* const visit = require("./visit");
const favorites = require("./favorite"); */
//const { isAdmin, validateAuth } = require("../middlewares");

router.use("/users", usersRouter);
/* router.use("/properties", properties);
router.use("/visits", visit); */





module.exports = router;