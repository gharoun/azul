import genreModel from "../mongodb/models/genre.js";
import Joi from "joi";

const getAllGenres = async (req, res) => {
  try {
    const genres = await genreModel.find({});
    res.status(200).json(genres);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const findGenreById = async (req, res) => {
  try {
    const { id } = req.params;
    const genre = await genreModel.findOne({ _id: id });
    if (genre) {
      res.status(200).json(genre);
    } else {
      res.status(404).json({ message: "Genre not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const createGenre = async (req, res) => {
  try {
    const { name } = req.body;
    const genreExists = await genreModel.findOne({ name });
    if (genreExists) return res.status(200).json(genreExists);

    const newGenre = await genreModel.create({
      name,
    });
    res.status(200).json(newGenre);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const updateGenre = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const { error } = validateGenre(req.body);
    console.log(error);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    await genreModel.findByIdAndUpdate({ _id: id }, { name });
    res.status(200).json({ message: "Genre Updated successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const deleteGenre = async (req, res) => {
  try {
    const { id } = req.params;
    const genre = await genreModel.findByIdAndDelete({ _id: id });
    if (!genre)
      return res
        .status(404)
        .json({ message: "The genre with the given id doesn't exist" });
    res.status(200).json({ message: "Genre deleted successfully.", genre });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(genre);
}
export { getAllGenres, findGenreById, updateGenre, deleteGenre, createGenre };
