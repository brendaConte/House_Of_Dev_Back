const Property = require("../models/Property");
const Category = require("../models/Category");
const Sequelize = require("sequelize");

exports.all_properties = (req, res) => {
  Property.findAll({
    order: [["updatedAt", "DESC"]],
    include: {
      model: Category, // Modelo relacionado que deseas incluir
      as: "category", // Alias de la relación, asegúrate de que coincida con el alias en tu modelo Property
    },
  }).then((properties) => {
    res.send(properties);
  });
};

exports.add_property = async (req, res, next) => {
  const propertyData = req.body;

  try {
    const newProperty = await Property.create(propertyData);
    console.log("newProperty", req.body.categoria);

    const findCategory = await Category.findOne({
      where: { name: req.body.categoria },
    });
    console.log("Find category", findCategory);

    if (!findCategory) {
      const newCategory = await Category.create({ name: req.body.categoria });
      newProperty.categoryId = newCategory.id;
      newProperty.save();
      return res.status(201).send(newProperty);
    }

    newProperty.categoryId = findCategory.id;
    newProperty.save();

    res.status(201).send(newProperty);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

exports.property_detail = async (req, res) => {
  req.params.id;
  try {
    const oneProperty = await Property.findOne({
      where: { id: req.params.id },
    });
    console.log("ONEPROP=>", oneProperty);
    res.status(200).send(oneProperty);
  } catch (error) {
    console.log("ERROR", error);
  }
};

exports.delete_property = (req, res) => {
  console.log("delete", req.params.id);
  Property.destroy({
    where: { id: req.params.id },
  }).then(() => res.sendStatus(202));
};

exports.edit_property = (req, res) => {
  console.log("req.body edit", req.body);
  Property.update(req.body, {
    where: { id: req.body.id },
    returning: true,
  }).then(([affectedRows, property_edit]) => {
    console.log("property edit", property_edit);
    res.status(200).send(property_edit[0]);
  });
};

exports.search_locality = async (req, res) => {
  const { locality, state } = req.params;
  try {
    //traeme todas las propiedades
    const oneProperty = await Property.findAll({
      where: {
        locality: { [Sequelize.Op.like]: `%${locality}%` },
        state: { [Sequelize.Op.like]: `%${state}%` },
      },
      include: { model: Category, as: "category" },
    });
    if (!oneProperty)
      return res.send("no se encontraron propiedades en esta localidad");

    res.status(200).send(oneProperty);
  } catch (error) {
    console.log("ERROR", error.message);
  }
};

exports.search_state = async (req, res) => {
  const { state } = req.params;
  try {
    const property = await Property.findAll({
      where: { state },
    });

    res.status(200).send(property);
  } catch (error) {
    console.log("ERROR", error.message);
  }
};

exports.search_category = async (req, res) => {
  const { categorysearch, state } = req.params;
  console.log("resqparams", req.params);
  try {
    const property = await Property.findAll({
      where: {
        "$category.name$": categorysearch,
        state: { [Sequelize.Op.like]: `%${state}%` },
      },
      include: { model: Category, as: "category" },
    });
    console.log("PROPERTY=>", property);
    res.status(200).send(property);
  } catch (error) {
    console.log("ERROR", error.message);
  }
};