import { movieModel, validate } from "../mongodb/models/movie.js";
import { genreModel } from "../mongodb/models/genre.js";
const getAllMovies = async (req, res) => {
  try {
    const movies = await movieModel.find({});
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const findMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await movieModel.findOne({ _id: id });
    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(404).json({ message: "Movie not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const createMovie = async (req, res) => {
  try {
    //validate client request
    const { error } = validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    //extract body object
    const { title, numberInStock, dailyRentalRate, genreId } = req.body;

    const genreExists = await genreModel.findById(genreId);
    if (!genreExists)
      return res.status(404).json({ message: "this genre doesn't exists" });

    //the movie exist no need to add new movie of same title
    const movieExists = await movieModel.findOne({ title });
    if (movieExists) return res.status(200).json(movieExists);

    const newMovie = await movieModel.create({
      title,
      numberInStock,
      dailyRentalRate,
      genre: { _id: genreExists._id, name: genreExists.name },
    });
    res.status(200).json(newMovie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const updateMovie = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const { id } = req.params;
    const { title, numberInStock, dailyRentalRate, genreId } = req.body;

    const genreExists = await genreModel.findById(genreId);
    if (!genreExists)
      return res.status(404).json({ message: "this genre doesn't exists" });

    const movie = await movieModel.findByIdAndUpdate(
      { _id: id },
      {
        title,
        numberInStock,
        dailyRentalRate,
        genre: { _id: genreExists._id, name: genreExists.name },
      }
    );
    res.status(200).json({ message: "Movie Updated successfully.", movie });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await movieModel.findByIdAndDelete({ _id: id });
    if (!movie)
      return res
        .status(404)
        .json({ message: "The movie with the given id doesn't exist" });
    res.status(200).json({ message: "Movie deleted successfully.", movie });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export { updateMovie, deleteMovie, findMovieById, getAllMovies, createMovie };
