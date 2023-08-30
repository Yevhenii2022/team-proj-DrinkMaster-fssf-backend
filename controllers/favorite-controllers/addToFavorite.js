import { HttpError } from "../../helpers/index.js";
import { Recipe } from "../../models/recipe/index.js";

const errStatus = 404;

const addToFavorite = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;

  const result = await Recipe.findById(id);

  if (!result) {
    throw HttpError(errStatus);
  }

  if (result.favorite) {
    result.favorite.push(_id);
  } else {
    result = { ...result, favorite: [_id] };
  }

  await result.save();

  res.json({ message: `Recipe id:${id} added to favorite` });
};

export default addToFavorite;
