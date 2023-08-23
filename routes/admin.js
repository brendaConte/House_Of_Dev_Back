const express = require("express");
const router = express.Router();

const {
  add_property,
  delete_property,
  edit_property,
} = require("../controllers/propertiesController");

/* const { accept_visit } = require("../controllers/visitsControllers"); */
router.post("/add-property", add_property);
router.put("/edit-property", edit_property);
router.delete("/delete-property/:id", delete_property);

//router.put("/accept-visit", accept_visit);
//agregar alta y baja de administradores.
//Que el admin pueda ver el perfil de un usuario específico (con sus propiedades favoritas).

module.exports = router;
