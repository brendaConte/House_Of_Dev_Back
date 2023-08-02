const Property = require("../models/Property");


exports.allProperties = (req, res) => {
  Property.findAll().then((properties) => {
    res.send(properties);
  });
};

exports.add_property = (req, res) => {
  console.log("body", req.body);
  Property.create(req.body).then((newProperty) => {
    res.status(201).send(newProperty);
  });
};

exports.property_detail = async (req, res) => {
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
  console.log("delete" ,req.params.id)
Property.destroy({
  where: {id:req.params.id}
}).then(()=>
res.sendStatus(202))
} ;

exports.edit_property = (req, res) => {
  console.log("edit", req.body)
  Property.update(req.body, {where:{}})
  .then(editProperty =>{
    res.sendStatus(200)
  })
}
