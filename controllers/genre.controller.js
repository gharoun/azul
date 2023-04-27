import { genreModel, validate } from "../mongodb/models/genre.js";

const getAllGenres = async (req, res) => {
  const genres = await genreModel.find({});
  res.status(200).json(genres);
};
const findGenreById = async (req, res) => {
  const { id } = req.params;

  const genre = await genreModel.findById(id);
  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(404).json({ message: "Genre not found" });
  }
};
const createGenre = async (req, res) => {
  const { name } = req.body;
  const genreExists = await genreModel.findOne({ name });
  if (genreExists) return res.status(200).json(genreExists);

  const newGenre = await genreModel.create({
    name,
  });
  res.status(200).json(newGenre);
};
const updateGenre = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  await genreModel.findByIdAndUpdate({ _id: id }, { name });
  res.status(200).json({ message: "Genre Updated successfully." });
};
const deleteGenre = async (req, res) => {
  const { id } = req.params;
  const genre = await genreModel.findByIdAndDelete({ _id: id });
  if (!genre)
    return res
      .status(404)
      .json({ message: "The genre with the given id doesn't exist" });
  res.status(200).json({ message: "Genre deleted successfully.", genre });
};

export { getAllGenres, findGenreById, updateGenre, deleteGenre, createGenre };
