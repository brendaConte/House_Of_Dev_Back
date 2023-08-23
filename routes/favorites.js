const express = require("express");
const {
  add_favorite,
  delete_favorite,
  all_favorites,
} = require("../controllers/favoritesController");
const router = express.Router();

router.post("/add-favorites", add_favorite);
router.delete("/delete-favorites/:id", delete_favorite);
router.get("/all-favorites", all_favorites);

module.exports = router;