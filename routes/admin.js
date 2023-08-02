const express = require("express");
const router = express.Router();

const { add_property, delete_property,
  edit_property } = require("../controllers/properties");
  
const { validateUser, isAdmin } = require("../middlewares/auth");

/* const { accept_visit } = require("../controllers/visitControllers"); */

router.post("/addpropertry", add_property);
router.put("/edit-property", edit_property) ;
router.delete("/delete-property/:id", delete_property)
/* router.put("/accept-visit", accept_visit);
 */

module.exports = router;


