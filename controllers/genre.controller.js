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

    await genreModel.findByIdAndUpdate({ _id: id }, { name });
    res.status(200).json({ message: "Genre Updated successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const deleteGenre = async (req, res) => {
  try {
    const { id } = req.params;
    await genreModel.findByIdAndDelete({ _id: id });
    res.status(200).json({ message: "Genre deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { getAllGenres, findGenreById, updateGenre, deleteGenre, createGenre };
