const express = require("express");
const router = express.Router();

const {
  all_properties,
  property_detail,search_locality ,search_state , search_category 
} = require("../controllers/propertiesController");

router.get("/", all_properties);
router.get("/:id", property_detail);
router.get("/search/:locality/:state", search_locality);
router.get("/filter-state/:state", search_state);
router.get("/filter-category/:categorysearch/:state", search_category);

module.exports = router;
