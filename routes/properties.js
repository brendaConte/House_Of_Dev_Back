const express = require("express");
const router = express.Router();
/* search_locality , search_category */
const {allProperties,property_detail, } = require("../controllers/properties")

router.get("/", allProperties);
router.get("/:id", property_detail)
/* router.get("/search/:locality/:state", search_locality);
router.get("/filter-state/:state", search_state);
router.get("/filter-category/:categorysearch/:state", search_category); */

module.exports= router

