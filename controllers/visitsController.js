const { Visits, Users, Property } = require("../models");


exports.add_visit = async (req, res) => {
  const { id } = req.params;
  const { userId, date, hour } = req.body;

  try {
    const visits = await Visits.findOne({
      where: { is_booked: false, propertyId: id, userId },
     
    });

    if (!visits) {
      const createVisit = await Visits.create({

        userId,
        date,
        hour,
        propertyId: id,
      });

      return res.status(200).send(createVisit);
    }
    res.status(409).send("Ya existe una cita");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

exports.accept_visit = async (req, res) => {

  const { id } = req.body;
  const acceptVisit = req.body;


  try {
    const selectVisit = await Visits.update(acceptVisit, {
      where: {

        id: id,

      },
      returning: true,
    });

    res.status(201).send(selectVisit[1][0]);

    console.log("save visit", selectVisit[1][0]);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

exports.delete_visit = async (req, res) => {
  const { id } = req.params;
  console.log("DELETE VISIT", id);
  try {
    const deleteVisit = await Visits.destroy({
      where: { id },
    });
    res.sendStatus(200).send(deleteVisit);
  } catch (error) {
    console.log(error);
  }
};

exports.all_visits = async (req, res) => {
  try {
    const visit = await Visits.findAll({
      include: [
        {
          model: Property,
          as: "property",
        },
        {
          model: Users,
          as: "user",
          attributes: { exclude: ["password", "salt"] },
        },
      ],
    });

    if (visit) return res.status(200).send(visit);
    res.status(400).send("no tienes visitas agendadas");
  } catch (error) {
    console.log(error);
  }
};

exports.user_visits = async (req, res) => {
  const { userId } = req.params;
  try {
    const visits = await Visits.findAll({
      include: [
        {
          model: Property,
          as: "property",
        },
        {
          model: Users,
          as: "user",
          attributes: { exclude: ["password", "salt"] },
        },
      ],
      where: { "$user.id$": userId },
    });
    console.log("VISITAS", visits);

    if (visits == false) {
      //Visits de no tener visitas agendadas ni pendientes me trae un array vacio [].
      console.log("Visitas");
      return res.status(400).send("No tiene visitas agendadas");
    }
    res.status(200).send(visits);
  } catch (error) {
    console.log("ERROR", error.message);
  }
};