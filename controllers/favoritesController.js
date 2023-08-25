const { Users, Property, Favorites } = require("../models/");

exports.all_favorites = async (req, res) => {
  try {
    console.log("llega");
    const favorite = await Favorites.findAll({
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

    if (!favorite) res.status(400).send("no tienes favoritos");
    res.status(200).send(favorite);
  } catch (error) {
    console.log("error", error);
  }
};

exports.add_favorite = async (req, res) => {
  try {
    console.log("favoritos", req.body);
    const { userId, propertyId } = req.body;
    console.log("user id", userId);
    console.log("property id", propertyId);
    console.log("tipo ", typeof userId);
    const favorite = await Favorites.findOne({
      where: {
        userId,
        propertyId,
      },
    });
    console.log("Favorite=>", favorite);

    if (favorite) {
      return res.status(200).send("El favorito ya existe");
    }

    const newFavorite = await Favorites.create({
      userId,
      propertyId,
    });
    console.log("new favorite =>", newFavorite);
    res.status(200).send(newFavorite);
  } catch (error) {
    console.log("Error", error.message);
    res.status(500).send("Ha ocurrido un error");
  }
};
exports.delete_favorite = async (req, res) => {
  try {
    console.log("delete",req.params);
    const favorite = req.params.id;
    console.log("FAVORITES DELETE", favorite);

    const deleteFavorite = await Favorites.destroy({
      where: { id: favorite },
    });

    res.status(202).send("favorito eliminado");
  } catch (error) {
    error.message;
  }
};
exports.favorites_by_user_id = async (req, res) => {
  try {
    const userId = req.params.id; // Get the user id from req.params
    console.log("Fetching favorites for user with id:", userId);

    const favorites = await Favorites.findAll({
      where: { userId }, // Filter favorites by user id
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

    if (!favorites || favorites.length === 0) {
      return res.status(400).send("No favorites found for the user");
    }

    res.status(200).send(favorites);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).send("An error occurred while fetching favorites");
  }
};